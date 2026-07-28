import React from "react";
import { Hotel, Briefcase, Layers } from "lucide-react";
import WebAppView from "./WebAppView";

interface SitiWebViewProps {
  lang: "it" | "en";
  isFacilitated: boolean;
  setCurrentTab?: (tab: string) => void;
}

export default function SitiWebView({ lang, isFacilitated, setCurrentTab }: SitiWebViewProps) {
  return (
    <div className="w-full min-h-screen bg-[#F8F7F4] text-[#111113]">
      {/* SECTION 1: PROPOSTE WEB APP & PROGETTI INTERATTIVI */}
      <WebAppView lang={lang} isFacilitated={isFacilitated} setCurrentTab={setCurrentTab} />

      {/* SEPARATORE & VETRINA SITI WEB */}
      <div className="bg-[#F8F7F4] pt-8 pb-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Section Divider Header */}
          <div className="border-t-2 border-black/10 pt-12 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[11px] font-mono font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5" />
              <span>
                {lang === "it" ? "PROPOSTE VETRINA & MOCKUP SITI WEB" : "WEBSITE SHOWCASE & MOCKUP PROPOSALS"}
              </span>
            </div>
            <h2 className="font-tan text-2xl sm:text-4xl font-bold tracking-tight text-[#111113]">
              {lang === "it" ? "Vetrina Siti Web Interattivi" : "Interactive Website Showcase"}
            </h2>
            <p className="text-xs sm:text-sm text-[#111113]/70 max-w-2xl font-sans leading-relaxed">
              {lang === "it"
                ? "Sfoglia i layout interattivi e navigabili progettati per hotel, strutture ricettive, portfolio creativi e attività professionali."
                : "Explore interactive, navigable website layouts crafted for hotels, hospitality, creative portfolios, and professional businesses."}
            </p>
          </div>

          {/* Canva Hotel Website Project Embed */}
          <div className="bg-white border border-[#111113]/10 p-4 sm:p-6 rounded-none shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#111113]/5 pb-3">
              <div className="flex items-center gap-2">
                <Hotel className="w-4 h-4 text-black" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]/80">
                  {lang === "it" ? "SITO WEB HOTEL" : "HOTEL WEBSITE"}
                </span>
              </div>
              <span className="text-[9px] font-mono bg-black/5 border border-black/20 text-[#111113]/80 px-2.5 py-0.5 font-bold">
                {lang === "it" ? "INTERATTIVO" : "INTERACTIVE"}
              </span>
            </div>

            <div 
              className="relative w-full overflow-hidden shadow-md border border-[#111113]/10 bg-[#151518]"
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

          {/* Canva Portfolio Creative Project Embed */}
          <div className="bg-white border border-[#111113]/10 p-4 sm:p-6 rounded-none shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#111113]/5 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-black" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]/80">
                  {lang === "it" ? "PORTFOLIO CREATIVO" : "CREATIVE PORTFOLIO"}
                </span>
              </div>
              <span className="text-[9px] font-mono bg-black/5 border border-black/20 text-[#111113]/80 px-2.5 py-0.5 font-bold">
                {lang === "it" ? "INTERATTIVO" : "INTERACTIVE"}
              </span>
            </div>

            <div 
              className="relative w-full overflow-hidden shadow-md border border-[#111113]/10 bg-[#111113]"
              style={{ 
                paddingTop: '393.5578%', 
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
                src="https://www.canva.com/design/DAHPnqMeoO8/T4BCyLD4lWKQu6u4vB-7DA/view?embed" 
                allowFullScreen
                allow="fullscreen"
                title="Sito Web Portfolio Creativo Freelance in Stile Audace e Sofisticato"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] font-mono text-[#111113]/60 uppercase tracking-widest font-bold pt-2">
              <span className="text-[#111113]">
                {lang === "it" ? "Sito Web Portfolio Creativo Freelance in Stile Audace e Sofisticato" : "Creative Freelance Portfolio Website in Bold & Sophisticated Style"} di Maria Teresa Rogani
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
