import React, { useState, useRef, useEffect, ReactNode } from "react";
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw, MessageSquare } from "lucide-react";
import { ChatMessage } from "../types";

interface ChatViewProps {
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function ChatView({ lang, isFacilitated }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: lang === "it" 
        ? "Ciao! Sono l'**Assistente Virtuale AI di Facilissimo Web**.\n\nSono qui per darti informazioni immediate sui servizi di web design, siti web evoluti e sviluppo web app creati da **M. Teresa Rogani**.\n\nCome posso aiutarti oggi?"
        : "Hello! I am the **AI Assistant for Facilissimo Web**.\n\nI'm here to provide instant information about web design services, custom websites, and web apps created by **M. Teresa Rogani**.\n\nHow can I help you today?",
      timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = lang === "it" ? [
    "Come realizzi i siti web?",
    "Lavori da sola o hai un team?",
    "Come usi l'Intelligenza Artificiale?",
    "Come posso richiedere un preventivo?",
  ] : [
    "How do you build websites?",
    "Do you work alone or with a team?",
    "How do you use AI?",
    "How can I request a quote?",
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    setError("");

    try {
      const history = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textToSend,
          history: history,
          stream: true,
        }),
      });

      if (!res.ok) {
        throw new Error(lang === "it" ? "Errore di connessione al server AI." : "Error connecting to AI server.");
      }

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("text/event-stream")) {
        const reader = res.body?.getReader();
        if (!reader) throw new Error("Stream non leggibile.");

        const decoder = new TextDecoder("utf-8");
        let aiText = "";

        const aiMessageId = Math.random().toString(36).substring(2, 9);
        const placeholderMessage: ChatMessage = {
          id: aiMessageId,
          role: "model",
          text: "",
          timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, placeholderMessage]);

        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const cleanLine = line.trim();
            if (cleanLine.startsWith("data: ")) {
              const dataStr = cleanLine.slice(6).trim();
              if (dataStr === "[DONE]") {
                break;
              }
              try {
                const parsed = JSON.parse(dataStr);
                const textChunk = parsed.text || "";
                aiText += textChunk;

                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMessageId ? { ...msg, text: aiText } : msg
                  )
                );
              } catch {
                // Ignore incomplete JSON chunks
              }
            }
          }
        }
      } else {
        const data = await res.json();
        const aiMessage: ChatMessage = {
          id: Math.random().toString(36).substring(2, 9),
          role: "model",
          text: data.text,
          timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (err: any) {
      console.error("Errore chat:", err);
      setError(err.message || (lang === "it" ? "Impossibile ottenere risposta." : "Failed to get response."));
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "model",
        text: lang === "it" ? "Conversazione azzerata. Come posso aiutarti ora?" : "Conversation cleared. How can I help you now?",
        timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  const parseInlineStyles = (textStr: string): ReactNode => {
    const parts = textStr.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-bold text-[#111113]">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  const renderMessageText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
      const isNumbered = /^\d+\.\s/.test(line.trim());

      if (isBullet) {
        const cleanLine = line.trim().substring(2);
        return (
          <span key={index} className="flex items-start gap-2 pl-1 my-1">
            <span className="w-1.5 h-1.5 bg-[#111113] rounded-full mt-2 shrink-0"></span>
            <span>{parseInlineStyles(cleanLine)}</span>
          </span>
        );
      } else if (isNumbered) {
        const dotIndex = line.indexOf(".");
        const num = line.substring(0, dotIndex + 1);
        const cleanLine = line.substring(dotIndex + 1).trim();
        return (
          <span key={index} className="flex items-start gap-2 pl-1 my-1">
            <span className="text-[#111113] font-mono font-bold text-xs mt-0.5 shrink-0">{num}</span>
            <span>{parseInlineStyles(cleanLine)}</span>
          </span>
        );
      }
      return (
        <span key={index} className="block min-h-[1.2em]">
          {parseInlineStyles(line)}
        </span>
      );
    });
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#F8F7F4] text-[#111113] flex flex-col py-6 px-4 sm:px-6 md:px-12">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col bg-white border border-[#111113]/15 shadow-xl rounded-2xl overflow-hidden my-auto min-h-[680px]">
        
        {/* Full Page Chat Header */}
        <div className="bg-[#111113] text-[#FAF9F6] p-4 sm:p-6 flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black font-bold flex items-center justify-center font-tan border border-white/30 shadow-md">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#111113]"></span>
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-xl leading-tight text-white flex items-center gap-2 font-sans">
                {lang === "it" ? "Assistente AI Facilissimo Web" : "Facilissimo Web AI Assistant"}
              </h1>
              <p className="text-xs text-white/70 font-mono tracking-wider uppercase mt-0.5">
                {lang === "it" ? "M. Teresa Rogani • Risposta Immediata" : "M. Teresa Rogani • Instant Reply"}
              </p>
            </div>
          </div>

          <button
            onClick={clearChat}
            title={lang === "it" ? "Azzera Conversazione" : "Reset Conversation"}
            className="flex items-center gap-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono rounded-xl transition-colors border border-white/20 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">{lang === "it" ? "Azzera" : "Reset"}</span>
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-[#F8F7F4] text-sm sm:text-base">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div className="flex items-center gap-2 mb-1 text-xs font-mono text-[#111113]/60 px-1">
                {msg.role === "model" ? (
                  <span className="font-bold text-black flex items-center gap-1.5">
                    <Bot className="w-4 h-4 text-black" />
                    Assistente AI
                  </span>
                ) : (
                  <span className="font-bold flex items-center gap-1.5">
                    <User className="w-4 h-4 text-black" />
                    Tu
                  </span>
                )}
                <span>• {msg.timestamp}</span>
              </div>

              <div
                className={`max-w-[90%] sm:max-w-[80%] p-4 sm:p-5 rounded-2xl text-sm sm:text-base leading-relaxed shadow-sm ${
                  msg.role === "user"
                    ? "bg-[#111113] text-white rounded-br-none"
                    : "bg-white text-[#111113] border border-black/10 rounded-bl-none font-sans"
                }`}
              >
                {renderMessageText(msg.text)}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-sm font-mono text-black/70 bg-white border border-black/10 p-4 rounded-2xl w-fit shadow-xs">
              <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce" />
              <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-2.5 h-2.5 bg-black rounded-full animate-bounce [animation-delay:0.4s]" />
              <span className="ml-2 font-bold text-xs">
                {lang === "it" ? "L'IA sta elaborando la risposta..." : "AI is generating response..."}
              </span>
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Suggested Quick Questions */}
          {messages.length <= 2 && !loading && (
            <div className="pt-4 border-t border-black/10 mt-6">
              <p className="text-xs font-mono uppercase tracking-wider text-black/60 mb-3 font-bold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-black" />
                {lang === "it" ? "Domande frequenti suggerite:" : "Suggested questions:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(q)}
                    className="text-xs sm:text-sm bg-white hover:bg-black hover:text-white text-[#111113] border border-black/20 rounded-full px-4 py-2 font-medium transition-all shadow-xs cursor-pointer text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Form Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-black/10 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex items-center gap-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === "it" ? "Fai una domanda all'Assistente AI..." : "Ask AI Assistant a question..."}
              disabled={loading}
              className="flex-1 bg-[#F8F7F4] border border-black/20 text-[#111113] text-sm sm:text-base rounded-2xl px-4 py-3.5 focus:outline-none focus:border-black transition-colors placeholder:text-black/40 font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="bg-black hover:bg-black/80 disabled:opacity-40 text-white px-5 py-3.5 rounded-2xl transition-all cursor-pointer flex items-center gap-2 font-bold text-sm shrink-0"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">{lang === "it" ? "Invia" : "Send"}</span>
            </button>
          </form>
          <p className="text-xs font-mono text-center text-black/50 mt-3">
            {lang === "it" ? "Sviluppato da Facilissimo Web • M. Teresa Rogani" : "Powered by Facilissimo Web • M. Teresa Rogani"}
          </p>
        </div>

      </div>
    </div>
  );
}
