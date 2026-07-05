import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Accessibility, Check, X, Eye, Type, BookOpen, RotateCcw } from "lucide-react";

interface AccessibilityWidgetProps {
  lang: "it" | "en";
  isFacilitated: boolean;
  setIsFacilitated: (val: boolean) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  readableFont: boolean;
  setReadableFont: (val: boolean) => void;
}

export default function AccessibilityWidget({
  lang,
  isFacilitated,
  setIsFacilitated,
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  readableFont,
  setReadableFont,
}: AccessibilityWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-close widget on pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when full screen is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const resetSettings = () => {
    setFontSize(100);
    setIsFacilitated(false);
    setHighContrast(false);
    setReadableFont(false);
  };

  const sizes = [
    { value: 100, label: lang === "it" ? "100% (Standard)" : "100% (Standard)" },
    { value: 115, label: lang === "it" ? "115% (Grande)" : "115% (Large)" },
    { value: 130, label: lang === "it" ? "130% (Molto Grande)" : "130% (X-Large)" },
    { value: 145, label: lang === "it" ? "145% (Massimo)" : "145% (Huge)" },
  ];

  return (
    <div id="accessibility-widget-root">
      {/* Floating Trigger Button - Always visible in bottom corner */}
      <div className="fixed bottom-6 left-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all border-2 ${
            isOpen
              ? "bg-[#E35930] text-[#111113] border-[#E35930] rotate-90"
              : "bg-[#151518]/95 hover:bg-[#E35930] text-[#F8F7F4] hover:text-[#111113] border-[rgba(248,247,244,0.3)] hover:border-[#E35930]"
          }`}
          title={lang === "it" ? "Strumenti di Accessibilità" : "Accessibility Tools"}
          id="accessibility-trigger-btn"
          aria-label={lang === "it" ? "Strumenti di Accessibilità" : "Accessibility Tools"}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Accessibility className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Full-Screen Accessibility Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#111113]/97 backdrop-blur-2xl z-50 flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-y-auto"
            id="accessibility-overlay"
          >
            {/* Close action backdrop click */}
            <div className="absolute inset-0 cursor-default" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 35 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 35 }}
              transition={{ type: "spring", stiffness: 280, damping: 28 }}
              className="relative w-full max-w-4xl bg-[#151518] border border-[rgba(248,247,244,0.15)] shadow-2xl p-6 sm:p-10 md:p-14 text-[#F8F7F4] flex flex-col gap-8 md:gap-10 z-10"
              id="accessibility-panel-fullscreen"
            >
              {/* Close Button Top Right */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-12 rounded-full bg-[#111113] hover:bg-[#E35930] text-[#F8F7F4] hover:text-[#111113] border border-[rgba(248,247,244,0.15)] hover:border-[#E35930] flex items-center justify-center cursor-pointer transition-all shadow-lg"
                aria-label={lang === "it" ? "Chiudi pannello" : "Close panel"}
                id="close-accessibility-overlay"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(248,247,244,0.1)] pb-6 pr-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#E35930]/10 flex items-center justify-center text-[#E35930]">
                    <Accessibility className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-wider text-[#F8F7F4]">
                      {lang === "it" ? "Strumenti di Accessibilità" : "Accessibility Settings"}
                    </h2>
                    <p className="text-xs text-[#F8F7F4]/60 font-mono">
                      {lang === "it" 
                        ? "Personalizza la tua esperienza di lettura e facilitazione visiva" 
                        : "Personalize your visual reading experience"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetSettings}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#111113] hover:bg-[#E35930] border border-[rgba(248,247,244,0.15)] text-[#F8F7F4] hover:text-[#111113] transition-colors cursor-pointer text-xs uppercase tracking-wider font-mono font-bold"
                  title={lang === "it" ? "Ripristina impostazioni predefinite" : "Reset default settings"}
                  id="reset-accessibility-btn"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{lang === "it" ? "Ripristina Standard" : "Reset Defaults"}</span>
                </button>
              </div>

              {/* Main settings options grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Section 1: Font Size (Radio Button List) */}
                <div className="space-y-4 bg-[#111113]/40 p-6 border border-[rgba(248,247,244,0.06)]">
                  <div className="flex items-center gap-2.5 text-xs uppercase tracking-wider font-mono text-[#E35930] font-extrabold">
                    <Type className="w-4 h-4" />
                    <span>{lang === "it" ? "1. Dimensione Carattere (Zoom)" : "1. Text Size (Zoom)"}</span>
                  </div>
                  <p className="text-xs text-[#F8F7F4]/70">
                    {lang === "it"
                      ? "Aumenta la dimensione complessiva del testo di tutte le pagine per una lettura senza sforzo."
                      : "Enlarge the global layout font size for completely strain-free reading."}
                  </p>
                  <div className="grid grid-cols-1 gap-2 pt-2">
                    {sizes.map((s) => {
                      const isActive = fontSize === s.value;
                      return (
                        <button
                          key={s.value}
                          onClick={() => setFontSize(s.value)}
                          className={`w-full text-left px-4 py-3.5 text-xs sm:text-sm font-mono flex items-center justify-between border-2 transition-all cursor-pointer ${
                            isActive
                              ? "bg-[#E35930]/10 border-[#E35930] text-[#E35930] font-bold"
                              : "bg-[#111113]/70 border-[rgba(248,247,244,0.1)] hover:border-[rgba(248,247,244,0.25)] text-[#F8F7F4]/80"
                          }`}
                          id={`btn-fontsize-${s.value}`}
                        >
                          <span style={{ fontSize: `${s.value}%` }}>{s.label}</span>
                          {isActive && <Check className="w-4 h-4 text-[#E35930]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section 2: Toggles Grid */}
                <div className="flex flex-col gap-6 justify-between">
                  {/* Toggle 2.1: Simplified Language */}
                  <div className="space-y-3 bg-[#111113]/40 p-6 border border-[rgba(248,247,244,0.06)] flex-grow">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-xs uppercase tracking-wider font-mono text-[#E35930] font-extrabold">
                        <BookOpen className="w-4 h-4" />
                        <span>{lang === "it" ? "2. Semplificazione Semantica" : "2. Simple Semantics"}</span>
                      </div>
                      <button
                        onClick={() => {
                          const nextVal = !isFacilitated;
                          setIsFacilitated(nextVal);
                          if (nextVal && fontSize < 130) {
                            setFontSize(130); // Automatically increase font size for accessibility
                          }
                        }}
                        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          isFacilitated ? "bg-[#E35930]" : "bg-[rgba(248,247,244,0.2)]"
                        }`}
                        id="toggle-facilitated-semantics"
                        role="switch"
                        aria-checked={isFacilitated}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#111113] shadow-lg ring-0 transition duration-200 ease-in-out ${
                            isFacilitated ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-xs text-[#F8F7F4]/70 leading-relaxed pt-1">
                      {lang === "it"
                        ? "Sostituisce i testi professionali con spiegazioni estremamente semplici, frasi brevi e concetti immediati."
                        : "Replaces expert copy with clear, basic summaries, short sentences, and straightforward ideas."}
                    </p>
                  </div>

                  {/* Toggle 2.2: High Contrast */}
                  <div className="space-y-3 bg-[#111113]/40 p-6 border border-[rgba(248,247,244,0.06)] flex-grow">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-xs uppercase tracking-wider font-mono text-[#E35930] font-extrabold">
                        <Eye className="w-4 h-4" />
                        <span>{lang === "it" ? "3. Contrasto Elevato" : "3. High Contrast"}</span>
                      </div>
                      <button
                        onClick={() => setHighContrast(!highContrast)}
                        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          highContrast ? "bg-[#E35930]" : "bg-[rgba(248,247,244,0.2)]"
                        }`}
                        id="toggle-high-contrast"
                        role="switch"
                        aria-checked={highContrast}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#111113] shadow-lg ring-0 transition duration-200 ease-in-out ${
                            highContrast ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-xs text-[#F8F7F4]/70 leading-relaxed pt-1">
                      {lang === "it"
                        ? "Aumenta la saturazione, il contrasto e la luminosità per distinguere facilmente ogni elemento visivo."
                        : "Boosts color contrast and outline saturation to help separate text and layout blocks."}
                    </p>
                  </div>

                  {/* Toggle 2.3: Readable Monospace Font */}
                  <div className="space-y-3 bg-[#111113]/40 p-6 border border-[rgba(248,247,244,0.06)] flex-grow">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2.5 text-xs uppercase tracking-wider font-mono text-[#E35930] font-extrabold">
                        <Type className="w-4 h-4" />
                        <span>{lang === "it" ? "4. Carattere Leggibile" : "4. Dyslexia Friendly Font"}</span>
                      </div>
                      <button
                        onClick={() => setReadableFont(!readableFont)}
                        className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                          readableFont ? "bg-[#E35930]" : "bg-[rgba(248,247,244,0.2)]"
                        }`}
                        id="toggle-readable-font"
                        role="switch"
                        aria-checked={readableFont}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-[#111113] shadow-lg ring-0 transition duration-200 ease-in-out ${
                            readableFont ? "translate-x-5" : "translate-x-0"
                          }`}
                        />
                      </button>
                    </div>
                    <p className="text-xs text-[#F8F7F4]/70 leading-relaxed pt-1">
                      {lang === "it"
                        ? "Passa a una font monospazio ad alta leggibilità, distanziando i caratteri per facilitare la lettura in caso di dislessia."
                        : "Switches the site to a legible monospaced font with wide character tracking to aid dyslexic readers."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informative footer statement */}
              <div className="text-center text-[11px] text-[#F8F7F4]/40 font-mono border-t border-[rgba(248,247,244,0.06)] pt-6">
                {lang === "it"
                  ? "I tuoi parametri di accessibilità vengono salvati nel browser per le prossime visite."
                  : "Your accessibility parameters are automatically saved in the browser for future visits."}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
