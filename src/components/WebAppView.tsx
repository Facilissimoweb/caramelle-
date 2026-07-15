import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Maximize2, X, ArrowRight, ExternalLink, Globe, Smartphone, Monitor, Square, Layout, Eye } from "lucide-react";
import { translations } from "../translations";

const logoImage = "/f (1600 x 500 px).webp";

interface WebAppViewProps {
  setCurrentTab: (tab: string) => void;
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function WebAppView({ setCurrentTab, lang, isFacilitated }: WebAppViewProps) {
  const t = translations[lang][isFacilitated ? "facilitated" : "normal"];
  const [aspectRatio, setAspectRatio] = useState<"vertical" | "horizontal">("vertical");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const canvaEmbedUrl = "https://www.canva.com/design/DAHPcbuC8m4/SHDh85WpbFgG_aPjdWMFPw/view?embed";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111113] relative selection:bg-[#c48f8a]/20">
      {/* Decorative background ambient light */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#c48f8a]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Section */}
      <section className="py-12 sm:py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-[#111113]/10 pb-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={logoImage}
                  alt="Facilissimo Web Logo"
                  className="w-[120px] sm:w-[150px] h-auto object-contain"
                />
              </div>
              <span className="text-[9px] font-mono tracking-[0.3em] text-[#c48f8a] font-bold uppercase block">
                {lang === "it" ? "[ PROGETTO ATTIVO & INTERATTIVO ]" : "[ ACTIVE INTERACTIVE PROJECT ]"}
              </span>
              <h1 className="font-tan text-3xl sm:text-5xl font-bold tracking-tight text-[#111113]">
                {lang === "it" ? "Web App & Progetti" : "Web Apps & Projects"}
              </h1>
              <p className="text-[#111113]/70 text-xs sm:text-sm leading-relaxed max-w-xl">
                {lang === "it"
                  ? "Abbiamo aggiornato questa sezione caricando il progetto interattivo 'Interactive Florist Landing Page' di Maria Teresa Rogani. Interagisci direttamente con il simulatore sottostante."
                  : "We updated this section by uploading Maria Teresa Rogani's 'Interactive Florist Landing Page' project. Experience it directly inside the simulator below."}
              </p>
            </div>
            
            <button
              onClick={() => setCurrentTab("proposte")}
              className="text-[#c48f8a] hover:text-[#111113] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-all group cursor-pointer border border-[#c48f8a]/30 hover:border-[#c48f8a] px-5 py-3 rounded-none bg-transparent self-stretch md:self-auto justify-center text-center"
              id="webappview-view-services-btn"
            >
              {t.portfolioViewAll}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Interactive Project Showcase Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Descriptive Side Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-600">
                  {lang === "it" ? "PROGETTO SELEZIONATO" : "FEATURED PROJECT"}
                </span>
              </div>
              
              <h3 className="font-tan text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111113] leading-[1.1]">
                Interactive Florist Landing Page — <span className="italic font-normal text-[#c48f8a]">Dusty Pink, Dark Green, Lime Green</span>
              </h3>
              
              <p className="text-[#111113]/70 font-sans text-xs sm:text-sm leading-relaxed">
                {lang === "it"
                  ? "Interactive Florist Landing Page in Dusty Pink Dark Green Lime Green Soft & Clean Style di Maria Teresa Rogani. Un design pulito, delicato ed estremamente moderno creato per valorizzare ogni dettaglio floreale."
                  : "Interactive Florist Landing Page in Dusty Pink Dark Green Lime Green Soft & Clean Style by Maria Teresa Rogani. A clean, delicate, and extremely modern design crafted to elevate every floral detail."}
              </p>

              <div className="space-y-4 font-sans text-xs text-[#111113]/70 leading-relaxed border-t border-[#111113]/10 pt-6">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#111113]">
                  {lang === "it" ? "Caratteristiche del Design:" : "Design Keynotes:"}
                </h4>
                
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111113]">{lang === "it" ? "Contrasto e Pulizia Visiva" : "High Contrast & Cleanliness"}</h5>
                    <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                      {lang === "it" 
                         ? "Colori bilanciati per guidare l'attenzione dell'utente sugli elementi chiave senza distrazioni." 
                         : "Balanced tones tailored to draw client attention to focal products without visual noise."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111113]">{lang === "it" ? "Ottimizzazione Multidispositivo" : "Multi-device Optimization"}</h5>
                    <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                      {lang === "it" 
                         ? "Utilizza i controlli a lato per vedere come si comporta il layout in versione verticale (smartphone), orizzontale o quadrata." 
                         : "Use the toggles on the simulator to see how the layout performs in vertical (mobile), horizontal, or square formats."}
                    </p>
                  </div>
                </div>
              </div>

              {/* No external link to keep users on the site */}
            </div>

            {/* Simulated Simulator Column */}
            <div className="lg:col-span-7 flex flex-col items-center gap-4 w-full">
              
              {/* Aspect Ratio Selector bar styled elegantly */}
              <div className="flex items-center justify-between w-full max-w-[390px] bg-[#FAF9F6] border border-[#111113]/10 p-2 rounded-none">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#111113]/50 px-2">
                  {lang === "it" ? "Formato:" : "Format:"}
                </span>
                <div className="inline-flex bg-[#111113]/5 p-0.5">
                  <button
                    onClick={() => setAspectRatio("vertical")}
                    className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      aspectRatio === "vertical"
                        ? "bg-[#c48f8a] text-white shadow-sm"
                        : "text-[#111113]/60 hover:text-[#111113]"
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    {lang === "it" ? "Cell" : "Mobile"}
                  </button>
                  <button
                    onClick={() => setAspectRatio("horizontal")}
                    className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      aspectRatio === "horizontal"
                        ? "bg-[#c48f8a] text-white shadow-sm"
                        : "text-[#111113]/60 hover:text-[#111113]"
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    {lang === "it" ? "Orizzontale" : "Desktop"}
                  </button>
                </div>
              </div>

              {/* Simulator Device Frame */}
              <div className={`w-full transition-all duration-300 ${
                aspectRatio === "vertical" 
                  ? "max-w-[390px] border-4 border-zinc-200 bg-[#FAF9F6] rounded-[40px] p-3 shadow-xl relative" 
                  : "max-w-full border border-[#111113]/10 p-2 bg-[#FAF9F6] shadow-md"
              }`}>
                {/* Smartphone Speaker Slot overlay only if in vertical/mobile mode */}
                {aspectRatio === "vertical" && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-100 rounded-full z-50 flex items-center justify-center gap-1.5 border border-zinc-200">
                    <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                    <span className="w-8 h-1 bg-zinc-200 rounded-full"></span>
                  </div>
                )}

