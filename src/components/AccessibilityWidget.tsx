import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Accessibility, Check, X, Eye, Type, BookOpen, RotateCcw, Volume2, Play, Pause, Square, ChevronDown } from "lucide-react";

interface AccessibilityWidgetProps {
  lang: "it" | "en";
  currentTab: string;
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
  currentTab,
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

  // Text-To-Speech (TTS) States
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>("");
  const [readingSpeed, setReadingSpeed] = useState<number>(0.95);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [textBlocks, setTextBlocks] = useState<string[]>([]);
  const [currentBlockIndex, setCurrentBlockIndex] = useState<number>(0);
  const [isVoiceDropdownOpen, setIsVoiceDropdownOpen] = useState<boolean>(false);

  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  // Load browser voice synthesis options
  const loadVoices = () => {
    if (!synth) return;
    const allVoices = synth.getVoices();
    const langPrefix = lang === "it" ? "it" : "en";
    const filtered = allVoices.filter((v) => v.lang.startsWith(langPrefix));
    setVoices(filtered);
    
    if (filtered.length > 0) {
      // Prioritize natural or neural voices
      const premiumVoice = filtered.find((v) => 
        v.name.includes("Google") || 
        v.name.includes("Natural") || 
        v.name.includes("Neural") || 
        v.name.includes("Alice") || 
        v.name.includes("Luca") ||
        v.name.includes("Siri")
      );
      setSelectedVoiceName((prev) => {
        if (prev && filtered.some((v) => v.name === prev)) return prev;
        return premiumVoice ? premiumVoice.name : filtered[0].name;
      });
    }
  };

  useEffect(() => {
    if (!synth) return;
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }, [lang]);

  // Dynamic Text Block Extraction from the active page view DOM
  const extractPageText = (): string[] => {
    const mainElement = document.querySelector("main");
    if (!mainElement) return [];

    const blocks: string[] = [];
    
    const traverse = (node: Node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tagName = el.tagName.toLowerCase();
        
        // Exclude UI controls, buttons, forms, scripts, widgets
        if (
          tagName === "button" ||
          tagName === "nav" ||
          tagName === "form" ||
          tagName === "script" ||
          tagName === "style" ||
          el.getAttribute("aria-hidden") === "true" ||
          el.id === "accessibility-widget-root" ||
          el.id === "back-to-top-btn" ||
          el.classList.contains("sr-only") ||
          el.id === "facilitated-badge-banner" ||
          el.closest("#accessibility-widget-root") ||
          el.closest("#back-to-top-btn")
        ) {
          return;
        }

        // Capture headings, paragraphs, list items, quotes
        if (["h1", "h2", "h3", "h4", "h5", "h6", "p", "li", "blockquote"].includes(tagName)) {
          const text = el.innerText?.trim();
          if (text && text.length > 1) {
            const cleanText = text.replace(/\s+/g, " ");
            blocks.push(cleanText);
          }
          return; // Skip deep child elements under these blocks to prevent text duplication
        }
      }
      
      for (let i = 0; i < node.childNodes.length; i++) {
        traverse(node.childNodes[i]);
      }
    };

