import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Home, Share2, Copy, Check, ArrowUp } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ProposteView from "./components/ProposteView";
import ContattiView from "./components/ContattiView";
import ChatView from "./components/ChatView";
import BlogView from "./components/BlogView";
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
    description: "Parla subito con l'Assistente Virtuale di Facilissimo Web basato su IA. Ricevi risposte istantanee su servizi, tempi e prezzi per siti web a Macerata e nelle Marche.",
    keywords: "chat ai macerata, assistente virtuale marche, intelligenza artificiale assistente, consulenza ai marche",
  },
  blog: {
    title: "Blog & News — Facilissimo Web | SEO Predittiva e IA",
    description: "Leggi gli articoli di approfondimento su SEO Predittiva, Web Design con Intelligenza Artificiale e strategie digitali per microimprese a Macerata e nelle Marche.",
    keywords: "seo predittiva, blog intelligenza artificiale, web design marche, teresa rogani blog, novità seo ia, blog facilissimo web",
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
    const GA4_ID = (import.meta as any).env.VITE_GA_MEASUREMENT_ID || "G-WXMTZF53RL";
    const META_PIXEL_ID = (import.meta as any).env.VITE_META_PIXEL_ID || "109823485761234";

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

const TABS_ORDER = ["home", "chi-sono", "proposte", "contatti", "chat", "blog"];

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const [showBreadcrumb, setShowBreadcrumb] = useState<boolean>(true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const lastScrollY = React.useRef<number>(0);

  // Dynamic Breadcrumb Show/Hide on Scroll Up/Down
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we are close to the top, always show breadcrumb
      if (currentScrollY < 80) {
        setShowBreadcrumb(true);
      } else if (currentScrollY > lastScrollY.current) {
        // Scrolling down -> hide breadcrumb
        setShowBreadcrumb(false);
      } else {
        // Scrolling up -> show breadcrumb
        setShowBreadcrumb(true);
      }
      
      // Show/Hide back to top button
      if (currentScrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Centralized Navigate To helper that pushes state to browser history
  const navigateTo = (tab: string, articleSlug: string | null = null, pushHistory = true) => {
    const currentIndex = TABS_ORDER.indexOf(currentTab);
    const newIndex = TABS_ORDER.indexOf(tab);
    if (newIndex !== -1 && currentIndex !== -1 && currentIndex !== newIndex) {
      setSlideDirection(newIndex > currentIndex ? "left" : "right");
    }
    
    setCurrentTab(tab);
    setSelectedArticle(articleSlug);

    let newHash = `#/${tab}`;
    if (tab === "blog" && articleSlug) {
      newHash = `#/${tab}/${articleSlug}`;
    }

    if (pushHistory) {
      window.history.pushState({ tab, articleSlug }, "", newHash);
    } else {
      window.history.replaceState({ tab, articleSlug }, "", newHash);
    }
  };

  // Touch Swipe Gesture Tracking for "sfogliabile scivolando"
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 60; // Next page
    const isRightSwipe = distance < -60; // Previous page

    const currentIndex = TABS_ORDER.indexOf(currentTab);

    if (isLeftSwipe && currentIndex < TABS_ORDER.length - 1) {
      navigateTo(TABS_ORDER[currentIndex + 1], null, true);
    } else if (isRightSwipe && currentIndex > 0) {
      navigateTo(TABS_ORDER[currentIndex - 1], null, true);
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleSetTab = (newTab: string) => {
    if (newTab === currentTab && !selectedArticle) return;
    navigateTo(newTab, null, true);
  };

  const handleSetArticle = (slug: string | null) => {
    navigateTo("blog", slug, true);
  };

  const getTabLabel = (tabId: string) => {
    if (lang === "it") {
      switch (tabId) {
        case "home": return "Inizio";
        case "blog": return "Blog & News";
        case "chi-sono": return "Chi Sono";
        case "proposte": return "Proposte";
        case "contatti": return "Contatti";
        case "chat": return "Assistente AI";
        default: return tabId;
      }
    } else {
      switch (tabId) {
        case "home": return "Home";
        case "blog": return "Blog & News";
        case "chi-sono": return "About Me";
        case "proposte": return "Proposals";
        case "contatti": return "Contact";
        case "chat": return "AI Chat";
        default: return tabId;
      }
    }
  };

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
    console.debug(`[App State Sync] Language changed to: ${lang}`);
    localStorage.setItem("facilissimo-lang", lang);
  }, [lang]);

  useEffect(() => {
    console.debug(`[App State Sync] isFacilitated changed to: ${isFacilitated}`);
    localStorage.setItem("facilissimo-facil", String(isFacilitated));
  }, [isFacilitated]);

  useEffect(() => {
    console.debug(`[App State Sync] fontSize changed to: ${fontSize}%`);
    localStorage.setItem("facilissimo-font-size", String(fontSize));
    if (typeof window !== "undefined") {
      document.documentElement.style.fontSize = `${fontSize}%`;
    }
  }, [fontSize]);

  useEffect(() => {
    console.debug(`[App State Sync] highContrast changed to: ${highContrast}`);
    localStorage.setItem("facilissimo-contrast", String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    console.debug(`[App State Sync] readableFont changed to: ${readableFont}`);
    localStorage.setItem("facilissimo-readable", String(readableFont));
  }, [readableFont]);

  // Initial call to load tracking scripts dynamically if user consent was previously given
  useEffect(() => {
    initTrackingConsentUtility();
  }, []);

  // URL Hash Sync Effect (Router for deep linking & back gesture support)
  useEffect(() => {
    const handleUrlSync = () => {
      const hash = window.location.hash;
      const cleanHash = hash.replace(/^#\/?/, ""); // e.g. "blog/ai-act-regolamento-europeo"

      if (!cleanHash) {
        navigateTo("home", null, false);
        return;
      }

      if (cleanHash.startsWith("blog/")) {
        const slug = cleanHash.substring("blog/".length);
        navigateTo("blog", slug, false);
      } else {
        const tab = cleanHash.split("?")[0];
        if (TABS_ORDER.includes(tab)) {
          navigateTo(tab, null, false);
        } else {
          navigateTo("home", null, false);
        }
      }
    };

    // Run on initial load
    handleUrlSync();

    // Listen to hash changes or popstate (prevents exiting site on back gestures)
    window.addEventListener("hashchange", handleUrlSync);
    window.addEventListener("popstate", handleUrlSync);

    return () => {
      window.removeEventListener("hashchange", handleUrlSync);
      window.removeEventListener("popstate", handleUrlSync);
    };
  }, []);

  // Anti-copy, anti-theft, and content-protection event listeners
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();

    // Prevent right-click context menu
    document.addEventListener("contextmenu", preventDefault);

    // Prevent copy, cut, and drag events
    document.addEventListener("copy", preventDefault);
    document.addEventListener("cut", preventDefault);
    document.addEventListener("dragstart", preventDefault);

    // Block keyboard shortcuts (Ctrl/Cmd + C, Ctrl/Cmd + X, Ctrl/Cmd + U, F12, Ctrl+Shift+I/C/J)
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMetaOrCtrl = e.ctrlKey || e.metaKey;
      
      // Block F12
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }

      if (isMetaOrCtrl) {
        const key = e.key.toLowerCase();
        // Block C, X, U
        if (key === "c" || key === "x" || key === "u" || key === "s") {
          e.preventDefault();
          return;
        }
        // Block I, J, C (Inspect/Devtools)
        if (e.shiftKey && (key === "i" || key === "j" || key === "c")) {
          e.preventDefault();
          return;
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", preventDefault);
      document.removeEventListener("copy", preventDefault);
      document.removeEventListener("cut", preventDefault);
      document.removeEventListener("dragstart", preventDefault);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const renderActiveView = () => {
    switch (currentTab) {
      case "home":
        return <HomeView setCurrentTab={handleSetTab} lang={lang} isFacilitated={isFacilitated} onOpenModal={setActiveModal} />;
      case "chi-sono":
        return <AboutView setCurrentTab={handleSetTab} lang={lang} isFacilitated={isFacilitated} />;
      case "proposte":
        return <ProposteView setCurrentTab={handleSetTab} lang={lang} isFacilitated={isFacilitated} />;
      case "contatti":
        return <ContattiView lang={lang} isFacilitated={isFacilitated} />;
      case "chat":
        return <ChatView lang={lang} isFacilitated={isFacilitated} />;
      case "blog":
        return (
          <BlogView
            lang={lang}
            isFacilitated={isFacilitated}
            setCurrentTab={handleSetTab}
            selectedArticle={selectedArticle}
            setSelectedArticle={handleSetArticle}
          />
        );
      default:
        return <HomeView setCurrentTab={handleSetTab} lang={lang} isFacilitated={isFacilitated} onOpenModal={setActiveModal} />;
    }
  };

  const currentIndex = TABS_ORDER.indexOf(currentTab);

  return (
    <div className={`min-h-screen bg-[#111113] text-[#F8F7F4] flex flex-col selection:bg-[#E35930]/20 selection:text-[#E35930] antialiased ${
      readableFont ? "font-mono tracking-wide" : "font-sans"
    } ${
      isFacilitated ? "text-lg" : ""
    }`}>
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={handleSetTab}
        lang={lang}
        setLang={setLang}
        isFacilitated={isFacilitated}
        setIsFacilitated={setIsFacilitated}
      />

      {/* Main View Area with top offset to clear fixed header and touch swipe gesture handlers */}
      <main 
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`flex-grow pt-20 overflow-x-hidden ${
          highContrast ? "accessibility-high-contrast" : ""
        } ${
          isFacilitated ? "accessibility-facilitated-contrast" : ""
        }`}
      >
        <div className="w-full">
          {/* Dynamic Breadcrumbs Bar */}
          {(() => {
            const breadcrumbItems = [
              { id: "home", label: lang === "it" ? "Inizio" : "Home" }
            ];
            
            if (currentTab !== "home") {
              breadcrumbItems.push({
                id: currentTab,
                label: getTabLabel(currentTab),
              });
              
              if (currentTab === "blog" && selectedArticle) {
                const articleTitles: Record<string, string> = {
                  "ai-act-regolamento-europeo": lang === "it" ? "L'AI Act è Legge" : "The AI Act is Law",
                  "seo-predittiva": lang === "it" ? "SEO Predittiva" : "Predictive SEO",
                  "sito-statico-vs-wordpress": lang === "it" ? "Sito Statico vs WordPress" : "Static vs WordPress",
                };
                const title = articleTitles[selectedArticle] || selectedArticle;
                breadcrumbItems.push({
                  id: "article",
                  label: title,
                });
              }
            }

            return (
              <div 
                className={`sticky top-20 left-0 w-full bg-[#131315]/90 border-b border-[rgba(248,247,244,0.05)] py-3 px-4 sm:px-6 xl:px-12 backdrop-blur-md z-40 select-none transition-all duration-300 ease-in-out ${
                  showBreadcrumb 
                    ? "translate-y-0 opacity-100" 
                    : "-translate-y-full opacity-0 pointer-events-none"
                }`}
              >
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] tracking-wider uppercase font-bold text-[#F8F7F4]/60">
                  <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-[#F8F7F4]/40">
                    <Home className="w-3.5 h-3.5 text-[#E35930] mr-1 inline shrink-0" />
                    {breadcrumbItems.map((item, index) => (
                      <React.Fragment key={item.id}>
                        {index > 0 && <span className="text-[#F8F7F4]/20 font-light mx-0.5 sm:mx-1 shrink-0">/</span>}
                        {index === breadcrumbItems.length - 1 ? (
                          <span className="text-[#E35930] font-extrabold truncate max-w-[200px] sm:max-w-none">{item.label}</span>
                        ) : (
                          <button
                            onClick={() => {
                              if (item.id === "home") {
                                handleSetTab("home");
                              } else {
                                navigateTo(item.id, null, true);
                              }
                            }}
                            className="text-[#F8F7F4]/60 hover:text-[#E35930] cursor-pointer transition-colors uppercase font-bold shrink-0"
                          >
                            {item.label}
                          </button>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  <div className="hidden sm:flex items-center gap-4 text-[9px] uppercase font-bold text-[#F8F7F4]/40 select-none">
                    <span>{lang === "it" ? "Posizione Attiva" : "Active Location"}</span>
                    <span className="px-2 py-0.5 bg-[#E35930]/10 border border-[#E35930]/20 text-[#E35930] rounded-sm text-[9px]">
                      {currentTab === "blog" && selectedArticle ? "ARTICLE_VIEW" : `${currentTab.toUpperCase()}_VIEW`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}

          {isFacilitated && (
            <div className="bg-[#E35930] text-[#111113] text-center text-xs py-2 px-4 font-mono font-bold uppercase tracking-wider animate-pulse" id="facilitated-badge-banner">
              {lang === "it"
                ? "Modalità Semplificata Attiva — Caratteri ingranditi e testi più facili"
                : "Simplified Mode Active — Larger fonts and simpler layout"}
            </div>
          )}
          
          <AnimatePresence mode="wait" custom={slideDirection}>
            <motion.div
              key={currentTab}
              custom={slideDirection}
              initial={{ opacity: 0, x: slideDirection === "left" ? 24 : -24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: slideDirection === "left" ? -24 : 24 }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="w-full"
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Interactive Page-Turning Slide Navigator */}
      <div className="w-full border-t border-[rgba(248,247,244,0.06)] bg-[#131315]/95 backdrop-blur-md py-6 px-6 relative z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 font-mono">
          {/* Previous Page Button */}
          {currentIndex > 0 ? (
            <button
              onClick={() => {
                setSlideDirection("right");
                setCurrentTab(TABS_ORDER[currentIndex - 1]);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2.5 text-xs text-[#F8F7F4]/60 hover:text-[#E35930] transition-all py-2 border border-transparent hover:border-[rgba(248,247,244,0.08)] px-4 bg-transparent cursor-pointer group"
              id="slide-nav-prev"
            >
              <ChevronLeft className="w-4 h-4 text-[#E35930] group-hover:-translate-x-1 transition-transform" />
              <div className="text-left">
                <span className="text-[9px] block text-[#F8F7F4]/40 uppercase tracking-widest font-normal">
                  {lang === "it" ? "Sezione Precedente" : "Previous Section"}
                </span>
                <span className="font-bold uppercase tracking-wider text-[11px] text-[#F8F7F4]/80 group-hover:text-[#E35930]">
                  {getTabLabel(TABS_ORDER[currentIndex - 1])}
                </span>
              </div>
            </button>
          ) : (
            <div className="hidden sm:block w-40" />
          )}

          {/* Center Swipe Indicator & Dots */}
          <div className="flex flex-col items-center gap-2 py-1">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 bg-[#E35930] rounded-full animate-ping" />
              <span className="text-[9px] tracking-[0.25em] uppercase text-[#F8F7F4]/40 font-bold">
                {lang === "it" ? "Scivola o trascina per sfogliare" : "Swipe or click to slide"}
              </span>
              <span className="w-1 h-1 bg-[#E35930] rounded-full animate-ping" />
            </div>
            
            {/* Nav dots */}
            <div className="flex items-center gap-1.5">
              {TABS_ORDER.map((tab, idx) => (
                <button
                  key={tab}
                  onClick={() => {
                    const direction = idx > currentIndex ? "left" : "right";
                    setSlideDirection(direction);
                    setCurrentTab(tab);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    tab === currentTab ? "w-6 bg-[#E35930]" : "w-1.5 bg-[rgba(248,247,244,0.15)] hover:bg-[#E35930]/40"
                  }`}
                  title={getTabLabel(tab)}
                  id={`slide-nav-dot-${tab}`}
                />
              ))}
            </div>
          </div>

          {/* Next Page Button */}
          {currentIndex < TABS_ORDER.length - 1 ? (
            <button
              onClick={() => {
                setSlideDirection("left");
                setCurrentTab(TABS_ORDER[currentIndex + 1]);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="flex items-center gap-2.5 text-xs text-[#F8F7F4]/60 hover:text-[#E35930] transition-all py-2 border border-transparent hover:border-[rgba(248,247,244,0.08)] px-4 bg-transparent cursor-pointer text-right group"
              id="slide-nav-next"
            >
              <div className="text-right">
                <span className="text-[9px] block text-[#F8F7F4]/40 uppercase tracking-widest font-normal">
                  {lang === "it" ? "Prossima Sezione" : "Next Section"}
                </span>
                <span className="font-bold uppercase tracking-wider text-[11px] text-[#F8F7F4]/80 group-hover:text-[#E35930]">
                  {getTabLabel(TABS_ORDER[currentIndex + 1])}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#E35930] group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="hidden sm:block w-40" />
          )}
        </div>
      </div>

      {/* Page Footer */}
      <Footer 
        setCurrentTab={handleSetTab} 
        onOpenModal={setActiveModal} 
        lang={lang} 
        onOpenCookieSettings={() => setForceShowCookieBanner(true)} 
        currentTab={currentTab}
        selectedArticle={selectedArticle}
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

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-[#151518]/95 hover:bg-[#E35930] text-[#F8F7F4] hover:text-[#111113] border border-[rgba(248,247,244,0.3)] hover:border-[#E35930] rounded-none flex items-center justify-center cursor-pointer transition-all shadow-xl font-mono text-[9px] font-bold group"
            title={lang === "it" ? "Torna su" : "Back to top"}
            id="back-to-top-btn"
            aria-label={lang === "it" ? "Torna in cima alla pagina" : "Back to top"}
          >
            <ArrowUp className="w-4 h-4 text-[#E35930] group-hover:text-[#111113] transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
