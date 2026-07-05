import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Send, Calendar, CheckCircle, Database, FileText, MapPin, Sparkles } from "lucide-react";
import { ContactSubmission } from "../types";

const API_BASE = (import.meta as any).env?.REACT_APP_BACKEND_URL || (process.env as any).REACT_APP_BACKEND_URL || "";

export default function ContattiView() {
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
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);

  const fetchSubmissions = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/contact/submissions`);
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || data.error || "Qualcosa è andato storto.");
      }
      setSuccess(true);
      setFormData({
        name: "", email: "", company: "",
        projectType: "Multi-page (AI Professional)",
        budget: "1000€ - 2000€", message: "",
      });
      fetchSubmissions();
    } catch (err: any) {
      setError(err.message || "Impossibile inviare la richiesta.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="section py-24 text-center" data-testid="contact-hero">
        <div className="max-w-3xl mx-auto px-6 space-y-4">
          <span className="holo-tag inline-flex">// DISEGNA IL FUTURO</span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white tracking-tight">
            Entriamo in <span className="holo-text">contatto</span>
          </h1>
          <p className="text-[#f2ecff]/70 max-w-lg mx-auto">
            Hai un'idea? Scrivimi. Analizzerò i requisiti e ti risponderò con una proposta dedicata.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="section pb-24" data-testid="contact-form-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Info side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <h3 className="font-display text-2xl font-bold text-white">Perché scrivermi?</h3>
              <p className="text-sm text-[#f2ecff]/70 leading-relaxed">
                Non parlerai con venditori. Analizzo personalmente ogni richiesta per la massima trasparenza tecnica.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { icon: <Mail className="w-4 h-4" />, label: "EMAIL DIRETTA", value: "mariateresarogani@gmail.com", href: "mailto:mariateresarogani@gmail.com" },
                { icon: <MapPin className="w-4 h-4" />, label: "OPERATIVITÀ", value: "Milano · Italia — Collaborazioni Europee via video-call." },
                { icon: <Calendar className="w-4 h-4" />, label: "RISPOSTA", value: "Entro 24 ore lavorative con analisi gratuita di prefattibilità." },
              ].map((item, i) => (
                <div key={i} className="holo-panel p-5 flex gap-4 items-start">
                  <span className="sheen" />
                  <div className="icon-holo !w-10 !h-10 shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-[10px] holo-text font-mono-tech font-bold tracking-widest">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-white hover:text-[#4ff5ff] font-mono-tech mt-1 block break-all">{item.value}</a>
                    ) : (
                      <p className="text-sm text-[#f2ecff]/70 mt-1">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="holo-panel !rounded-2xl p-5">
              <span className="sheen" />
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-[#4ff5ff]" />
                <span className="text-[10px] holo-text font-mono-tech font-bold tracking-widest uppercase">Consulenza AI</span>
              </div>
              <p className="text-sm text-[#f2ecff]/70 leading-relaxed">
                Consulta la sezione <strong className="holo-text">Chat AI</strong> per parlare subito con il mio assistente virtuale su tariffe, tempi e integrazioni.
              </p>
            </div>
          </div>

          {/* Form side */}
          <div className="lg:col-span-7">
            <div className="holo-panel !rounded-3xl p-8 md:p-10 relative">
              <span className="sheen" />
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8 space-y-5"
                  data-testid="contact-success"
                >
                  <div className="icon-holo mx-auto !w-14 !h-14">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white">
                    Richiesta <span className="holo-text">inviata!</span>
                  </h3>
                  <p className="text-sm text-[#f2ecff]/75 max-w-md mx-auto leading-relaxed">
                    Ho registrato la tua richiesta. Ti risponderò via email entro poche ore per fissare una video-call gratuita.
                  </p>
                  <button onClick={() => setSuccess(false)} className="btn-holo" data-testid="send-another-btn">
                    Invia un altro messaggio
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5" data-testid="contact-form">
                  {error && (
                    <div className="p-4 rounded-xl border border-[#ff5fd4]/40 bg-[#ff5fd4]/10 text-[#ffbdec] text-sm font-mono-tech" data-testid="contact-error">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Nome & Cognome *" name="name" value={formData.name} onChange={handleChange} placeholder="Il tuo nome" required />
                    <FormField label="Email *" name="email" value={formData.email} onChange={handleChange} placeholder="nome@azienda.it" type="email" required />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label="Azienda (opz.)" name="company" value={formData.company} onChange={handleChange} placeholder="La tua attività" />
                    <div className="space-y-2">
                      <label className="block text-[10px] holo-text font-bold uppercase tracking-widest font-mono-tech">Tipo di Progetto *</label>
                      <select name="projectType" value={formData.projectType} onChange={handleChange} className="holo-input" data-testid="project-type-select">
                        <option>One-Page (AI Starter)</option>
                        <option>Multi-page (AI Professional)</option>
                        <option>E-commerce o Custom (AI Enterprise)</option>
                        <option>Altra richiesta personalizzata</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] holo-text font-bold uppercase tracking-widest font-mono-tech">Budget stimato *</label>
                    <select name="budget" value={formData.budget} onChange={handleChange} className="holo-input" data-testid="budget-select">
                      <option>Sotto 1.000€</option>
                      <option>1.000€ - 2.000€</option>
                      <option>2.000€ - 4.000€</option>
                      <option>Oltre 4.000€</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] holo-text font-bold uppercase tracking-widest font-mono-tech">Dettagli del Progetto *</label>
                    <textarea name="message" required rows={4} value={formData.message} onChange={handleChange}
                      placeholder="Parlami dei tuoi obiettivi, dei servizi e di come immagini il nuovo sito..."
                      className="holo-input resize-none" data-testid="message-textarea" />
                  </div>

                  <button type="submit" disabled={loading} className="btn-holo w-full justify-center disabled:opacity-50" data-testid="submit-contact-btn">
                    {loading ? "Invio in corso..." : "Invia Messaggio"} <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* SUBMISSIONS */}
      <section className="section py-24" data-testid="submissions-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10 space-y-8">
          <div className="flex items-center gap-3">
            <div className="icon-holo"><Database className="w-5 h-5" /></div>
            <div>
              <h3 className="font-display text-2xl font-bold text-white">Registro <span className="holo-text">Real-Time</span></h3>
              <p className="text-[10px] text-[#f2ecff]/50 font-mono-tech tracking-widest uppercase mt-1">
                Aggiornato in diretta dal server per dimostrare la persistenza dei dati.
              </p>
            </div>
          </div>

          {submissions.length === 0 ? (
            <div className="holo-panel !rounded-2xl p-10 text-center">
              <span className="sheen" />
              <p className="text-sm text-[#f2ecff]/60 font-mono-tech tracking-wider uppercase">
                Nessuna richiesta ancora registrata. Compila il modulo per vederla qui!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {submissions.map((sub) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="holo-panel p-6 space-y-3"
                  data-testid={`submission-card-${sub.id}`}
                >
                  <span className="sheen" />
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-bold text-white truncate max-w-[150px]">{sub.name}</span>
                    <span className="holo-tag !text-[9px] !py-1 !px-2">ID:{sub.id}</span>
                  </div>
                  <div className="text-xs font-mono-tech text-[#f2ecff]/70 space-y-1">
                    <p className="truncate">✉ {sub.email}</p>
                    {sub.company && <p className="truncate">🏢 {sub.company}</p>}
                    <p className="text-white">💰 <span className="holo-text font-bold">{sub.budget}</span></p>
                    <p><span className="text-[#4ff5ff]">▸</span> {sub.projectType}</p>
                  </div>
                  <div className="pt-3 border-t border-[rgba(180,160,255,0.14)] flex gap-2 text-xs text-[#f2ecff]/80 italic">
                    <FileText className="w-3.5 h-3.5 text-[#ff5fd4] shrink-0 mt-0.5" />
                    <p className="line-clamp-2 leading-relaxed">"{sub.message}"</p>
                  </div>
                  <div className="text-[9px] font-mono-tech text-[#f2ecff]/40 text-right">
                    {new Date(sub.date).toLocaleDateString("it-IT", { hour: "2-digit", minute: "2-digit" })}
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

function FormField({ label, name, value, onChange, placeholder, type = "text", required }: any) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] holo-text font-bold uppercase tracking-widest font-mono-tech">{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}
        className="holo-input" data-testid={`input-${name}`} />
    </div>
  );
}
