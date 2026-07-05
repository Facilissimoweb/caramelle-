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

  const resetSettings = () => {
    setFontSize(100);
    setIsFacilitated(false);
    setHighContrast(false);
    setReadableFont(false);
  };

  const sizes = [
    { value: 100, label: lang === "it" ? "100% (Std)" : "100% (Std)" },
    { value: 115, label: lang === "it" ? "115% (Grande)" : "115% (Large)" },
    { value: 130, label: lang === "it" ? "130% (Molto Grande)" : "130% (X-Large)" },
    { value: 145, label: lang === "it" ? "145% (Massimo)" : "145% (Huge)" },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50 font-sans" id="accessibility-widget-root">
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-12 h-12 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-colors border ${
          isOpen
            ? "bg-[#E35930] text-[#111113] border-[#E35930]"
            : "bg-[#151518]/95 hover:bg-[#E35930] text-[#F8F7F4] hover:text-[#111113] border-[rgba(248,247,244,0.2)] hover:border-[#E35930]"
        }`}
        title={lang === "it" ? "Strumenti di Accessibilità" : "Accessibility Tools"}
        id="accessibility-trigger-btn"
      >
        {isOpen ? <X className="w-5 h-5 animate-spin-once" /> : <Accessibility className="w-5 h-5" />}
      </motion.button>

      {/* Popover Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Click outside backdrop to close (hidden on desktop, active on mobile) */}
            <div className="fixed inset-0 z-40 md:hidden" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="absolute bottom-16 left-0 w-[320px] bg-[#151518]/98 backdrop-blur-xl border border-[rgba(248,247,244,0.15)] shadow-2xl p-5 z-50 text-[#F8F7F4] flex flex-col gap-5"
              id="accessibility-panel"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[rgba(248,247,244,0.1)] pb-3">
                <div className="flex items-center gap-2">
                  <Accessibility className="w-4 h-4 text-[#E35930]" />
                  <span className="font-display font-extrabold text-[11px] uppercase tracking-wider text-[#F8F7F4]">
                    {lang === "it" ? "Strumenti Accessibilità" : "Accessibility Tools"}
                  </span>
                </div>
                <button
                  onClick={resetSettings}
                  className="flex items-center gap-1 text-[9px] uppercase tracking-wider font-mono font-bold text-[#F8F7F4]/50 hover:text-[#E35930] transition-colors cursor-pointer"
                  title={lang === "it" ? "Ripristina impostazioni" : "Reset settings"}
                  id="reset-accessibility-btn"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{lang === "it" ? "Reset" : "Reset"}</span>
                </button>
              </div>

              {/* Setting 1: Font Size (Radio Button list) */}
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-mono text-[#F8F7F4]/60 font-bold">
                  <Type className="w-3.5 h-3.5 text-[#E35930]" />
                  <span>{lang === "it" ? "Dimensione Carattere" : "Text Size"}</span>
                </div>
                <div className="flex flex-col gap-1.5">
                  {sizes.map((s) => {
                    const isActive = fontSize === s.value;
                    return (
                      <button
                        key={s.value}
                        onClick={() => setFontSize(s.value)}
                        className={`w-full text-left px-3 py-2 text-[11px] font-mono flex items-center justify-between border transition-all cursor-pointer ${
                          isActive
                            ? "bg-[#E35930]/10 border-[#E35930] text-[#E35930] font-bold"
                            : "bg-[#111113]/50 border-[rgba(248,247,244,0.08)] hover:border-[rgba(248,247,244,0.2)] text-[#F8F7F4]/80"
                        }`}
                        id={`btn-fontsize-${s.value}`}
                      >
                        <span>{s.label}</span>
                        {isActive && <Check className="w-3.5 h-3.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Setting 2: Simplified Language (Toggle) */}
              <div className="space-y-2.5 border-t border-[rgba(248,247,244,0.08)] pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-mono text-[#F8F7F4]/60 font-bold">
                    <BookOpen className="w-3.5 h-3.5 text-[#E35930]" />
                    <span>{lang === "it" ? "Linguaggio Semplice" : "Simple Language"}</span>
                  </div>
                  <button
                    onClick={() => {
                      const nextVal = !isFacilitated;
                      setIsFacilitated(nextVal);
                      if (nextVal && fontSize < 130) {
                        setFontSize(130); // Also automatically zoom font for best accessibility
                      }
                    }}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      isFacilitated ? "bg-[#E35930]" : "bg-[rgba(248,247,244,0.15)]"
                    }`}
                    id="toggle-facilitated-semantics"
                    role="switch"
                    aria-checked={isFacilitated}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#111113] shadow-lg ring-0 transition duration-200 ease-in-out ${
                        isFacilitated ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[10px] text-[#F8F7F4]/50 leading-normal">
                  {lang === "it"
                    ? "Sostituisce i testi del sito con spiegazioni ad alta leggibilità, concetti immediati e sintassi lineare."
                    : "Replaces texts with plain, highly readable explanations, clean concepts, and simpler sentence structures."}
                </p>
              </div>

              {/* Setting 3: High Contrast (Toggle) */}
              <div className="space-y-2.5 border-t border-[rgba(248,247,244,0.08)] pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-mono text-[#F8F7F4]/60 font-bold">
                    <Eye className="w-3.5 h-3.5 text-[#E35930]" />
                    <span>{lang === "it" ? "Contrasto Elevato" : "High Contrast"}</span>
                  </div>
                  <button
                    onClick={() => setHighContrast(!highContrast)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      highContrast ? "bg-[#E35930]" : "bg-[rgba(248,247,244,0.15)]"
                    }`}
                    id="toggle-high-contrast"
                    role="switch"
                    aria-checked={highContrast}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#111113] shadow-lg ring-0 transition duration-200 ease-in-out ${
                        highContrast ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[10px] text-[#F8F7F4]/50 leading-normal">
                  {lang === "it"
                    ? "Aumenta la saturazione e la separazione dei colori per rendere elementi e testi più distinguibili."
                    : "Boosts saturation and color contrast to make text and components significantly easier to distinguish."}
                </p>
              </div>

              {/* Setting 4: Easy-to-read Dyslexic Font (Toggle) */}
              <div className="space-y-2.5 border-t border-[rgba(248,247,244,0.08)] pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider font-mono text-[#F8F7F4]/60 font-bold">
                    <Type className="w-3.5 h-3.5 text-[#E35930]" />
                    <span>{lang === "it" ? "Carattere Leggibile" : "Readable Font"}</span>
                  </div>
                  <button
                    onClick={() => setReadableFont(!readableFont)}
                    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      readableFont ? "bg-[#E35930]" : "bg-[rgba(248,247,244,0.15)]"
                    }`}
                    id="toggle-readable-font"
                    role="switch"
                    aria-checked={readableFont}
                  >
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-[#111113] shadow-lg ring-0 transition duration-200 ease-in-out ${
                        readableFont ? "translate-x-4" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
                <p className="text-[10px] text-[#F8F7F4]/50 leading-normal">
                  {lang === "it"
                    ? "Passa a un font monospaziato ad alta leggibilità e aumenta la spaziatura delle parole per la dislessia."
                    : "Switches to an easy-to-read monospaced font with widened letter spacing to assist reading."}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
