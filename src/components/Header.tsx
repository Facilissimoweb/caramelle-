import { useState, useEffect } from "react";
import { Menu, X, Globe, Accessibility, Home, Code2, User2, Lightbulb, Mail, MessageSquare, BookOpen } from "lucide-react";
import { translations } from "../translations";
import { safeStorage, safeCookies } from "../lib/safeStorage";

const logoImage = "/f (1600 x 500 px).webp";

const navIcons: Record<string, any> = {
  home: Home,
  "chi-sono": User2,
  "web-app": Code2,
  "siti-web": Globe,
  proposte: Lightbulb,
  contatti: Mail,
  chat: MessageSquare,
  blog: BookOpen,
};

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  lang: "it" | "en";
  setLang: (lang: "it" | "en") => void;
  isFacilitated: boolean;
  setIsFacilitated: (val: boolean) => void;
}

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

export default function Header({
  currentTab,
  setCurrentTab,
  lang,
  setLang,
  isFacilitated,
  setIsFacilitated,
}: HeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [currentGoogleLang, setCurrentGoogleLang] = useState<string>(() => {
    return safeStorage.getItem("facilissimo-google-lang") || "it";
  });

  const getCookieDomains = () => {
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
    
    // First clear any existing ones on all domains to prevent multiple stacked cookies
    for (const d of domains) {
      safeCookies.set(`googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${d};`);
    }
    safeCookies.set(`googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`);

    // Set on all domains
    for (const d of domains) {
      safeCookies.set(`googtrans=${value}; path=/; domain=${d};`);
    }
    safeCookies.set(`googtrans=${value}; path=/;`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ensure cookie is in sync on load (so reload behaves correctly)
  useEffect(() => {
    const savedGoogleLang = safeStorage.getItem("facilissimo-google-lang") || "it";
    
    const cookieStr = safeCookies.get();
    const match = cookieStr.match(new RegExp('(^| )googtrans=([^;]+)'));
    const currentCookieVal = match ? decodeURIComponent(match[2]) : null;
    const expectedCookieVal = savedGoogleLang === "it" ? "/it/it" : `/it/${savedGoogleLang}`;

    if (currentCookieVal !== expectedCookieVal) {
      // If it is 'it' and the cookie is null or empty, it's already in Italian, so no need to reload
      if (savedGoogleLang === "it" && (currentCookieVal === null || currentCookieVal === "" || currentCookieVal === "/it/it")) {
        setGoogleTranslateCookie("it");
        return;
      }

      setGoogleTranslateCookie(savedGoogleLang);

      // Verify if cookie write actually had an effect (i.e., third-party cookies not blocked)
      const testCookieStr = safeCookies.get();
      const testMatch = testCookieStr.match(new RegExp('(^| )googtrans=([^;]+)'));
      const testCookieVal = testMatch ? decodeURIComponent(testMatch[2]) : null;

      // If cookies are completely blocked/disabled in this context, skip reload to prevent infinite loop
      if (testCookieVal === null && currentCookieVal === null) {
        console.warn("[Header] Cookies are blocked in this iframe. Skipping reload to prevent loop.");
        return;
      }

      // Safeguard against reload loop with sessionStorage
      try {
        const count = parseInt(sessionStorage.getItem("facilissimo-reload-count") || "0", 10);
        if (count > 2) {
          console.warn("[Header] Translation reload loop detected and stopped.");
          return;
        }
        sessionStorage.setItem("facilissimo-reload-count", String(count + 1));
      } catch (e) {
        // If sessionStorage is also disabled/blocked, we shouldn't risk reloading at all
        console.warn("[Header] SessionStorage unavailable, skipping auto-reload for translation safety.");
        return;
      }

      window.location.reload();
    } else {
      // Reset counter on successful sync
      try {
        sessionStorage.setItem("facilissimo-reload-count", "0");
      } catch {}
    }
  }, []);

  const selectLanguage = (code: string) => {
    safeStorage.setItem("facilissimo-google-lang", code);
    setCurrentGoogleLang(code);

    // Keep the React dictionary base as Italian to ensure high-quality source for translation
    setLang("it");
    safeStorage.setItem("facilissimo-lang", "it");

    setGoogleTranslateCookie(code);

    setIsLangOpen(false);
    window.location.reload();
  };

  const t = translations[lang][isFacilitated ? "facilitated" : "normal"];

  const navItems = [
    { id: "home", label: t.navInizio },
    { id: "chi-sono", label: t.navChiSono },
    { id: "web-app", label: t.navWebApp },
    { id: "siti-web", label: t.navSitiWeb },
    { id: "proposte", label: t.navProposte },
    { id: "contatti", label: t.navContatti },
    { id: "chat", label: t.navChat },
    { id: "blog", label: t.navBlog },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentGoogleLang) || LANGUAGES[0];

  return (
    <header className="fixed top-0 left-0 w-full bg-[#c1ff72]/80 backdrop-blur-lg z-50 border-b border-[#111113]/10 transition-all duration-300">
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-[#a3e635] transition-all duration-100 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-bar"
      />
      <div className="w-full px-4 sm:px-6 xl:px-12 h-20 flex justify-between items-center gap-4 sm:gap-6">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-3 text-left focus:outline-none group cursor-pointer min-w-0 cyber-glitch-logo"
          id="logo-button"
        >
          <img
            src={logoImage}
            alt="Facilissimo Web Logo"
            className="h-8 md:h-10 w-auto object-contain transition-colors shrink-0"
          />
        </button>

        {/* Desktop Navigation */}
        <nav 
          className="hidden xl:flex items-center justify-center flex-1 gap-8 xl:gap-12 max-w-4xl mx-auto"
          style={{ fontSize: "14px" }}
        >
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`uppercase tracking-[0.2em] font-bold py-1.5 border-b-2 relative cursor-pointer transition-all ${
                  isActive
                    ? "text-[#a3e635] border-[#a3e635]"
                    : "text-[#111113]/50 hover:text-[#111113] border-transparent hover:border-[#111113]/20"
                }`}
                style={{ fontSize: "14px" }}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Language / Accessibility Toggles */}
        <div className="hidden xl:flex items-center gap-4 flex-shrink-0">
          {/* Custom Dropdown language selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 border border-[#111113]/10 hover:border-[#a3e635] text-[#111113]/70 hover:text-[#a3e635] transition-all flex items-center gap-1.5 cursor-pointer font-mono text-[9px] uppercase tracking-widest font-bold"
              title={t.languageLabel}
              id="lang-toggle-desktop"
            >
              <Globe className="w-3.5 h-3.5 text-[#a3e635]" />
              <span>
                {activeLangObj.flag} {activeLangObj.code.toUpperCase()}
              </span>
            </button>

            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                <div className="absolute right-0 mt-2 w-44 bg-[#F8F7F4]/98 backdrop-blur-md border border-[#111113]/15 shadow-2xl z-50 flex flex-col py-1.5">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => selectLanguage(item.code)}
                      className={`px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-wider flex items-center gap-2.5 hover:bg-[#111113]/5 hover:text-[#a3e635] transition-all cursor-pointer ${
                        currentGoogleLang === item.code
                          ? "text-[#a3e635] font-extrabold bg-[#a3e635]/10"
                          : "text-[#111113]/70"
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

          {/* Accessibility Toggle */}
          <button
            onClick={() => setIsFacilitated(!isFacilitated)}
            className={`p-2 border transition-all flex items-center gap-1.5 cursor-pointer font-mono text-[9px] uppercase tracking-widest font-bold ${
              isFacilitated
                ? "bg-[#a3e635] border-[#a3e635] text-[#FAF9F6] hover:opacity-90 animate-pulse"
                : "border-[#111113]/10 hover:border-[#a3e635] text-[#111113]/70 hover:text-[#a3e635]"
            }`}
            title={isFacilitated ? t.facilitatedOff : t.facilitatedOn}
            id="access-toggle-desktop"
          >
            <Accessibility className="w-3.5 h-3.5" />
            <span>{isFacilitated ? "Std" : "Easy"}</span>
          </button>

          <button
            onClick={() => handleNavClick("contatti")}
            className="px-6 py-3 bg-[#a3e635] text-[#111113] font-bold text-[10px] tracking-widest uppercase hover:bg-transparent hover:text-[#a3e635] hover:border-[#a3e635] transition-all duration-300 cursor-pointer border border-[#a3e635]"
            id="header-cta-btn"
          >
            {lang === "it" ? "Lavora con Me" : "Work with Me"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="xl:hidden p-2 text-[#111113] hover:text-[#a3e635] focus:outline-none cursor-pointer flex-shrink-0"
          id="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-[33px] h-[33px]" /> : <Menu className="w-[33px] h-[33px]" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="xl:hidden border-t border-[#111113]/10 bg-[#FAF9F6]/98 backdrop-blur-2xl absolute top-20 left-0 w-full shadow-lg transition-all duration-300">
          <div className="px-4 py-4 flex flex-col gap-3">
            {/* Classic Vertical List Navigation */}
            <div className="flex flex-col gap-1" id="mobile-nav-container">
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#111113]/40 font-mono font-bold px-1 mb-1">
                {lang === "it" ? "Navigazione" : "Navigation"}
              </span>
              <div className="flex flex-col gap-1" id="mobile-nav-list">
                {navItems.map((item) => {
                  const isActive = currentTab === item.id;
                  const IconComponent = navIcons[item.id] || Home;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`w-full h-11 px-3 flex items-center justify-between transition-all border-l-4 cursor-pointer ${
                        isActive
                          ? "bg-[#a3e635]/10 text-[#a3e635] border-[#a3e635] font-extrabold"
                          : "text-[#111113]/70 bg-[#FAF9F6]/30 border-transparent hover:bg-[#111113]/5"
                      }`}
                      id={`mobile-nav-${item.id}`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-4 h-4 ${isActive ? "text-[#a3e635]" : "text-[#111113]/50"}`} />
                        <span className="uppercase tracking-[0.15em] font-bold text-[11px]" style={{ fontFamily: "var(--font-geologica), sans-serif" }}>
                          {item.label}
                        </span>
                      </div>
                      {isActive && (
                        <span className="w-1.5 h-1.5 bg-[#a3e635] rounded-full animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Accessibility & Compact Language Selector Block */}
            <div className="flex flex-col gap-1.5 mt-1 border-t border-[#111113]/10 pt-3">
              <div className="grid grid-cols-2 gap-1.5">
                {/* Accessibility Toggle */}
                <button
                  onClick={() => setIsFacilitated(!isFacilitated)}
                  className={`py-2 px-2.5 border rounded-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer font-mono text-[9px] uppercase tracking-widest font-bold ${
                    isFacilitated
                      ? "bg-[#a3e635] border-[#a3e635] text-[#FAF9F6]"
                      : "border-[#111113]/10 bg-[#FAF9F6]/30 text-[#111113]/80"
                  }`}
                  id="access-toggle-mobile"
                >
                  <Accessibility className="w-3.5 h-3.5" />
                  <span>{isFacilitated ? "Std" : "Easy"}</span>
                </button>

                {/* Mobile Language Trigger */}
                <button
                  onClick={() => setIsMobileLangOpen(!isMobileLangOpen)}
                  className="py-2 px-2.5 border border-[#111113]/10 bg-[#FAF9F6]/30 rounded-sm text-[#111113] hover:text-[#a3e635] transition-all flex items-center justify-center gap-1.5 cursor-pointer font-mono text-[9px] uppercase tracking-widest font-bold"
                  id="mobile-lang-trigger"
                >
                  <Globe className="w-3.5 h-3.5 text-[#a3e635]" />
                  <span>{activeLangObj.flag} {activeLangObj.code.toUpperCase()}</span>
                  <span className={`text-[7px] transition-transform duration-200 ${isMobileLangOpen ? "rotate-180" : ""}`}>▼</span>
                </button>
              </div>

              {/* Language Selector Dropdown Grid */}
              {isMobileLangOpen && (
                <div className="grid grid-cols-3 gap-1 p-1.5 bg-[#FAF9F6] border border-[#111113]/10 rounded-sm transition-all">
                  {LANGUAGES.map((item) => {
                    const isSelected = currentGoogleLang === item.code;
                    return (
                      <button
                        key={item.code}
                        onClick={() => selectLanguage(item.code)}
                        className={`py-1 px-1 rounded-sm border transition-all flex items-center justify-center gap-1 cursor-pointer font-mono text-[8px] uppercase tracking-wider font-semibold ${
                          isSelected
                            ? "bg-[#a3e635] border-[#a3e635] text-[#FAF9F6]"
                            : "border-[#111113]/10 text-[#111113]/70 hover:text-[#a3e635]"
                        }`}
                      >
                        <span>{item.flag}</span>
                        <span>{item.code.toUpperCase()}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Compact CTA Button */}
            <button
              onClick={() => handleNavClick("contatti")}
              className="mt-1 w-full py-2.5 bg-[#a3e635] text-[#111113] text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-[#a3e635] transition-all duration-300 cursor-pointer border border-[#a3e635] rounded-sm"
              id="mobile-header-cta-btn"
            >
              {lang === "it" ? "Richiedi Preventivo" : "Request a Quote"}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}


