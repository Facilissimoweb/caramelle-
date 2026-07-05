import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ProposteView from "./components/ProposteView";
import ContattiView from "./components/ContattiView";
import ChatView from "./components/ChatView";
import InfoModal from "./components/InfoModal";
import CookieBanner from "./components/CookieBanner";
import AccessibilityWidget from "./components/AccessibilityWidget";


const SEO_METADATA: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: "Facilissimo Web — Realizzazione Siti Web Macerata e Marche",
    description: "Studio Facilissimo Web a Macerata (Marche). Progettazione e realizzazione siti web veloci, moderni e ottimizzati SEO con Intelligenza Artificiale di M. Teresa Rogani.",
    keywords: "realizzazione siti web macerata, web designer marche, siti web veloci marche, siti web economici macerata, intelligenza artificiale macerata, seo macerata, m teresa rogani",
  },
  "chi-sono": {
    title: "Chi Sono — Facilissimo Web | Teresa Rogani Web Designer Macerata",
    description: "Scopri chi c'è dietro Facilissimo Web. M. Teresa Rogani, freelance web designer e AI specialist a Macerata, Marche. Creazione siti web professionali e su misura.",
    keywords: "teresa rogani, freelance web designer macerata, ai specialist marche, realizzazione siti web professionali marche, sviluppo siti web marche",
  },
  proposte: {
    title: "Proposte e Listino Prezzi — Facilissimo Web Macerata",
    description: "Piani e prezzi trasparenti per la creazione del tuo sito web professionale nelle Marche. Soluzioni Landing Page, siti multipagina e e-commerce con IA integrata.",
    keywords: "prezzi siti web macerata, costo sito internet marche, preventivo sito web macerata, listino prezzi web agency macerata",
  },
  contatti: {
    title: "Contatti — Facilissimo Web | Preventivo Sito Web Macerata",
    description: "Richiedi un preventivo gratuito per il tuo nuovo sito web a Macerata e nelle Marche. Scrivi a facilissimoweb.mc@gmail.com o chiama il +39 379 360 3321.",
    keywords: "contatti web designer macerata, telefono facilissimo web, email facilissimo web, preventivo sito internet macerata",
  },
  chat: {
    title: "Assistente AI Live — Facilissimo Web Macerata",
    description: "Parla subito con il nostro Assistente Virtuale basato su IA. Ricevi risposte istantanee su servizi, tempi e prezzi per siti web a Macerata e nelle Marche.",
    keywords: "chat ai macerata, assistente virtuale marche, intelligenza artificiale assistente, consulenza ai marche",
  },
};

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: any;
    [key: string]: any;
  }
}

