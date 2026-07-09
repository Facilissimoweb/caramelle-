import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Cpu, Zap, ArrowRight, Heart, CheckCircle2, Sparkles } from "lucide-react";
import { translations } from "../translations";
import FAQAccordion from "./FAQAccordion";
import GallerySection from "./GallerySection";
import GustoPassioneApp from "./GustoPassioneApp";

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  lang: "it" | "en";
  isFacilitated: boolean;
  onOpenModal?: (type: "privacy" | "terms" | "ethics" | "sitemap") => void;
}

export default function HomeView({ setCurrentTab, lang, isFacilitated, onOpenModal }: HomeViewProps) {
  const t = translations[lang][isFacilitated ? "facilitated" : "normal"];

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

  const features = [
    {
      icon: <Zap className="w-5 h-5 text-[#E35930]" />,
      title: t.feat1Title,
      description: t.feat1Desc,
      tags: lang === "it" ? ["VELOCITÀ", "SEO-DATO"] : ["SPEED", "SEO-DRIVEN"],
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#E35930]" />,
      title: t.feat2Title,
      description: t.feat2Desc,
      tags: lang === "it" ? ["INTEGRAZIONE IA", "AUTOMAZIONE"] : ["AI INTEGRATION", "AUTOMATION"],
    },
    {
      icon: <Brain className="w-5 h-5 text-[#E35930]" />,
      title: t.feat3Title,
      description: t.feat3Desc,
      tags: lang === "it" ? ["DESIGN PIXEL-PERFECT", "SU MISURA"] : ["PIXEL-PERFECT", "CUSTOM DESIGN"],
    },
  ];
  const projects: { title: string; category: string; desc: string; image: string; link?: string }[] = [
    {
      title: "Nexa AI Hub",
      category: lang === "it" ? "Brand Identity & Platform Design" : "Brand Identity & Platform Design",
      desc: lang === "it"
        ? "Interfaccia di controllo bento-grid per l'analisi dati e la gestione dei flussi cloud di Nexa. Palette modernissima e grafica interamente vettoriale."
        : "An analytics control center dashboard with dynamic metrics, data visualization tools, and clean vector graphics.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="w-full bg-[#111113] text-[#F8F7F4]">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center py-20 overflow-hidden border-b border-[rgba(248,247,244,0.1)]">
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
          {/* Deep Dark Overlay to keep text contrast clean and high-contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111113] via-[#111113]/80 to-[#111113]/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111113]/30 via-transparent to-[#111113]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E35930] font-mono font-bold block mb-2 animate-fade-in-up">
              {t.heroPreTitle}
            </span>
 
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold text-[#F8F7F4] leading-[0.95] tracking-tight animate-fade-in-up delay-75">
              {t.heroTitleRegular}{" "}
              <span className="italic block mt-1 font-normal text-[#E35930] font-display">
                {t.heroTitleItalic}
              </span>
            </h1>
 
            <p className="font-sans text-sm sm:text-base text-[#F8F7F4]/80 max-w-xl leading-relaxed animate-fade-in-up delay-150">
              {t.heroDesc}
            </p>
 
            <div className="flex flex-wrap gap-4 pt-4 animate-fade-in-up delay-200">
              <button
                onClick={() => setCurrentTab("contatti")}
                className="editorial-button-primary flex items-center gap-2 cursor-pointer !text-[13px]"
                id="hero-cta-main"
              >
                {t.heroBtnPrimary}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setCurrentTab("proposte")}
                className="editorial-button-secondary cursor-pointer"
                id="hero-cta-sec"
              >
                {t.heroBtnSecondary}
              </button>
            </div>
 
            {/* Micro proof badges */}
            <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-[rgba(248,247,244,0.1)] text-[9px] uppercase tracking-widest font-mono text-[#F8F7F4]/50 max-w-lg animate-fade-in-up delay-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E35930]" />
                <span>{t.proofDirect}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E35930]" />
                <span>{t.proofDelivery}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E35930]" />
                <span>{t.proofPrices}</span>
              </div>
            </div>
          </div>
 
          {/* Right illustration / image representation */}
          <div className="lg:col-span-5 relative animate-fade-in-up delay-400">
            <div className="relative w-full aspect-[4/3] sm:aspect-square bg-[#151518] p-4 overflow-hidden border border-[rgba(248,247,244,0.15)]">
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800"
                alt="Modern workspace showing digital wireframe of an AI application"
                className="w-full h-full object-cover grayscale contrast-125 opacity-90"
                referrerPolicy="no-referrer"
              />
              {/* Overlapping interactive overlay simulating AI design element */}
              <div className="absolute bottom-8 left-8 right-8 bg-[#111113] p-4 border border-[rgba(248,247,244,0.15)] flex items-center gap-3">
                <div className="w-9 h-9 border border-[#E35930]/30 flex items-center justify-center text-[#E35930]">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-[9px] font-bold text-[#E35930] font-mono tracking-widest uppercase">
                    AI Generative Design
                  </h4>
                  <p className="text-[10px] text-[#F8F7F4]/60 font-sans">
                    Prototypes created instantly &amp; refined manually.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
 
      {/* Services / Focus Grid */}
      <section className="py-24 bg-[#151518] border-b border-[rgba(248,247,244,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
              {t.approachPre}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F8F7F4]">
              {t.approachTitle}
            </h2>
            <p className="text-[#F8F7F4]/70 font-sans text-xs sm:text-sm">
              {t.approachDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feat, index) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 border border-[rgba(248,247,244,0.1)] bg-[#111113] transition-all duration-300 group hover:border-[#E35930]/40"
              >
                <div className="w-10 h-10 border border-[rgba(248,247,244,0.15)] flex items-center justify-center mb-6 group-hover:bg-[#E35930] group-hover:text-[#111113] transition-all">
                  {feat.icon}
                </div>
                <h3 className="font-display text-lg font-bold text-[#F8F7F4] mb-3">
                  {feat.title}
                </h3>
                <p className="text-xs text-[#F8F7F4]/70 leading-relaxed mb-6 font-sans">
                  {feat.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {feat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 border border-[rgba(248,247,244,0.1)] text-[#E35930] text-[9px] font-bold tracking-widest font-mono bg-transparent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio / Progetti Evoluti */}
      <section className="py-24 bg-[#111113]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl space-y-3">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
                {t.portfolioPre}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F8F7F4]">
                {t.portfolioTitle}
              </h2>
              <p className="text-[#F8F7F4]/70 text-xs sm:text-sm">
                {t.portfolioDesc}
              </p>
            </div>
            <button
              onClick={() => setCurrentTab("proposte")}
              className="text-[#E35930] hover:text-[#F8F7F4] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-all group cursor-pointer"
              id="portfolio-view-services-btn"
            >
              {t.portfolioViewAll}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {projects.map((proj, index) => {
              const CardComponent = proj.link ? motion.a : motion.div;
              const extraProps = proj.link
                ? { href: proj.link, target: "_blank", rel: "noopener noreferrer" }
                : {};
              return (
                <CardComponent
                  key={proj.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer bg-[#111113] border border-[rgba(248,247,244,0.1)] hover:border-[#E35930]/40 transition-all block"
                  {...extraProps}
                >
                  <div className="aspect-[16/10] overflow-hidden relative bg-[#151518] border-b border-[rgba(248,247,244,0.1)]">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:scale-102 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 bg-[#E35930] text-[#111113] px-3 py-1 text-[9px] font-mono tracking-widest uppercase font-bold">
                      {proj.category}
                    </div>
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="font-display text-xl font-bold text-[#F8F7F4] group-hover:text-[#E35930] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-[#F8F7F4]/70 leading-relaxed font-sans">
                      {proj.desc}
                    </p>
                    <div className="pt-2">
                      <span className="text-[10px] font-mono text-[#E35930] font-bold tracking-widest uppercase border-b border-[#E35930]/20 pb-0.5 group-hover:border-[#E35930] transition-colors">
                        {proj.link ? t.portfolioVisitSite : t.portfolioCaseStudy}
                      </span>
                    </div>
                  </div>
                </CardComponent>
              );
            })}
          </div>

          {/* Interactive Advanced AI Project App Showcase */}
          <div className="mt-20 pt-20 border-t border-[rgba(248,247,244,0.1)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
                  {lang === "it" ? "[ WEB APP INTERATTIVA LIVE ]" : "[ LIVE INTERACTIVE WEB APP ]"}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8F7F4] leading-[1.1]">
                  {lang === "it" ? (
                    <>
                      Gusto &amp; Passione — <span className="italic font-normal text-[#E35930]">Menu Digitale Premium</span>
                    </>
                  ) : (
                    <>
                      Gusto &amp; Passione — <span className="italic font-normal text-[#E35930]">Premium Digital Menu</span>
                    </>
                  )}
                </h3>
                <p className="text-[#F8F7F4]/70 font-sans text-xs sm:text-sm leading-relaxed">
                  {lang === "it"
                    ? "Hai un ristorante, pizzeria o locale nelle Marche e vuoi automatizzare le ordinazioni d'asporto e a domicilio senza costose commissioni? Ho realizzato questo simulatore interattivo di web-app premium: un menu digitale completo con carrello, club fedeltà con accumulo punti automatico in locale, simulatore di pagamento sicuro e inoltro d'ordine diretto su WhatsApp."
                    : "Do you run a restaurant, pizzeria, or local shop and want to automate takeaway and delivery orders without paying high commissions? I developed this interactive premium web-app simulator: a complete digital menu with an elegant shopping cart, local loyalty points engine, secure payment checkout simulator, and direct WhatsApp dispatch."}
                </p>

                <div className="space-y-4 font-sans text-xs text-[#F8F7F4]/70 leading-relaxed">
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#F8F7F4]">{lang === "it" ? "Interazione in tempo reale" : "Real-time interaction"}</h4>
                      <p className="text-[11px] text-[#F8F7F4]/50 leading-relaxed">{lang === "it" ? "Prova subito il simulatore a fianco: aggiungi i piatti al carrello, riscatta i premi del Club Fedeltà e invia l'ordine." : "Try the simulator right here: add delicious dishes to your cart, redeem loyalty club gifts, and place your order."}</p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#F8F7F4]">{lang === "it" ? "Persistenza Locale e GDPR" : "Local Persistence & GDPR"}</h4>
                      <p className="text-[11px] text-[#F8F7F4]/50 leading-relaxed">{lang === "it" ? "I tuoi dati e i punti fedeltà vengono memorizzati nel browser locale in modo sicuro e trasparente." : "Your customer details and loyalty points are safely stored inside your browser local storage."}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 flex justify-center w-full">
                <GustoPassioneApp lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Dynamic Gallery & Media Assets - Hidden from online public view as requested */}
      {/* <GallerySection lang={lang} isFacilitated={isFacilitated} /> */}
      {/* FAQ Section */}
      <section className="py-24 border-b border-[rgba(248,247,244,0.1)] bg-[#111113]">
        <FAQAccordion
          title={lang === "it" ? "Domande Frequenti" : "Frequently Asked Questions"}
          subtitle={
            lang === "it"
              ? "Tutto quello che c'è da sapere sulla realizzazione di siti web professionali con l'ausilio dell'Intelligenza Artificiale."
              : "Everything you need to know about professional web design services powered by Artificial Intelligence."
          }
          items={
            lang === "it"
              ? [
                  {
                    q: "Cos'è un sito web potenziato dall'Intelligenza Artificiale?",
                    a: "È un sito web progettato sfruttando flussi di lavoro e algoritmi di IA avanzati per ottimizzare la stesura del codice pulito, analizzare le strutture SEO semantiche ed eliminare passaggi manuali ripetitivi. Questo consente a Facilissimo Web di consegnare siti ultra-veloci, sicuri ed estremamente performanti a una frazione del costo tradizionale.",
                  },
                  {
                    q: "L'Intelligenza Artificiale sostituisce il lavoro manuale del web designer?",
                    a: "Assolutamente no. L'IA funge da incredibile acceleratore e assistente tecnico. Ogni singola riga di codice, combinazione cromatica, ottimizzazione SEO e scelta visiva di design viene curata, verificata, integrata e testata a mano da me (Teresa) per assicurare un risultato artigianale ed esclusivo di altissimo livello.",
                  },
                  {
                    q: "Quali sono i reali vantaggi in termini di tempi e di budget?",
                    a: "Mentre un'agenzia web tradizionale impiega solitamente dai 30 ai 60 giorni per un progetto medio richiedendo budget molto elevati, i processi intelligenti di Facilissimo Web mi permettono di consegnare una Landing Page professionale in soli 7 giorni ed un sito multipagina completo in 14 giorni, riducendo i prezzi fino al 60%.",
                  },
                  {
                    q: "Il mio sito web sarà ottimizzato per posizionarsi su Google?",
                    a: "Sì. Utilizzo modelli linguistici di IA semantica per mappare le reali intenzioni di ricerca dei clienti e per definire la migliore strategia di parole chiave. Il codice del sito viene generato per essere super leggero, garantendo tempi di caricamento immediati, fondamentali per scalare le prime posizioni su Google.",
                  },
                  {
                    q: "Cos'è la SEO Predittiva e come funziona sul mio sito?",
                    a: "La SEO Predittiva è un metodo avanzato che utilizza l'IA per analizzare e anticipare i futuri trend di ricerca degli utenti prima dei tuoi competitor. Nel tuo sito web Facilissimo Web integra marcatori semantici, strutture di dati Schema.org avanzate e testi ottimizzati per intercettare i bisogni latenti dei clienti (locali nelle Marche o nazionali/esteri) non appena iniziano a manifestarsi. Questo ti posiziona davanti a tutti sui motori di ricerca con mesi di anticipo.",
                  },
                  {
                    q: "Cosa succede dopo la consegna del sito? C'è supporto gratuito?",
                    a: "Una volta completato il pagamento, la proprietà del sito e di tutto il codice sorgente passa al 100% a te. Inoltre, per garantirti la massima tranquillità, ogni pacchetto include 30 giorni di assistenza tecnica gratuita e diretta per correggere bug, chiarire dubbi o effettuare piccole rifiniture.",
                  },
                ]
              : [
                  {
                    q: "What is an AI-powered website?",
                    a: "It is a website built using advanced AI workflows to streamline clean code generation, analyze semantic SEO structures, and eliminate repetitive tasks. This enables the delivery of ultra-fast, secure, and extremely high-performance sites by Facilissimo Web at a fraction of the cost of traditional methods.",
                  },
                  {
                    q: "Does AI replace the manual touch of a designer?",
                    a: "Not at all. AI acts as a powerful technical assistant. Every single line of code, color palette, SEO setting, and visual design layout is manually reviewed, integrated, and polished by hand by me (Teresa) to ensure a premium, artisan finish that fits your brand.",
                  },
                  {
                    q: "What are the exact time and cost advantages?",
                    a: "While standard web agencies typically take 30 to 60 days to launch a project and require heavy budgets, the intelligent workflows of Facilissimo Web allow me to deliver a professional Landing Page in 7 days and a complete multi-page site in 14 days, reducing overall costs by up to 60%.",
                  },
                  {
                    q: "Will my website be optimized to rank on Google?",
                    a: "Yes. I leverage semantic AI models to analyze search intent and map out high-value keywords. The structural code of the website is generated to be ultra-lightweight, ensuring immediate loading times which are highly favored by search engine ranking algorithms.",
                  },
                  {
                    q: "What is Predictive SEO and how is it built into my site?",
                    a: "Predictive SEO is an advanced method using AI to discover and anticipate user search trends before your competitors do. I build your site with precise semantic markups, schema.org schemas, and targeted content designed to catch latent user needs as they emerge. This grants your business a head start on search engine results weeks or months before others adapt.",
                  },
                  {
                    q: "What happens after the website is delivered? Is there support?",
                    a: "Once final payment is cleared, you receive 100% full ownership of your website and all its files. To guarantee absolute peace of mind, every project includes 30 days of free direct technical support to resolve any minor bugs, answer questions, or make small tweaks.",
                  },
                ]
          }
        />
      </section>

      {/* Call To Action Section */}
      <section className="py-24 px-6 md:px-12 bg-[#111113]">
        <div className="max-w-7xl mx-auto bg-[#151518] text-[#F8F7F4] p-12 md:p-20 relative overflow-hidden border border-[rgba(248,247,244,0.1)]">
          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
              {t.ctaPre}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F8F7F4]">
              {t.ctaTitle}
            </h2>
            <p className="text-[#F8F7F4]/80 font-sans text-xs sm:text-sm leading-relaxed">
              {t.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={() => setCurrentTab("contatti")}
                className="px-8 py-4 bg-[#E35930] text-[#111113] font-bold text-[10px] tracking-widest uppercase hover:bg-transparent hover:text-[#E35930] hover:border-[#E35930] transition-all cursor-pointer border border-[#E35930]"
                id="cta-contact-btn"
              >
                {t.ctaBtnPrimary}
              </button>
              <button
                onClick={() => setCurrentTab("chat")}
                className="px-8 py-4 bg-transparent hover:bg-[rgba(248,247,244,0.05)] border border-[rgba(248,247,244,0.2)] text-[#F8F7F4] font-bold text-[10px] tracking-widest uppercase transition-all cursor-pointer"
                id="cta-chat-btn"
              >
                {t.ctaBtnSecondary}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
