import React, { useState } from 'react';
import { Terminal, Cpu, ShieldAlert, Zap, ChevronRight, ChevronLeft, RotateCcw, AlertTriangle } from 'lucide-react';

interface Slide {
  id: number;
  icon: React.ReactNode;
  image: string;
  title: string;
  faq: string;
  content: string;
  neonColor: "cyan" | "pink" | "yellow" | "green";
}

// Dati delle schede FAQ con immagini a tema Cyberpunk
const slides: Slide[] = [
  {
    id: 1,
    icon: <Terminal className="w-8 h-8 text-cyan-400" />,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    title: "INIT: COS'È L'IA?",
    faq: "L'IA è una mente aliena?",
    content: "Negativo. È un software avanzato. Non prova emozioni e non complotta. È semplicemente in grado di leggere enormi quantità di dati in pochi secondi e trovare schemi logici per aiutarti a scrivere, calcolare e organizzare il tuo business locale.",
    neonColor: "cyan"
  },
  {
    id: 2,
    icon: <AlertTriangle className="w-8 h-8 text-pink-500" />,
    image: "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=600&q=80",
    title: "FAQ 01: IL LAVORO",
    faq: "L'IA mi ruberà il lavoro?",
    content: "Falso. L'IA non può sostituire la manualità, l'empatia o l'esperienza di un artigiano o di un negoziante di Macerata. Tuttavia, un tuo concorrente che usa l'IA per gestire le email in 5 minuti (mentre tu ci metti un'ora) avrà un vantaggio. L'IA è il tuo nuovo esoscheletro digitale.",
    neonColor: "pink"
  },
  {
    id: 3,
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    image: "https://images.unsplash.com/photo-1614729939124-03290b0409fe?w=600&q=80",
    title: "FAQ 02: I COSTI",
    faq: "Costa troppo per una microimpresa?",
    content: "Assolutamente no. Molti degli strumenti più potenti (come le chat generative per scrivere testi o idee social) hanno versioni gratuite o costano quanto un abbonamento a Netflix. Il vero costo oggi è ignorare questa tecnologia.",
    neonColor: "yellow"
  },
  {
    id: 4,
    icon: <ShieldAlert className="w-8 h-8 text-green-400" />,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=80",
    title: "FAQ 03: SICUREZZA",
    faq: "I miei dati aziendali sono al sicuro?",
    content: "L'IA è sicura se la usi con consapevolezza. La regola d'oro: non inserire mai password, dati bancari o segreti industriali nelle chat pubbliche. Usala per generare idee, bozze e strategie pubbliche. Noi di Facilissimo Web ti insegniamo a farlo senza rischi.",
    neonColor: "green"
  }
];

export default function CyberAiGuideApp() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [touchEndY, setTouchEndY] = useState<number | null>(null);

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
      <div className="relative w-[92%] min-[390px]:w-[86%] xs:w-[80%] sm:w-full sm:max-w-[420px] h-[640px] sm:h-[700px] bg-[#111113] border-4 border-[#1b1b1f] rounded-[38px] overflow-hidden flex flex-col shadow-[0_0_50px_rgba(227,89,48,0.12)] ring-[10px] ring-black/60">
        
        {/* Header Terminale */}
        <div className="px-5 py-3.5 bg-[#151518] border-b border-gray-800 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#E35930] animate-pulse" />
            <span className="font-bold text-gray-300 text-[10px] tracking-[0.2em] uppercase">
              SYS.FAQ_V1.0
            </span>
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
               style={{ backgroundImage: 'linear-gradient(transparent 95%, #E35930 100%), linear-gradient(90deg, transparent 95%, #E35930 100%)', backgroundSize: '25px 25px' }}>
          </div>

          {/* CRT Scanline Overlay Effect */}
          <div className="scanline-effect"></div>

          {slides.map((slide, index) => {
            const neon = getNeonStyles(slide.neonColor);
            
            return (
              <div
                key={slide.id}
                className={`absolute inset-0 flex flex-col transition-all duration-700 ease-in-out ${
                  index === currentSlide 
                    ? 'opacity-100 translate-x-0 pointer-events-auto' 
                    : index < currentSlide 
                      ? 'opacity-0 -translate-x-full pointer-events-none' 
                      : 'opacity-0 translate-x-full pointer-events-none'
                }`}
              >
                {/* Immagine con maschera ed effetto glitch visivo */}
                <div className="relative h-44 w-full border-b border-gray-800 bg-gray-900">
                  <div className="absolute inset-0 bg-black/40 z-10 mix-blend-multiply"></div>
                  {/* Effetto scanline sopra l'immagine */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] z-20 pointer-events-none opacity-50"></div>
                  
                  {imgError[slide.id] ? (
                    <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-4">
                      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#E35930_1px,transparent_1px)] [background-size:16px_16px]"></div>
                      <Cpu className="w-8 h-8 text-gray-600 mb-2 animate-pulse" />
                      <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">DATA_STREAM_OFFLINE</span>
                    </div>
                  ) : (
                    <img 
                      src={slide.image} 
                      alt={`Immagine Cyberpunk per ${slide.title}`}
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
                    // {slide.title}
                  </div>
                </div>

                {/* Contenuto Testuale FAQ */}
                <div className="p-5 flex-grow flex flex-col justify-start relative bg-[#111113]">
                  <div className="mb-3 inline-flex items-center">
                    {slide.icon}
                  </div>
                  
                  <div className="mb-2">
                     <span className="text-gray-500 text-[10px] uppercase tracking-widest block font-mono">QUERY:</span>
                     <h2 className={`text-base font-bold ${neon.text} uppercase leading-tight mt-1 font-mono flex items-center gap-1.5`}>
                       &gt; {slide.faq}
                       <span className="relative flex h-2 w-2" style={{ color: neon.rgb }}>
                         <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
                         <span className="relative inline-flex rounded-full h-2 w-2 bg-current"></span>
                       </span>
                     </h2>
                  </div>
                  
                  <div className="mt-3 bg-[#151518] p-4 border-l-2 border-gray-600 relative overflow-hidden">
                    <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent to-[#151518]/10 pointer-events-none"></span>
                    <p className="text-gray-300 text-xs leading-relaxed font-sans font-light">
                      {slide.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controlli di Navigazione (Cyber Console) */}
        <div className="bg-[#151518] p-5 border-t border-gray-800 z-10">
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
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`p-2.5 rounded-sm border transition-all ${
                currentSlide === 0 
                  ? 'border-gray-800 text-gray-700 cursor-not-allowed' 
                  : 'border-cyan-900/40 text-cyan-500 hover:bg-cyan-950/20 hover:border-cyan-500 active:scale-95'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {isLastSlide ? (
              <button
                onClick={reset}
                className="flex-grow flex items-center justify-center gap-2 bg-pink-600/10 text-pink-500 border border-pink-500 py-2.5 px-4 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-pink-600 hover:text-white active:scale-95 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                Reboot System
              </button>
            ) : (
              <button
                onClick={nextSlide}
                className="flex-grow flex items-center justify-center gap-2 bg-cyan-950/40 text-cyan-400 border border-cyan-500 py-2.5 px-4 rounded-sm font-bold text-xs uppercase tracking-widest hover:bg-cyan-500 hover:text-black active:scale-95 transition-all"
              >
                Execute
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
}
