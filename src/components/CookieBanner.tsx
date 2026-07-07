import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie, Settings, Check, X, Shield, BarChart3, Target } from "lucide-react";

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: any;
    [key: string]: any;
  }
}

interface CookieBannerProps {
  lang: "it" | "en";
  isFacilitated: boolean;
  forceShow?: boolean;
  onCloseForceShow?: () => void;
}

export interface CookiePreferences {
  essential: boolean;
  ga4: boolean;
  metaPixel: boolean;
}

const GA4_PLACEHOLDER_ID = (import.meta as any).env.VITE_GA_MEASUREMENT_ID || "G-WXMTZF53RL"; // Dynamic config with fallback
const META_PIXEL_PLACEHOLDER_ID = (import.meta as any).env.VITE_META_PIXEL_ID || "109823485761234"; // Dynamic config with fallback

// Helper to inject scripts based on consent
export const applyTrackingConsent = (prefs: CookiePreferences) => {
  if (typeof window === "undefined") return;

  // 1. Google Analytics 4
  if (prefs.ga4) {
    // If enabled, inject GA4
    if (!document.getElementById("gtag-js")) {
      const script = document.createElement("script");
      script.id = "gtag-js";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_PLACEHOLDER_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA4_PLACEHOLDER_ID, { anonymize_ip: true });
      console.log(`[Tracking] Google Analytics 4 (GA4) abilitato con ID: ${GA4_PLACEHOLDER_ID}`);
    } else {
      window[`ga-disable-${GA4_PLACEHOLDER_ID}`] = false;
    }
  } else {
    // If disabled, block tracking
    window[`ga-disable-${GA4_PLACEHOLDER_ID}`] = true;
    console.log(`[Tracking] Google Analytics 4 (GA4) disabilitato.`);
  }

  // 2. Meta Pixel
  if (prefs.metaPixel) {
    if (!document.getElementById("meta-pixel-js")) {
      // Standard Facebook/Meta Pixel script
      /* eslint-disable */
      (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function () {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = "2.0";
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      /* eslint-enable */

      window.fbq("init", META_PIXEL_PLACEHOLDER_ID);
      window.fbq("track", "PageView");
      console.log(`[Tracking] Meta Pixel (Facebook Pixel) abilitato con ID: ${META_PIXEL_PLACEHOLDER_ID}`);
    } else {
      console.log(`[Tracking] Meta Pixel abilitato.`);
    }
  } else {
    console.log(`[Tracking] Meta Pixel (Facebook Pixel) disabilitato.`);
  }
};

export default function CookieBanner({ lang, isFacilitated, forceShow = false, onCloseForceShow }: CookieBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    essential: true,
    ga4: false,
    metaPixel: false,
  });

  // Check existing consent on mount
  useEffect(() => {
    const saved = localStorage.getItem("facilissimo-cookie-consent");
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CookiePreferences;
        setPrefs(parsed);
        applyTrackingConsent(parsed);
        if (!forceShow) {
          setShowBanner(false);
        }
      } catch (e) {
        console.error("Error parsing cookie preferences", e);
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  // Sync with forceShow (when user clicks "Gestione Cookie" in footer)
  useEffect(() => {
    if (forceShow) {
      setShowBanner(true);
      setIsExpanding(true);
    }
  }, [forceShow]);

  const savePreferences = (updatedPrefs: CookiePreferences) => {
    localStorage.setItem("facilissimo-cookie-consent", JSON.stringify(updatedPrefs));
    applyTrackingConsent(updatedPrefs);
    setShowBanner(false);
    setIsExpanding(false);
    if (onCloseForceShow) {
      onCloseForceShow();
    }
  };

  const handleAcceptAll = () => {
    const allOn = { essential: true, ga4: true, metaPixel: true };
    setPrefs(allOn);
    savePreferences(allOn);
  };

  const handleRejectAll = () => {
    const allOff = { essential: true, ga4: false, metaPixel: false };
    setPrefs(allOff);
    savePreferences(allOff);
  };

  const handleSaveCustom = () => {
    savePreferences(prefs);
  };

  const togglePref = (key: keyof CookiePreferences) => {
    if (key === "essential") return; // Cannot toggle essential
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 180 }}
          className={`w-full max-w-4xl bg-[#151518] border border-[rgba(248,247,244,0.15)] shadow-[0_10px_50px_rgba(0,0,0,0.5)] p-5 sm:p-6 pointer-events-auto flex flex-col gap-4 ${
            isFacilitated ? "text-lg contrast-125" : "text-sm"
          }`}
          id="cookie-consent-container"
        >
          {/* Main banner text */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 shrink-0 bg-[#E35930]/10 border border-[#E35930]/30 text-[#E35930] flex items-center justify-center rounded-none mt-0.5">
                <Cookie className="w-5 h-5 animate-spin-slow" />
              </div>
              <div className="space-y-1">
                <h4 className="font-display font-bold text-[#F8F7F4] flex items-center gap-2">
                  {lang === "it" ? "Informativa sui Cookie & Privacy GDPR" : "Cookie Consent & GDPR Privacy"}
                  <span className="text-[9px] font-mono border border-[#E35930]/40 text-[#E35930] px-1.5 py-0.5 uppercase tracking-wide">
                    {lang === "it" ? "Scelta Libera" : "Free Choice"}
                  </span>
                </h4>
                <p className="text-xs sm:text-sm text-[#F8F7F4]/70 leading-relaxed font-sans max-w-2xl">
                  {lang === "it"
                    ? "In rispetto del GDPR europeo, ti diamo il controllo totale. Utilizziamo i cookie per analizzare le prestazioni del sito (Google Analytics 4) e misurare le campagne social (Meta Pixel). Puoi scegliere liberamente cosa attivare o disattivare."
                    : "In compliance with European GDPR, we grant you absolute control. We use cookies to analyze performance (Google Analytics 4) and measure campaign results (Meta Pixel). You can freely choose what to enable."}
                </p>
              </div>
            </div>

            {/* Quick Actions if not expanding */}
            {!isExpanding && (
              <div className="flex flex-wrap gap-2 shrink-0 w-full md:w-auto md:justify-end">
                <button
                  onClick={() => setIsExpanding(true)}
                  className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[#F8F7F4]/60 hover:text-[#E35930] border border-[rgba(248,247,244,0.1)] hover:border-[#E35930] transition-all cursor-pointer flex items-center gap-1.5"
                  id="cookie-btn-customize"
                >
                  <Settings className="w-3.5 h-3.5" />
                  {lang === "it" ? "Personalizza" : "Customize"}
                </button>
                <button
                  onClick={handleRejectAll}
                  className="px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider text-[#F8F7F4]/80 hover:text-[#F8F7F4] hover:bg-white/5 border border-[rgba(248,247,244,0.15)] transition-all cursor-pointer"
                  id="cookie-btn-reject-all"
                >
                  {lang === "it" ? "Rifiuta Tutti" : "Reject All"}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-5 py-2 bg-[#E35930] text-[#111113] text-xs font-mono font-bold uppercase tracking-widest hover:bg-transparent hover:text-[#E35930] border border-[#E35930] transition-all cursor-pointer"
                  id="cookie-btn-accept-all"
                >
                  {lang === "it" ? "Accetta Tutti" : "Accept All"}
                </button>
              </div>
            )}
          </div>

          {/* Granular details block */}
          <AnimatePresence>
            {isExpanding && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden border-t border-[rgba(248,247,244,0.1)] pt-4 mt-2 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Category 1: Essential */}
                  <div className="p-4 bg-[#111113] border border-[rgba(248,247,244,0.06)] flex flex-col justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F8F7F4]/90 uppercase">
                        <Shield className="w-4 h-4 text-[#E35930]" />
                        {lang === "it" ? "1. Necessari" : "1. Essential"}
                      </div>
                      <p className="text-[11px] text-[#F8F7F4]/60 leading-relaxed font-sans">
                        {lang === "it"
                          ? "Permettono di memorizzare le tue preferenze sui cookie, la lingua selezionata e la modalità semplificata. Non raccolgono dati personali e non possono essere spenti."
                          : "Store cookie preferences, selected language, and accessibility mode. They collect no personal data and cannot be turned off."}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] font-mono text-[#E35930] font-bold uppercase">
                        {lang === "it" ? "Sempre Attivo" : "Always On"}
                      </span>
                      <div className="w-8 h-8 rounded-none border border-[rgba(248,247,244,0.15)] bg-white/5 flex items-center justify-center text-gray-500">
                        <Check className="w-4 h-4 text-[#E35930]" />
                      </div>
                    </div>
                  </div>

                  {/* Category 2: Google Analytics 4 */}
                  <div className={`p-4 border transition-all flex flex-col justify-between gap-3 ${
                    prefs.ga4 ? "bg-[#111113] border-[#E35930]/30" : "bg-[#111113] border-[rgba(248,247,244,0.06)]"
                  }`}>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F8F7F4]/90 uppercase">
                        <BarChart3 className="w-4 h-4 text-[#E35930]" />
                        Google Analytics 4
                      </div>
                      <p className="text-[11px] text-[#F8F7F4]/60 leading-relaxed font-sans">
                        {lang === "it"
                          ? "Ci aiutano a capire quante persone visitano il sito, quali pagine leggono e se si verificano rallentamenti. I dati vengono trattati con indirizzo IP anonimizzato."
                          : "Helps us understand how many users visit, which pages they read, and any site errors. Data is processed with anonymized IP addresses."}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => togglePref("ga4")}
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 transition-all cursor-pointer ${
                          prefs.ga4 ? "text-[#E35930]" : "text-[#F8F7F4]/50 hover:text-[#F8F7F4]"
                        }`}
                      >
                        {prefs.ga4 ? (lang === "it" ? "Consentito" : "Allowed") : (lang === "it" ? "Disattivo" : "Disabled")}
                      </button>
                      <button
                        onClick={() => togglePref("ga4")}
                        className={`w-12 h-6 border transition-all relative flex items-center px-0.5 cursor-pointer ${
                          prefs.ga4 ? "border-[#E35930] bg-[#E35930]/10" : "border-[rgba(248,247,244,0.15)] bg-white/5"
                        }`}
                        id="cookie-toggle-ga4"
                      >
                        <span className={`w-4 h-4 bg-[#F8F7F4] transition-all block ${
                          prefs.ga4 ? "translate-x-6 bg-[#E35930]" : "translate-x-0 bg-gray-500"
                        }`} />
                      </button>
                    </div>
                  </div>

                  {/* Category 3: Meta Pixel */}
                  <div className={`p-4 border transition-all flex flex-col justify-between gap-3 ${
                    prefs.metaPixel ? "bg-[#111113] border-[#E35930]/30" : "bg-[#111113] border-[rgba(248,247,244,0.06)]"
                  }`}>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F8F7F4]/90 uppercase">
                        <Target className="w-4 h-4 text-[#E35930]" />
                        Meta Pixel (FB &amp; IG)
                      </div>
                      <p className="text-[11px] text-[#F8F7F4]/60 leading-relaxed font-sans">
                        {lang === "it"
                          ? "Permette di capire se i visitatori provengono dalle sponsorizzazioni o dai post di Facilissimo Web su Facebook e Instagram, ottimizzando il budget pubblicitario."
                          : "Enables measuring if visitors come from Facebook and Instagram campaigns or posts, helping optimize marketing efficiency for Facilissimo Web."}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <button
                        onClick={() => togglePref("metaPixel")}
                        className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-1 transition-all cursor-pointer ${
                          prefs.metaPixel ? "text-[#E35930]" : "text-[#F8F7F4]/50 hover:text-[#F8F7F4]"
                        }`}
                      >
                        {prefs.metaPixel ? (lang === "it" ? "Consentito" : "Allowed") : (lang === "it" ? "Disattivo" : "Disabled")}
                      </button>
                      <button
                        onClick={() => togglePref("metaPixel")}
                        className={`w-12 h-6 border transition-all relative flex items-center px-0.5 cursor-pointer ${
                          prefs.metaPixel ? "border-[#E35930] bg-[#E35930]/10" : "border-[rgba(248,247,244,0.15)] bg-white/5"
                        }`}
                        id="cookie-toggle-meta"
                      >
                        <span className={`w-4 h-4 bg-[#F8F7F4] transition-all block ${
                          prefs.metaPixel ? "translate-x-6 bg-[#E35930]" : "translate-x-0 bg-gray-500"
                        }`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Confirm selections & Close panel actions */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-[rgba(248,247,244,0.1)]">
                  <button
                    onClick={() => setIsExpanding(false)}
                    className="text-xs font-mono uppercase font-bold text-[#F8F7F4]/50 hover:text-[#F8F7F4] flex items-center gap-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                    {lang === "it" ? "Nascondi Dettagli" : "Hide Details"}
                  </button>

                  <div className="flex gap-2 w-full sm:w-auto justify-end">
                    <button
                      onClick={handleRejectAll}
                      className="flex-1 sm:flex-initial px-4 py-2 border border-[rgba(248,247,244,0.15)] hover:border-[#E35930] text-xs font-mono font-bold uppercase tracking-wider text-[#F8F7F4]/70 hover:text-[#E35930] transition-all cursor-pointer"
                    >
                      {lang === "it" ? "Rifiuta Tutti" : "Reject All"}
                    </button>
                    <button
                      onClick={handleSaveCustom}
                      className="flex-1 sm:flex-initial px-5 py-2 bg-transparent hover:bg-[#E35930] text-[#E35930] hover:text-[#111113] border border-[#E35930] text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer"
                      id="cookie-btn-save-custom"
                    >
                      {lang === "it" ? "Salva Scelta" : "Save Selection"}
                    </button>
                    <button
                      onClick={handleAcceptAll}
                      className="flex-1 sm:flex-initial px-5 py-2 bg-[#E35930] text-[#111113] text-xs font-mono font-bold uppercase tracking-wider hover:bg-transparent hover:text-[#E35930] border border-[#E35930] transition-all cursor-pointer"
                    >
                      {lang === "it" ? "Accetta Tutti" : "Accept All"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
