import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, HelpCircle, ChevronDown, Box, ShieldCheck, Sparkles, ArrowRight } from "lucide-react";

interface ProposteViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function ProposteView({ setCurrentTab }: ProposteViewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const tiers = [
    {
      id: "starter",
      name: "AI Starter",
      tagline: "Perfetto per liberi professionisti o startup in rampa di lancio.",
      price: "950",
      period: "Sito Web Completo",
      features: [
        "Sito One-Page ad altissime prestazioni",
        "Design responsive ottimizzato mobile",
        "Logo design personalizzato (3 concept)",
        "Dominio, hosting ed email (1 anno)",
        "Ottimizzazione SEO di base",
        "Consegna in 7-10 giorni",
        "Supporto tecnico per 3 mesi",
      ],
      isPopular: false,
      ctaText: "Scegli AI Starter",
      accent: "cyan",
    },
    {
      id: "professional",
      name: "AI Professional",
      tagline: "La scelta migliore per aziende e professionisti affermati.",
      price: "1.900",
      period: "Sito Multi-pagina",
      features: [
        "Sito Multi-pagina completo (fino a 6 pagine)",
        "Copywriting persuasivo potenziato AI",
        "SEO semantica avanzata",
        "Brand Book ufficiale (palette, tipografia)",
        "Kit Social Media coordinato",
        "Form contatti e newsletter setup",
        "Consegna in 14-18 giorni",
        "Supporto e analisi per 3 mesi",
      ],
      isPopular: true,
      ctaText: "Richiedi AI Professional",
      accent: "purple",
    },
    {
      id: "enterprise",
      name: "AI Enterprise",
      tagline: "Per chi vuole innovare con AI avanzata.",
      price: "3.800",
      period: "E-commerce o Custom App",
      features: [
        "Sito custom o E-commerce (infiniti prodotti)",
        "Integrazione API AI (es. Chatbot dedicato)",
        "Copywriting strategico di posizionamento",
        "Dashboard admin personalizzata",
        "Pagamenti sicuri (Stripe, PayPal)",
        "Video-tutorial personalizzati",
        "Consegna in 25-30 giorni",
        "Supporto prioritario 24/7 per 6 mesi",
      ],
      isPopular: false,
      ctaText: "Configura AI Enterprise",
      accent: "pink",
    },
  ];

  const faqs = [
    {
      q: "Cosa significa 'sito potenziato dall'AI'?",
      a: "Utilizzo modelli linguistici sofisticati (Gemini, Claude, ChatGPT) e generatori grafici vettoriali per accelerare la scrittura di codice, l'ottimizzazione SEO semantica e il copywriting. Questo mi permette una velocità incredibile lasciandomi spazio per curare estetica, navigazione ed esperienza utente.",
    },
    {
      q: "Chi gestisce il sito dopo il lancio?",
      a: "Il sito è di tua completa proprietà. Ti fornisco credenziali di accesso e video-manuale personalizzato per modificare testi e immagini in autonomia. Nessun abbonamento obbligatorio.",
    },
    {
      q: "Ci sono costi ricorrenti oltre al preventivo?",
      a: "Nessun costo nascosto. Per il primo anno dominio, SSL e email aziendale sono inclusi. Dal secondo anno paghi direttamente al provider di hosting (30€-90€/anno).",
    },
    {
      q: "Posso iniziare con Starter e fare upgrade?",
      a: "Assolutamente. Il codice è scritto in modo modulare, consente di espandere One-Page in multi-pagina o e-commerce complesso in qualsiasi momento senza rifare tutto.",
    },
    {
      q: "Lavori da sola o hai collaboratori?",
      a: "Rigorosamente da sola. Sono l'unica titolare e sviluppatrice: massima attenzione al dettaglio, unicità stilistica e risposte in tempo reale.",
    },
  ];

  return (
    <div className="w-full">
      {/* HERO */}
      <section className="section py-24 text-center" data-testid="proposte-hero">
        <div className="max-w-3xl mx-auto px-6 space-y-5">
          <span className="holo-tag inline-flex">// TRASPARENZA</span>
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white tracking-tight">
            Piani e proposte<br /><span className="holo-text">su misura</span>
          </h1>
          <p className="text-[#f2ecff]/70 text-base max-w-lg mx-auto">
            Nessun preventivo gonfiato. Pacchetti chiari pensati per le reali necessità del tuo business.
          </p>
        </div>
      </section>

      {/* PRICING */}
      <section className="section pb-24" data-testid="pricing-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`holo-panel !rounded-3xl p-8 relative flex flex-col justify-between ${
                  tier.isPopular ? "lg:scale-105 lg:z-10" : ""
                }`}
                data-testid={`tier-card-${tier.id}`}
              >
                <span className="sheen" />
                {tier.isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="btn-holo !py-1.5 !px-4 !text-[10px] shadow-none">
                      <Sparkles className="w-3 h-3" /> Più Scelto
                    </span>
                  </div>
                )}

                <div>
                  <div className="mb-8 space-y-3">
                    <div className={`icon-holo ${tier.accent === "purple" ? "!text-[#b26bff]" : tier.accent === "pink" ? "!text-[#ff5fd4]" : ""}`}>
                      <Box className="w-5 h-5" />
                    </div>
                    <h3 className="font-display text-3xl font-bold text-white">{tier.name}</h3>
                    <p className="text-sm text-[#f2ecff]/60 h-12 leading-normal">{tier.tagline}</p>
                    <div className="pt-4 border-t border-[rgba(180,160,255,0.14)]">
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-bold chrome-text font-display">€{tier.price}</span>
                      </div>
                      <div className="text-[10px] text-[#f2ecff]/50 font-mono-tech mt-1">+ IVA · prezzo fisso</div>
                      <div className="mt-2 holo-tag inline-flex text-[9px]">
                        {tier.period}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8 text-sm text-[#f2ecff]/80 border-t border-[rgba(180,160,255,0.14)] pt-6">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#4ff5ff] to-[#ff5fd4] flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-3 h-3 text-[#05030d]" strokeWidth={3} />
                        </div>
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setCurrentTab("contatti")}
                  className={tier.isPopular ? "btn-holo w-full justify-center" : "btn-ghost w-full justify-center"}
                  data-testid={`tier-cta-${tier.id}`}
                >
                  {tier.ctaText} <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ECOSYSTEM */}
      <section className="section py-24" data-testid="ecosystem-section">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="holo-tag purple">// VALORE AGGIUNTO</span>
            <h2 className="font-display text-4xl font-bold text-white">
              L'ecosistema <span className="holo-text">AI Services</span>
            </h2>
            <p className="text-[#f2ecff]/70 leading-relaxed">
              Ogni pacchetto racchiude servizi coordinati che richiederebbero l'ingaggio di più professionisti (copywriter, seo specialist, grafico).
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
              {[
                { icon: <Box className="w-4 h-4" />, title: "Branding Vettoriale", desc: "Design coordinato in vettori scalabili, pronti per stampa e online." },
                { icon: <ShieldCheck className="w-4 h-4" />, title: "Sicurezza &amp; SSL", desc: "Certificati SSL, firewall cloud, ottimizzazioni anti-hacker." },
              ].map((s) => (
                <div key={s.title} className="holo-panel p-5 space-y-2">
                  <span className="sheen" />
                  <div className="flex items-center gap-2">
                    <div className="icon-holo !w-9 !h-9">{s.icon}</div>
                    <span className="text-white font-bold text-sm font-display">{s.title}</span>
                  </div>
                  <p className="text-xs text-[#f2ecff]/60 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="holo-panel !rounded-3xl p-10 space-y-5">
            <span className="sheen" />
            <span className="holo-tag pink">// CUSTOM</span>
            <h3 className="font-display text-2xl font-bold text-white">
              Esigenze <span className="holo-text">100% personalizzate?</span>
            </h3>
            <p className="text-sm text-[#f2ecff]/70 leading-relaxed">
              Web App complesse, database aziendali relazionali o add-on di intelligenza artificiale addestrati sui tuoi dati privati? Struttureremo un preventivo mirato.
            </p>
            <button onClick={() => setCurrentTab("contatti")} className="btn-holo" data-testid="custom-request-btn">
              Invia richiesta custom <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section py-24" data-testid="faq-section">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14 space-y-4">
            <div className="icon-holo mx-auto"><HelpCircle className="w-5 h-5" /></div>
            <h2 className="font-display text-4xl font-bold text-white">Domande <span className="holo-text">Frequenti</span></h2>
            <p className="text-[#f2ecff]/70 text-sm">Processo creativo, budget e consegna. Tutto quello che devi sapere.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="holo-panel !rounded-2xl overflow-hidden" data-testid={`faq-item-${i}`}>
                  <span className="sheen" />
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full py-5 px-6 flex justify-between items-center text-left focus:outline-none cursor-pointer"
                  >
                    <span className="font-display font-semibold text-base sm:text-lg text-white pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#4ff5ff] transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6 text-sm text-[#f2ecff]/75 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
