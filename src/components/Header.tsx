import { useState, useEffect } from "react";
import { Menu, X, Globe, Accessibility } from "lucide-react";
import { translations } from "../translations";

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
  const [currentGoogleLang, setCurrentGoogleLang] = useState<string>(() => {
    return localStorage.getItem("facilissimo-google-lang") || "it";
  });

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
    const savedGoogleLang = localStorage.getItem("facilissimo-google-lang") || "it";
    const domain = window.location.hostname;
    const cookieValue = savedGoogleLang === "it" ? "" : `/it/${savedGoogleLang}`;

    // Read cookie to verify presence
    const hasGoogTrans = document.cookie.split(";").some((item) => item.trim().startsWith("googtrans="));
    
    if (savedGoogleLang !== "it" && !hasGoogTrans) {
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=.${domain};`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain};`;
    }
  }, []);

  const selectLanguage = (code: string) => {
    localStorage.setItem("facilissimo-google-lang", code);
    setCurrentGoogleLang(code);

    // Sync native dictionary language for English vs Italian base
    if (code === "en") {
      setLang("en");
      localStorage.setItem("facilissimo-lang", "en");
    } else {
      setLang("it");
      localStorage.setItem("facilissimo-lang", "it");
    }

    const domain = window.location.hostname;
    const cookieValue = code === "it" ? "" : `/it/${code}`;

    // Clear old cookies to avoid translation conflicts
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain};`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;

    if (code !== "it") {
      document.cookie = `googtrans=${cookieValue}; path=/;`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=.${domain};`;
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${domain};`;
    }

    setIsLangOpen(false);
    // Reload immediately so Google Translate re-evaluates page and performs automatic translation
    window.location.reload();
  };

  const t = translations[lang][isFacilitated ? "facilitated" : "normal"];

  const navItems = [
    { id: "home", label: t.navInizio },
    { id: "chi-sono", label: t.navChiSono },
    { id: "proposte", label: t.navProposte },
    { id: "contatti", label: t.navContatti },
    { id: "chat", label: t.navChat },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeLangObj = LANGUAGES.find((l) => l.code === currentGoogleLang) || LANGUAGES[0];

  return (
    <header className="fixed top-0 left-0 w-full bg-[#111113]/90 backdrop-blur-md z-50 border-b border-[rgba(248,247,244,0.1)] transition-all duration-300">
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[3px] bg-[#E35930] transition-all duration-100 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
        id="scroll-progress-bar"
      />
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-baseline gap-1.5 text-left focus:outline-none group cursor-pointer"
          id="logo-button"
        >
          <span className="font-display font-extrabold text-xl md:text-2xl text-[#F8F7F4] tracking-tighter uppercase italic leading-none group-hover:text-[#E35930] transition-colors">
            Facilissimo Web
          </span>
          <span className="text-[9px] text-[#E35930] tracking-widest uppercase font-mono font-bold">
            / studio
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-[10px] uppercase tracking-[0.2em] font-bold py-1.5 border-b-2 relative cursor-pointer transition-all ${
                  isActive
                    ? "text-[#E35930] border-[#E35930]"
                    : "text-[#F8F7F4]/50 hover:text-[#F8F7F4] border-transparent hover:border-[#F8F7F4]/20"
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Button & Language / Accessibility Toggles */}
        <div className="hidden md:flex items-center gap-4">
          {/* Custom Dropdown language selector */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="p-2 border border-[rgba(248,247,244,0.1)] hover:border-[#E35930] text-[#F8F7F4]/70 hover:text-[#E35930] transition-all flex items-center gap-1.5 cursor-pointer font-mono text-[9px] uppercase tracking-widest font-bold"
              title={t.languageLabel}
              id="lang-toggle-desktop"
            >
              <Globe className="w-3.5 h-3.5 text-[#E35930]" />
              <span>
                {activeLangObj.flag} {activeLangObj.code.toUpperCase()}
              </span>
            </button>

            {isLangOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsLangOpen(false)} />
                <div className="absolute right-0 mt-2 w-44 bg-[#151518]/98 backdrop-blur-md border border-[rgba(248,247,244,0.15)] shadow-2xl z-50 flex flex-col py-1.5">
                  {LANGUAGES.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => selectLanguage(item.code)}
                      className={`px-4 py-2.5 text-left font-mono text-[10px] uppercase tracking-wider flex items-center gap-2.5 hover:bg-[rgba(248,247,244,0.06)] hover:text-[#E35930] transition-all cursor-pointer ${
                        currentGoogleLang === item.code
                          ? "text-[#E35930] font-extrabold bg-[rgba(227,89,48,0.06)]"
                          : "text-[#F8F7F4]/70"
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
                ? "bg-[#E35930] border-[#E35930] text-[#111113] hover:opacity-90 animate-pulse"
                : "border-[rgba(248,247,244,0.1)] hover:border-[#E35930] text-[#F8F7F4]/70 hover:text-[#E35930]"
            }`}
            title={isFacilitated ? t.facilitatedOff : t.facilitatedOn}
            id="access-toggle-desktop"
          >
            <Accessibility className="w-3.5 h-3.5" />
            <span>{isFacilitated ? "Std" : "Easy"}</span>
          </button>

          <button
            onClick={() => handleNavClick("contatti")}
            className="px-6 py-3 bg-[#E35930] text-[#111113] font-bold text-[10px] tracking-widest uppercase hover:bg-transparent hover:text-[#E35930] hover:border-[#E35930] transition-all duration-300 cursor-pointer border border-[#E35930]"
            id="header-cta-btn"
          >
            {lang === "it" ? "Lavoriamo Insieme" : "Let's Work Together"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-[#F8F7F4] hover:text-[#E35930] focus:outline-none cursor-pointer"
          id="mobile-menu-toggle"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-[rgba(248,247,244,0.1)] bg-[#111113]/98 backdrop-blur-2xl absolute top-20 left-0 w-full shadow-lg transition-all duration-300">
          <div className="px-6 py-8 flex flex-col gap-4">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-xs uppercase tracking-widest py-3 px-4 transition-all ${
                    isActive
                      ? "bg-[rgba(248,247,244,0.05)] text-[#E35930] font-bold border-l-2 border-[#E35930]"
                      : "text-[#F8F7F4]/60 hover:bg-[rgba(248,247,244,0.05)] hover:text-[#F8F7F4]"
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Mobile Accessibility & Custom Google Translate Selection */}
            <div className="flex flex-col gap-3 mt-2 border-t border-[rgba(248,247,244,0.1)] pt-6">
              <div className="flex justify-between items-center px-1">
                <span className="font-mono text-[9px] uppercase tracking-widest text-[#F8F7F4]/40 font-bold">
                  {lang === "it" ? "Seleziona Lingua" : "Select Language"}
                </span>
                
                <button
                  onClick={() => setIsFacilitated(!isFacilitated)}
                  className={`py-1.5 px-3 border transition-all flex items-center justify-center gap-1.5 cursor-pointer font-mono text-[9px] uppercase tracking-widest font-bold ${
                    isFacilitated
                      ? "bg-[#E35930] border-[#E35930] text-[#111113]"
                      : "border-[rgba(248,247,244,0.1)] text-[#F8F7F4]/80"
                  }`}
                  id="access-toggle-mobile"
                >
                  <Accessibility className="w-3.5 h-3.5" />
                  <span>{isFacilitated ? "Std" : "Easy"}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {LANGUAGES.map((item) => {
                  const isSelected = currentGoogleLang === item.code;
                  return (
                    <button
                      key={item.code}
                      onClick={() => selectLanguage(item.code)}
                      className={`py-2.5 px-3 border transition-all flex items-center justify-center gap-2 cursor-pointer font-mono text-[10px] uppercase tracking-wider font-bold ${
                        isSelected
                          ? "bg-[#E35930] border-[#E35930] text-[#111113] scale-102"
                          : "border-[rgba(248,247,244,0.1)] text-[#F8F7F4]/80 hover:text-[#E35930] hover:border-[#E35930]"
                      }`}
                    >
                      <span className="text-xs">{item.flag}</span>
                      <span>{item.code.toUpperCase()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() => handleNavClick("contatti")}
              className="mt-4 w-full py-4 bg-[#E35930] text-[#111113] text-center text-xs font-bold uppercase tracking-widest hover:bg-transparent hover:text-[#E35930] transition-all duration-300 cursor-pointer border border-[#E35930]"
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