// Utility to dynamically load tracking scripts based on local storage consent
export const initTrackingConsentUtility = () => {
  if (typeof window === "undefined") return;

  const savedConsent = localStorage.getItem("facilissimo-cookie-consent");
  if (!savedConsent) return;

  try {
    const prefs = JSON.parse(savedConsent);
    const GA4_ID = "G-P2D3B89Z1L";
    const META_PIXEL_ID = "109823485761234";

    // 1. Google Analytics 4
    if (prefs.ga4) {
      if (!document.getElementById("gtag-js")) {
        const script = document.createElement("script");
        script.id = "gtag-js";
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function gtag() {
          // eslint-disable-next-line prefer-rest-params
          window.dataLayer!.push(arguments);
        };
        window.gtag("js", new Date());
        window.gtag("config", GA4_ID, { anonymize_ip: true });
        console.log(`[Tracking Utility] Google Analytics 4 (GA4) caricato dinamicamente dall'inizializzazione dell'app.`);
      } else {
        window[`ga-disable-${GA4_ID}`] = false;
      }
    } else {
      window[`ga-disable-${GA4_ID}`] = true;
    }

    // 2. Meta Pixel
    if (prefs.metaPixel) {
      if (!document.getElementById("meta-pixel-js")) {
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

        window.fbq("init", META_PIXEL_ID);
        window.fbq("track", "PageView");
        console.log(`[Tracking Utility] Meta Pixel caricato dinamicamente dall'inizializzazione dell'app.`);
      }
    }
  } catch (e) {
    console.error("Error with tracking consent initialization utility:", e);
  }
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [lang, setLang] = useState<"it" | "en">("it");
  const [isFacilitated, setIsFacilitated] = useState<boolean>(() => {
    const saved = localStorage.getItem("facilissimo-facil");
    return saved === "true";
  });
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "ethics" | "sitemap" | null>(null);
  const [forceShowCookieBanner, setForceShowCookieBanner] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<number>(() => {
    const saved = localStorage.getItem("facilissimo-font-size");
    return saved ? parseInt(saved, 10) : 100;
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    const saved = localStorage.getItem("facilissimo-contrast");
    return saved === "true";
  });
  const [readableFont, setReadableFont] = useState<boolean>(() => {
    const saved = localStorage.getItem("facilissimo-readable");
    return saved === "true";
  });

  // Scroll to top automatically when currentTab changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [currentTab]);


  // SEO Dynamic Updates
  useEffect(() => {
    const meta = SEO_METADATA[currentTab] || SEO_METADATA.home;
    
    // Set Document Title
    document.title = meta.title;

    // Set or Update Meta Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    // Set or Update Meta Keywords
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement('meta');
      keywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute('content', meta.keywords);

    // Set or Update OpenGraph Tags
    const ogTags = [
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: window.location.href }
    ];

    ogTags.forEach(({ property, content }) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    });
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem("facilissimo-lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("facilissimo-facil", String(isFacilitated));
  }, [isFacilitated]);

  useEffect(() => {
    localStorage.setItem("facilissimo-font-size", String(fontSize));
    if (typeof window !== "undefined") {
      document.documentElement.style.fontSize = `${fontSize}%`;
    }
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem("facilissimo-contrast", String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    localStorage.setItem("facilissimo-readable", String(readableFont));
  }, [readableFont]);

  // Initial call to load tracking scripts dynamically if user consent was previously given
  useEffect(() => {
    initTrackingConsentUtility();
  }, []);

  const renderActiveView = () => {
    switch (currentTab) {
      case "home":
        return <HomeView setCurrentTab={setCurrentTab} lang={lang} isFacilitated={isFacilitated} />;
      case "chi-sono":
        return <AboutView setCurrentTab={setCurrentTab} lang={lang} isFacilitated={isFacilitated} />;
      case "proposte":
        return <ProposteView setCurrentTab={setCurrentTab} lang={lang} isFacilitated={isFacilitated} />;
      case "contatti":
        return <ContattiView lang={lang} isFacilitated={isFacilitated} />;
      case "chat":
        return <ChatView lang={lang} isFacilitated={isFacilitated} />;
      default:
        return <HomeView setCurrentTab={setCurrentTab} lang={lang} isFacilitated={isFacilitated} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#111113] text-[#F8F7F4] flex flex-col selection:bg-[#E35930]/20 selection:text-[#E35930] antialiased ${
      readableFont ? "font-mono tracking-wide" : "font-sans"
    } ${
      isFacilitated ? "text-lg" : ""
    }`}>
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        isFacilitated={isFacilitated}
        setIsFacilitated={setIsFacilitated}
      />

      {/* Main View Area with top offset to clear fixed header */}
      <main className={`flex-grow pt-20 ${
        highContrast ? "accessibility-high-contrast" : ""
      } ${
        isFacilitated ? "accessibility-facilitated-contrast" : ""
      }`}>
        <div className="w-full">
          {isFacilitated && (
            <div className="bg-[#E35930] text-[#111113] text-center text-xs py-2 px-4 font-mono font-bold uppercase tracking-wider animate-pulse" id="facilitated-badge-banner">
              {lang === "it"
                ? "Modalità Semplificata Attiva — Caratteri ingranditi e testi più facili"
                : "Simplified Mode Active — Larger fonts and simpler layout"}
            </div>
          )}
          {renderActiveView()}
        </div>
      </main>

      {/* Page Footer */}
      <Footer 
        setCurrentTab={setCurrentTab} 
        onOpenModal={setActiveModal} 
        lang={lang} 
        onOpenCookieSettings={() => setForceShowCookieBanner(true)} 
      />

      {/* Popups (Modals) */}
      <InfoModal
        isOpen={activeModal !== null}
        type={activeModal}
        onClose={() => setActiveModal(null)}
        lang={lang}
        isFacilitated={isFacilitated}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner
        lang={lang}
        isFacilitated={isFacilitated}
        forceShow={forceShowCookieBanner}
        onCloseForceShow={() => setForceShowCookieBanner(false)}
      />

      {/* Accessibility Floating Panel Widget */}
      <AccessibilityWidget
        lang={lang}
        isFacilitated={isFacilitated}
        setIsFacilitated={setIsFacilitated}
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        readableFont={readableFont}
        setReadableFont={setReadableFont}
      />
    </div>
  );
}
