import React, { useState, useEffect } from 'react';
import { Terminal, Cpu, ShieldAlert, Zap, ChevronRight, ChevronLeft, RotateCcw, AlertTriangle, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Slide {
  id: number;
  icon: React.ReactNode;
  image: string;
  title: Record<"it" | "en", string>;
  faq: Record<"it" | "en", string>;
  content: Record<"it" | "en", string>;
  neonColor: "cyan" | "pink" | "yellow" | "green";
}

interface CyberAiGuideAppProps {
  lang?: string;
}

// Dati delle schede FAQ localizzati con immagini a tema Cyberpunk
const slides: Slide[] = [
  {
    id: 1,
    icon: <Terminal className="w-8 h-8 text-cyan-400" />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    title: {
      it: "INIT: COS'È L'IA?",
      en: "INIT: WHAT IS AI?"
    },
    faq: {
      it: "L'IA è una mente aliena?",
      en: "Is AI an alien mind?"
    },
    content: {
      it: "Negativo. È un software avanzato. Non prova emozioni e non complotta. È semplicemente in grado di leggere enormi quantità di dati in pochi secondi e trovare schemi logici per aiutarti a scrivere, calcolare e organizzare il tuo business locale.",
      en: "Negative. It is advanced software. It does not feel emotions or plot. It is simply capable of reading huge amounts of data in seconds and finding logical patterns to help you write, compute, and organize your local business."
    },
    neonColor: "cyan"
  },
  {
    id: 2,
    icon: <AlertTriangle className="w-8 h-8 text-pink-500" />,
    image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=600&q=80",
    title: {
      it: "FAQ 01: IL LAVORO",
      en: "FAQ 01: WORKPLACE"
    },
    faq: {
      it: "L'IA mi ruberà il lavoro?",
      en: "Will AI steal my job?"
    },
    content: {
      it: "Falso. L'IA non può sostituire la manualità, l'empatia o l'esperienza di un artigiano o di un negoziante di Macerata. Tuttavia, un tuo concorrente che usa l'IA per gestire le email in 5 minuti (mentre tu ci metti un'ora) avrà un vantaggio. L'IA è il tuo nuovo esoscheletro digitale.",
      en: "False. AI cannot replace manual skill, empathy, or the experience of a local artisan or shop owner. However, a competitor using AI to manage emails in 5 minutes (while you take an hour) will have an edge. AI is your new digital exoskeleton."
    },
    neonColor: "pink"
  },
  {
    id: 3,
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    image: "https://images.unsplash.com/photo-1614729939124-03290b0409fe?w=600&q=80",
    title: {
      it: "FAQ 02: I COSTI",
      en: "FAQ 02: COSTS"
    },
    faq: {
      it: "Costa troppo per una microimpresa?",
      en: "Is it too expensive for a micro-business?"
    },
    content: {
      it: "Assolutamente no. Molti degli strumenti più potenti (come le chat generative per scrivere testi o idee social) hanno versioni gratuite o costano quanto un abbonamento a Netflix. Il vero costo oggi è ignorare questa tecnologia.",
      en: "Absolutely not. Many of the most powerful tools (like generative chats for writing copy or brainstorming social media ideas) have free tiers or cost as much as a Netflix subscription. The real cost today is ignoring this technology."
    },
    neonColor: "yellow"
  },
  {
    id: 4,
    icon: <ShieldAlert className="w-8 h-8 text-green-400" />,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
    title: {
      it: "FAQ 03: SICUREZZA",
      en: "FAQ 03: SECURITY"
    },
    faq: {
      it: "I miei dati aziendali sono al sicuro?",
      en: "Are my business data safe?"
    },
    content: {
      it: "L'IA è sicura se la usi con consapevolezza. La regola d'oro: non inserire mai password, dati bancari o segreti industriali nelle chat pubbliche. Usala per generare idee, bozze e strategie pubbliche. Facilissimo Web ti insegna a farlo senza rischi.",
      en: "AI is secure when used with awareness. The golden rule: never input passwords, bank details, or industrial secrets in public chats. Use it to generate ideas, drafts, and public strategies. Facilissimo Web teaches you how to do this safely."
    },
    neonColor: "green"
  }
];

export default function CyberAiGuideApp({ lang = "it" }: CyberAiGuideAppProps) {
  const activeLang = (lang === "en" ? "en" : "it") as "it" | "en";
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

  // Auto-play effect: switch slide every 5 seconds when isPlaying is true
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    }, 5000);

    return () => clearInterval(timer);
  }, [isPlaying, currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  const reset = () => setCurrentSlide(0);

  const isLastSlide = currentSlide === slides.length - 1;

  // Touch Swipe Handlers for mobile navigation without page scroll interference
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchStartY(e.targetTouches[0].clientY);
    setTouchEndX(null);
    setTouchEndY(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
    setTouchEndY(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null || touchStartY === null || touchEndY === null) return;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;

    // Only trigger horizontal swipe if movement is mostly horizontal & exceeds 50px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  // Gestione colori neon dinamici garantiti (no purge Tailwind)
  const getNeonStyles = (colorStr: "cyan" | "pink" | "yellow" | "green") => {
    const colors = {
      cyan: { text: 'text-cyan-400', border: 'border-cyan-500/40', shadow: '0 0 15px rgba(6,182,212,0.5)', rgb: '#22d3ee' },
      pink: { text: 'text-pink-500', border: 'border-pink-500/40', shadow: '0 0 15px rgba(236,72,153,0.5)', rgb: '#ec4899' },
      yellow: { text: 'text-yellow-400', border: 'border-yellow-400/40', shadow: '0 0 15px rgba(250,204,21,0.5)', rgb: '#facc15' },
      green: { text: 'text-green-400', border: 'border-green-400/40', shadow: '0 0 15px rgba(74,222,128,0.5)', rgb: '#4ade80' }
    };
    return colors[colorStr] || colors.cyan;
  };

  return (
    <div className="flex items-center justify-center p-2 sm:p-4 bg-transparent font-mono w-full">
      {/* Contenitore stile Smartphone / Cyberdeck con cornice reale floating */}
      <div className="relative w-full max-w-[430px] h-[90vh] max-h-[90vh] sm:h-[700px] sm:max-h-[700px] bg-[#111113] border-4 border-[#1b1b1f] rounded-[38px] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(227,89,48,0.12)] ring-[10px] ring-black/60">
        
        {/* Header Terminale */}
        <div className="px-5 py-3.5 bg-[#151518] border-b border-gray-800 flex justify-between items-center z-10 select-none">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#c48f8a] animate-pulse" />
              <span className="font-bold text-gray-300 text-[10px] tracking-[0.2em] uppercase">
                <span>SYS.FAQ_V1.0</span>
              </span>
            </div>
            {isPlaying && (
              <span className="text-[8px] text-green-500 font-mono tracking-wider animate-pulse flex items-center gap-1 bg-green-950/20 px-1.5 py-0.5 rounded border border-green-500/20">
                <span className="w-1 h-1 rounded-full bg-green-500 animate-ping"></span>
                <span>AUTO</span>
              </span>
            )}
          </div>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]"></div>
            <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
          </div>
        </div>

        {/* Corpo Scorrevole */}
        <div 
          className="flex-grow relative overflow-hidden bg-[#111113]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Sfondo Grid Cyberpunk animato */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(transparent 95%, #c48f8a 100%), linear-gradient(90deg, transparent 95%, #c48f8a 100%)', backgroundSize: '25px 25px' }}>
          </div>

          {/* CRT Scanline Overlay Effect */}
          <div className="scanline-effect"></div>

          <AnimatePresence mode="wait">
            {(() => {
              const slide = slides[currentSlide];
              const neon = getNeonStyles(slide.neonColor);
              const activeTitle = slide.title[activeLang];
              const activeFaq = slide.faq[activeLang];
              const activeContent = slide.content[activeLang];

              return (
                <motion.div
                  key={slide.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="absolute inset-0 flex flex-col pointer-events-auto"
                >
                  {/* Immagine con maschera ed effetto glitch visivo */}
                  <div className="relative h-24 min-[375px]:h-28 xs:h-32 sm:h-44 w-full border-b border-gray-800 bg-gray-900 shrink-0">
                    <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply"></div>
                    {/* Effetto scanline sopra l'immagine */}
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] z-20 pointer-events-none opacity-50"></div>
                    
                    {imgError[slide.id] ? (
                      <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-4">
                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#c48f8a_1px,transparent_1px)] [background-size:16px_16px]"></div>
                        <Cpu className="w-8 h-8 text-gray-600 mb-2 animate-pulse" />
                        <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">
                          <span>DATA_STREAM_OFFLINE</span>
                        </span>
                      </div>
                    ) : (
                      <img 
                        src={slide.image} 
                        alt={`Cyberpunk ${activeTitle}`}
                        onError={() => setImgError(prev => ({ ...prev, [slide.id]: true }))}
                        className="w-full h-full object-cover opacity-80 mix-blend-luminosity filter contrast-125 brightness-75"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    
                    {/* Etichetta sopra l'immagine */}
                    <div 
                      className={`absolute bottom-3 left-3 z-30 bg-black/85 px-2.5 py-1 text-[10px] border uppercase tracking-widest backdrop-blur-sm font-mono font-bold ${neon.text}`}
                      style={{ borderColor: neon.rgb, boxShadow: neon.shadow }}
                    >
                      <span>// </span><span>{activeTitle}</span>
                    </div>
                  </div>

                  {/* Contenuto Testuale FAQ */}
                  <div className="p-4 xs:p-5 flex-grow flex flex-col justify-start relative bg-[#111113] overflow-hidden">
                    <div className="mb-2 xs:mb-3 inline-flex items-center">
                      {slide.icon}
                    </div>
                    
                    <div className="mb-2 shrink-0">
                       <span className="text-gray-500 text-[10px] uppercase tracking-widest block font-mono">
                         <span>QUERY:</span>
                       </span>
                       <h2 className={`text-sm xs:text-base font-bold ${neon.text} uppercase leading-tight mt-1 font-mono flex items-center gap-1.5`}>
                         <span>&gt; </span>
                         <span>{activeFaq}</span>
                         <span className="relative flex h-2 w-2 shrink-0" style={{ color: neon.rgb }}>
                           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                         </span>
                       </h2>
                    </div>
                    
                    {/* Content paragraph is scrollable and dynamically expands using flex-grow/flex-1 */}
                    <div className="mt-2 bg-[#151518] p-3.5 border-l-2 border-gray-600 relative overflow-y-auto flex-1 min-h-0 custom-scrollbar">
                      <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-[#151518]/10 pointer-events-none"></span>
                      <p className="text-gray-300 text-xs leading-relaxed font-sans font-light">
                        <span>{activeContent}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>

        {/* Controlli di Navigazione (Cyber Console) */}
        <div className="bg-[#151518] p-5 border-t border-gray-800 z-10 select-none">
          {/* Indicatore Dati */}
          <div className="flex gap-2 mb-4">
            {slides.map((s, idx) => {
              const isActive = idx === currentSlide;
              const isPassed = idx < currentSlide;
              const neon = getNeonStyles(s.neonColor);
              
              return (
                <div 
                  key={idx} 
                  className="h-1 flex-grow transition-all duration-300"
                  style={{ 
                    backgroundColor: isActive ? neon.rgb : isPassed ? '#374151' : '#1f2937',
                    boxShadow: isActive ? neon.shadow : 'none'
                  }}
                />
              );
            })}
          </div>

          {/* Pulsanti */}
          <div className="flex justify-between items-center gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`p-2.5 rounded-sm border transition-all ${
                currentSlide === 0 
                  ? 'border-gray-800 text-gray-700 cursor-not-allowed' 
                  : 'border-cyan-900/40 text-cyan-500 hover:bg-cyan-950/20 hover:border-cyan-500 active:scale-95'
              }`}
              title={activeLang === "it" ? "Precedente" : "Previous"}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Play/Pause Toggle Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2.5 rounded-sm border transition-all active:scale-95 ${
                isPlaying
                  ? 'border-green-950 text-green-400 bg-green-950/10 hover:bg-green-950/30 hover:border-green-500'
                  : 'border-yellow-950 text-yellow-500 bg-yellow-950/10 hover:bg-yellow-950/30 hover:border-yellow-500'
              }`}
              title={
                isPlaying 
                  ? (activeLang === "it" ? "Pausa Riproduzione" : "Pause Autoplay") 
                  : (activeLang === "it" ? "Avvia Riproduzione" : "Start Autoplay")
              }
            >
              {isPlaying ? (
                <Pause className="w-5 h-5" />
              ) : (
                <Play className="w-5 h-5" />
              )}
            </button>

            {isLastSlide ? (
              <button
                onClick={reset}
                className="flex-grow flex items-center justify-center gap-2 bg-pink-600/10 text-pink-500 border border-pink-500 py-2.5 px-4 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-pink-600 hover:text-white active:scale-95 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{activeLang === "it" ? "Riavvia Sistema" : "Reboot System"}</span>
              </button>
            ) : (
              <button
                onClick={nextSlide}
                className="flex-grow flex items-center justify-center gap-2 bg-cyan-950/40 text-cyan-400 border border-cyan-500 py-2.5 px-4 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-black active:scale-95 transition-all"
              >
                <span>{activeLang === "it" ? "Esegui" : "Execute"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
