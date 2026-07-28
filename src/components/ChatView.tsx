import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, ArrowRight, RefreshCw, Volume2, Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatViewProps {
  lang: "it" | "en";
  isFacilitated?: boolean;
  setCurrentTab: (tab: string) => void;
}

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: string;
}

export const ChatView: React.FC<ChatViewProps> = ({ lang, isFacilitated, setCurrentTab }) => {
  const initialMessage: Message = {
    id: "welcome",
    role: "model",
    text: lang === "it"
      ? "Ciao! Sono l'**Assistente Virtuale AI di Facilissimo Web**.\n\nSono qui per fornirti informazioni immediate sui nostri servizi di web design, sviluppo siti web ed e-commerce ed applicazioni web custom.\n\nPuoi chiedermi dettagli sul nostro metodo di lavoro, sulla SEO assistita da Intelligenza Artificiale o richiedere una prima stima indicativa del tuo progetto. Come posso aiutarti oggi?"
      : "Hello! I am the **AI Virtual Assistant for Facilissimo Web**.\n\nI am here to provide instant answers about our web design services, e-commerce development, and custom web application solutions.\n\nFeel free to ask about our build criteria, AI-driven SEO, or get an initial estimate for your project. How can I help you today?",
    timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
  };

  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips = lang === "it" ? [
    "Quali sono i costi per un sito e-commerce?",
    "Come funziona la SEO guidata dall'IA?",
    "Quali sono i tempi medi di consegna?",
    "In cosa consiste lo sviluppo di una Web App custom?"
  ] : [
    "What are the costs for an e-commerce site?",
    "How does AI-assisted SEO work?",
    "What is the average delivery time?",
    "What is custom web application development?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substring(2, 9),
      role: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput("");
    setIsLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history, lang }),
      });

      if (!res.ok) throw new Error("Errore durante la comunicazione con il server.");

      if (res.headers.get("content-type")?.includes("text/event-stream")) {
        const reader = res.body?.getReader();
        const decoder = new TextDecoder("utf-[#111113]");
        if (!reader) throw new Error("Stream non disponibile");

        let aiText = "";
        const aiMessageId = Math.random().toString(36).substring(2, 9);
        const placeholderMessage: Message = {
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
              if (dataStr === "[DONE]") break;
              try {
                const parsed = JSON.parse(dataStr);
                aiText += parsed.text || "";
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
        const aiMessage: Message = {
          id: Math.random().toString(36).substring(2, 9),
          role: "model",
          text: data.text,
          timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substring(2, 9),
          role: "model",
          text: lang === "it"
            ? "Si è verificato un temporaneo problema di connessione. Puoi scriverci direttamente dalla pagina Contatti per un preventivo rapido."
            : "A temporary connection issue occurred. You can write to us directly from the Contact page for a fast quote.",
          timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const cleanText = text.replace(/[*_#`[\]()]/g, "");
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = lang === "it" ? "it-IT" : "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#F8F7F4] text-[#111113]">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        
        {/* Page Header */}
        <div className="mb-8 pb-6 border-b border-[#111113]/10 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111113] text-[#FAF9F6] text-xs font-mono uppercase tracking-widest font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {lang === "it" ? "Assistente Virtuale AI" : "AI Virtual Assistant"}
            </div>
            <h1 className="font-display font-black text-3xl md:text-4xl text-[#111113] tracking-tight">
              {lang === "it" ? "Chat Interattiva Facilissimo Web" : "Facilissimo Web Interactive Chat"}
            </h1>
            <p className="text-[#111113]/70 font-sans text-sm md:text-base mt-2">
              {lang === "it" 
                ? "Fai qualsiasi domanda su costi, tempi di sviluppo, SEO ed architettura del tuo futuro sito web." 
                : "Ask any questions regarding pricing, timeline, SEO, and web architecture for your upcoming project."}
            </p>
          </div>

          <button
            onClick={() => setCurrentTab("contatti")}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#111113] text-[#FAF9F6] font-mono text-xs uppercase tracking-wider font-bold hover:bg-black transition-colors"
          >
            {lang === "it" ? "Richiedi Preventivo" : "Request Quote"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="mb-6">
          <p className="text-xs font-mono uppercase tracking-widest text-[#111113]/50 font-bold mb-3">
            {lang === "it" ? "Domande frequenti consigliate:" : "Suggested questions:"}
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestionChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip)}
                disabled={isLoading}
                className="text-xs font-sans bg-white border border-[#111113]/15 px-3.5 py-2 hover:bg-[#111113] hover:text-white transition-all text-left shadow-sm font-medium"
              >
                {chip}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window Container */}
        <div className="bg-white border border-[#111113]/15 shadow-xl flex flex-col h-[600px] rounded-none overflow-hidden">
          
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 md:gap-4 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "model" && (
                  <div className="w-9 h-9 shrink-0 bg-[#111113] text-white flex items-center justify-center shadow-md">
                    <Bot className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] md:max-w-[75%] p-4 space-y-2 relative group ${
                    msg.role === "user"
                      ? "bg-[#111113] text-white"
                      : "bg-[#F8F7F4] text-[#111113] border border-[#111113]/10"
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono opacity-60 pb-1 border-b border-current/10">
                    <span className="font-bold">
                      {msg.role === "user" 
                        ? (lang === "it" ? "TU" : "YOU") 
                        : "FACILISSIMO WEB AI"}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="text-sm font-sans leading-relaxed prose prose-sm max-w-none prose-p:my-1 prose-strong:font-bold">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>

                  {msg.role === "model" && (
                    <div className="pt-2 flex items-center justify-end gap-2 text-xs font-mono opacity-70">
                      <button
                        onClick={() => speakText(msg.text)}
                        title="Ascolta"
                        className="p-1 hover:text-black transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(msg.text, msg.id)}
                        title="Copia"
                        className="p-1 hover:text-black transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-green-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {msg.role === "user" && (
                  <div className="w-9 h-9 shrink-0 bg-neutral-200 text-[#111113] flex items-center justify-center">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start items-center text-xs font-mono text-[#111113]/60 pl-2">
                <div className="w-8 h-8 bg-[#111113] text-white flex items-center justify-center animate-spin">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <span>{lang === "it" ? "L'AI sta elaborando la risposta..." : "AI is generating a response..."}</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 bg-[#F8F7F4] border-t border-[#111113]/10">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                  lang === "it"
                    ? "Scrivi un messaggio o chiedi un preventivo indicativo..."
                    : "Type a message or ask for an estimated quote..."
                }
                className="flex-1 bg-white border border-[#111113]/20 px-4 py-3 text-sm font-sans focus:outline-none focus:border-black"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-6 py-3 bg-[#111113] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-black disabled:opacity-50 transition-colors flex items-center gap-2"
              >
                <span>{lang === "it" ? "Invia" : "Send"}</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="mt-2 text-[11px] font-mono text-[#111113]/50 text-center flex items-center justify-center gap-2">
              <Sparkles className="w-3 h-3 text-amber-500" />
              <span>{lang === "it" ? "Assistente AI addestrato sui servizi di Facilissimo Web" : "AI Assistant trained on Facilissimo Web services"}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
