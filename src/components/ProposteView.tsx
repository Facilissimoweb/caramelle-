import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, HelpCircle, ChevronDown, Box, ShieldCheck } from "lucide-react";

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
        "Dominio, hosting ed email aziendale (1 anno)",
        "Ottimizzazione SEO di base",
        "Consegna garantita in 7-10 giorni",
        "Supporto tecnico post-lancio per 3 mesi",
      ],
      isPopular: false,
      ctaText: "Scegli AI Starter",
    },
    {
      id: "professional",
      name: "AI Professional",
      tagline: "La scelta migliore per aziende e professionisti affermati.",
      price: "1.900",
      period: "Sito Multi-pagina",
      features: [
        "Sito Multi-pagina completo (fino a 6 pagine)",
        "Copywriting persuasivo potenziato dall'IA",
        "SEO semantica avanzata con parole chiave mirate",
        "Brand Book ufficiale (palette, tipografia, loghi)",
        "Kit Social Media coordinato (grafiche per post)",
        "Form contatti integrato e newsletter setup",
        "Consegna in 14-18 giorni",
        "Supporto e analisi mensile per 3 mesi",
      ],
      isPopular: true,
      ctaText: "Richiedi AI Professional",
    },
    {
      id: "enterprise",
      name: "AI Enterprise",
      tagline: "Per chi vuole innovare integrando intelligenza artificiale avanzata.",
      price: "3.800",
      period: "E-commerce o Custom App",
      features: [
        "Sito Web custom o E-commerce completo (infiniti prodotti)",
        "Integrazione API Intelligenza Artificiale (es. Chatbot dedicato)",
        "Copywriting strategico e posizionamento di mercato",
        "Dashboard amministratore personalizzata per statistiche",
        "Integrazione sistemi di pagamento sicuri (Stripe, PayPal)",
        "Sessioni di formazione video registrate per la gestione",
        "Consegna concordata (ca. 25-30 giorni)",
        "Supporto prioritario 24/7 per 6 mesi",
      ],
      isPopular: false,
      ctaText: "Configura AI Enterprise",
    },
  ];

  const faqs = [
    {
      q: "Cosa significa 'sito web potenziato dall'Intelligenza Artificiale'?",
      a: "Significa che utilizzo sofisticati modelli linguistici (come Gemini o ChatGPT) e generatori grafici vettoriali per accelerare i processi di scrittura di codice di base, ottimizzazione SEO semantica e copywriting persuasivo. Questo mi permette di lavorare con una velocità incredibile e ridurre i tempi di consegna, lasciando a me tutto lo spazio per curare l'estetica, la logica di navigazione e l'esperienza utente.",
    },
    {
      q: "Chi gestisce il sito web dopo il lancio?",
      a: "Il sito è di tua completa ed esclusiva proprietà. Alla consegna, ti fornirò le credenziali di accesso e un breve video manuale personalizzato che ti spiegherà come modificare testi, immagini o post in completa autonomia. Non sarai legato a me da nessun abbonamento obbligatorio.",
    },
    {
      q: "Ci sono costi ricorrenti oltre al preventivo?",
      a: "Nessun costo nascosto. Per il primo anno, il costo del dominio, del server sicuro SSL e della posta aziendale è completamente incluso. Dal secondo anno, pagherai direttamente al provider di hosting (es. SiteGround, Vercel o Netlify) la quota annuale standard (solitamente tra i 30€ e i 90€ l'anno).",
    },
    {
      q: "Posso iniziare con il piano Starter e fare un upgrade in seguito?",
      a: "Assolutamente sì. Il codice viene scritto in modo pulito e modulare, consentendo di espandere un sito One-Page in una piattaforma multi-pagina o un e-commerce complesso in qualsiasi momento e senza dover rifare tutto da zero.",
    },
    {
      q: "Lavori da sola o hai collaboratori esterni?",
      a: "Lavoro rigorosamente da sola come freelance. Sono l'unica titolare e sviluppatrice di Facilissimo Web. Questo ti assicura che il tuo sito sarà creato interamente con le mie mani, garantendo la massima attenzione al dettaglio, unicità stilistica e risposte in tempo reale.",
    },
  ];

  return (
    <div className="w-full bg-[#111113] text-[#F8F7F4]">
      {/* Header Banner */}
      <section className="py-24 text-center border-b border-[rgba(248,247,244,0.1)]">
        <div className="max-w-2xl mx-auto px-6 space-y-4">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#E35930] font-mono font-bold block mb-2">
            [ TRASPARENZA E PREZZI CHIARI ]
          </span>
          <h1 className="font-display text-4xl font-bold tracking-tight text-[#F8F7F4] sm:text-5xl">
            Piani e Proposte su Misura
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#F8F7F4]/70 leading-relaxed">
            Nessun preventivo gonfiato o tariffa oraria ambigua. Qui trovi pacchetti chiari, pensati per adattarsi alle reali necessità del tuo business.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-[#111113]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative p-8 border transition-all duration-300 flex flex-col justify-between ${
                  tier.isPopular
                    ? "border-[#E35930] bg-[#151518] scale-102 lg:z-10 shadow-lg"
                    : "border-[rgba(248,247,244,0.1)] hover:border-[#E35930]/40 bg-[#111113]"
                }`}
              >
                {tier.isPopular && (
                  <span className="absolute -top-3.5 left-6 bg-[#E35930] text-[#111113] px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest">
                    Più Scelto
                  </span>
                )}

                <div>
                  <div className="space-y-4 mb-8">
                    <h3 className="font-display text-2xl font-bold text-[#F8F7F4]">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-[#F8F7F4]/60 h-10 leading-normal font-sans">
                      {tier.tagline}
                    </p>
                    <div className="pt-2 border-t border-[rgba(248,247,244,0.1)] flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-[#F8F7F4] font-mono">
                        €{tier.price}
                      </span>
                      <span className="text-[10px] text-[#F8F7F4]/50 font-mono">
                        + IVA (prezzo fisso)
                      </span>
                    </div>
                    <div className="text-[10px] font-bold text-[#E35930] font-mono tracking-widest uppercase">
                      {tier.period}
                    </div>
                  </div>

                  <ul className="space-y-3.5 mb-8 text-xs text-[#F8F7F4]/70 border-t border-[rgba(248,247,244,0.1)] pt-6 font-sans">
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#E35930] mt-0.5 shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setCurrentTab("contatti")}
                  className={`w-full py-4 px-4 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer border ${
                    tier.isPopular
                      ? "bg-[#E35930] text-[#111113] border-[#E35930] hover:bg-transparent hover:text-[#E35930]"
                      : "bg-transparent text-[#F8F7F4] border-[rgba(248,247,244,0.2)] hover:border-[#E35930] hover:text-[#E35930]"
                  }`}
                >
                  {tier.ctaText}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ecosystem Details */}
      <section className="py-24 bg-[#151518] border-y border-[rgba(248,247,244,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
              [ VALORE AGGIUNTO ]
            </span>
            <h2 className="font-display text-3xl font-bold text-[#F8F7F4] tracking-tight">
              L'Ecosistema Servizi IA di Facilissimo Web
            </h2>
            <p className="text-xs sm:text-sm text-[#F8F7F4]/70 leading-relaxed font-sans">
              Oltre alla pura programmazione del sito, ogni pacchetto racchiude un insieme di servizi coordinati che solitamente richiederebbero l'ingaggio di più professionisti esterni (copywriter, seo specialist, grafico).
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#F8F7F4] font-bold text-sm">
                  <Box className="w-4 h-4 text-[#E35930]" />
                  <span>Branding Vettoriale</span>
                </div>
                <p className="text-xs text-[#F8F7F4]/60 leading-relaxed font-sans">
                  Design del brand coordinato, con esportazione in vettori scalabili pronti per la stampa e l'online.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#F8F7F4] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#E35930]" />
                  <span>Sicurezza &amp; SSL</span>
                </div>
                <p className="text-xs text-[#F8F7F4]/60 leading-relaxed font-sans">
                  Configurazione di certificati SSL gratuiti, firewall cloud e ottimizzazioni server anti-hacker.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#111113] p-8 border border-[rgba(248,247,244,0.1)] space-y-4">
            <h4 className="font-display font-bold text-lg text-[#F8F7F4]">
              Hai esigenze completamente personalizzate?
            </h4>
            <p className="text-xs sm:text-sm text-[#F8F7F4]/70 leading-relaxed font-sans">
              Hai bisogno di integrare una Web App complessa, un database aziendale relazionale o un add-on specifico di intelligenza artificiale addestrato sui tuoi dati privati? Scrivimi e struttureremo un preventivo mirato.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentTab("contatti")}
                className="px-6 py-3.5 bg-[#E35930] text-[#111113] text-xs font-bold uppercase tracking-widest border border-[#E35930] hover:bg-transparent hover:text-[#E35930] transition-all cursor-pointer"
              >
                Invia una richiesta custom
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#111113]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
            <HelpCircle className="w-8 h-8 text-[#E35930] mx-auto" />
            <h2 className="font-display text-3xl font-bold text-[#F8F7F4]">
              Domande Frequenti
            </h2>
            <p className="text-[#F8F7F4]/70 text-xs sm:text-sm font-sans">
              Tutto quello che c'è da sapere sul processo creativo, la gestione del budget e la consegna dei lavori.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={i}
                  className="border-b border-[rgba(248,247,244,0.1)] bg-transparent transition-all duration-300"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full py-5 flex justify-between items-center text-left focus:outline-none cursor-pointer"
                  >
                    <span className="font-display font-semibold text-sm sm:text-base text-[#F8F7F4] pr-4">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#E35930] transition-transform duration-300 shrink-0 ${
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
                        transition={{ duration: 0.25 }}
                      >
                        <div className="pb-6 pt-1 text-xs sm:text-sm text-[#F8F7F4]/75 leading-relaxed font-sans bg-transparent">
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

