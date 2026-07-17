import React from "react";
import { Hotel } from "lucide-react";

interface SitiWebViewProps {
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function SitiWebView({ lang, isFacilitated }: SitiWebViewProps) {
  return (
    <div className="w-full min-h-screen py-6 sm:py-12 px-0 sm:px-6 md:px-12 bg-[#F8F7F4] text-[#111113]">
      <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-0">
        
        {/* Page Header */}
        <div className="space-y-4 text-center lg:text-left">
          <span className="text-[13px] uppercase tracking-[0em] text-[#a3e635] font-mono font-bold block" style={{ letterSpacing: '0px' }}>
            {lang === "it" ? "[ VETRINA INTERATTIVA ]" : "[ INTERACTIVE SHOWCASE ]"}
          </span>
          <h1 className="font-tan text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111113] leading-tight">
            {lang === "it" ? "Siti Web & Portfólio" : "Websites & Portfolio"}
          </h1>
          <p className="text-xs sm:text-sm text-[#111113]/70 max-w-2xl font-sans leading-relaxed">
            {isFacilitated
              ? (lang === "it" 
                ? "Sfoglia i progetti web App di Facilissimo Web qui sotto. Ho ottimizzato lo schermo per i dispositivi mobili."
                : "Browse the Facilissimo Web's web App projects below. I optimized the screen for mobile devices.")
              : (lang === "it"
                ? "Esplora il mio approccio al web design e i progetti web App di Facilissimo Web. Un design pulito, minimale e moderno creato per valorizzare ogni dettaglio."
                : "Explore my approach to web design and Facilissimo Web's web App projects. A clean, minimalist, and modern design crafted to elevate every detail.")}
          </p>
        </div>

        {/* Canva Hotel Website Project Embed */}
        <div className="bg-white border border-[#111113]/10 p-4 sm:p-6 rounded-none shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#111113]/5 pb-3">
            <Hotel className="w-4 h-4 text-[#a3e635]" />
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]/80">
              {lang === "it" ? "PROGETTO SELEZIONATO" : "FEATURED PROJECT"}
            </span>
          </div>

          <div 
            className="relative w-full overflow-hidden shadow-md border border-[#111113]/10"
            style={{ 
              paddingTop: '112.4451%', 
              willChange: 'transform',
              borderRadius: '8px'
            }}
          >
            <iframe 
              loading="lazy" 
              className="absolute border-none p-0 m-0"
              style={{
                top: 0,
                left: 0,
                width: '100%',
                height: 'calc(100% + 46px)',
              }}
              src="https://www.canva.com/design/DAHPnlKXhxI/agM-KYZyISjhjSD-XeXazg/view?embed" 
              allowFullScreen
              allow="fullscreen"
              title="Sito Web Hotel in Stile Grigio Beige Nero"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-[#111113]/60 uppercase tracking-widest font-bold pt-2">
            <span className="text-[#111113]">
              {lang === "it" ? "Sito Web Hotel in Stile Grigio Beige Nero" : "Hotel Website in Grey Beige Black Style"} di Maria Teresa Rogani
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
