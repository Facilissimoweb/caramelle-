import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Check, Box, ShieldCheck } from "lucide-react";
import FAQAccordion from "./FAQAccordion";
const logoImage = "/f (1600 x 500 px).webp";

interface ProposteViewProps {
  setCurrentTab: (tab: string) => void;
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function ProposteView({ setCurrentTab, lang, isFacilitated }: ProposteViewProps) {
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

  const tiers = isFacilitated
    ? [
        {
          id: "starter",
          name: "AI Starter",
          tagline: lang === "it" ? "Perfetto per iniziare a farsi trovare su Internet." : "Perfect to start getting found online.",
          price: "950",
          period: lang === "it" ? "Sito di 1 Pagina" : "1-Page Website",
          features: [
            lang === "it" ? "Un sito internet di una pagina sola, molto veloce" : "A single page website, very fast",
            lang === "it" ? "Si vede benissimo anche sui telefoni cellulari" : "Looks great on mobile phones",
            lang === "it" ? "Creo la grafica del tuo logo (3 prove diverse)" : "I design your logo (3 initial concepts)",
            lang === "it" ? "Nome del sito ed email inclusi per 1 anno" : "Website name and email included for 1 year",
            lang === "it" ? "Scrittura semplice ottimizzata per farti trovare su Google" : "Simple texts written to rank well on Google",
            lang === "it" ? "Pronto e consegnato in soli 7-10 giorni" : "Ready and delivered in just 7-10 days",
            lang === "it" ? "Assistenza inclusa per 3 mesi per qualsiasi dubbio" : "Support included for 3 months for any questions",
          ],
          isPopular: false,
          ctaText: lang === "it" ? "Scegli AI Starter" : "Choose AI Starter",
        },
        {
          id: "professional",
          name: "AI Professional",
          tagline: lang === "it" ? "La scelta migliore per aziende e professionisti." : "The best choice for businesses and professionals.",
          price: "1.900",
          period: lang === "it" ? "Sito con più Pagine" : "Multi-page Website",
          features: [
            lang === "it" ? "Un sito internet completo con più pagine (fino a 6)" : "A complete website with multiple pages (up to 6)",
            lang === "it" ? "Scrivo io tutti i testi per descrivere il tuo lavoro" : "I write all your texts to describe your work clearly",
            lang === "it" ? "Studio avanzato di Google per farti trovare prima di altri" : "Advanced Google setup to rank you ahead of others",
            lang === "it" ? "Guida con i tuoi colori e caratteri del brand" : "Brand book detailing your colors and fonts",
            lang === "it" ? "Immagini e grafiche per i tuoi canali Social" : "Images and graphics for your Social channels",
            lang === "it" ? "Modulo per far scrivere e ricevere messaggi dai clienti" : "Contact form to receive messages from clients",
            lang === "it" ? "Pronto e consegnato in 14-18 giorni" : "Ready and delivered in 14-18 days",
            lang === "it" ? "Assistenza e analisi delle visite per 3 mesi" : "Support and visitor metrics analysis for 3 months",
          ],
          isPopular: true,
          ctaText: lang === "it" ? "Richiedi AI Professional" : "Request AI Professional",
        },
        {
          id: "enterprise",
          name: "AI Enterprise",
          tagline: lang === "it" ? "Per negozi online e applicazioni personalizzate." : "For online shops and custom web applications.",
          price: "3.800",
          period: lang === "it" ? "E-commerce o App Custom" : "E-commerce or Custom App",
          features: [
            lang === "it" ? "Sito e-commerce completo per vendere infiniti prodotti" : "Complete e-commerce site to sell unlimited products",
            lang === "it" ? "Un assistente virtuale automatico (Chatbot) sul tuo sito" : "A smart automated helper (Chatbot) on your site",
            lang === "it" ? "Scrittura testi strategici e studio dei concorrenti" : "Strategic copy and deep competitor analysis",
            lang === "it" ? "Integrazione dei pagamenti con carta di credito" : "Credit card payments integration (Stripe, PayPal)",
            lang === "it" ? "Video-lezioni per imparare ad usarlo da solo" : "Video tutorials to learn how to manage it yourself",
            lang === "it" ? "Pronto e consegnato in circa 25-30 giorni" : "Ready and delivered in about 25-30 days",
            lang === "it" ? "Assistenza prioritaria giorno e notte per 6 mesi" : "Priority day and night support for 6 months",
          ],
          isPopular: false,
          ctaText: lang === "it" ? "Configura AI Enterprise" : "Configure AI Enterprise",
        },
      ]
    : [
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
            "Ottimizzazione SEO semantica con analisi predittiva base",
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
            "SEO Predittiva avanzata (identificazione dei trend futuri e bisogni latenti)",
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
            "SEO Predittiva Enterprise con cluster semantici avanzati",
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

  const faqs = isFacilitated
    ? [
        {
          q: lang === "it" ? "Chi realizza il mio sito internet?" : "Who builds my website?",
          a: lang === "it"
            ? "Lo realizzo interamente io (Teresa). Lavoro da sola come freelance, quindi parli direttamente con me per ogni singola necessità senza passare per intermediari."
            : "I build it entirely myself (Teresa). I work alone as a freelance designer, so you communicate directly with me without intermediaries.",
        },
        {
          q: lang === "it" ? "Cosa succede dopo la consegna del sito?" : "What happens after delivery?",
          a: lang === "it"
            ? "Il sito diventa di tua proprietà al 100%. Ti darò tutte le password e ti invierò semplici video-spiegazioni per gestire testi e immagini in autonomia."
            : "The website is 100% yours. I will give you all credentials and send simple video guides to help you change texts and images easily.",
        },
        {
          q: lang === "it" ? "Ci sono spese extra o nascoste?" : "Are there extra costs?",
          a: lang === "it"
            ? "No. Il primo anno l'indirizzo internet, l'hosting e l'email sono inclusi gratis. Dal secondo anno pagherai solo il costo standard del server (circa 30€-90€ l'anno)."
            : "No. For the first year, your web address, hosting, and email are included for free. From year two, you only pay standard hosting (around €30-€90/year).",
        },
      ]
    : [
        {
          q: "Cos'è la SEO Predittiva e come funziona nei pacchetti di Facilissimo Web?",
          a: "La SEO Predittiva è l'evoluzione del posizionamento su Google. Invece di limitarsi ad analizzare cosa le persone hanno cercato in passato, con Facilissimo Web uso l'IA e modelli linguistici semantici per anticipare i futuri trend di ricerca e le necessità latenti degli utenti. Configurando metadati dinamici, strutture Schema.org mirate e testi strutturati in modo specifico, posiziono il tuo sito per le domande che i tuoi clienti (locali a Macerata/Marche o nazionali/esteri) cercheranno tra qualche mese, anticipando tutti i tuoi concorrenti.",
        },
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
      ];

  return (
    <div className="w-full bg-[#F8F7F4] text-[#111113]">
      {/* Header Banner */}
      <section className="py-24 text-center relative border-b border-[#111113]/10 overflow-hidden">
        {/* Ambient Background Slideshow */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {bgImages.map((imgUrl, idx) => (
            <div
              key={imgUrl}
              className={`absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ${
                idx === currentBgIndex ? "opacity-35 scale-100" : "opacity-0 scale-105"
              }`}
              style={{
                backgroundImage: `url(${imgUrl})`,
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-[#F8F7F4]/95 via-[#F8F7F4]/70 to-[#F8F7F4]/95" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F8F7F4]/30 via-transparent to-[#F8F7F4]" />
        </div>

        <div className="max-w-2xl mx-auto px-6 space-y-4 relative z-10">
          <div className="flex justify-center mb-4">
            <img
              src={logoImage}
              alt="Facilissimo Web Logo"
              className="w-[150px] h-[150px] object-contain"
            />
          </div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#a3e635] font-mono font-bold block mb-2">
            {isFacilitated ? "[ PREZZI CHIARI ]" : "[ TRASPARENZA E PREZZI CHIARI ]"}
          </span>
          <h1 className="font-tan text-3xl font-bold tracking-tight text-[#111113] sm:text-5xl break-words">
            {isFacilitated ? "Piani e Prezzi Chiarissimi" : "Piani e Proposte su Misura"}
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#111113]/70 leading-relaxed">
            {isFacilitated 
              ? "Nessun costo nascosto o sorpresa finale. Qui trovi i miei tre piani con tutto quello che è incluso, spiegato in modo semplice."
              : "Nessun preventivo gonfiato o tariffa oraria ambigua. Qui trovi pacchetti chiari, pensati per adattarsi alle reali necessità del tuo business."}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-[#FAF9F6]">
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
                    ? "border-[#a3e635] bg-[#111113] text-[#F8F7F4] scale-102 lg:z-10 shadow-xl"
                    : "border-[#111113]/10 hover:border-[#a3e635]/40 bg-[#F8F7F4] text-[#111113]"
                }`}
              >
                {tier.isPopular && (
                  <span className="absolute -top-3.5 left-6 bg-[#a3e635] text-[#111113] px-3 py-1 text-[9px] font-mono font-bold uppercase tracking-widest">
                    {lang === "it" ? "Più Scelto" : "Most Popular"}
                  </span>
                )}

                <div>
                  <div className="space-y-4 mb-8">
                    <h3 className={`font-display text-2xl font-bold ${tier.isPopular ? "text-[#F8F7F4]" : "text-[#111113]"}`}>
                      {tier.name}
                    </h3>
                    <p className={`text-xs h-10 leading-normal font-sans ${tier.isPopular ? "text-[#F8F7F4]/70" : "text-[#111113]/70"}`}>
                      {tier.tagline}
                    </p>
                    <div className={`pt-2 border-t space-y-1 ${tier.isPopular ? "border-[rgba(248,247,244,0.1)]" : "border-[#111113]/10"}`}>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-[#a3e635] block font-bold">
                        {lang === "it" ? "A PARTIRE DA" : "STARTING FROM"}
                      </span>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-bold font-mono ${tier.isPopular ? "text-[#F8F7F4]" : "text-[#111113]"}`}>
                          €{tier.price}
                        </span>
                        <span className={`text-[10px] font-mono ${tier.isPopular ? "text-[#F8F7F4]/50" : "text-[#111113]/50"}`}>
                          {lang === "it" ? "+ IVA (prezzo fisso)" : "+ VAT (fixed price)"}
                        </span>
                      </div>
                    </div>
                    <div className="text-[10px] font-bold text-[#a3e635] font-mono tracking-widest uppercase">
                      {tier.period}
                    </div>
                  </div>

                  <ul className={`space-y-3.5 mb-8 text-xs border-t pt-6 font-sans ${
                    tier.isPopular 
                      ? "text-[#F8F7F4]/80 border-[rgba(248,247,244,0.1)]" 
                      : "text-[#111113]/80 border-[#111113]/10"
                  }`}>
                    {tier.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#a3e635] mt-0.5 shrink-0" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => setCurrentTab("contatti")}
                  className={`w-full py-4 px-4 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer border ${
                    tier.isPopular
                      ? "bg-[#a3e635] text-[#111113] border-[#a3e635] hover:bg-transparent hover:text-[#a3e635]"
                      : "bg-transparent text-[#111113] border-[#111113]/20 hover:border-[#a3e635] hover:text-[#a3e635]"
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
      <section className="py-24 bg-[#FAF9F6] border-y border-[#111113]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#a3e635] font-bold uppercase block">
              {isFacilitated ? "[ TUTTO INCLUSO ]" : "[ VALORE AGGIUNTO ]"}
            </span>
            <h2 className="font-display text-3xl font-bold text-[#111113] tracking-wide">
              {isFacilitated ? "Servizi inclusi in ogni pacchetto" : "L'Ecosistema Servizi IA di Facilissimo Web"}
            </h2>
            <p className="text-xs sm:text-sm text-[#111113]/70 leading-relaxed font-sans">
              {isFacilitated 
                ? "Ogni piano include una serie di servizi fondamentali per iniziare senza dover pagare professionisti diversi."
                : "Oltre alla pura programmazione del sito, ogni pacchetto racchiude un insieme di servizi coordinati che solitamente richiederebbero l'ingaggio di più professionisti esterni."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#111113] font-bold text-sm">
                  <Box className="w-4 h-4 text-[#a3e635]" />
                  <span>{lang === "it" ? "Logo e Grafica" : "Logo and Graphics"}</span>
                </div>
                <p className="text-xs text-[#111113]/60 leading-relaxed font-sans">
                  {lang === "it"
                    ? "Creo i loghi e i file pronti per essere stampati su biglietti da visita o pubblicati su internet."
                    : "I design professional scalable logo files ready for print and online use."}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[#111113] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#a3e635]" />
                  <span>{lang === "it" ? "Sicurezza e Server" : "Security & Servers"}</span>
                </div>
                <p className="text-xs text-[#111113]/60 leading-relaxed font-sans">
                  {lang === "it"
                    ? "Proteggo il sito con sistemi anti-virus e lucchetto di sicurezza SSL gratuito."
                    : "I secure the site with advanced antivirus tools and configure free SSL security certificates."}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#F8F7F4] p-8 border border-[#111113]/10 space-y-4">
            <h4 className="font-display font-bold text-lg text-[#111113]">
              {lang === "it" ? "Hai bisogno di qualcosa in più?" : "Need something custom?"}
            </h4>
            <p className="text-xs sm:text-sm text-[#111113]/70 leading-relaxed font-sans">
              {lang === "it"
                ? "Se vuoi un negozio online molto grande, un database specifico o una funzione di intelligenza artificiale addestrata sui tuoi dati aziendali, scrivimi per un preventivo gratuito."
                : "If you need a large online shop, a specific database, or a custom AI tool trained on your private data, contact me for a free quote."}
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentTab("contatti")}
                className="px-6 py-3.5 bg-[#a3e635] text-[#FAF9F6] text-xs font-bold uppercase tracking-widest border border-[#a3e635] hover:bg-transparent hover:text-[#a3e635] transition-all cursor-pointer"
              >
                {lang === "it" ? "Invia una richiesta personalizzata" : "Send custom request"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-[#544848]">
        <FAQAccordion items={faqs} />
      </section>
    </div>
  );
}
