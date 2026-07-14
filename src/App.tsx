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
import WebAppView from "./components/WebAppView";
import InfoModal from "./components/InfoModal";
import CookieBanner from "./components/CookieBanner";
import AccessibilityWidget from "./components/AccessibilityWidget";

const logoImage = "/f (1600 x 500 px).webp";


const SEO_METADATA: Record<string, { title: string; description: string; keywords: string; image: string }> = {
  home: {
    title: "Facilissimo Web — Realizzazione Siti Web Macerata e Marche",
    description: "Studio Facilissimo Web a Macerata (Marche). Progettazione e realizzazione siti web veloci, moderni e ottimizzati SEO con Intelligenza Artificiale di M. Teresa Rogani.",
    keywords: "realizzazione siti web macerata, web designer marche, siti web veloci marche, siti web economici macerata, intelligenza artificiale macerata, seo macerata, m teresa rogani",
    image: "/api/og-image?tab=home",
  },
  "web-app": {
    title: "Web App & Applicativi Interattivi — Facilissimo Web Macerata",
    description: "Sperimenta le demo live interattive dei nostri applicativi mobile-first realizzati da Facilissimo Web a Macerata. Gusto & Passione, Tattoo Macerata e molto altro.",
    keywords: "web app macerata, applicativi web marche, gusto e passione, tattoo macerata, il nido dei sogni, m teresa rogani, web designer macerata",
    image: "/api/og-image?tab=web-app",
  },
  "chi-sono": {
    title: "Chi Sono — Facilissimo Web | Teresa Rogani Web Designer Macerata",
    description: "Scopri chi c'è dietro Facilissimo Web. M. Teresa Rogani, freelance web designer and AI specialist a Macerata, Marche. Creazione siti web professionali e su misura.",
    keywords: "teresa rogani, freelance web designer macerata, ai specialist marche, realizzazione siti web professionali marche, sviluppo siti web marche",
    image: "/api/og-image?tab=chi-sono",
  },
  proposte: {
    title: "Proposte e Listino Prezzi — Facilissimo Web Macerata",
    description: "Piani e prezzi trasparenti per la creazione del tuo sito web professionale nelle Marche. Soluzioni Landing Page, siti multipagina e e-commerce con IA integrata.",
    keywords: "prezzi siti web macerata, costo sito internet marche, preventivo sito web macerata, listino prezzi web agency macerata",
    image: "/api/og-image?tab=proposte",
  },
  contatti: {
    title: "Contatti — Facilissimo Web | Preventivo Sito Web Macerata",
    description: "Richiedi un preventivo gratuito per il tuo nuovo sito web a Macerata e nelle Marche. Scrivi a facilissimoweb.mc@gmail.com o chiama il +39 379 360 3321.",
    keywords: "contatti web designer macerata, telefono facilissimo web, email facilissimo web, preventivo sito internet macerata",
    image: "/api/og-image?tab=contatti",
  },
  chat: {
    title: "Assistente AI Live — Facilissimo Web Macerata",
    description: "Parla subito con l'Assistente Virtuale di Facilissimo Web basato su IA. Ricevi risposte istantanee su servizi, tempi e prezzi per siti web a Macerata e nelle Marche.",
    keywords: "chat ai macerata, assistente virtuale marche, intelligenza artificiale assistente, consulenza ai marche",
    image: "/api/og-image?tab=chat",
  },
  blog: {
    title: "Blog & News — Facilissimo Web | SEO Predittiva e IA",
    description: "Leggi gli articoli di approfondimento su SEO Predittiva, Web Design con Intelligenza Artificiale e strategie digitali per microimprese a Macerata e nelle Marche.",
    keywords: "seo predittiva, blog intelligenza artificiale, web design marche, teresa rogani blog, novità seo ia, blog facilissimo web",
    image: "/api/og-image?tab=blog",
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

const TABS_ORDER = ["home", "chi-sono", "web-app", "proposte", "contatti", "chat", "blog"];

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
        case "home": return "Home";
        case "web-app": return "Web App";
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
        case "web-app": return "Web App";
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

    // Build Absolute OpenGraph Image URL
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const ogImageUrl = meta.image.startsWith("http") ? meta.image : `${origin}${meta.image}`;

    // Set or Update OpenGraph & Twitter Tags
    const ogTags = [
      { nameOrProperty: "property", value: "og:title", content: meta.title },
      { nameOrProperty: "property", value: "og:description", content: meta.description },
      { nameOrProperty: "property", value: "og:type", content: "website" },
      { nameOrProperty: "property", value: "og:url", content: window.location.href },
      { nameOrProperty: "property", value: "og:image", content: ogImageUrl },
      { nameOrProperty: "name", value: "twitter:card", content: "summary_large_image" },
      { nameOrProperty: "name", value: "twitter:title", content: meta.title },
      { nameOrProperty: "name", value: "twitter:description", content: meta.description },
      { nameOrProperty: "name", value: "twitter:image", content: ogImageUrl }
    ];

    ogTags.forEach(({ nameOrProperty, value, content }) => {
      let tag = document.querySelector(`meta[${nameOrProperty}="${value}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(nameOrProperty, value);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
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
      case "web-app":
        return <WebAppView setCurrentTab={handleSetTab} lang={lang} isFacilitated={isFacilitated} />;
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
    <div className={`min-h-screen bg-[#F8F7F4] text-[#111113] flex flex-col selection:bg-[#c48f8a]/20 selection:text-[#c48f8a] antialiased ${
      readableFont ? "font-mono tracking-wide" : "font-sans"
    } ${
      isFacilitated ? "text-lg" : ""
    }`}>
      {/* Desktop Left Sidebar - Hidden on mobile, flex on desktop */}
      <aside className="hidden xl:flex w-[280px] h-screen fixed left-0 top-0 border-r border-[#111113]/10 bg-[#FAF9F6] p-10 flex-col justify-between z-30 select-none text-[#111113]">
        <div className="space-y-16">
          <div className="logo-block group cursor-pointer" onClick={() => handleSetTab("home")}>
            <div className="logo-text">
              <img
                src={logoImage}
                alt="Facilissimo Web Logo"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-[1.02] duration-300"
              />
            </div>
            <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-[#c48f8a] font-bold mt-2.5">
              [ M. Teresa Rogani ]
            </div>
          </div>
          
          <nav>
            <ul className="space-y-5">
              {TABS_ORDER.map((tabId) => {
                const isActive = currentTab === tabId;
                return (
                  <li key={tabId}>
                    <button
                      onClick={() => handleSetTab(tabId)}
                      className={`text-left font-mono text-xs font-bold uppercase tracking-widest cursor-pointer transition-all block py-1 border-b-2 ${
                        isActive
                          ? "text-[#c48f8a] border-[#c48f8a] translate-x-1"
                          : "text-[#111113]/60 hover:text-[#111113] hover:translate-x-0.5 border-transparent"
                      }`}
                    >
                      {getTabLabel(tabId)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        
        <div className="space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#c48f8a] font-bold">
            [ Contatto Diretto ]
          </div>
          <div className="font-mono text-xs text-[#111113]/70 leading-relaxed">
            +39 379 360 3321<br />
            facilissimoweb.mc@gmail.com
          </div>
        </div>
      </aside>

      {/* Main Layout Shell - shifted on desktop to account for left sidebar */}
      <div className="xl:pl-[280px] flex-grow flex flex-col min-h-screen">
        {/* Navigation Header for mobile/tablet only */}
        <div className="xl:hidden">
          <Header
            currentTab={currentTab}
            setCurrentTab={handleSetTab}
            lang={lang}
            setLang={setLang}
            isFacilitated={isFacilitated}
            setIsFacilitated={setIsFacilitated}
          />
        </div>

        {/* Dynamic Breadcrumbs Bar - Fixed and directly attached under the Header */}
        {currentTab !== "home" && (() => {
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
              className={`fixed top-20 xl:top-0 xl:left-[280px] w-full xl:w-[calc(100%-280px)] bg-[#FAF9F6]/90 border-b border-[#111113]/10 py-3 px-4 sm:px-6 xl:px-12 backdrop-blur-md z-40 select-none transition-all duration-300 ease-in-out ${
                showBreadcrumb 
                  ? "translate-y-0 opacity-100" 
                  : "-translate-y-full opacity-0 pointer-events-none"
              }`}
            >
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] tracking-wider uppercase font-bold text-[#111113]/60">
                <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-[#111113]/40">
                  <Home className="w-3.5 h-3.5 text-[#c48f8a] mr-1 inline shrink-0" />
                  {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                      {index > 0 && <span className="text-[#111113]/20 font-light mx-0.5 sm:mx-1 shrink-0">/</span>}
                      {index === breadcrumbItems.length - 1 ? (
                        <span className="text-[#c48f8a] font-extrabold truncate max-w-[200px] sm:max-w-none">{item.label}</span>
                      ) : (
                        <button
                          onClick={() => {
                            if (item.id === "home") {
                              handleSetTab("home");
                            } else {
                              navigateTo(item.id, null, true);
                            }
                          }}
                          className="text-[#111113]/60 hover:text-[#c48f8a] cursor-pointer transition-colors uppercase font-bold shrink-0"
                        >
                          {item.label}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="hidden sm:flex items-center gap-4 text-[9px] uppercase font-bold text-[#111113]/40 select-none">
                  <span>{lang === "it" ? "Posizione Attiva" : "Active Location"}</span>
                  <span className="px-2 py-0.5 bg-[#c48f8a]/10 border border-[#c48f8a]/20 text-[#c48f8a] rounded-sm text-[9px]">
                    {currentTab === "blog" && selectedArticle ? "ARTICLE_VIEW" : `${currentTab.toUpperCase()}_VIEW`}
                  </span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Main View Area with top offset to clear fixed header and fixed breadcrumbs bar */}
        <main 
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={`flex-grow ${
            currentTab === "home" 
              ? "pt-20 xl:pt-0" 
              : "pt-32 xl:pt-16"
          } overflow-x-hidden ${
            highContrast ? "accessibility-high-contrast" : ""
          } ${
            isFacilitated ? "accessibility-facilitated-contrast" : ""
          }`}
        >
          <div className="w-full">

            {isFacilitated && (
              <div className="bg-[#c48f8a] text-[#111113] text-center text-xs py-2 px-4 font-mono font-bold uppercase tracking-wider animate-pulse" id="facilitated-badge-banner">
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

        {/* Page Footer */}
        <Footer 
          setCurrentTab={handleSetTab} 
          onOpenModal={setActiveModal} 
          lang={lang} 
          onOpenCookieSettings={() => setForceShowCookieBanner(true)} 
          currentTab={currentTab}
          selectedArticle={selectedArticle}
        />
      </div>

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
        currentTab={currentTab}
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
            className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-[#FAF9F6]/95 hover:bg-[#c48f8a] text-[#111113] hover:text-[#FAF9F6] border border-[#111113]/30 hover:border-[#c48f8a] rounded-none flex items-center justify-center cursor-pointer transition-all shadow-xl font-mono text-[9px] font-bold group"
            title={lang === "it" ? "Torna su" : "Back to top"}
            id="back-to-top-btn"
            aria-label={lang === "it" ? "Torna in cima alla pagina" : "Back to top"}
          >
            <ArrowUp className="w-4 h-4 text-[#c48f8a] group-hover:text-[#FAF9F6] transition-colors" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
