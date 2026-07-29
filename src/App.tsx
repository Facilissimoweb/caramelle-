import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Home, Share2, Copy, Check, ArrowUp, Accessibility, Globe } from "lucide-react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ContattiView from "./components/ContattiView";
import FloatingChatWidget from "./components/FloatingChatWidget";
import BlogView from "./components/BlogView";
import WebAppView from "./components/WebAppView";
import SitiWebView from "./components/SitiWebView";
import { SubscriptionView } from "./components/SubscriptionView";
import TurnkeyWordpressView from "./components/TurnkeyWordpressView";
import InfoModal from "./components/InfoModal";
import AccessibilityWidget from "./components/AccessibilityWidget";
import CookieBanner from "./components/CookieBanner";
import { ToastContainer, ToastMessage, ToastType } from "./components/Toast";
import { safeStorage, safeCookies } from "./lib/safeStorage";

const logoImage = "/f (1600 x 500 px).webp";


const SEO_METADATA: Record<string, { title: string; description: string; keywords: string; image: string }> = {
  home: {
    title: "Facilissimo Web — Realizzazione Siti Web Macerata e Marche",
    description: "Studio Facilissimo Web a Macerata (Marche). Progettazione e realizzazione siti web veloci, moderni e ottimizzati SEO con Intelligenza Artificiale.",
    keywords: "realizzazione siti web macerata, web designer marche, siti web veloci marche, siti web economici macerata, intelligenza artificiale macerata, seo macerata, m teresa rogani",
    image: "/og-image.png",
  },
  abbonamento: {
    title: "Sito Web in Abbonamento (WaaS) — Facilissimo Web Macerata",
    description: "Sito web in abbonamento mensile o annuale con gestione continua, manutenzione, aggiornamenti e hosting incluso.",
    keywords: "sito web in abbonamento, waas, saas sito web, sito web mensile, gestione sito web macerata, abbonamento sito internet",
    image: "/og-image.png",
  },
  "web-app": {
    title: "Proposte, Web App e Siti Web — Facilissimo Web Macerata",
    description: "Esplora le proposte digitali, web app interattive e siti web realizzati da Facilissimo Web a Macerata.",
    keywords: "proposte web macerata, web app macerata, siti web macerata, m teresa rogani, web designer macerata",
    image: "/og-image.png",
  },
  "siti-web": {
    title: "Proposte, Web App e Siti Web — Facilissimo Web Macerata",
    description: "Esplora le proposte digitali, web app interattive e siti web realizzati da Facilissimo Web a Macerata.",
    keywords: "proposte web macerata, web app macerata, siti web macerata, m teresa rogani, web designer macerata",
    image: "/og-image.png",
  },
  "chiavi-in-mano": {
    title: "Sito Web Chiavi in Mano WordPress & Hostinger — Facilissimo Web",
    description: "Sito web professionale chiavi in mano completo e subito pronto all'uso. Ospitato su server Cloud Hostinger con CMS WordPress.",
    keywords: "sito web chiavi in mano, wordpress hostinger, sito wordpress macerata, hostinger cloud hosting, facilissimo web chiavi in mano",
    image: "/og-image.png",
  },
  "chi-sono": {
    title: "Chi Sono — Facilissimo Web | Teresa Rogani Web Designer Macerata",
    description: "Scopri chi c'è dietro Facilissimo Web. M. Teresa Rogani, freelance web designer and AI specialist a Macerata, Marche. Creazione siti web professionali e su misura.",
    keywords: "teresa rogani, freelance web designer macerata, ai specialist marche, realizzazione siti web professionali marche, sviluppo siti web marche",
    image: "/og-image.png",
  },
  contatti: {
    title: "Contatti — Facilissimo Web | Preventivo Sito Web Macerata",
    description: "Richiedi un preventivo gratuito per il tuo nuovo sito web a Macerata e nelle Marche. Scrivi a facilissimoweb.mc@gmail.com o chiama il +39 379 360 3321.",
    keywords: "contatti web designer macerata, telefono facilissimo web, email facilissimo web, preventivo sito internet macerata",
    image: "/og-image.png",
  },
  chat: {
    title: "Assistente AI Live — Facilissimo Web Macerata",
    description: "Parla subito con l'Assistente Virtuale di Facilissimo Web basato su IA. Ricevi risposte istantanee su servizi, tempi e prezzi per siti web a Macerata e nelle Marche.",
    keywords: "chat ai macerata, assistente virtuale marche, intelligenza artificiale assistente, consulenza ai marche",
    image: "/og-image.png",
  },
  blog: {
    title: "Blog & News — Facilissimo Web | SEO Predittiva e IA",
    description: "Leggi gli articoli di approfondimento su SEO Predittiva, Web Design con Intelligenza Artificiale e strategie digitali per microimprese a Macerata e nelle Marche.",
    keywords: "seo predittiva, blog intelligenza artificiale, web design marche, teresa rogani blog, novità seo ia, blog facilissimo web",
    image: "/og-image.png",
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

  const savedConsent = safeStorage.getItem("facilissimo-cookie-consent");
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

const LANGUAGES = [
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "pt", label: "Português", flag: "🇵🇹" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "zh-CN", label: "简体中文", flag: "🇨🇳" },
];

const getCookieDomains = () => {
  if (typeof window === "undefined") return [];
  const hostname = window.location.hostname;
  const domains = [hostname, `.${hostname}`];
  const parts = hostname.split(".");
  for (let i = 1; i < parts.length; i++) {
    const d = parts.slice(i).join(".");
    if (d && d !== "com" && d !== "app" && d !== "net" && d !== "org") {
      domains.push(d);
      domains.push(`.${d}`);
    }
  }
  return Array.from(new Set(domains));
};

const setGoogleTranslateCookie = (code: string) => {
  const value = code === "it" ? "/it/it" : `/it/${code}`;
  const domains = getCookieDomains();
  for (const d of domains) {
    safeCookies.set(`googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${d};`);
  }
  safeCookies.set(`googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`);

  for (const d of domains) {
    safeCookies.set(`googtrans=${value}; path=/; domain=${d};`);
  }
  safeCookies.set(`googtrans=${value}; path=/;`);
};

const TABS_ORDER = ["home", "chi-sono", "siti-web", "chiavi-in-mano", "contatti", "blog"];

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [isSidebarLangOpen, setIsSidebarLangOpen] = useState(false);
  const [currentSidebarLang, setCurrentSidebarLang] = useState<string>(() => {
    return safeStorage.getItem("facilissimo-google-lang") || "it";
  });

  const handleSidebarSelectLanguage = (code: string) => {
    safeStorage.setItem("facilissimo-google-lang", code);
    setCurrentSidebarLang(code);
    safeStorage.setItem("facilissimo-lang", "it");
    setGoogleTranslateCookie(code);
    setIsSidebarLangOpen(false);
    window.location.reload();
  };

  const activeSidebarLangObj = LANGUAGES.find((l) => l.code === currentSidebarLang) || LANGUAGES[0];
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
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

    let newUrl = tab === "home" ? "/" : `/${tab}`;
    if (tab === "blog" && articleSlug) {
      newUrl = `/blog/${articleSlug}`;
    }

    try {
      if (pushHistory) {
        window.history.pushState({ tab, articleSlug }, "", newUrl);
      } else {
        window.history.replaceState({ tab, articleSlug }, "", newUrl);
      }
    } catch (e) {
      console.warn("[Router] Failed to update browser history. This usually happens when running inside a sandboxed iframe:", e);
    }
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
        case "abbonamento": return "Sito & Abbonamento";
        case "chiavi-in-mano": return "Sito & Abbonamento";
        case "web-app": return "Proposte";
        case "siti-web": return "Proposte";
        case "blog": return "Blog & News";
        case "chi-sono": return "Chi Sono";
        case "contatti": return "Contatti";
        default: return tabId;
      }
    } else {
      switch (tabId) {
        case "home": return "Home";
        case "abbonamento": return "Turnkey & Subscription";
        case "chiavi-in-mano": return "Turnkey & Subscription";
        case "web-app": return "Proposals";
        case "siti-web": return "Proposals";
        case "blog": return "Blog & News";
        case "chi-sono": return "About Me";
        case "contatti": return "Contact";
        default: return tabId;
      }
    }
  };

  const [lang, setLang] = useState<"it" | "en">(() => {
    try {
      const saved = safeStorage.getItem("facilissimo-lang");
      return (saved === "en" || saved === "it") ? saved : "it";
    } catch (e) {
      console.warn("[Storage] Failed to read lang from localStorage:", e);
      return "it";
    }
  });
  const [isFacilitated, setIsFacilitated] = useState<boolean>(() => {
    try {
      const saved = safeStorage.getItem("facilissimo-facil");
      return saved === "true";
    } catch (e) {
      console.warn("[Storage] Failed to read facilissimo-facil from localStorage:", e);
      return false;
    }
  });
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "ethics" | "sitemap" | null>(null);
  const [fontSize, setFontSize] = useState<number>(() => {
    try {
      const saved = safeStorage.getItem("facilissimo-font-size");
      return saved ? parseInt(saved, 10) : 100;
    } catch (e) {
      console.warn("[Storage] Failed to read facilissimo-font-size from localStorage:", e);
      return 100;
    }
  });
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    try {
      const saved = safeStorage.getItem("facilissimo-contrast");
      return saved === "true";
    } catch (e) {
      console.warn("[Storage] Failed to read facilissimo-contrast from localStorage:", e);
      return false;
    }
  });
  const [readableFont, setReadableFont] = useState<boolean>(() => {
    try {
      const saved = safeStorage.getItem("facilissimo-readable");
      return saved === "true";
    } catch (e) {
      console.warn("[Storage] Failed to read facilissimo-readable from localStorage:", e);
      return false;
    }
  });
  const [isAccessibilityOpen, setIsAccessibilityOpen] = useState<boolean>(false);

  // Global Toast Notifications State
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, message?: string, type: ToastType = "success", duration = 4500) => {
    const newToast: ToastMessage = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 5),
      title,
      message,
      type,
      duration,
    };
    setToasts((prev) => [...prev.slice(-3), newToast]);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Scroll to top automatically when currentTab changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
    }
  }, [currentTab]);


  // SEO Dynamic Updates
  useEffect(() => {
    try {
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
        { nameOrProperty: "property", value: "og:url", content: typeof window !== "undefined" ? window.location.href : "" },
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
    } catch (e) {
      console.warn("[SEO] Failed to update SEO meta tags. This usually happens when running inside a sandboxed iframe:", e);
    }
  }, [currentTab]);

  useEffect(() => {
    console.debug(`[App State Sync] Language changed to: ${lang}`);
    try {
      safeStorage.setItem("facilissimo-lang", lang);
    } catch (e) {
      console.warn("[Storage] Failed to save lang to localStorage:", e);
    }
  }, [lang]);

  useEffect(() => {
    console.debug(`[App State Sync] isFacilitated changed to: ${isFacilitated}`);
    try {
      safeStorage.setItem("facilissimo-facil", String(isFacilitated));
    } catch (e) {
      console.warn("[Storage] Failed to save isFacilitated to localStorage:", e);
    }
  }, [isFacilitated]);

  useEffect(() => {
    console.debug(`[App State Sync] fontSize changed to: ${fontSize}%`);
    try {
      safeStorage.setItem("facilissimo-font-size", String(fontSize));
    } catch (e) {
      console.warn("[Storage] Failed to save fontSize to localStorage:", e);
    }
    if (typeof window !== "undefined") {
      document.documentElement.style.fontSize = `${fontSize}%`;
    }
  }, [fontSize]);

  useEffect(() => {
    console.debug(`[App State Sync] highContrast changed to: ${highContrast}`);
    try {
      safeStorage.setItem("facilissimo-contrast", String(highContrast));
    } catch (e) {
      console.warn("[Storage] Failed to save highContrast to localStorage:", e);
    }
  }, [highContrast]);

  useEffect(() => {
    console.debug(`[App State Sync] readableFont changed to: ${readableFont}`);
    try {
      safeStorage.setItem("facilissimo-readable", String(readableFont));
    } catch (e) {
      console.warn("[Storage] Failed to save readableFont to localStorage:", e);
    }
  }, [readableFont]);

  // Initial call to load tracking scripts dynamically if user consent was previously given
  useEffect(() => {
    initTrackingConsentUtility();
  }, []);

  // URL Router Sync Effect (Router for clean paths, deep linking, hash & back gesture support)
  useEffect(() => {
    const handleUrlSync = () => {
      const hash = window.location.hash.replace(/^#\/?/, ""); // e.g. "blog/slug"
      const pathname = window.location.pathname.replace(/^\//, ""); // e.g. "blog/slug" or "chi-sono"
      
      let targetTab = "home";
      let targetArticle: string | null = null;

      // 1. Check Search Query Params (e.g. ?article=slug or ?tab=blog)
      try {
        const searchParams = new URLSearchParams(window.location.search);
        const queryArticle = searchParams.get("article");
        const queryTab = searchParams.get("tab");

        if (queryArticle) {
          targetTab = "blog";
          targetArticle = queryArticle;
        } else if (queryTab && TABS_ORDER.includes(queryTab)) {
          targetTab = queryTab;
        }
      } catch (e) {
        console.warn("[Router] Search params parsing error:", e);
      }

      // If no search params found, check Hash Route
      if (targetTab === "home" && !targetArticle && hash) {
        if (hash.startsWith("blog/")) {
          targetTab = "blog";
          targetArticle = hash.substring("blog/".length);
        } else {
          const tab = hash.split("/")[0].split("?")[0];
          if (TABS_ORDER.includes(tab)) {
            targetTab = tab;
          }
        }
      }

      // If still home, check Pathname Route (e.g. /blog/ai-act-regolamento-europeo or /chi-sono)
      if (targetTab === "home" && !targetArticle && pathname) {
        if (pathname.startsWith("blog/")) {
          targetTab = "blog";
          targetArticle = pathname.substring("blog/".length);
        } else {
          const tab = pathname.split("/")[0];
          if (TABS_ORDER.includes(tab)) {
            targetTab = tab;
          }
        }
      }

      navigateTo(targetTab, targetArticle, false);
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
        return <HomeView setCurrentTab={handleSetTab} lang={lang} isFacilitated={isFacilitated} onOpenModal={setActiveModal} onOpenChat={() => setIsChatOpen(true)} />;
      case "abbonamento":
        return <SubscriptionView lang={lang} isFacilitated={isFacilitated} setCurrentTab={handleSetTab} />;
      case "chiavi-in-mano":
        return <TurnkeyWordpressView lang={lang} isFacilitated={isFacilitated} setCurrentTab={handleSetTab} />;
      case "web-app":
      case "siti-web":
        return <SitiWebView lang={lang} isFacilitated={isFacilitated} setCurrentTab={handleSetTab} />;
      case "chi-sono":
        return <AboutView setCurrentTab={handleSetTab} lang={lang} isFacilitated={isFacilitated} />;
      case "contatti":
        return (
          <ContattiView
            lang={lang}
            isFacilitated={isFacilitated}
            selectedPackage={selectedPackage}
            setSelectedPackage={setSelectedPackage}
            onShowToast={showToast}
          />
        );
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
    <div className={`min-h-screen bg-[#F8F7F4] text-[#111113] flex flex-col selection:bg-black/20 selection:text-black antialiased ${
      readableFont ? "font-mono tracking-wide" : "font-sans"
    } ${
      isFacilitated ? "text-lg" : ""
    }`}>
      {/* Desktop Left Sidebar - Hidden on mobile, flex on desktop */}
      <aside className="hidden xl:flex w-[280px] h-screen fixed left-0 top-0 border-r border-white/10 bg-[#111113] p-10 flex-col justify-between z-30 select-none text-white">
        <div className="space-y-16">
          <div className="logo-block group cursor-pointer" onClick={() => handleSetTab("home")}>
            <div className="logo-text">
              <img
                src={logoImage}
                alt="Facilissimo Web Logo"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-[1.02] duration-300 brightness-0 invert"
              />
            </div>
            <div 
              className="text-[13px] uppercase tracking-[0em] text-white/90 font-black mt-2.5"
              style={{ fontFamily: 'MuseoModerno' }}
            >
              Siti Web Evoluti
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
                      className={`text-left uppercase tracking-[0em] font-black cursor-pointer transition-all block py-1 border-b-2 ${
                        isActive
                          ? "text-white border-white translate-x-1"
                          : "text-white/60 hover:text-white hover:translate-x-0.5 border-transparent"
                      }`}
                      style={{ fontFamily: 'MuseoModerno', fontSize: '15px' }}
                    >
                      {getTabLabel(tabId)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="pt-4 border-t border-white/10 space-y-2">
            {/* Language Switcher Button with Globe Icon */}
            <div className="relative">
              <button
                onClick={() => setIsSidebarLangOpen(!isSidebarLangOpen)}
                className="flex items-center gap-2.5 text-left font-mono text-[14px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all cursor-pointer py-1.5 w-full"
                id="desktop-sidebar-lang-btn"
                title={lang === "it" ? "Cambia Lingua" : "Change Language"}
              >
                <Globe className="w-4 h-4 text-white shrink-0" />
                <span>
                  {activeSidebarLangObj.flag} {activeSidebarLangObj.code.toUpperCase()} — {lang === "it" ? "Lingua" : "Language"}
                </span>
              </button>

              {isSidebarLangOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSidebarLangOpen(false)} />
                  <div className="absolute left-0 bottom-full mb-2 w-56 bg-[#18181b] border border-white/20 shadow-2xl z-50 flex flex-col py-1.5 rounded-sm">
                    {LANGUAGES.map((item) => (
                      <button
                        key={item.code}
                        onClick={() => handleSidebarSelectLanguage(item.code)}
                        className={`px-4 py-2 text-left font-mono text-xs uppercase tracking-wider flex items-center gap-2.5 hover:bg-white/10 hover:text-white transition-all cursor-pointer ${
                          currentSidebarLang === item.code
                            ? "text-amber-400 font-extrabold bg-white/10"
                            : "text-white/70"
                        }`}
                      >
                        <span className="text-sm">{item.flag}</span>
                        <span>{item.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Accessibility Button */}
            <button
              onClick={() => setIsAccessibilityOpen(true)}
              className="flex items-center gap-2.5 text-left font-mono text-[14px] font-bold uppercase tracking-widest text-white/60 hover:text-white transition-all cursor-pointer py-1.5"
              id="desktop-sidebar-accessibility-btn"
            >
              <Accessibility className="w-4 h-4 text-white" />
              <span>{lang === "it" ? "Accessibilità" : "Accessibility"}</span>
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="text-[10px] font-mono uppercase tracking-widest text-white font-bold">
            [ Contatto Diretto ]
          </div>
          <div className="font-mono text-xs text-white/70 leading-relaxed">
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
            onOpenAccessibility={() => setIsAccessibilityOpen(true)}
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
              className={`fixed top-20 xl:top-0 xl:left-[280px] w-full xl:w-[calc(100%-280px)] bg-[#111113] border-b border-white/10 py-3 px-4 sm:px-6 xl:px-12 backdrop-blur-md z-40 select-none transition-all duration-300 ease-in-out ${
                showBreadcrumb 
                  ? "translate-y-0 opacity-100" 
                  : "-translate-y-full opacity-0 pointer-events-none"
              }`}
            >
              <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-mono text-[10px] tracking-wider uppercase font-bold text-white/70">
                <div className="flex items-center flex-wrap gap-1.5 sm:gap-2 text-white/50">
                  <Home className="w-3.5 h-3.5 text-white mr-1 inline shrink-0" />
                  {breadcrumbItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                      {index > 0 && <span className="text-white/20 font-light mx-0.5 sm:mx-1 shrink-0">/</span>}
                      {index === breadcrumbItems.length - 1 ? (
                        <span className="text-white font-extrabold truncate max-w-[200px] sm:max-w-none">{item.label}</span>
                      ) : (
                        <button
                          onClick={() => {
                            if (item.id === "home") {
                              handleSetTab("home");
                            } else {
                              navigateTo(item.id, null, true);
                            }
                          }}
                          className="text-white/70 hover:text-white cursor-pointer transition-colors uppercase font-bold shrink-0"
                        >
                          {item.label}
                        </button>
                      )}
                    </React.Fragment>
                  ))}
                </div>
                
                <div className="hidden sm:flex items-center gap-4 text-[9px] uppercase font-bold text-white/50 select-none">
                  <span>{lang === "it" ? "Posizione Attiva" : "Active Location"}</span>
                  <span className="px-2 py-0.5 bg-white/10 border border-white/20 text-white rounded-sm text-[9px]">
                    {currentTab === "blog" && selectedArticle ? "ARTICLE_VIEW" : `${currentTab.toUpperCase()}_VIEW`}
                  </span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Main View Area with top offset to clear fixed header and fixed breadcrumbs bar */}
        <main 
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
              <div className="bg-black text-white text-center text-xs py-2 px-4 font-mono font-bold uppercase tracking-wider animate-pulse border-b border-black" id="facilitated-badge-banner">
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
        isOpen={isAccessibilityOpen}
        setIsOpen={setIsAccessibilityOpen}
      />

      {/* Sticky Floating Chat Nuvoletta Widget */}
      <FloatingChatWidget
        lang={lang}
        isFacilitated={isFacilitated}
        isOpen={isChatOpen}
        setIsOpen={setIsChatOpen}
      />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 22,
              mass: 0.8
            }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-22 right-6 z-40 w-11 h-11 bg-[#FAF9F6]/95 hover:bg-black text-[#111113] hover:text-[#FAF9F6] border border-[#111113]/30 hover:border-black rounded-none flex items-center justify-center cursor-pointer transition-colors duration-300 shadow-xl font-mono text-[9px] font-bold group"
            title={lang === "it" ? "Torna su" : "Back to top"}
            id="back-to-top-btn"
            aria-label={lang === "it" ? "Torna in cima alla pagina" : "Back to top"}
          >
            <ArrowUp className="w-4 h-4 text-black group-hover:text-[#FAF9F6] transition-colors duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
      {/* Cookie & Tracking Consent Banner (GA4) */}
      <CookieBanner lang={lang} isFacilitated={isFacilitated} />

      {/* Global Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
