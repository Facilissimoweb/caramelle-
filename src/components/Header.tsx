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
          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === "it" ? "en" : "it")}
            className="p-2 border border-[rgba(248,247,244,0.1)] hover:border-[#E35930] text-[#F8F7F4]/70 hover:text-[#E35930] transition-all flex items-center gap-1.5 cursor-pointer font-mono text-[9px] uppercase tracking-widest font-bold"
            title={t.languageLabel}
            id="lang-toggle-desktop"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === "it" ? "EN" : "IT"}</span>
          </button>

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
            {/* Mobile Accessibility & Language Toggles */}
            <div className="grid grid-cols-2 gap-3 mt-2 border-t border-[rgba(248,247,244,0.1)] pt-6">
              <button
                onClick={() => setLang(lang === "it" ? "en" : "it")}
                className="py-3 px-4 border border-[rgba(248,247,244,0.1)] text-[#F8F7F4]/80 hover:text-[#E35930] hover:border-[#E35930] transition-all flex items-center justify-center gap-2 cursor-pointer font-mono text-[10px] uppercase tracking-wider font-bold"
                id="lang-toggle-mobile"
              >
                <Globe className="w-4 h-4 text-[#E35930]" />
                <span>{lang === "it" ? "English" : "Italiano"}</span>
              </button>

              <button
                onClick={() => setIsFacilitated(!isFacilitated)}
                className={`py-3 px-4 border transition-all flex items-center justify-center gap-2 cursor-pointer font-mono text-[10px] uppercase tracking-wider font-bold ${
                  isFacilitated
                    ? "bg-[#E35930] border-[#E35930] text-[#111113]"
                    : "border-[rgba(248,247,244,0.1)] text-[#F8F7F4]/80 hover:text-[#E35930] hover:border-[#E35930]"
                }`}
                id="access-toggle-mobile"
              >
                <Accessibility className="w-4 h-4" />
                <span>{isFacilitated ? "Standard" : "Easy Mode"}</span>
              </button>
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

