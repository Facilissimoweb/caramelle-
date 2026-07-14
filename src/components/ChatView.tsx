import { useState, useRef, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, MessageSquare, AlertCircle, RefreshCw, Cpu } from "lucide-react";
import { ChatMessage } from "../types";
const logoImage = "/video/Progetto senza titolo (25).png";

interface ChatViewProps {
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function ChatView({ lang, isFacilitated }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Ciao! Sono **M. Teresa Rogani**, titolare di **Facilissimo Web**. \n\nLavoro da sola come Freelance Web Designer per garantire cura diretta, velocità e prezzi chiari per ciascuno dei clienti di Facilissimo Web. Posso spiegarti come posso aiutarti, illustrarti le proposte di Facilissimo Web (Starter, Professional, Enterprise) e guidarti nel definire il tuo nuovo sito web. \n\nCosa vorresti chiedermi oggi?",
      timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  const quickQuestions = [
    "Quali sono i tempi per il piano AI Professional?",
    "Lavori da sola o hai un team?",
    "Come usi l'Intelligenza Artificiale per ridurre i costi?",
    "Che tipo di supporto tecnico offri?",
  ];

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
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
      // Map existing messages to correct API history format
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
        throw new Error("Errore di connessione al server AI.");
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
          // Keep the last partial line in the buffer
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

                // Update placeholder in real-time
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === aiMessageId ? { ...msg, text: aiText } : msg
                  )
                );
              } catch (e) {
                // Ignore parsing errors for partial/incomplete JSON chunks
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
      setError(err.message || "Impossibile ottenere risposta dal server.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: "welcome-reset",
        role: "model",
        text: "La conversazione è stata reimpostata. Come posso aiutarti ora?",
        timestamp: new Date().toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  // Custom visual markdown renderer to convert simple markdown syntax (bold, bullet lists, newlines) beautifully
  const renderMessageText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, index) => {
      let content: ReactNode = line;

      // Handle simple lists starting with '*' or '-' or '1.'
      const isBullet = line.trim().startsWith("* ") || line.trim().startsWith("- ");
      const isNumbered = /^\d+\.\s/.test(line.trim());

      if (isBullet) {
        const cleanLine = line.trim().substring(2);
        content = (
          <span className="flex items-start gap-2 pl-1">
            <span className="w-1 h-1 bg-[#E35930] mt-2 shrink-0"></span>
            <span>{parseInlineStyles(cleanLine)}</span>
          </span>
        );
      } else if (isNumbered) {
        const dotIndex = line.indexOf(".");
        const num = line.substring(0, dotIndex + 1);
        const cleanLine = line.substring(dotIndex + 1).trim();
        content = (
          <span className="flex items-start gap-2 pl-1">
            <span className="text-[#E35930] font-bold font-mono text-xs mt-0.5 shrink-0">{num}</span>
            <span>{parseInlineStyles(cleanLine)}</span>
          </span>
        );
      } else {
        content = parseInlineStyles(line);
      }

      return (
        <div key={index} className={`${isBullet || isNumbered ? "my-1" : "min-h-[1.25rem]"}`}>
          {content}
        </div>
      );
    });
  };

  // Helper to parse **bold** style inline text
  const parseInlineStyles = (text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      parts.push(
        <strong key={match.index} className="font-bold text-[#E35930]">
          {match[1]}
        </strong>
      );
      lastIndex = boldRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.length > 0 ? parts : text;
  };

  return (
    <div className="w-full bg-[#111113] text-[#F8F7F4]">
      {/* Header Banner */}
      <section className="py-16 text-center border-b border-[rgba(248,247,244,0.1)]">
        <div className="max-w-2xl mx-auto px-6 space-y-3">
          <div className="flex justify-center mb-4">
            <img
              src={logoImage}
              alt="Facilissimo Web Logo"
              className="w-[150px] h-[150px] object-contain"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#E35930] font-mono font-bold block mb-2">
            [ CHAT INTERATTIVA DIRETTA ]
          </span>
          <h1 className="font-tan text-2xl xs:text-3xl font-bold tracking-tight text-[#F8F7F4] sm:text-4xl break-words">
            Parla con Me
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#F8F7F4]/70 max-w-lg mx-auto leading-relaxed">
            Poni domande sul mio metodo, chiedimi una stima dei costi o qualsiasi chiarimento sul funzionamento dei servizi di Facilissimo Web. Ti rispondo all'istante!
          </p>
        </div>
      </section>

      {/* Main Chat Workspace */}
      <section className="py-12 bg-[#111113]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Info & Quick Actions */}
          <div className="lg:col-span-4 space-y-6 lg:h-[650px] flex flex-col">
            <div className="bg-[#151518] p-6 border border-[rgba(248,247,244,0.1)] space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#E35930]" />
                <h3 className="font-display font-bold text-xs text-[#F8F7F4] uppercase tracking-widest">
                  Tecnologia di Supporto
                </h3>
              </div>
              <p className="text-xs text-[#F8F7F4]/70 leading-relaxed font-sans">
                Questa chat interattiva risponde istantaneamente grazie a un modello AI addestrato sul mio manuale operativo, sulle mie tariffe e sulla filosofia di **Facilissimo Web**.
              </p>
            </div>

            {/* Quick Questions list */}
            <div className="flex-1 bg-[#151518] p-6 border border-[rgba(248,247,244,0.1)] space-y-4 flex flex-col">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#F8F7F4] font-mono flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#E35930]" />
                Domande Rapide
              </h4>
              <p className="text-[11px] text-[#F8F7F4]/60 font-sans">
                Clicca su una delle domande frequenti preparate per te per ricevere subito una risposta dettagliata:
              </p>
              <div className="flex flex-col gap-2 pt-2 flex-1 overflow-y-auto">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSendMessage(q)}
                    disabled={loading}
                    className="text-left text-xs bg-[#111113] hover:bg-[#151518] border border-[rgba(248,247,244,0.1)] p-3 rounded-none text-[#F8F7F4] hover:text-[#E35930] hover:border-[#E35930]/40 transition-all cursor-pointer font-medium font-sans"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={clearChat}
              className="w-full py-3 border border-[rgba(248,247,244,0.15)] hover:border-[#E35930] text-[#F8F7F4]/70 hover:text-[#E35930] text-xs font-mono tracking-widest uppercase rounded-none transition-all flex items-center justify-center gap-2 cursor-pointer bg-transparent"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Reimposta Conversazione
            </button>
          </div>

          {/* Right panel: Chat Screen */}
          <div className="lg:col-span-8 bg-[#151518] border border-[rgba(248,247,244,0.1)] overflow-hidden flex flex-col h-[650px]">
            {/* Top Workspace Bar */}
            <div className="bg-[#111113] border-b border-[rgba(248,247,244,0.1)] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 bg-[#E35930] relative">
                  <span className="absolute inset-0 w-full h-full bg-[#E35930] animate-ping opacity-30"></span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-[#F8F7F4] leading-none">
                    M. Teresa Rogani
                  </h3>
                  <p className="text-[9px] text-[#E35930] font-mono mt-1 uppercase tracking-widest">
                    FACILISSIMO WEB
                  </p>
                </div>
              </div>
              <span className="text-[9px] border border-[#E35930]/20 text-[#E35930] px-2.5 py-1 font-mono font-bold uppercase tracking-widest">
                Disponibile
              </span>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
                      <div className={`max-w-[85%] space-y-1`}>
                        <div
                          className={`p-4 rounded-none text-xs sm:text-sm font-sans leading-relaxed ${
                            isModel
                              ? "bg-[#111113] text-[#F8F7F4] border border-[rgba(248,247,244,0.1)] shadow-sm"
                              : "bg-[#E35930] text-[#111113] font-medium"
                          }`}
                        >
                          <div className="space-y-1">{renderMessageText(m.text)}</div>
                        </div>
                        <div
                          className={`text-[9px] font-mono text-[#F8F7F4]/40 px-1 flex ${
                            isModel ? "justify-start" : "justify-end"
                          }`}
                        >
                          {m.timestamp}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Typing State */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#111113] p-4 rounded-none border border-[rgba(248,247,244,0.1)] flex items-center gap-2 shadow-sm">
                    <span className="text-xs font-mono text-[#F8F7F4]/60 italic">
                      Sto scrivendo...
                    </span>
                    <span className="flex gap-1">
                      <span className="w-1 h-1 bg-[#E35930] animate-bounce delay-100"></span>
                      <span className="w-1 h-1 bg-[#E35930] animate-bounce delay-200"></span>
                      <span className="w-1 h-1 bg-[#E35930] animate-bounce delay-300"></span>
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Error messages block */}
              {error && (
                <div className="p-3 border border-[#A31D1D] bg-[#FCE8E6] text-[#5A0004] text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Chat form control input */}
            <div className="bg-[#111113] border-t border-[rgba(248,247,244,0.1)] p-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(input);
                }}
                className="flex gap-2.5"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  placeholder="Scrivi una domanda... (es. Come posso prenotare una call?)"
                  className="flex-1 px-4 py-3 border border-[rgba(248,247,244,0.15)] rounded-none text-xs text-[#F8F7F4] placeholder-[#F8F7F4]/40 focus:outline-none focus:border-[#E35930] bg-transparent transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="p-3 bg-[#E35930] hover:bg-transparent hover:text-[#E35930] text-[#111113] rounded-none transition-all flex items-center justify-center shrink-0 disabled:opacity-40 cursor-pointer border border-[#E35930]"
                  id="chat-send-btn"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

