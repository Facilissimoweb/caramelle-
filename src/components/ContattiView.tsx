import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Send, Calendar, CheckCircle, Database, FileText, MapPin, Phone } from "lucide-react";
import { ContactSubmission } from "../types";
const logoImage = "/images/logo_Facilissimo web siti web professionali (1).png";

interface ContattiViewProps {
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function ContattiView({ lang, isFacilitated }: ContattiViewProps) {
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const bgImages = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&q=80&w=1920",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "Multi-page (AI Professional)",
    budget: "1000€ - 2000€",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState<boolean | null>(null);
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  // Fetch registered submissions to prove actual backend integration
  const fetchSubmissions = async () => {
    try {
      const res = await fetch("/api/contact/submissions");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.error("Errore fetch submissions:", err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Qualcosa è andato storto.");
      }

      const data = await res.json();
      setSuccess(true);
      setEmailSent(data.emailSent || false);
      setFormData({
        name: "",
        email: "",
        company: "",
        projectType: "Multi-page (AI Professional)",
        budget: "1000€ - 2000€",
        message: "",
      });
      // Refresh database records
      fetchSubmissions();
    } catch (err: any) {
      setError(err.message || "Impossibile inviare la richiesta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-[#111113] text-[#F8F7F4]">
      {/* Header Banner */}
      <section className="py-24 text-center relative border-b border-[rgba(248,247,244,0.1)] overflow-hidden">
        {/* Ambient Background Slideshow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {bgImages.map((imgUrl, idx) => (
            <div
              key={imgUrl}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ${
                idx === currentBgIndex ? "opacity-40 scale-100" : "opacity-0 scale-105"
              }`}
              style={{
                backgroundImage: `url(${imgUrl})`,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111113]/90 via-[#111113]/80 to-[#111113]/90" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111113]/30 via-transparent to-[#111113]" />
        </div>

        <div className="max-w-2xl mx-auto px-6 space-y-4 relative z-10">
          <div className="flex justify-center mb-4">
            <img
              src={logoImage}
              alt="Facilissimo Web Logo"
              className="w-[150px] h-[150px] object-contain"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#E35930] font-mono font-bold block mb-2">
            [ DISEGNA IL TUO FUTURO ]
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-[#F8F7F4] sm:text-5xl">
            Entra in Contatto
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#F8F7F4]/70 leading-relaxed">
            Hai un'idea per il tuo sito web? Scrivimi. Analizzerò i tuoi requisiti e ti risponderò direttamente con una proposta dedicata.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-24 bg-[#111113]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-display text-2xl font-bold text-[#F8F7F4]">
                Perché Scrivermi?
              </h3>
              <p className="text-xs sm:text-sm text-[#F8F7F4]/70 leading-relaxed font-sans">
                Non dovrai parlare con venditori o assistenti commerciali. Analizzo personalmente ogni richiesta per offrirti la massima trasparenza tecnica e stilistica fin dal primo scambio.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 border border-[rgba(248,247,244,0.1)] flex items-center justify-center text-[#E35930] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-mono font-bold text-[#E35930] mb-1">
                    Email Diretta
                  </h4>
                  <a
                    href="mailto:facilissimoweb.mc@gmail.com"
                    className="text-sm text-[#F8F7F4] hover:underline font-mono"
                  >
                    facilissimoweb.mc@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 border border-[rgba(248,247,244,0.1)] flex items-center justify-center text-[#E35930] shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-mono font-bold text-[#E35930] mb-1">
                    Telefono / WhatsApp
                  </h4>
                  <a
                    href="tel:+393793603321"
                    className="text-sm text-[#F8F7F4] hover:underline font-mono"
                  >
                    +39 379 360 3321
                  </a>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 border border-[rgba(248,247,244,0.1)] flex items-center justify-center text-[#E35930] shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-mono font-bold text-[#E35930] mb-1">
                    Operatività
                  </h4>
                  <p className="text-sm text-[#F8F7F4]/70">
                    Macerata (Marche, Italia) — Collaborazioni e consulenze attive di persona sul territorio ed in video-call in tutta Italia.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 border border-[rgba(248,247,244,0.1)] flex items-center justify-center text-[#E35930] shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest font-mono font-bold text-[#E35930] mb-1">
                    Risposta Garantita
                  </h4>
                  <p className="text-sm text-[#F8F7F4]/70">
                    Entro 24 ore lavorative riceverai un'analisi di prefattibilità gratuita direttamente nella tua casella di posta.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#151518] p-6 border border-[rgba(248,247,244,0.1)] space-y-3">
              <div className="flex items-center gap-2 text-[#F8F7F4] font-bold text-sm">
                <span className="w-1.5 h-1.5 bg-[#E35930]"></span>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold">Consulenza AI Assistita</span>
              </div>
              <p className="text-xs text-[#F8F7F4]/70 leading-relaxed">
                Puoi anche consultare la sezione **Chat AI** per parlare subito con il mio assistente virtuale addestrato per spiegarti ogni dettaglio su tariffe, tempi e integrazioni tecnologiche!
              </p>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-7">
            <div className="bg-[#151518] p-8 md:p-10 border border-[rgba(248,247,244,0.1)] relative">
              
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-12 h-12 border border-[rgba(248,247,244,0.15)] text-[#E35930] flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-[#F8F7F4]">
                      Richiesta Inviata con Successo!
                    </h3>
                    <p className="text-xs sm:text-sm text-[#F8F7F4]/70 max-w-md mx-auto leading-relaxed">
                      Grazie per avermi scritto. Ho registrato la tua richiesta nel sistema. Ti risponderò via email entro poche ore per fissare una video-call conoscitiva gratuita.
                    </p>
                    <div className="pt-2">
                      {emailSent ? (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 uppercase tracking-wider bg-emerald-950/40 border border-emerald-800 px-3 py-1 mt-2">
                          ● Email recapitata con successo a facilissimoweb.mc@gmail.com
                        </span>
                      ) : (
                        <div className="space-y-1.5 mt-2">
                          <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-amber-400 uppercase tracking-wider bg-amber-950/40 border border-amber-800 px-3 py-1">
                            ▲ Richiesta salvata nel database (SMTP non configurato)
                          </span>
                          <p className="text-[10px] text-[#F8F7F4]/50 max-w-md mx-auto">
                            Per abilitare l'invio reale a <strong>facilissimoweb.mc@gmail.com</strong>, configura <code>SMTP_USER</code> e <code>SMTP_PASS</code> nelle impostazioni (Secrets) di AI Studio.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="px-8 py-4 bg-[#E35930] text-[#111113] font-bold text-xs uppercase tracking-widest hover:bg-transparent hover:text-[#E35930] transition-all cursor-pointer border border-[#E35930]"
                  >
                    Invia un altro messaggio
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 border border-[#A31D1D] bg-[#FCE8E6] text-[#5A0004] text-xs font-mono">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="block text-[10px] font-bold uppercase tracking-widest text-[#F8F7F4] font-mono">
                        Nome &amp; Cognome *
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Inserisci il tuo nome"
                        className="w-full px-4 py-3 border border-[rgba(248,247,244,0.15)] rounded-none text-sm bg-[#111113] text-[#F8F7F4] focus:outline-none focus:border-[#E35930] transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-[#F8F7F4] font-mono">
                        Indirizzo Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="nome@azienda.it"
                        className="w-full px-4 py-3 border border-[rgba(248,247,244,0.15)] rounded-none text-sm bg-[#111113] text-[#F8F7F4] focus:outline-none focus:border-[#E35930] transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="company" className="block text-[10px] font-bold uppercase tracking-widest text-[#F8F7F4] font-mono">
                        Nome Azienda (Opzionale)
                      </label>
                      <input
                        type="text"
                        name="company"
                        id="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="La tua attività"
                        className="w-full px-4 py-3 border border-[rgba(248,247,244,0.15)] rounded-none text-sm bg-[#111113] text-[#F8F7F4] focus:outline-none focus:border-[#E35930] transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="projectType" className="block text-[10px] font-bold uppercase tracking-widest text-[#F8F7F4] font-mono">
                        Tipo di Progetto *
                      </label>
                      <select
                        name="projectType"
                        id="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-[rgba(248,247,244,0.15)] rounded-none text-sm bg-[#111113] text-[#F8F7F4] focus:outline-none focus:border-[#E35930] transition-all"
                      >
                        <option>One-Page (AI Starter)</option>
                        <option>Multi-page (AI Professional)</option>
                        <option>E-commerce o Custom (AI Enterprise)</option>
                        <option>Altra richiesta personalizzata</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budget" className="block text-[10px] font-bold uppercase tracking-widest text-[#F8F7F4] font-mono">
                      Budget Stimato *
                    </label>
                    <select
                      name="budget"
                      id="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-[rgba(248,247,244,0.15)] rounded-none text-sm bg-[#111113] text-[#F8F7F4] focus:outline-none focus:border-[#E35930] transition-all"
                    >
                      <option>Sotto 1.000€</option>
                      <option>1.000€ - 2.000€</option>
                      <option>2.000€ - 4.000€</option>
                      <option>Oltre 4.000€</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-[10px] font-bold uppercase tracking-widest text-[#F8F7F4] font-mono">
                      Dettagli del Progetto *
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Parlami dei tuoi obiettivi, dei servizi che offri e di come immagini il tuo nuovo sito..."
                      className="w-full px-4 py-3 border border-[rgba(248,247,244,0.15)] rounded-none text-sm bg-[#111113] text-[#F8F7F4] focus:outline-none focus:border-[#E35930] transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-[#E35930] text-[#111113] hover:bg-transparent hover:text-[#E35930] font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#E35930] disabled:opacity-50"
                  >
                    {loading ? "Invio in corso..." : "Invia Messaggio"}
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Submissions log (Durable verification dashboard) */}
      <section className="py-24 bg-[#151518] border-t border-[rgba(248,247,244,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-8">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-[#E35930]" />
            <h3 className="font-display text-xl font-bold text-[#F8F7F4]">
              Registro Richieste Recenti (In Tempo Reale)
            </h3>
          </div>

          <p className="text-[10px] text-[#F8F7F4]/60 max-w-2xl font-mono uppercase tracking-wide">
            Questo blocco si aggiorna istantaneamente interrogando le API di Facilissimo Web per dimostrare il corretto funzionamento dell'invio e della persistenza della tua richiesta.
          </p>

          {submissions.length === 0 ? (
            <div className="bg-[#111113] p-8 border border-[rgba(248,247,244,0.1)] text-center text-xs text-[#F8F7F4]/60 font-mono tracking-wider uppercase">
              Nessuna richiesta ancora registrata. Compila il modulo sopra per vederla apparire qui sotto!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {submissions.map((sub) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#111113] p-6 border border-[rgba(248,247,244,0.1)] space-y-3 transition-all hover:border-[#E35930]/40"
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-bold text-sm text-[#F8F7F4] truncate max-w-[150px]">
                      {sub.name}
                    </span>
                    <span className="text-[9px] font-mono border border-[rgba(248,247,244,0.15)] text-[#E35930] px-2 py-0.5 uppercase">
                      ID: {sub.id}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-[#F8F7F4]/70 space-y-1">
                    <p className="truncate">Email: {sub.email}</p>
                    {sub.company && <p className="truncate">Azienda: {sub.company}</p>}
                    <p className="text-[#F8F7F4] font-semibold">Budget: {sub.budget}</p>
                    <p className="text-[#E35930] font-bold">Tipo: {sub.projectType}</p>
                  </div>

                  <div className="pt-2 border-t border-[rgba(248,247,244,0.1)]">
                    <div className="flex gap-1.5 items-start text-xs text-[#F8F7F4]/80 italic">
                      <FileText className="w-3.5 h-3.5 text-[#E35930] shrink-0 mt-0.5" />
                      <p className="line-clamp-2 leading-relaxed">"{sub.message}"</p>
                    </div>
                  </div>
                  <div className="text-[9px] font-mono text-[#F8F7F4]/50 text-right">
                    {new Date(sub.date).toLocaleDateString("it-IT", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

