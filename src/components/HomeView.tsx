import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Brain, Cpu, Zap, ArrowRight, Heart, CheckCircle2, Sparkles, Maximize2, X, TrendingUp, BarChart3, ArrowUpRight, Check } from "lucide-react";
import { translations } from "../translations";
import FAQAccordion from "./FAQAccordion";
import TattooMacerataApp from "./TattooMacerataApp";
import GustoPassioneApp from "./GustoPassioneApp";
import NidoSogniApp from "./NidoSogniApp";
const regeneratedHeroImage = "/assets/images/1facilissimo web .png";
const logoImage = "/f (1600 x 500 px).webp";

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  lang: "it" | "en";
  isFacilitated: boolean;
  onOpenModal?: (type: "privacy" | "terms" | "ethics" | "sitemap") => void;
}

export default function HomeView({ setCurrentTab, lang, isFacilitated, onOpenModal }: HomeViewProps) {
  const t = translations[lang][isFacilitated ? "facilitated" : "normal"];

  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [activeFullScreenApp, setActiveFullScreenApp] = useState<"gusto" | "tattoo" | "nido" | null>(null);
  const [activeFeaturePopupIndex, setActiveFeaturePopupIndex] = useState<number | null>(null);

  const handleOpenFullScreen = (app: "gusto" | "tattoo" | "nido") => {
    setActiveFullScreenApp(app);
    document.body.style.overflow = "hidden";
  };

  const handleCloseFullScreen = () => {
    setActiveFullScreenApp(null);
    document.body.style.overflow = "unset";
  };

  const handleOpenFeaturePopup = (index: number) => {
    setActiveFeaturePopupIndex(index);
    document.body.style.overflow = "hidden";
  };

  const handleCloseFeaturePopup = () => {
    setActiveFeaturePopupIndex(null);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseFullScreen();
        handleCloseFeaturePopup();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, []);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 250]);

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
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
      tags: lang === "it" ? ["VELOCITÀ", "SEO-DATO"] : ["SPEED", "SEO-DRIVEN"],
      highlightMetrics: lang === "it"
        ? ["Tempo di Caricamento: 0.4s", "PageSpeed Score: 99/100", "Rimbalzo Mobile: < 2%"]
        : ["Interactive Time: 0.4s", "PageSpeed Score: 99/100", "Bounce Rate: < 2%"]
    },
    {
      icon: <Cpu className="w-5 h-5 text-[#E35930]" />,
      title: t.feat2Title,
      description: t.feat2Desc,
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      tags: lang === "it" ? ["INTEGRAZIONE IA", "AUTOMAZIONE"] : ["AI INTEGRATION", "AUTOMATION"],
      highlightMetrics: lang === "it"
        ? ["Integrazione Gemini API", "Efficienza Operativa: +85%", "Automazione Form: 24/7"]
        : ["Gemini API Pipelines", "Operational Gain: +85%", "Form Automation: 24/7"]
    },
    {
      icon: <Brain className="w-5 h-5 text-[#E35930]" />,
      title: t.feat3Title,
      description: t.feat3Desc,
      image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
      tags: lang === "it" ? ["DESIGN PIXEL-PERFECT", "SU MISURA"] : ["PIXEL-PERFECT", "CUSTOM DESIGN"],
      highlightMetrics: lang === "it"
        ? ["100% Codice Artigianale", "Memorabilità Brand: 95%", "UX Mobile Ottimizzata"]
        : ["100% Handcrafted Code", "Brand Recall: 95%", "Optimized Mobile UX"]
    },
  ];

  const statsData = [
    {
      title: lang === "it" ? "Criterio 1: Velocità di Caricamento" : "Criterion 1: Load Speed Efficiency",
      subtitle: lang === "it" ? "Performance reale mobile e desktop" : "Real-world mobile & desktop performance",
      metricValue: "0.4s",
      metricLabel: lang === "it" ? "Tempo di Caricamento" : "Time to Interactive",
      badgeText: lang === "it" ? "Punteggio 99/100 PageSpeed" : "99/100 PageSpeed Score",
      description: lang === "it" 
        ? "La velocità non è solo un dettaglio tecnico: è il fattore primario per non perdere clienti. Un caricamento lento riduce le conversioni del 20% per ogni secondo aggiuntivo. L'architettura statica di Facilissimo Web carica all'istante, garantendo un'esperienza utente impeccabile e un posizionamento Google prioritario."
        : "Speed is not just a technical detail: it's the primary factor for customer retention. A slow website reduces conversions by 20% for every additional second. Facilissimo Web's static lightweight architecture loads instantly, ensuring a flawless user experience and higher rankings.",
      comparisonTitle: lang === "it" ? "Velocità di Caricamento (Secondi — Meno è meglio)" : "Load Time Comparison (Seconds — Lower is better)",
      bars: [
        { label: lang === "it" ? "Criterio Facilissimo Web" : "Facilissimo Web Build Criteria", value: "0.4s", percentage: 12, isPrimary: true },
        { label: lang === "it" ? "Sito Standard / Template WordPress" : "Standard Site / WordPress Template", value: "3.2s", percentage: 100, isPrimary: false },
      ],
      metricsList: lang === "it" ? [
        { name: "Tasso di Rimbalzo (Bounce)", standard: "45% - 65%", mine: "< 2%", description: "La percentuale di utenti che abbandonano subito la pagina." },
        { name: "Ottimizzazione Mobile", standard: "60 / 100", mine: "100 / 100", description: "Punteggio ufficiale Google PageSpeed per dispositivi mobili." },
        { name: "Tasso di Conversione", standard: "1.2%", mine: "4.8%", description: "Percentuale di visitatori che si convertono in contatti caldi." },
      ] : [
        { name: "Bounce Rate", standard: "45% - 65%", mine: "< 2%", description: "Percentage of users who leave the page immediately." },
        { name: "Mobile Optimization", standard: "60 / 100", mine: "100 / 100", description: "Google PageSpeed's official performance score for mobile." },
        { name: "Conversion Rate", standard: "1.2%", mine: "4.8%", description: "Percentage of visitors who turn into hot leads." },
      ]
    },
    {
      title: lang === "it" ? "Criterio 2: Intelligenza Artificiale Integrata" : "Criterion 2: Integrated AI Automations",
      subtitle: lang === "it" ? "Automazione e posizionamento semantico" : "Automation & semantic positioning",
      metricValue: "85%",
      metricLabel: lang === "it" ? "Efficienza Operativa" : "Operational Efficiency",
      badgeText: lang === "it" ? "SEO Semantica & Assistenza 24/7" : "Semantic SEO & 24/7 Support",
      description: lang === "it"
        ? "L'integrazione di motori intelligenti (es. Gemini API) e calcolatori dinamici permette di qualificare i clienti e automatizzare il 100% delle risposte ripetitive, eliminando i colli di bottiglia e convertendo gli utenti anche di notte. Inoltre, i modelli linguistici avanzati ottimizzano la SEO predittiva per intercettare i futuri trend dei motori di ricerca."
        : "Integrating smart models (like Gemini API) and custom dynamic calculators lets you qualify leads and automate 100% of repetitive customer inquiries. This keeps your business active 24/7. Additionally, semantic AI keyword mapping helps intercept search trend shifts weeks before competitors.",
      comparisonTitle: lang === "it" ? "Tasso di Risposta & Risoluzione Richieste (%)" : "Lead Response & Resolution Rate (%)",
      bars: [
        { label: lang === "it" ? "Il Mio Criterio (AI Integrata & Automazioni)" : "My Build Criteria (AI & Automation)", value: "85%", percentage: 85, isPrimary: true },
        { label: lang === "it" ? "Sito Comune (Solo Form di Contatto Statico)" : "Standard Site (Static Contact Form Only)", value: "5%", percentage: 5, isPrimary: false },
      ],
      metricsList: lang === "it" ? [
        { name: "Tempo di Risposta al Cliente", standard: "4-12 ore", mine: "Immediato (< 2s)", description: "Velocità nel fornire preventivi o risposte a domande comuni." },
        { name: "Keyword SEO Indicizzate", standard: "Bassa densità", mine: "+150% espansione", description: "Parole chiave semantiche uniche indicizzate grazie alla SEO predittiva." },
        { name: "Fidelizzazione e Interazione", standard: "Molto bassa", mine: "Fino a 3x più alta", description: "Gli utenti giocano con i preventivatori interattivi e gli avatar restando sul sito." },
      ] : [
        { name: "Lead Response Time", standard: "4-12 hours", mine: "Instant (< 2s)", description: "Time required to reply to common queries or calculate estimations." },
        { name: "Indexed SEO Keywords", standard: "Low density", mine: "+150% expansion", description: "Unique semantic keywords mapped and ranking on search engines." },
        { name: "User Retention", standard: "Very low", mine: "Up to 3x higher", description: "Users engage with calculators and interactive elements longer." },
      ]
    },
    {
      title: lang === "it" ? "Criterio 3: Design Su Misura Pixel-Perfect" : "Criterion 3: Bespoke Pixel-Perfect Design",
      subtitle: lang === "it" ? "Estetica distintiva e psicologia della conversione" : "Distinctive aesthetics & conversion psychology",
      metricValue: "95%",
      metricLabel: lang === "it" ? "Memorabilità del Brand" : "Brand Memorability Score",
      badgeText: lang === "it" ? "Nessun Template Preconfezionato" : "Zero Boilerplates/Templates",
      description: lang === "it"
        ? "I template pronti e i boilerplate generici standardizzano la tua comunicazione, rendendoti indistinguibile dai concorrenti. Un design su misura, curato pixel per pixel, comunica prestigio, cura del dettaglio e autorevolezza. Questo impatto visivo consolida l'affidabilità del tuo brand e spinge l'utente all'azione."
        : "Pre-made layouts and cookie-cutter templates make your business blend in and look generic. A tailored custom layout built pixel-by-pixel conveys authority, precision, and luxury. High-quality visual hierarchy builds immediate consumer trust and triggers direct actions.",
      comparisonTitle: lang === "it" ? "Affidabilità e Percezione del Brand (%)" : "Perceived Brand Quality & Trust Score (%)",
      bars: [
        { label: lang === "it" ? "Il Mio Criterio (Codice & Design Artigianale)" : "My Build Criteria (Handcrafted Code & UI)", value: "95%", percentage: 95, isPrimary: true },
        { label: lang === "it" ? "Sito Standard (Template di Massa)" : "Standard Site (Cheap Mass-Market Template)", value: "20%", percentage: 20, isPrimary: false },
      ],
      metricsList: lang === "it" ? [
        { name: "Autorevolezza Percepita", standard: "Standard / Bassa", mine: "Premium / Eccellente", description: "L'impatto visivo iniziale che determina se l'utente si fida del brand." },
        { name: "Esperienza Mobile (UX)", standard: "Elementi disallineati", mine: "Ottimizzazione Fluida", description: "Adattabilità alle gesture e alla dimensione di ogni smartphone." },
        { name: "Tasso di Memorabilità", standard: "Dimenticato in 10s", mine: "Fisso nella mente", description: "Percentuale di utenti che ricordano il nome del brand dopo la visita." },
      ] : [
        { name: "Perceived Authority", standard: "Standard / Low", mine: "Premium / Outstanding", description: "The initial visual impact that decides if the user trusts you." },
        { name: "Mobile UX Fluidity", standard: "Broken alignment", mine: "Fluid Layouts", description: "Adherence to touch targets and smooth phone viewport resizing." },
        { name: "Brand Recall Rate", standard: "Forgotten in 10s", mine: "Highly Memorable", description: "Percentage of visitors who recall the brand name after leaving." },
      ]
    }
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
    <div className="w-full bg-[#F8F7F4] text-[#111113]">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] lg:min-h-screen flex items-center py-20 lg:py-36 overflow-hidden border-b border-[#111113]/10">
        {/* Ambient Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            style={{
              y,
              scale: 1.15,
            }}
            className="absolute inset-0 w-full h-full"
          >
            <video
              src="/facilissimo web (6).mp4"
              className="absolute inset-0 w-full h-full object-cover opacity-60 hidden lg:block"
              autoPlay
              loop
              muted
              playsInline
            />
            <img
              src="/images/facilissio web siti web professionali on line prima di ieri (1).png"
              alt="Mobile Background"
              className="absolute inset-0 w-full h-full object-cover opacity-60 lg:hidden"
            />
          </motion.div>
          {/* Desktop Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#111113]/95 via-[#111113]/60 to-[#111113]/25 pointer-events-none hidden lg:block" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#111113]/30 via-transparent to-[#111113] pointer-events-none hidden lg:block" />
          
          {/* Mobile/Tablet Overlays */}
          <div className="absolute inset-0 bg-[#567e75]/80 pointer-events-none lg:hidden" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#111113] pointer-events-none lg:hidden" />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full relative z-10">
          <div className="lg:col-span-10 xl:col-span-9 space-y-6">
            <div className="flex items-center gap-2 mb-4 animate-fade-in-up">
              <img
                src={logoImage}
                alt="Facilissimo Web Logo"
                className="w-[150px] h-[150px] object-contain animate-pulse"
              />
            </div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#E35930] font-mono font-bold block mb-2 animate-fade-in-up">
              {t.heroPreTitle}
            </span>
 
            <h1 className="font-tan text-2xl xs:text-3xl sm:text-5xl lg:text-7xl font-bold text-[#F8F7F4] leading-[1.1] tracking-tight animate-fade-in-up delay-75 break-words">
              {t.heroTitleRegular}{" "}
              <span className="italic block mt-1 font-normal text-[#E35930] font-tan break-words" style={{ fontSize: 'var(--h1-span-size, 52px)' }}>
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
        </div>
      </section>
 
      {/* Services / Focus Grid */}
      <section className="py-24 bg-[#FAF9F6] border-b border-[#111113]/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <div className="flex justify-center mb-4">
              <img
                src={logoImage}
                alt="Facilissimo Web Logo"
                className="w-[150px] h-[150px] object-contain"
              />
            </div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
              {t.approachPre}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-wide text-[#111113]">
              {t.approachTitle}
            </h2>
            <p className="text-[#111113]/70 font-sans text-xs sm:text-sm">
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
                onClick={() => handleOpenFeaturePopup(index)}
                className={`flex flex-col border bg-[#F8F7F4] transition-all duration-300 group relative cursor-pointer overflow-hidden p-6 ${
                  activeFeaturePopupIndex === index 
                    ? "border-[#E35930] shadow-[0_0_25px_rgba(227,89,48,0.12)] scale-[1.01]" 
                    : "border-[#111113]/10 hover:border-[#111113]/30 hover:scale-[1.01]"
                }`}
              >
                {/* Image Container representing each card visually */}
                <div className="relative w-full aspect-[16/10] overflow-hidden mb-5 border border-[#111113]/10 bg-zinc-105">
                  <img
                    src={feat.image}
                    alt={feat.title}
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle gradient overlay to blend */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6]/40 via-transparent to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className={`absolute bottom-3 left-3 w-8 h-8 border flex items-center justify-center transition-all ${
                    activeFeaturePopupIndex === index 
                      ? "bg-[#E35930] text-[#FAF9F6] border-[#E35930]" 
                      : "bg-[#F8F7F4]/90 text-[#111113] border-[#111113]/15 group-hover:bg-[#E35930] group-hover:text-[#FAF9F6] group-hover:border-[#E35930]"
                  }`}>
                    {feat.icon}
                  </div>
                  
                  {/* Live badge */}
                  <div className="absolute top-3 right-3 text-[7px] font-mono tracking-widest flex items-center gap-1 bg-[#F8F7F4]/90 border border-[#E35930]/30 px-2 py-0.5 text-[#E35930] font-bold">
                    <span>{lang === "it" ? "APRI CRITERIO" : "OPEN CRITERION"}</span>
                    <ArrowUpRight className="w-2 h-2" />
                  </div>
                </div>

                {/* Card Title & Tags */}
                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {feat.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-0.5 border text-[8px] font-bold tracking-widest font-mono bg-transparent transition-all ${
                          activeFeaturePopupIndex === index
                            ? "border-[#E35930] text-[#E35930]"
                            : "border-[#111113]/10 text-[#E35930]/80 group-hover:border-[#E35930]/30"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display text-base font-bold text-[#111113] group-hover:text-[#E35930] transition-colors">
                    {feat.title}
                  </h3>
                </div>

                {/* Key Metrics instead of long paragraph block */}
                <div className="mt-auto space-y-2 border-t border-[#111113]/10 pt-4">
                  {feat.highlightMetrics.map((metric, mIdx) => (
                    <div key={mIdx} className="flex items-center gap-2 text-[11px] font-sans text-[#111113]/80">
                      <div className="w-1.5 h-1.5 bg-[#E35930] shrink-0"></div>
                      <span className="font-medium">{metric}</span>
                    </div>
                  ))}
                </div>

                {/* Click action text */}
                <div className="mt-4 pt-3 border-t border-dashed border-[#111113]/10 flex items-center justify-between text-[9px] font-mono tracking-wider uppercase text-[#E35930]/70 group-hover:text-[#E35930] transition-colors">
                  <span>{lang === "it" ? "Vedi metriche di impatto" : "See impact metrics"}</span>
                  <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Gallery & Media Assets - Hidden from online public view as requested */}
      {/* <GallerySection lang={lang} isFacilitated={isFacilitated} /> */}
      {/* FAQ Section */}
      <section className="py-24 border-b border-[#111113]/10 bg-[#F8F7F4]">
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
      <section className="py-24 px-6 md:px-12 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto bg-[#FAF9F6] text-[#111113] p-12 md:p-20 relative overflow-hidden border border-[#111113]/15">
          <div className="relative z-10 text-center max-w-2xl mx-auto space-y-6">
            <div className="flex justify-center mb-4">
              <img
                src={logoImage}
                alt="Facilissimo Web Logo"
                className="w-[150px] h-[150px] object-contain"
              />
            </div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
              {t.ctaPre}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-[#111113]">
              {t.ctaTitle}
            </h2>
            <p className="text-[#111113]/80 font-sans text-xs sm:text-sm leading-relaxed">
              {t.ctaDesc}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <button
                onClick={() => setCurrentTab("contatti")}
                className="px-8 py-4 bg-[#E35930] text-[#FAF9F6] font-bold text-[10px] tracking-widest uppercase hover:bg-transparent hover:text-[#E35930] hover:border-[#E35930] transition-all cursor-pointer border border-[#E35930]"
                id="cta-contact-btn"
              >
                {t.ctaBtnPrimary}
              </button>
              <button
                onClick={() => setCurrentTab("chat")}
                className="px-8 py-4 bg-transparent hover:bg-[#111113]/5 border border-[#111113]/25 text-[#111113] font-bold text-[10px] tracking-widest uppercase transition-all cursor-pointer"
                id="cta-chat-btn"
              >
                {t.ctaBtnSecondary}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FULL-SCREEN OVERLAY PORTAL FOR DEMO APPS */}
      <AnimatePresence>
        {activeFullScreenApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#111113] z-[99999] flex flex-col overflow-hidden font-sans text-[#F8F7F4]"
          >
            {/* Top control and branding bar */}
            <div className="bg-[#151518] border-b border-[rgba(248,247,244,0.08)] px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E35930] animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F8F7F4]/90">
                  {activeFullScreenApp === "gusto" 
                    ? (lang === "it" ? "Gusto & Passione — Demo Web App" : "Gusto & Passione — Food Delivery Web App")
                    : activeFullScreenApp === "tattoo"
                    ? (lang === "it" ? "Tattoo Macerata — Demo Web App" : "Tattoo Macerata — Tattoo Booking Web App")
                    : (lang === "it" ? "Il Nido dei Sogni — Demo Web App" : "Dreamy Nursery — Childcare Web App")
                  }
                </span>
                <span className="hidden sm:inline px-2.5 py-0.5 bg-[#F8F7F4]/5 border border-[rgba(248,247,244,0.1)] font-mono text-[9px] text-[#F8F7F4]/50 rounded font-bold uppercase tracking-widest">
                  {lang === "it" ? "Pagina Intera" : "Full View Mode"}
                </span>
              </div>
              
              <button
                onClick={handleCloseFullScreen}
                className="px-4 py-2 bg-transparent hover:bg-[#E35930] text-[#E35930] hover:text-[#111113] border border-[#E35930]/30 hover:border-[#E35930] font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-250 flex items-center gap-2 cursor-pointer"
                title={lang === "it" ? "Chiudi e torna al sito" : "Close and return to site"}
              >
                <X className="w-4 h-4" />
                <span>{lang === "it" ? "TORNA INDIETRO" : "CLOSE FULL SCREEN"}</span>
              </button>
            </div>

            {/* Simulated browser window wrapper / main workspace */}
            <div className="flex-grow w-full bg-[#111113] flex justify-center items-center overflow-hidden p-0 sm:p-4">
              <div className="w-full h-full max-w-5xl bg-[#111113] shadow-2xl sm:border border-[rgba(248,247,244,0.08)] flex flex-col overflow-hidden relative">
                {activeFullScreenApp === "gusto" ? (
                  <div className="w-full h-full bg-zinc-50 overflow-hidden relative text-zinc-950">
                    <GustoPassioneApp lang={lang} />
                  </div>
                ) : activeFullScreenApp === "tattoo" ? (
                  <div className="w-full h-full bg-[#09070f] overflow-hidden relative text-gray-100">
                    <TattooMacerataApp lang={lang} />
                  </div>
                ) : (
                  <div className="w-full h-full bg-[#FFF5F5] overflow-hidden relative text-slate-700">
                    <NidoSogniApp lang={lang} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULL-SCREEN OVERLAY PORTAL FOR BUILD CRITERIA POPUPS */}
      <AnimatePresence>
        {activeFeaturePopupIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#070708]/98 backdrop-blur-xl z-[99999] flex flex-col overflow-y-auto"
          >
            {/* Top control header bar */}
            <div className="sticky top-0 bg-[#0d0d0f]/90 backdrop-blur-md border-b border-[rgba(248,247,244,0.08)] px-6 sm:px-10 py-4 flex items-center justify-between shrink-0 select-none z-50">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#E35930] animate-ping"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#F8F7F4]/90">
                  {lang === "it" ? "METRICHE PRESTAZIONALI & CRITERI DI COSTRUZIONE" : "PERFORMANCE METRICS & BUILD STANDARDS"}
                </span>
              </div>
              
              <button
                onClick={handleCloseFeaturePopup}
                className="px-4 py-2 bg-transparent hover:bg-[#E35930] text-[#E35930] hover:text-[#111113] border border-[#E35930]/30 hover:border-[#E35930] font-mono text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
                title={lang === "it" ? "Chiudi" : "Close"}
              >
                <X className="w-4 h-4" />
                <span>{lang === "it" ? "CHIUDI" : "CLOSE"}</span>
              </button>
            </div>

            {/* Inner scrollable area */}
            <div className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-12 py-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                
                {/* Left Side: Massive visual representation and description */}
                <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
                  
                  {/* Category and active badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E35930]/10 border border-[#E35930]/30 rounded text-[9px] font-mono font-bold uppercase tracking-widest text-[#E35930]">
                      {features[activeFeaturePopupIndex].tags[0]}
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F8F7F4]/5 border border-[rgba(248,247,244,0.1)] rounded text-[9px] font-mono tracking-widest text-[#F8F7F4]/60">
                      {features[activeFeaturePopupIndex].tags[1]}
                    </div>
                  </div>

                  {/* Main Title */}
                  <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#F8F7F4] leading-[1.1]">
                    {statsData[activeFeaturePopupIndex].title}
                  </h2>

                  {/* Aesthetic Representation - Big Image with dynamic scanlines overlay */}
                  <div className="relative aspect-[16/10] overflow-hidden border border-[rgba(248,247,244,0.15)] bg-zinc-950 shadow-2xl group">
                    <img
                      src={features[activeFeaturePopupIndex].image}
                      alt={features[activeFeaturePopupIndex].title}
                      className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    {/* Dark filter blend */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
                    
                    {/* Glowing indicator */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="font-mono text-[9px] text-[#F8F7F4]/70 tracking-widest">REALTIME PROOF OK</span>
                    </div>

                    {/* Scanning tech line effect */}
                    <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#E35930]/50 to-transparent top-1/2 -translate-y-1/2 shadow-[0_0_8px_#E35930] opacity-40"></div>
                  </div>

                  {/* Full detailed description explaining why it's critical */}
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-sm uppercase tracking-wider text-[#E35930]">
                      {lang === "it" ? "Perché questo criterio è essenziale" : "Why this standard is vital"}
                    </h3>
                    <p className="text-sm text-[#F8F7F4]/80 leading-relaxed font-sans">
                      {statsData[activeFeaturePopupIndex].description}
                    </p>
                  </div>

                  {/* Key Metrics Bullet list */}
                  <div className="p-5 bg-[#151518] border border-[rgba(248,247,244,0.06)] rounded space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#F8F7F4] font-mono">
                      <TrendingUp className="w-4 h-4 text-[#E35930]" />
                      <span>{lang === "it" ? "VALUTAZIONE DI IMPATTO" : "IMPACT SCORE CARD"}</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      {features[activeFeaturePopupIndex].highlightMetrics.map((met, metIdx) => (
                        <div key={metIdx} className="flex items-center gap-2 text-xs font-sans text-[#F8F7F4]/80 bg-[#111113] p-2.5 border border-[rgba(248,247,244,0.04)]">
                          <Check className="w-3.5 h-3.5 text-[#E35930]" />
                          <span>{met}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Side: Detailed Comparison Charts & Audit */}
                <div className="lg:col-span-7 space-y-10">
                  
                  {/* Huge numeric metric indicator */}
                  <div className="bg-[#151518] border border-[rgba(248,247,244,0.06)] p-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#E35930]/5 rounded-full blur-3xl -mr-10 -mt-10"></div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E35930] block mb-1">
                        {statsData[activeFeaturePopupIndex].metricLabel}
                      </span>
                      <span className="text-xs text-[#F8F7F4]/50 font-sans block">
                        {lang === "it" ? "Ottenuto applicando il mio processo di sviluppo" : "Achieved applying my build standards"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-display text-5xl sm:text-7xl font-black text-[#F8F7F4] tracking-tight block">
                        {statsData[activeFeaturePopupIndex].metricValue}
                      </span>
                    </div>
                  </div>

                  {/* Bar Comparison section */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F8F7F4]/70 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-[#E35930]" />
                      {statsData[activeFeaturePopupIndex].comparisonTitle}
                    </h4>
                    
                    <div className="space-y-5 bg-[#151518] p-6 border border-[rgba(248,247,244,0.06)] rounded">
                      {statsData[activeFeaturePopupIndex].bars.map((bar, bIdx) => (
                        <div key={bIdx} className="space-y-2">
                          <div className="flex justify-between text-xs font-sans">
                            <span className={bar.isPrimary ? "font-bold text-[#F8F7F4] flex items-center gap-1.5" : "text-[#F8F7F4]/60"}>
                              {bar.isPrimary && <span className="w-1.5 h-1.5 rounded-full bg-[#E35930]"></span>}
                              {bar.label}
                            </span>
                            <span className={bar.isPrimary ? "font-mono font-bold text-[#E35930]" : "font-mono text-[#F8F7F4]/50"}>
                              {bar.value}
                            </span>
                          </div>
                          <div className="h-3 bg-[#111113] border border-[rgba(248,247,244,0.08)] rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${bar.percentage}%` }}
                              transition={{ duration: 1.2, delay: 0.1 }}
                              className={`h-full rounded-full ${
                                bar.isPrimary 
                                  ? "bg-gradient-to-r from-[#E35930] to-[#f07b57]" 
                                  : "bg-zinc-700"
                              }`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Detailed Metric comparative audit list */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F8F7F4]/70">
                      {lang === "it" ? "PARAMETRI DETTAGLIATI A CONFRONTO" : "DETAILED AUDIT METRICS"}
                    </h4>
                    
                    <div className="border border-[rgba(248,247,244,0.06)] rounded overflow-hidden shadow-xl">
                      {/* Table Header */}
                      <div className="grid grid-cols-12 bg-[#151518] border-b border-[rgba(248,247,244,0.06)] p-3.5 text-[10px] font-mono text-[#F8F7F4]/40 uppercase tracking-wider">
                        <div className="col-span-5">{lang === "it" ? "Indicatore Prestazionale" : "Performance KPI"}</div>
                        <div className="col-span-3 text-center">{lang === "it" ? "Sito Comune" : "Standard Site"}</div>
                        <div className="col-span-4 text-right text-[#E35930] font-bold">{lang === "it" ? "Il Mio Standard" : "My Build Criteria"}</div>
                      </div>

                      {/* Comparative Rows */}
                      <div className="divide-y divide-[rgba(248,247,244,0.06)] bg-[#111113]/40">
                        {statsData[activeFeaturePopupIndex].metricsList.map((metric, mIdx) => (
                          <div key={mIdx} className="p-4 space-y-1.5 hover:bg-[#151518]/25 transition-colors">
                            <div className="grid grid-cols-12 items-baseline text-xs">
                              <div className="col-span-5 font-bold text-[#F8F7F4] font-display">
                                {metric.name}
                              </div>
                              <div className="col-span-3 text-center text-[#F8F7F4]/40 line-through">
                                {metric.standard}
                              </div>
                              <div className="col-span-4 text-right text-[#E35930] font-bold font-mono flex items-center justify-end gap-1.5">
                                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span className="bg-[#E35930]/10 px-2.5 py-0.5 border border-[#E35930]/20 text-[#E35930] text-[11px] rounded">{metric.mine}</span>
                              </div>
                            </div>
                            <p className="text-[11px] text-[#F8F7F4]/50 font-sans leading-relaxed">
                              {metric.description}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Summary Callout explaining the value */}
                  <div className="p-6 bg-[#E35930]/5 border border-[#E35930]/20 space-y-3">
                    <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-[#E35930]">
                      {lang === "it" ? "✓ Garanzia Teresa Rogani" : "✓ Teresa Rogani Promise"}
                    </h5>
                    <p className="text-xs text-[#F8F7F4]/70 font-sans leading-relaxed">
                      {lang === "it" 
                        ? "Ogni sito è costruito senza codice ridondante o temi commerciali prefabbricati. Ricevi una soluzione su misura che ti differenzia immediatamente, carica all'istante ed è predisposta per l'indicazione semantica automatica."
                        : "Every web page is engineered from scratch, free of bloated page-builders and redundant legacy plugins. You receive a custom, high-converting digital product that loads immediately and is ready for automated semantic search ranking."}
                    </p>
                  </div>

                </div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
