import { motion } from "motion/react";
import { ExternalLink, Globe, Layout, Smartphone, Eye } from "lucide-react";

interface SitiWebViewProps {
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function SitiWebView({ lang, isFacilitated }: SitiWebViewProps) {
  const canvaEmbedUrl = "https://www.canva.com/design/DAHPcAgT_q4/pp2Mw-kRnAzmogZQ4mcDgg/view?embed";
  const canvaDirectUrl = "https://www.canva.com/design/DAHPcAgT_q4/pp2Mw-kRnAzmogZQ4mcDgg/view?utm_content=DAHPcAgT_q4&utm_campaign=designshare&utm_medium=embeds&utm_source=link";

  return (
    <div className="w-full min-h-screen py-12 px-4 sm:px-6 md:px-12 bg-[#F8F7F4] text-[#111113]">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Page Header */}
        <div className="space-y-4 text-center lg:text-left">
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#c48f8a] font-mono font-bold block">
            {lang === "it" ? "[ VETRINA INTERATTIVA ]" : "[ INTERACTIVE SHOWCASE ]"}
          </span>
          <h1 className="font-tan text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111113] leading-tight">
            {lang === "it" ? "Siti Web & Portfólio" : "Websites & Portfolio"}
          </h1>
          <p className="text-sm sm:text-base text-[#111113]/70 max-w-2xl font-sans leading-relaxed">
            {isFacilitated
              ? (lang === "it" 
                ? "Sfoglia la nostra presentazione interattiva qui sotto per vedere come creiamo siti web moderni, veloci e facili da usare."
                : "Browse our interactive presentation below to see how we build modern, fast, and easy-to-use websites.")
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
          className="bg-[#FAF9F6] border border-[#111113]/10 p-4 sm:p-6 rounded-none shadow-sm space-y-4"
          id="canva-embed-card"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#111113]/5 pb-4">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#c48f8a]" />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]/80">
                {lang === "it" ? "Menù Interattivo & Presentazione" : "Interactive Menu & Presentation"}
              </span>
            </div>
            <a
              href={canvaDirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[#c48f8a] hover:text-[#111113] transition-colors font-mono font-bold uppercase tracking-wider"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {lang === "it" ? "Apri a Schermo Intero" : "Open Fullscreen"}
            </a>
          </div>

          {/* Canva Responsive Container */}
          <div 
            className="relative w-full overflow-hidden border border-[#111113]/10 bg-[#111113]/5"
            style={{ 
              position: "relative", 
              width: "100%", 
              height: "0", 
              paddingTop: "100.0000%", /* 1:1 Aspect Ratio as requested */
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

          {/* Caption */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-[11px] font-mono text-[#111113]/60 pt-2 gap-2">
            <span>
              <span className="font-bold text-[#c48f8a]">Interactive Menu</span> in Orange Beige Black Soft &amp; Clean Style
            </span>
            <span>
              {lang === "it" ? "Creato da" : "Created by"}{" "}
              <a 
                href={canvaDirectUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-[#c48f8a] transition-colors"
              >
                Maria Teresa Rogani
              </a>
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
