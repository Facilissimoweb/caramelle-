import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Cpu, Zap, ArrowRight, Heart, CheckCircle2, Sparkles, Maximize2, X } from "lucide-react";
import { translations } from "../translations";
import FAQAccordion from "./FAQAccordion";
import GallerySection from "./GallerySection";
import TattooMacerataApp from "./TattooMacerataApp";
import GustoPassioneApp from "./GustoPassioneApp";
import NidoSogniApp from "./NidoSogniApp";

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

  const handleOpenFullScreen = (app: "gusto" | "tattoo" | "nido") => {
    setActiveFullScreenApp(app);
    document.body.style.overflow = "hidden";
  };

  const handleCloseFullScreen = () => {
    setActiveFullScreenApp(null);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseFullScreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, []);
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

      {/* Portfolio / Progetti Evoluti — Live Interactive Showcases */}
      <section className="py-24 bg-[#111113] border-b border-[rgba(248,247,244,0.1)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl space-y-3">
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
                {lang === "it" ? "[ DEMO LIVE INTERATTIVE ]" : "[ LIVE INTERACTIVE DEMOS ]"}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F8F7F4]">
                {lang === "it" ? "I Nostri Progetti Evoluti" : "Our Advanced Projects"}
              </h2>
              <p className="text-[#F8F7F4]/70 text-xs sm:text-sm leading-relaxed max-w-xl">
                {lang === "it"
                  ? "Sperimenta in tempo reale la fluidità e il design su misura delle nostre applicazioni mobile-first. Clicca, ordina o calcola un preventivo direttamente nei simulatori."
                  : "Experience in real time the fluidity and bespoke design of our mobile-first applications. Click, order, or estimate pricing directly inside the simulators."}
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

          {/* DUAL INTERACTIVE APPS GRID */}
          <div className="space-y-24">
            
            {/* APP 1: GUSTO & PASSIONE (FIRST VISIBLE APP) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-400">
                    {lang === "it" ? "DEMO LIVE — FACILISSIMO WEB" : "LIVE DEMO — FACILISSIMO WEB"}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8F7F4] leading-[1.1]">
                  Gusto &amp; Passione — <span className="italic font-normal text-amber-500">{lang === "it" ? "Ristorazione & Delivery" : "Food Delivery App"}</span>
                </h3>
                
                <p className="text-[#F8F7F4]/70 font-sans text-xs sm:text-sm leading-relaxed">
                  {lang === "it"
                    ? "Una piattaforma premium sviluppata in ottica mobile-first per ristoranti, pizzerie e locali enogastronomici. Unisce la bellezza estetica delle immagini culinarie alla potenza dell'interattività: menu con categorie intuitive, ricerca rapida dei piatti, carrello dinamico con fidelizzazione punti lealtà e checkout simulato con carta di credito."
                    : "A premium restaurant platform designed from the ground up for mobile devices. It merges stunning culinary imagery with deep interactive mechanics: tabbed categories, real-time product search, dynamic shopping cart, a point-based customer loyalty card, and a mock credit card transaction gateway."}
                </p>

                <div className="space-y-4 font-sans text-xs text-[#F8F7F4]/70 leading-relaxed">
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#F8F7F4]">{lang === "it" ? "Menu & Carrello Completi" : "Full Interactive Ordering"}</h4>
                      <p className="text-[11px] text-[#F8F7F4]/50 leading-relaxed">
                        {lang === "it" 
                          ? "Filtra per pizze, primi o bibite marchigiane, aggiungi elementi speciali nel carrello e completa l'acquisto simulato." 
                          : "Filter dishes, customize order notes, manage the live cart items, and complete the simulated checkout process."}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#F8F7F4]">{lang === "it" ? "Fidelity Card Marchigiana" : "Local Loyalty Card"}</h4>
                      <p className="text-[11px] text-[#F8F7F4]/50 leading-relaxed">
                        {lang === "it" 
                          ? "I clienti accumulano punti reali da convertire in regali gastronomici (es. Cantucci o Birra) visibili nella seconda scheda dell'app." 
                          : "Simulates actual reward collection based on order size, redeemable for local delicacies inside the loyalty reward tab."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col items-center gap-4 w-full">
                <div className="w-full max-w-[390px] bg-[#151518] rounded-[40px] p-3.5 border-4 border-zinc-800/80 shadow-2xl relative overflow-hidden">
                  {/* Speaker slot & camera bar */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-zinc-900 rounded-full z-50 flex items-center justify-center gap-1.5 border border-zinc-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                    <span className="w-10 h-1 bg-zinc-800 rounded-full"></span>
                  </div>
                  
                  {/* App Frame Inner Content */}
                  <div className="rounded-[28px] overflow-hidden bg-white border border-zinc-900 h-[640px] relative scrollbar-none">
                    <GustoPassioneApp lang={lang} />
                  </div>
                </div>

                {/* APRI A PAGINA INTERA Button */}
                <button
                  onClick={() => handleOpenFullScreen("gusto")}
                  className="w-full max-w-[390px] py-3.5 px-6 border border-[#E35930] hover:bg-[#E35930] text-[#E35930] hover:text-[#111113] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#E35930]/10"
                >
                  <Maximize2 className="w-4 h-4 animate-pulse" />
                  {lang === "it" ? "APRI A PAGINA INTERA" : "OPEN FULL PAGE"}
                </button>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-gradient-to-r from-transparent via-[rgba(248,247,244,0.15)] to-transparent"></div>

            {/* APP 2: TATTOO MACERATA (SECOND VISIBLE APP) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full">
                  <Sparkles className="w-3 h-3 text-purple-400" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-purple-400">
                    {lang === "it" ? "DEMO LIVE — FACILISSIMO WEB" : "LIVE DEMO — FACILISSIMO WEB"}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8F7F4] leading-[1.1]">
                  Tattoo Macerata — <span className="italic font-normal text-purple-400">{lang === "it" ? "Studio Tattoo & Booking" : "Tattoo Studio App"}</span>
                </h3>
                
                <p className="text-[#F8F7F4]/70 font-sans text-xs sm:text-sm leading-relaxed">
                  {lang === "it"
                    ? "Un'applicazione mobile-first ad altissimo impatto scenico gotico, progettata per studi di tatuaggi d'elite, barbieri o attività artistiche delle Marche. Combina l'estetica delle texture di inchiostro scuro a calcolatori dinamici di preventivo basati su dimensioni e complessità del tatuaggio, prenotazione della prima consulenza gratuita e recensioni reali."
                    : "A highly evocative dark/gothic-themed mobile app tailored for elite tattoo artists, studios, and niche artistic services. Integrates comprehensive studio details, an interactive price slider reflecting design dimensions and color complexities, and a live testimonial feed."}
                </p>

                <div className="space-y-4 font-sans text-xs text-[#F8F7F4]/70 leading-relaxed">
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#F8F7F4]">{lang === "it" ? "Preventivatore di Costo Rapido" : "Instant Price Estimator"}</h4>
                      <p className="text-[11px] text-[#F8F7F4]/50 leading-relaxed">
                        {lang === "it" 
                          ? "Sposta il cursore per simulare la dimensione del tatuaggio, seleziona i colori e la complessità per calcolare istantaneamente la stima del prezzo." 
                          : "Move the slider to configure size, choose colors and complexity to get an immediate cost estimation range."}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#F8F7F4]">{lang === "it" ? "Integrazione Automatica del Preventivo" : "One-Click Quote Transfer"}</h4>
                      <p className="text-[11px] text-[#F8F7F4]/50 leading-relaxed">
                        {lang === "it" 
                          ? "Invia i parametri del preventivo direttamente nel modulo di prenotazione con un semplice click, facilitando la prenotazione della consulenza." 
                          : "Transfer the calculated cost estimation directly into the booking parameters with one click to streamline consultation scheduling."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col items-center gap-4 w-full">
                <div className="w-full max-w-[390px] bg-[#151518] rounded-[40px] p-3.5 border-4 border-zinc-800/80 shadow-2xl relative overflow-hidden">
                  {/* Speaker slot & camera bar */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-zinc-900 rounded-full z-50 flex items-center justify-center gap-1.5 border border-zinc-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                    <span className="w-10 h-1 bg-zinc-800 rounded-full"></span>
                  </div>
                  
                  {/* App Frame Inner Content */}
                  <div className="rounded-[28px] overflow-hidden bg-black border border-zinc-900 h-[640px] relative scrollbar-none">
                    <TattooMacerataApp lang={lang} />
                  </div>
                </div>

                {/* APRI A PAGINA INTERA Button */}
                <button
                  onClick={() => handleOpenFullScreen("tattoo")}
                  className="w-full max-w-[390px] py-3.5 px-6 border border-[#00ff88] hover:bg-[#00ff88] text-[#00ff88] hover:text-[#09070f] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#00ff88]/10"
                >
                  <Maximize2 className="w-4 h-4 animate-pulse" />
                  {lang === "it" ? "APRI A PAGINA INTERA" : "OPEN FULL PAGE"}
                </button>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-gradient-to-r from-transparent via-[rgba(248,247,244,0.15)] to-transparent"></div>

            {/* APP 3: IL NIDO DEI SOGNI (THIRD VISIBLE APP) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-pink-400">
                    {lang === "it" ? "DEMO LIVE — FACILISSIMO WEB" : "LIVE DEMO — FACILISSIMO WEB"}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#F8F7F4] leading-[1.1]">
                  Il Nido dei Sogni — <span className="italic font-normal text-pink-400">{lang === "it" ? "Asilo Nido & Servizi Infanzia" : "Nursery & Childcare App"}</span>
                </h3>
                
                <p className="text-[#F8F7F4]/70 font-sans text-xs sm:text-sm leading-relaxed">
                  {lang === "it"
                    ? "Un'applicazione mobile-first luminosa e rassicurante, su misura per asili nido, scuole dell'infanzia, ludoteche o educatrici professionali di Macerata e delle Marche. Integra la bellezza delle foto delle aule biologiche a strumenti pedagogici e interattivi per le famiglie: un generatore di avatar mascotte per l'armadietto dei bambini, il diario di bordo giornaliero digitale (pasti, sonno, umore) e prenotazione visite guidate."
                    : "A bright and welcoming mobile-first web app designed for nurseries, kindergartens, playrooms, and child education professionals in Macerata. Merges high-quality classroom imagery with engaging features: a customized mascot avatar generator for kids, a daily digital board reporting meal and sleep statuses, and a streamlined tour booking form."}
                </p>

                <div className="space-y-4 font-sans text-xs text-[#F8F7F4]/70 leading-relaxed">
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#F8F7F4]">{lang === "it" ? "Generatore di Mascotte Interattivo" : "Interactive Mascot Builder"}</h4>
                      <p className="text-[11px] text-[#F8F7F4]/50 leading-relaxed">
                        {lang === "it" 
                          ? "I genitori possono digitare il nome del bambino, scegliere l'animaletto della sezione, il colore preferito e un simpatico accessorio creando l'avatar per l'armadietto." 
                          : "Parents can personalize school cabinet labels by writing the child's name, picking a cartoon mascot, customizing the brand color, and overlaying sweet decorations."}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#F8F7F4]">{lang === "it" ? "Diario di Bordo Digitale" : "Live Children Log Sheet"}</h4>
                      <p className="text-[11px] text-[#F8F7F4]/50 leading-relaxed">
                        {lang === "it" 
                          ? "Simula la bacheca in tempo reale che mostra l'andamento della giornata: orari del pranzo bio, ore di riposino e livello di felicità per tenere i genitori sereni." 
                          : "Simulates daily activity logs tracking bio-organic meals, nap cycles, and sensory play milestones to provide full family visibility."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col items-center gap-4 w-full">
                <div className="w-full max-w-[390px] bg-[#151518] rounded-[40px] p-3.5 border-4 border-zinc-800/80 shadow-2xl relative overflow-hidden">
                  {/* Speaker slot & camera bar */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-zinc-900 rounded-full z-50 flex items-center justify-center gap-1.5 border border-zinc-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
                    <span className="w-10 h-1 bg-zinc-800 rounded-full"></span>
                  </div>
                  
                  {/* App Frame Inner Content */}
                  <div className="rounded-[28px] overflow-hidden bg-[#FFF5F5] border border-zinc-900 h-[640px] relative scrollbar-none">
                    <NidoSogniApp lang={lang} />
                  </div>
                </div>

                {/* APRI A PAGINA INTERA Button */}
                <button
                  onClick={() => handleOpenFullScreen("nido")}
                  className="w-full max-w-[390px] py-3.5 px-6 border border-[#F472B6] hover:bg-[#F472B6] text-[#F472B6] hover:text-[#111113] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#F472B6]/10"
                >
                  <Maximize2 className="w-4 h-4 animate-pulse" />
                  {lang === "it" ? "APRI A PAGINA INTERA" : "OPEN FULL PAGE"}
                </button>
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
    </div>
  );
}
