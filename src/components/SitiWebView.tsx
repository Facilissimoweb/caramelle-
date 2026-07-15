import { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink, Globe, Layout, Smartphone, Eye, Monitor, Square } from "lucide-react";

interface SitiWebViewProps {
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function SitiWebView({ lang, isFacilitated }: SitiWebViewProps) {
  const [aspectRatio, setAspectRatio] = useState<"vertical" | "horizontal" | "square">("vertical");
  const canvaEmbedUrl = "https://www.canva.com/design/DAHPcAgT_q4/pp2Mw-kRnAzmogZQ4mcDgg/view?embed";
  const canvaDirectUrl = "https://www.canva.com/design/DAHPcAgT_q4/pp2Mw-kRnAzmogZQ4mcDgg/view?utm_content=DAHPcAgT_q4&utm_campaign=designshare&utm_medium=embeds&utm_source=link";

  return (
    <div className="w-full min-h-screen py-6 sm:py-12 px-0 sm:px-6 md:px-12 bg-[#F8F7F4] text-[#111113]">
      <div className="max-w-4xl mx-auto space-y-8 px-4 sm:px-0">
        
        {/* Page Header */}
        <div className="space-y-4 text-center lg:text-left">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#c48f8a] font-mono font-bold block">
            {lang === "it" ? "[ VETRINA INTERATTIVA ]" : "[ INTERACTIVE SHOWCASE ]"}
          </span>
          <h1 className="font-tan text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111113] leading-tight">
            {lang === "it" ? "Siti Web & Portfólio" : "Websites & Portfolio"}
          </h1>
          <p className="text-xs sm:text-sm text-[#111113]/70 max-w-2xl font-sans leading-relaxed">
            {isFacilitated
              ? (lang === "it" 
                ? "Sfoglia la nostra presentazione interattiva qui sotto. Abbiamo ottimizzato lo schermo per i dispositivi mobili."
                : "Browse our interactive presentation below. We optimized the screen for mobile devices.")
              : (lang === "it"
                ? "Esplora il nostro approccio al web design attraverso questa presentazione interattiva in stile 'Orange, Beige & Black'. Un design pulito, minimale e moderno creato per valorizzare ogni dettaglio."
                : "Explore our approach to web design through this interactive presentation styled in 'Orange, Beige & Black'. A clean, minimalist, and modern design crafted to elevate every detail.")}
          </p>
        </div>

        {/* Interactive Canva Embed Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-[#FAF9F6] border-y sm:border border-[#111113]/10 p-3 sm:p-6 rounded-none shadow-sm space-y-4 mx-[-16px] sm:mx-0"
          id="canva-embed-card"
        >
          {/* Controls & Title Row */}
          <div className="flex flex-col gap-4 border-b border-[#111113]/5 pb-4 px-3 sm:px-0">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#c48f8a]" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]/80">
                  {lang === "it" ? "Menù Interattivo & Presentazione" : "Interactive Menu & Presentation"}
                </span>
              </div>
            </div>

            {/* Layout Aspect Ratio Selector */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#111113]/50 mr-2">
                {lang === "it" ? "Formato Schermo:" : "Screen Aspect:"}
              </span>
              <div className="inline-flex bg-[#111113]/5 p-0.5 rounded-sm">
                <button
                  onClick={() => setAspectRatio("vertical")}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                    aspectRatio === "vertical"
                      ? "bg-[#c48f8a] text-white shadow-sm"
                      : "text-[#111113]/60 hover:text-[#111113]"
                  }`}
                  title="Vertical 9:16 (Mobile)"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  {lang === "it" ? "Verticale (Cellulare)" : "Vertical (Mobile)"}
                </button>
                <button
                  onClick={() => setAspectRatio("horizontal")}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                    aspectRatio === "horizontal"
                      ? "bg-[#c48f8a] text-white shadow-sm"
                      : "text-[#111113]/60 hover:text-[#111113]"
                  }`}
                  title="Horizontal 16:9 (Desktop)"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  {lang === "it" ? "Orizzontale" : "Horizontal"}
                </button>
                <button
                  onClick={() => setAspectRatio("square")}
                  className={`px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                    aspectRatio === "square"
                      ? "bg-[#c48f8a] text-white shadow-sm"
                      : "text-[#111113]/60 hover:text-[#111113]"
                  }`}
                  title="Square 1:1"
                >
                  <Square className="w-3.5 h-3.5" />
                  {lang === "it" ? "Quadrato" : "Square"}
                </button>
              </div>
            </div>
          </div>

          {/* Canva Responsive Container wrapper with max-width constraints for vertical designs */}
          <div className={`mx-auto transition-all duration-300 ${
            aspectRatio === "vertical" 
              ? "max-w-md border-x sm:border border-[#111113]/15 shadow-md bg-[#FAF9F6]" 
              : aspectRatio === "square" 
              ? "max-w-xl" 
              : "max-w-full"
          }`}>
            <div 
              className="relative w-full overflow-hidden bg-[#111113]/5 transition-all duration-300"
              style={{ 
                position: "relative", 
                width: "100%", 
                height: "0", 
                paddingTop: aspectRatio === "vertical" ? "177.78%" : aspectRatio === "horizontal" ? "56.25%" : "100.0000%",
                paddingBottom: "0", 
                boxShadow: "0 2px 8px 0 rgba(63,69,81,0.16)", 
                willChange: "transform" 
              }}
              id="canva-presentation-wrapper"
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
                title="Interactive Menu Canva presentation"
              />
            </div>
          </div>

          {/* Caption */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[10px] sm:text-[11px] font-mono text-[#111113]/60 pt-2 gap-2 px-3 sm:px-0">
            <span>
              <span className="font-bold text-[#c48f8a]">Interactive Menu</span> in Orange Beige Black Soft &amp; Clean Style
            </span>
            <span>
              {lang === "it" ? "Creato da" : "Created by"} Maria Teresa Rogani
            </span>
          </div>
        </motion.div>

        {/* Value Proposition Cards linked to the Canva design theme */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="border border-[#111113]/10 p-5 bg-[#FAF9F6]/50 space-y-2">
            <Layout className="w-5 h-5 text-[#c48f8a]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]">
              {lang === "it" ? "Layout Pulito & Soft" : "Clean & Soft Layout"}
            </h3>
            <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
              {lang === "it" 
                ? "Armonia cromatica basata su tonalità calde dell'arancione, sabbia e nero profondo."
                : "Chromatic harmony based on warm orange tones, soft beige, and deep black."}
            </p>
          </div>
          
          <div className="border border-[#111113]/10 p-5 bg-[#FAF9F6]/50 space-y-2">
            <Smartphone className="w-5 h-5 text-[#c48f8a]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]">
              {lang === "it" ? "Totalmente Responsive" : "Fully Responsive"}
            </h3>
            <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
              {lang === "it" 
                ? "Ottimizzato per qualsiasi schermo. I nostri siti si adattano per un'esperienza fluida."
                : "Optimized for any screen. Our websites adjust to give a seamless experience."}
            </p>
          </div>

          <div className="border border-[#111113]/10 p-5 bg-[#FAF9F6]/50 space-y-2">
            <Eye className="w-5 h-5 text-[#c48f8a]" />
            <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]">
              {lang === "it" ? "Esperienza Interattiva" : "Interactive Experience"}
            </h3>
            <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
              {lang === "it" 
                ? "Coinvolgi i tuoi utenti con micro-animazioni, transizioni morbide e menù chiari."
                : "Engage your users with micro-animations, smooth transitions, and clear menus."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