    traverse(mainElement);
    return blocks;
  };

  // Speaks a specific text block sequentially
  const speakBlock = (index: number, blocks: string[]) => {
    if (!synth || index >= blocks.length) {
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentBlockIndex(0);
      return;
    }

    setCurrentBlockIndex(index);
    synth.cancel();

    const text = blocks[index];
    const utterance = new SpeechSynthesisUtterance(text);
    
    if (selectedVoiceName) {
      const voice = voices.find((v) => v.name === selectedVoiceName);
      if (voice) {
        utterance.voice = voice;
      }
    }

    // Set voice speed (0.95x standard provides high-fidelity, calm, natural cadence)
    utterance.rate = readingSpeed;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      speakBlock(index + 1, blocks);
    };

    utterance.onerror = (e) => {
      console.warn("[AccessibilityWidget] Utterance event:", e.type);
      if (e.error !== "interrupted") {
        setIsPlaying(false);
        setIsPaused(false);
      }
    };

    synth.speak(utterance);
  };

  const handlePlaySpeech = () => {
    if (!synth) return;

    if (isPaused) {
      setIsPaused(false);
      setIsPlaying(true);
      speakBlock(currentBlockIndex, textBlocks);
    } else {
      const blocks = extractPageText();
      if (blocks.length === 0) {
        console.warn("[AccessibilityWidget] No readable text blocks found.");
        return;
      }
      setTextBlocks(blocks);
      setIsPlaying(true);
      setIsPaused(false);
      speakBlock(0, blocks);
    }
  };

  const handlePauseSpeech = () => {
    if (!synth) return;
    synth.cancel();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStopSpeech = () => {
    if (!synth) return;
    synth.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentBlockIndex(0);
  };

  const cleanVoiceName = (name: string) => {
    return name
      .replace(/microsoft/gi, "")
      .replace(/desktop/gi, "")
      .replace(/google/gi, "Chrome")
      .replace(/apple/gi, "")
      .replace(/- italian \(italy\)/gi, "")
      .replace(/- english \(united states\)/gi, "")
      .replace(/- english \(united kingdom\)/gi, "")
      .replace(/\s+/g, " ")
      .trim();
  };

  // Stop speaking when currentTab changes to prevent overlapping audio
  useEffect(() => {
    if (isPlaying || isPaused) {
      console.debug("[AccessibilityWidget] Tab changed, stopping voice reader");
      handleStopSpeech();
    }
  }, [currentTab]);

  // Auto-close widget on pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        console.debug("[AccessibilityWidget] Escape key pressed, closing panel");
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scrolling when full screen is open
  useEffect(() => {
    console.debug(`[AccessibilityWidget] Panel visibility state changed: isOpen = ${isOpen}`);
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleToggleOpen = () => {
    const nextVal = !isOpen;
    console.debug(`[AccessibilityWidget] Toggle visibility click: current = ${isOpen}, next = ${nextVal}`);
    setIsOpen(nextVal);
  };

  const handleClose = () => {
    console.debug("[AccessibilityWidget] Closing panel");
    setIsOpen(false);
  };

  const handleFontSizeChange = (size: number) => {
    console.debug(`[AccessibilityWidget] Font size change requested: current = ${fontSize}%, next = ${size}%`);
    setFontSize(size);
  };

  const handleFacilitatedToggle = () => {
    const nextVal = !isFacilitated;
    console.debug(`[AccessibilityWidget] Toggle simplified mode (isFacilitated): current = ${isFacilitated}, next = ${nextVal}`);
    setIsFacilitated(nextVal);
    if (nextVal && fontSize < 130) {
      console.debug(`[AccessibilityWidget] Auto-boosting font size to 130% for improved visibility under simplified mode`);
      setFontSize(130);
    }
  };

  const handleHighContrastToggle = () => {
    const nextVal = !highContrast;
    console.debug(`[AccessibilityWidget] Toggle high contrast: current = ${highContrast}, next = ${nextVal}`);
    setHighContrast(nextVal);
  };

  const handleReadableFontToggle = () => {
    const nextVal = !readableFont;
    console.debug(`[AccessibilityWidget] Toggle readable font: current = ${readableFont}, next = ${nextVal}`);
    setReadableFont(nextVal);
  };

  const resetSettings = () => {
    console.debug("[AccessibilityWidget] Resetting all accessibility settings to default values");
    setFontSize(100);
    setIsFacilitated(false);
    setHighContrast(false);
    setReadableFont(false);
    handleStopSpeech();
    setReadingSpeed(0.95);
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
          onClick={handleToggleOpen}
          className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all border-2 bg-[#27f16b] ${
            isOpen
              ? "text-[#111113] border-[#E35930] rotate-90"
              : "text-[#F8F7F4] border-[rgba(248,247,244,0.3)] hover:border-[#E35930]"
          }`}
          title={lang === "it" ? "Strumenti di Accessibilità" : "Accessibility Tools"}
          id="accessibility-trigger-btn"
          aria-label={lang === "it" ? "Strumenti di Accessibilità" : "Accessibility Tools"}
        >
          {isOpen ? <X className="w-6 h-6 bg-[#191818]" /> : <Accessibility className="w-6 h-6 bg-[#191818]" />}
        </motion.button>
      </div>

      {/* Full-Screen Accessibility Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#111113]/97 backdrop-blur-2xl z-50 overflow-y-auto"
            id="accessibility-overlay"
          >
            <div className="min-h-screen w-full flex items-start justify-center p-4 sm:p-8 md:p-12 py-12">
              {/* Close action backdrop click */}
              <div className="absolute inset-0 cursor-default" onClick={handleClose} />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 35 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 35 }}
                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                className="relative w-full max-w-4xl bg-[#151518] border border-[rgba(248,247,244,0.15)] shadow-2xl p-6 sm:p-10 md:p-14 text-[#F8F7F4] flex flex-col gap-8 md:gap-10 z-10 my-auto"
                id="accessibility-panel-fullscreen"
              >
                {/* Close Button Top Right */}
                <button
                  onClick={handleClose}
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
                            onClick={() => handleFontSizeChange(s.value)}
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
                          onClick={handleFacilitatedToggle}
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
                          onClick={handleHighContrastToggle}
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
                          onClick={handleReadableFontToggle}
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

                {/* Section 3: Assistente Vocale / Speech Reader */}
                <div className="space-y-5 bg-[#111113]/40 p-6 sm:p-8 border border-[rgba(248,247,244,0.06)] mt-6 sm:mt-8">
                  <div className="flex items-center gap-2.5 text-xs uppercase tracking-wider font-mono text-[#E35930] font-extrabold">
                    <Volume2 className="w-4 h-4" />
                    <span>{lang === "it" ? "5. Assistente Vocale (Lettura Pagina)" : "5. Voice Assistant (Page Reader)"}</span>
                  </div>
                  <p className="text-xs text-[#F8F7F4]/70 leading-relaxed">
                    {lang === "it"
                      ? "Ascolta una lettura naturale, fluida e ad alta fedeltà di tutto il contenuto scritto di questa pagina."
                      : "Listen to a natural, fluent, and high-fidelity vocal rendering of all written page content."}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                    {/* Controller Buttons */}
                    <div className="md:col-span-4 flex flex-col gap-2">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#F8F7F4]/40 font-bold">
                        {lang === "it" ? "Controlli Lettore" : "Reader Controls"}
                      </span>
                      <div className="flex items-center gap-2">
                        {!isPlaying ? (
                          <button
                            onClick={handlePlaySpeech}
                            className="flex-grow flex items-center justify-center gap-2 px-4 py-3 bg-[#E35930] hover:bg-[#E35930]/95 text-[#111113] hover:scale-[1.02] transition-all cursor-pointer text-xs uppercase font-mono font-bold"
                            id="tts-play-btn"
                          >
                            <Play className="w-4 h-4 fill-current" />
                            <span>{lang === "it" ? "Ascolta" : "Listen"}</span>
                          </button>
                        ) : (
                          <button
                            onClick={handlePauseSpeech}
                            className="flex-grow flex items-center justify-center gap-2 px-4 py-3 bg-[#E35930] text-[#111113] hover:scale-[1.02] transition-all cursor-pointer text-xs uppercase font-mono font-bold animate-pulse"
                            id="tts-pause-btn"
                          >
                            <Pause className="w-4 h-4 fill-current" />
                            <span>{lang === "it" ? "Pausa" : "Pause"}</span>
                          </button>
                        )}

                        {(isPlaying || isPaused || currentBlockIndex > 0) && (
                          <button
                            onClick={handleStopSpeech}
                            className="p-3 bg-[#111113] hover:bg-[#E35930] border border-[rgba(248,247,244,0.15)] text-[#F8F7F4] hover:text-[#111113] transition-colors cursor-pointer"
                            title={lang === "it" ? "Interrompi" : "Stop"}
                            id="tts-stop-btn"
                          >
                            <Square className="w-4 h-4 fill-current" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Voice Selection */}
                    <div className="md:col-span-4 flex flex-col gap-2 relative">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#F8F7F4]/40 font-bold">
                        {lang === "it" ? "Sintetizzatore Vocale" : "Vocal Synthesizer"}
                      </span>
                      
                      {voices.length > 0 ? (
                        <div className="relative">
                          <button
                            onClick={() => setIsVoiceDropdownOpen(!isVoiceDropdownOpen)}
                            className="w-full px-4 py-3 bg-[#111113] hover:bg-[#111113]/80 border border-[rgba(248,247,244,0.1)] hover:border-[rgba(248,247,244,0.25)] text-xs font-mono text-[#F8F7F4] flex items-center justify-between cursor-pointer transition-colors"
                            id="tts-voice-dropdown-trigger"
                          >
                            <span className="truncate">
                              {selectedVoiceName ? cleanVoiceName(selectedVoiceName) : (lang === "it" ? "Seleziona Voce" : "Select Voice")}
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isVoiceDropdownOpen ? "rotate-180" : ""}`} />
                          </button>

                          <AnimatePresence>
                            {isVoiceDropdownOpen && (
                              <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 5 }}
                                className="absolute bottom-full mb-1 left-0 w-full max-h-48 overflow-y-auto bg-[#151518] border border-[rgba(248,247,244,0.15)] z-50 shadow-2xl"
                              >
                                {voices.map((voice) => {
                                  const isSelected = voice.name === selectedVoiceName;
                                  return (
                                    <button
                                      key={voice.name}
                                      onClick={() => {
                                        setSelectedVoiceName(voice.name);
                                        setIsVoiceDropdownOpen(false);
                                        if (isPlaying) {
                                          synth?.cancel();
                                          speakBlock(currentBlockIndex, textBlocks);
                                        }
                                      }}
                                      className={`w-full text-left px-4 py-2.5 text-[11px] font-mono transition-colors flex items-center justify-between cursor-pointer hover:bg-[#E35930]/10 hover:text-[#E35930] ${
                                        isSelected ? "bg-[#E35930]/10 text-[#E35930] font-bold" : "text-[#F8F7F4]/80"
                                      }`}
                                    >
                                      <span className="truncate">{cleanVoiceName(voice.name)}</span>
                                      {isSelected && <Check className="w-3.5 h-3.5" />}
                                    </button>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <div className="px-4 py-3 bg-[#111113] border border-[rgba(248,247,244,0.05)] text-[11px] font-mono text-[#F8F7F4]/40">
                          {lang === "it" ? "Voci di sistema non rilevate" : "System voices not detected"}
                        </div>
                      )}
                    </div>

                    {/* Speed Slider */}
                    <div className="md:col-span-4 flex flex-col gap-2">
                      <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider font-bold">
                        <span className="text-[#F8F7F4]/40">{lang === "it" ? "Velocità di Lettura" : "Reading Speed"}</span>
                        <span className="text-[#E35930]">{readingSpeed === 0.95 ? (lang === "it" ? "0.95x (Consigliata)" : "0.95x (Recommended)") : `${readingSpeed.toFixed(2)}x`}</span>
                      </div>
                      <div className="flex items-center gap-3 py-1 px-1">
                        <span className="text-[10px] text-[#F8F7F4]/40 font-mono">0.7x</span>
                        <input
                          type="range"
                          min="0.7"
                          max="1.3"
                          step="0.05"
                          value={readingSpeed}
                          onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            setReadingSpeed(val);
                            if (isPlaying) {
                              synth?.cancel();
                              speakBlock(currentBlockIndex, textBlocks);
                            }
                          }}
                          className="flex-grow accent-[#E35930] h-1 bg-[rgba(248,247,244,0.15)] rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="text-[10px] text-[#F8F7F4]/40 font-mono">1.3x</span>
                      </div>
                    </div>
                  </div>

                  {/* Equalizer and progress details */}
                  {(isPlaying || isPaused) && (
                    <div className="bg-[#111113]/60 border border-[rgba(248,247,244,0.05)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-0.5 h-4 w-6 shrink-0">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <motion.span
                              key={i}
                              animate={{
                                height: isPlaying 
                                  ? [4, i * 3 + 2, 4] 
                                  : 4
                              }}
                              transition={{
                                duration: 0.6 + i * 0.1,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                              className="w-1 bg-[#E35930]"
                            />
                          ))}
                        </div>
                        <span className="text-[#F8F7F4]/80">
                          {lang === "it" ? "Lettore Attivo" : "Voice Reader Active"}
                        </span>
                      </div>

                      {textBlocks.length > 0 && (
                        <div className="text-[10px] text-[#F8F7F4]/50 flex items-center gap-2">
                          <span>
                            {lang === "it" ? `Paragrafo ${currentBlockIndex + 1} di ${textBlocks.length}` : `Paragraph ${currentBlockIndex + 1} of ${textBlocks.length}`}
                          </span>
                          <div className="w-24 bg-[rgba(248,247,244,0.1)] h-1 rounded-sm overflow-hidden">
                            <div 
                              className="bg-[#E35930] h-full transition-all duration-300"
                              style={{ width: `${((currentBlockIndex + 1) / textBlocks.length) * 100}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Reset Button */}
                <div className="flex justify-center border-t border-[rgba(248,247,244,0.08)] pt-6 mt-6">
                  <button
                    onClick={resetSettings}
                    className="flex items-center gap-2 px-6 py-3.5 bg-[#111113] hover:bg-[#E35930] border border-[rgba(248,247,244,0.15)] text-[#F8F7F4] hover:text-[#111113] transition-all cursor-pointer text-xs uppercase tracking-wider font-mono font-bold"
                    id="reset-accessibility-bottom-btn"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>{lang === "it" ? "Ripristina impostazioni classiche" : "Reset to Classic Settings"}</span>
                  </button>
                </div>

                {/* Informative footer statement */}
                <div className="text-center text-[11px] text-[#F8F7F4]/40 font-mono border-t border-[rgba(248,247,244,0.06)] pt-6">
                  {lang === "it"
                    ? "I tuoi parametri di accessibilità vengono salvati nel browser per le prossime visite."
                    : "Your accessibility parameters are automatically saved in the browser for future visits."}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Mini Player (Visible when reading is active, even if accessibility panel is closed) */}
      <AnimatePresence>
        {(isPlaying || isPaused) && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, y: 50, x: "-50%" }}
            className="fixed bottom-6 left-1/2 z-40 bg-[#151518]/95 border border-[rgba(248,247,244,0.15)] shadow-2xl p-3 px-5 text-[#F8F7F4] flex items-center gap-4 backdrop-blur-md select-none font-mono text-[10px] tracking-wider uppercase font-bold text-center"
            id="floating-voice-player"
          >
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#E35930] relative flex items-center justify-center">
                {isPlaying && (
                  <span className="absolute inset-0 rounded-full bg-[#E35930] animate-ping opacity-75" />
                )}
              </div>
              <span className="text-[#F8F7F4]/70 hidden sm:inline">
                {lang === "it" ? "Sintesi Vocale" : "Voice Reader"}
              </span>
            </div>

            {textBlocks.length > 0 && (
              <span className="text-[#E35930]">
                {currentBlockIndex + 1}/{textBlocks.length}
              </span>
            )}

            <div className="h-4 w-[1px] bg-[rgba(248,247,244,0.15)]" />

            <div className="flex items-center gap-1.5">
              {isPlaying ? (
                <button
                  onClick={handlePauseSpeech}
                  className="p-1.5 hover:bg-[#E35930] text-[#E35930] hover:text-[#111113] transition-colors cursor-pointer"
                  title={lang === "it" ? "Pausa" : "Pause"}
                >
                  <Pause className="w-3.5 h-3.5 fill-current" />
                </button>
              ) : (
                <button
                  onClick={handlePlaySpeech}
                  className="p-1.5 hover:bg-[#E35930] text-[#E35930] hover:text-[#111113] transition-colors cursor-pointer"
                  title={lang === "it" ? "Riproduci" : "Play"}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              )}

              <button
                onClick={handleStopSpeech}
                className="p-1.5 hover:bg-[#E35930] text-[#F8F7F4]/60 hover:text-[#111113] transition-colors cursor-pointer"
                title={lang === "it" ? "Interrompi" : "Stop"}
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
