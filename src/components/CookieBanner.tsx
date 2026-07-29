import React, { useState, useEffect } from "react";
import { Cookie, Check, X, Shield, Settings } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { safeStorage } from "../lib/safeStorage";
import { initTrackingConsentUtility } from "../App";

interface CookieBannerProps {
  lang: "it" | "en";
  isFacilitated?: boolean;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ lang, isFacilitated }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [ga4Accepted, setGa4Accepted] = useState(true);
  const [metaAccepted, setMetaAccepted] = useState(true);

  useEffect(() => {
    try {
      const saved = safeStorage.getItem("facilissimo-cookie-consent");
      if (!saved) {
        // First visit: show cookie banner after 1 second
        const timer = setTimeout(() => setIsVisible(true), 1000);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(saved);
        setGa4Accepted(!!parsed.ga4);
        setMetaAccepted(!!parsed.metaPixel);
      }
    } catch (e) {
      console.warn("Failed to parse cookie preferences:", e);
    }
  }, []);

  const handleAcceptAll = () => {
    const preferences = { ga4: true, metaPixel: true, timestamp: new Date().toISOString() };
    try {
      safeStorage.setItem("facilissimo-cookie-consent", JSON.stringify(preferences));
    } catch (e) {
      console.warn("Could not save cookie consent:", e);
    }
    initTrackingConsentUtility();
    setIsVisible(false);
  };

  const handleAcceptEssentialOnly = () => {
    const preferences = { ga4: false, metaPixel: false, timestamp: new Date().toISOString() };
    try {
      safeStorage.setItem("facilissimo-cookie-consent", JSON.stringify(preferences));
    } catch (e) {
      console.warn("Could not save cookie consent:", e);
    }
    // Disable tracking if active
    const GA4_ID = (import.meta as any).env.VITE_GA_MEASUREMENT_ID || "G-WXMTZF53RL";
    if (typeof window !== "undefined") {
      window[`ga-disable-${GA4_ID}`] = true;
    }
    setIsVisible(false);
  };

  const handleSaveCustom = () => {
    const preferences = { ga4: ga4Accepted, metaPixel: metaAccepted, timestamp: new Date().toISOString() };
    try {
      safeStorage.setItem("facilissimo-cookie-consent", JSON.stringify(preferences));
    } catch (e) {
      console.warn("Could not save custom cookie consent:", e);
    }
    initTrackingConsentUtility();
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const isIt = lang === "it";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xl z-50 bg-[#111113] text-white border-2 border-amber-400 p-5 sm:p-6 shadow-2xl font-sans"
        id="cookie-consent-banner"
      >
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-400 text-black font-bold flex items-center justify-center shrink-0">
            <Cookie className="w-5 h-5" />
          </div>

          <div className="space-y-3 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
                {isIt ? "Gestione Cookie & Privacy" : "Cookie Preferences"}
                <span className="text-[10px] font-mono bg-white/10 text-amber-400 px-2 py-0.5 border border-amber-400/30">
                  GDPR
                </span>
              </h3>
              <button
                onClick={handleAcceptEssentialOnly}
                className="text-white/60 hover:text-white p-1 cursor-pointer"
                title={isIt ? "Chiudi e usa solo essenziali" : "Close and reject non-essential"}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-white/80 leading-relaxed">
              {isIt
                ? "Utilizziamo cookie tecnici essenziali e Google Analytics 4 (GA4) anonimizzato per comprendere il traffico sul nostro sito e migliorare l'esperienza. Puoi scegliere se acconsentire ai cookie analitici."
                : "We use essential cookies and anonymized Google Analytics 4 (GA4) to understand site performance and deliver better web experiences."}
            </p>

            {showCustomize && (
              <div className="bg-white/5 border border-white/10 p-3 space-y-2 text-xs font-mono my-2">
                <div className="flex items-center justify-between">
                  <span>Google Analytics 4 (GA4)</span>
                  <input
                    type="checkbox"
                    checked={ga4Accepted}
                    onChange={(e) => setGa4Accepted(e.target.checked)}
                    className="accent-amber-400 w-4 h-4 cursor-pointer"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Meta Pixel</span>
                  <input
                    type="checkbox"
                    checked={metaAccepted}
                    onChange={(e) => setMetaAccepted(e.target.checked)}
                    className="accent-amber-400 w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {!showCustomize ? (
                <>
                  <button
                    onClick={handleAcceptAll}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
                    id="btn-accept-all-cookies"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>{isIt ? "Accetta Tutti" : "Accept All"}</span>
                  </button>

                  <button
                    onClick={handleAcceptEssentialOnly}
                    className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer"
                    id="btn-essential-cookies-only"
                  >
                    <span>{isIt ? "Solo Essenziali" : "Essential Only"}</span>
                  </button>

                  <button
                    onClick={() => setShowCustomize(true)}
                    className="px-2.5 py-2 text-white/70 hover:text-white text-xs font-mono underline cursor-pointer flex items-center gap-1"
                  >
                    <Settings className="w-3 h-3" />
                    <span>{isIt ? "Personalizza" : "Customize"}</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSaveCustom}
                    className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <span>{isIt ? "Salva Preferenze" : "Save Preferences"}</span>
                  </button>

                  <button
                    onClick={() => setShowCustomize(false)}
                    className="px-3 py-2 text-white/70 hover:text-white text-xs font-mono underline cursor-pointer"
                  >
                    <span>{isIt ? "Annulla" : "Cancel"}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CookieBanner;
