import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, MessageSquare, AlertCircle, RefreshCw, Cpu, Sparkles } from "lucide-react";
import { ChatMessage } from "../types";

const API_BASE = (import.meta as any).env?.REACT_APP_BACKEND_URL || (process.env as any).REACT_APP_BACKEND_URL || "";

export default function ChatView() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Ciao! Sono l'assistente virtuale di **Facilissimo Web**. \n\nPosso aiutarti a capire come lavora **M. Teresa Rogani**, spiegarti i dettagli delle proposte (Starter, Professional, Enterprise) e guidarti nella definizione degli obiettivi per il tuo nuovo sito web. \n\nCosa vorresti chiedermi oggi?",
      timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [sessionId] = useState<string>(() => Math.random().toString(36).slice(2));
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "Quali sono i tempi per il piano AI Professional?",
    "Teresa lavora da sola o c'è un team?",
    "Come l'AI riduce i costi?",
    "Che tipo di supporto tecnico è incluso?",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      const history = messages.map((m) => ({ role: m.role, text: m.text }));
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend, history, session_id: sessionId }),
      });

      if (!res.ok) throw new Error("Errore di connessione al server AI.");
      const data = await res.json();

      const aiMessage: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: "model",
        text: data.text,
        timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err: any) {
      setError(err.message || "Impossibile ottenere risposta dal server.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      id: "welcome-reset",
      role: "model",
      text: "Conversazione reimpostata. Come posso aiutarti ora?",
      timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
    }]);
  };

  const renderMessageText = (text: string) => {
    return text.split("\n").map((line, index) => {
      let content: ReactNode = line;
      const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
      const isNumbered = /^\d+\.\s/.test(line.trim());

      if (isBullet) {
        content = (
          <span className="flex items-start gap-2 pl-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-[#4ff5ff] to-[#ff5fd4] mt-2 shrink-0" />
            <span>{parseInline(line.trim().substring(2))}</span>
          </span>
        );
      } else if (isNumbered) {
        const dotIdx = line.indexOf(".");
        content = (
          <span className="flex items-start gap-2 pl-1">
            <span className="holo-text font-bold font-mono-tech text-sm mt-0.5 shrink-0">{line.substring(0, dotIdx + 1)}</span>
            <span>{parseInline(line.substring(dotIdx + 1).trim())}</span>
          </span>
        );
      } else {
        content = parseInline(line);
      }
      return <div key={index} className={isBullet || isNumbered ? "my-1" : "min-h-[1.25rem]"}>{content}</div>;
    });
  };

  const parseInline = (text: string) => {
    const parts: ReactNode[] = [];
    const regex = /\*\*(.*?)\*\*/g;
    let last = 0; let m;
    while ((m = regex.exec(text)) !== null) {
      if (m.index > last) parts.push(text.substring(last, m.index));
      parts.push(<strong key={m.index} className="holo-text font-bold">{m[1]}</strong>);
      last = regex.lastIndex;
    }
    if (last < text.length) parts.push(text.substring(last));
    return parts.length ? parts : text;
  };

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="section py-16 text-center" data-testid="chat-hero">
        <div className="max-w-2xl mx-auto px-6 space-y-3">
          <span className="holo-tag inline-flex">// AI CONSULTANCY</span>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white tracking-tight">
            Assistente <span className="holo-text">Virtuale AI</span>
          </h1>
          <p className="text-[#f2ecff]/70 leading-relaxed">
            Poni domande sul metodo di Teresa, stima i costi o chiedi chiarimenti sui servizi. Risposta istantanea.
          </p>
        </div>
      </section>

      {/* CHAT WORKSPACE */}
      <section className="section pb-24" data-testid="chat-workspace">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-5">
            <div className="holo-panel p-6 space-y-4">
              <span className="sheen" />
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#4ff5ff]" />
                <h3 className="font-display font-bold text-sm text-white uppercase tracking-widest">
                  Engine · <span className="holo-text">Claude 4.6</span>
                </h3>
              </div>
              <p className="text-sm text-[#f2ecff]/70 leading-relaxed">
                Alimentato dal modello <strong className="holo-text">Anthropic Claude Sonnet 4.6</strong> configurato con il manuale operativo di Facilissimo Web.
              </p>
            </div>

            <div className="holo-panel p-6 space-y-4">
              <span className="sheen" />
              <h4 className="text-[10px] font-bold uppercase tracking-widest holo-text font-mono-tech flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#4ff5ff]" /> Domande Rapide
              </h4>
              <div className="flex flex-col gap-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    disabled={loading}
                    className="text-left text-sm bg-white/5 hover:bg-gradient-to-r hover:from-[#4ff5ff]/10 hover:to-[#ff5fd4]/10 border border-[rgba(180,160,255,0.15)] hover:border-[#b26bff]/60 p-3 rounded-xl text-[#f2ecff]/80 hover:text-white transition-all cursor-pointer"
                    data-testid={`quick-question-${q.slice(0,10)}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={clearChat}
              className="btn-ghost w-full justify-center"
              data-testid="reset-chat-btn"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reimposta
            </button>
          </div>

          {/* Chat Screen */}
          <div className="lg:col-span-8 holo-panel !rounded-3xl overflow-hidden flex flex-col h-[680px]">
            <span className="sheen" />
            <div className="border-b border-[rgba(180,160,255,0.14)] px-6 py-4 flex items-center justify-between bg-gradient-to-r from-[#4ff5ff]/5 via-[#b26bff]/5 to-[#ff5fd4]/5">
              <div className="flex items-center gap-3">
                <span className="pulse-dot" />
                <div>
                  <h3 className="font-display font-bold text-base text-white leading-none">Virtual Assistant</h3>
                  <p className="text-[10px] holo-text font-mono-tech mt-1 uppercase tracking-widest font-bold">
                    FACILISSIMO ENGINE · ATTIVO
                  </p>
                </div>
              </div>
              <span className="holo-tag">
                <Sparkles className="w-3 h-3" /> AI
              </span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5" data-testid="chat-messages">
              <AnimatePresence initial={false}>
                {messages.map((m) => {
                  const isModel = m.role === "model";
                  return (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${isModel ? "justify-start" : "justify-end"}`}
                    >
                      <div className="max-w-[85%] space-y-1">
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          isModel
                            ? "holo-panel !rounded-2xl text-[#f2ecff]"
                            : "bg-gradient-to-r from-[#4ff5ff] via-[#b26bff] to-[#ff5fd4] text-[#05030d] font-medium shadow-[0_8px_30px_-8px_rgba(178,107,255,0.6)]"
                        }`}>
                          {isModel && <span className="sheen" />}
                          <div className="space-y-1 relative">{renderMessageText(m.text)}</div>
                        </div>
                        <div className={`text-[9px] font-mono-tech text-[#f2ecff]/40 px-1 flex ${isModel ? "justify-start" : "justify-end"}`}>
                          {m.timestamp}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="holo-panel !rounded-2xl p-4 flex items-center gap-3">
                    <span className="sheen" />
                    <span className="text-sm font-mono-tech text-[#f2ecff]/70 italic">Teresa AI sta scrivendo</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4ff5ff] animate-bounce" style={{animationDelay:'0ms'}} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#b26bff] animate-bounce" style={{animationDelay:'150ms'}} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ff5fd4] animate-bounce" style={{animationDelay:'300ms'}} />
                    </span>
                  </div>
                </motion.div>
              )}

              {error && (
                <div className="p-3 rounded-xl border border-[#ff5fd4]/40 bg-[#ff5fd4]/10 text-[#ffbdec] text-xs font-mono-tech flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> <span>{error}</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            <div className="border-t border-[rgba(180,160,255,0.14)] p-4 bg-[#05030d]/40">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="flex gap-2.5">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  placeholder="Scrivi una domanda..."
                  className="holo-input flex-1"
                  data-testid="chat-input"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="btn-holo !p-4 !aspect-square disabled:opacity-40"
                  data-testid="chat-send-btn"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
