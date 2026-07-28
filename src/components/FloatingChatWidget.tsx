import React, { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, MessageSquare, AlertCircle, RefreshCw, X, Sparkles, Bot, ChevronDown } from "lucide-react";
import { ChatMessage } from "../types";

interface FloatingChatWidgetProps {
  lang: "it" | "en";
  isFacilitated: boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

export default function FloatingChatWidget({
  lang,
  isFacilitated,
  isOpen,
  setIsOpen,
}: FloatingChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: lang === "it" 
        ? "Ciao! Sono l'**Assistente Virtuale AI di Facilissimo Web** (di M. Teresa Rogani).\n\nSono qui per darti informazioni immediate sui servizi di web design, siti web evoluti e sviluppo web app su misura.\n\nCome posso aiutarti oggi?"
        : "Hello! I am the **AI Assistant for Facilissimo Web** (by M. Teresa Rogani).\n\nI'm here to provide instant information about web design services, custom websites, and bespoke web apps.\n\nHow can I help you today?",
      timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showTooltip, setShowTooltip] = useState(true);
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
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
      setShowTooltip(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, messages, loading]);

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
          <span key={index} className="flex items-start gap-1.5 pl-1 my-0.5">
            <span className="w-1.5 h-1.5 bg-[#111113] rounded-full mt-2 shrink-0"></span>
            <span>{parseInlineStyles(cleanLine)}</span>
          </span>
        );
      } else if (isNumbered) {
        const dotIndex = line.indexOf(".");
        const num = line.substring(0, dotIndex + 1);
        const cleanLine = line.substring(dotIndex + 1).trim();
        return (
          <span key={index} className="flex items-start gap-1.5 pl-1 my-0.5">
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
    <>
      {/* FLOATING STICKY CHAT FULL PAGE WINDOW */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] w-full h-full min-h-[100vh] bg-[#F8F7F4] flex flex-col overflow-hidden text-[#111113]"
            id="floating-chat-window"
          >
            {/* Full Page Header */}
            <div className="bg-[#111113] text-[#FAF9F6] px-4 py-3.5 sm:px-8 sm:py-5 flex items-center justify-between border-b border-white/10 shrink-0 shadow-md">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white text-black font-bold flex items-center justify-center font-tan border border-white/30 shadow-md">
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-black" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#111113]"></span>
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-xl leading-tight text-white flex items-center gap-2 font-sans">
                    {lang === "it" ? "Assistente AI Facilissimo Web" : "Facilissimo Web AI Assistant"}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={clearChat}
                  title={lang === "it" ? "Azzera Chat" : "Reset Chat"}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-mono rounded-xl transition-colors border border-white/20 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{lang === "it" ? "Azzera" : "Reset"}</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 px-3 py-2 bg-white text-black hover:bg-white/90 text-xs font-bold font-sans rounded-xl transition-colors cursor-pointer"
                  aria-label="Chiudi chat"
                >
                  <X className="w-4 h-4" />
                  <span>{lang === "it" ? "Chiudi" : "Close"}</span>
                </button>
              </div>
            </div>

            {/* Chat Messages Body - Full width centered max-w-4xl */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-[#F8F7F4] text-sm sm:text-base">
              <div className="max-w-4xl mx-auto w-full space-y-5">
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
                        <span className="font-bold">Tu</span>
                      )}
                      <span>• {msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[92%] sm:max-w-[85%] p-4 sm:p-5 rounded-2xl text-sm sm:text-base leading-relaxed shadow-xs ${
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
                      {lang === "it" ? "L'IA sta elaborando la risposta..." : "AI is thinking..."}
                    </span>
                  </div>
                )}

                {error && (
                  <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Quick Questions Chips */}
                {messages.length <= 2 && !loading && (
                  <div className="pt-4 border-t border-black/10 mt-6">
                    <p className="text-xs font-mono uppercase tracking-wider text-black/60 mb-3 font-bold">
                      {lang === "it" ? "Domande frequenti suggerite:" : "Suggested questions:"}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSendMessage(q)}
                          className="text-xs sm:text-sm bg-white hover:bg-black hover:text-white text-[#111113] border border-black/20 rounded-full px-4 py-2 font-medium transition-all text-left shadow-2xs cursor-pointer"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>
            </div>

            {/* Full Width Footer Input Bar */}
            <div className="p-4 sm:p-5 bg-white border-t border-black/10 shrink-0 shadow-lg">
              <div className="max-w-4xl mx-auto w-full">
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
                  {lang === "it" ? "Sviluppato da Facilissimo Web" : "Powered by Facilissimo Web"}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STICKY NUVOLETTA FLOATING TRIGGER BUTTON */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        {/* Optional Speech Bubble Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 10, scale: 0.9 }}
              onClick={() => setIsOpen(true)}
              className="hidden sm:flex items-center gap-2 bg-[#111113] text-white px-3.5 py-2 rounded-2xl shadow-xl border border-white/20 cursor-pointer group hover:bg-black transition-all"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold font-sans tracking-wide">
                {lang === "it" ? "Hai domande? Parla con l'IA" : "Have questions? Ask AI"}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTooltip(false);
                }}
                className="text-white/50 hover:text-white ml-1 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bubble Circle Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen((prev) => !prev)}
          className={`w-13 h-13 rounded-full flex items-center justify-center cursor-pointer shadow-2xl transition-all duration-300 relative border-2 ${
            isOpen
              ? "bg-[#111113] text-white border-white/30"
              : "bg-[#111113] text-white border-emerald-400 hover:border-white shadow-emerald-950/20"
          }`}
          title={lang === "it" ? "Assistente AI Facilissimo Web" : "Facilissimo Web AI Assistant"}
          aria-label={lang === "it" ? "Apri Assistente Chat AI" : "Open AI Chat Assistant"}
          id="sticky-nuvoletta-chat-btn"
        >
          {isOpen ? (
            <ChevronDown className="w-6 h-6 text-white" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6 text-white" />
              {/* Pulsing Green Online Indicator Badge */}
              <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#111113]"></span>
              </span>
            </>
          )}
        </motion.button>
      </div>
    </>
  );
}