                {/* Simulated Screen */}
                <div 
                  className={`relative w-full overflow-hidden bg-white ${
                    aspectRatio === "vertical" ? "rounded-[28px] border border-zinc-200" : "border border-[#111113]/5"
                  }`}
                  style={{
                    paddingTop: aspectRatio === "vertical" ? "177.78%" : "56.25%",
                    willChange: "transform"
                  }}
                >
                  <iframe 
                    loading="lazy" 
                    style={{ 
                      position: "absolute", 
                      width: "100%", 
                      height: "100%", 
                      top: 0, 
                      left: 0, 
                      border: "none", 
                      padding: 0, 
                      margin: 0 
                    }}
                    src={canvaEmbedUrl} 
                    allowFullScreen={true}
                    allow="fullscreen"
                    title="Interactive Florist Landing Page"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 w-full max-w-[390px]">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="flex-1 py-3.5 px-6 border border-[#c48f8a] hover:bg-[#c48f8a] text-[#c48f8a] hover:text-[#FAF9F6] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Maximize2 className="w-4 h-4 animate-pulse" />
                  {lang === "it" ? "SCHERMO INTERO" : "FULL VIEW"}
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FULL-SCREEN PRESENTATION OVERLAY */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#F8F7F4] z-[99999] flex flex-col overflow-hidden font-sans text-[#111113]"
          >
            {/* Top control and branding bar */}
            <div className="bg-[#FAF9F6] border-b border-[#111113]/10 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#c48f8a] animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]">
                  Interactive Florist Landing Page
                </span>
                <span className="hidden sm:inline px-2.5 py-0.5 bg-[#111113]/5 border border-[#111113]/10 font-mono text-[9px] text-[#111113]/50 rounded font-bold uppercase tracking-widest">
                  {lang === "it" ? "Progetto Presentazione" : "Project Presentation"}
                </span>
              </div>
              
              <button
                onClick={() => setIsFullscreen(false)}
                className="px-4 py-2 bg-[#c48f8a] text-[#FAF9F6] border border-[#c48f8a] font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-250 flex items-center gap-2 cursor-pointer"
                title={lang === "it" ? "Chiudi" : "Close"}
              >
                <X className="w-4 h-4" />
                <span>{lang === "it" ? "CHIUDI" : "CLOSE"}</span>
              </button>
            </div>

            {/* Main view area */}
            <div className="flex-grow w-full bg-[#FAF9F6] flex justify-center items-center overflow-hidden p-0 sm:p-4">
              <div className="w-full h-full max-w-5xl bg-[#FAF9F6] shadow-2xl sm:border border-[#111113]/10 flex flex-col overflow-hidden relative">
                <iframe 
                  loading="lazy" 
                  className="w-full h-full border-none"
                  src={canvaEmbedUrl} 
                  allowFullScreen={true}
                  allow="fullscreen"
                  title="Interactive Florist Landing Page presentation Fullscreen"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
