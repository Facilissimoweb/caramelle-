import { useState, useEffect } from "react";
import { Menu, X, Sparkles } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Inizio" },
    { id: "chi-sono", label: "Chi Sono" },
    { id: "proposte", label: "Proposte" },
    { id: "contatti", label: "Contatti" },
    { id: "chat", label: "Chat AI" },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-2xl bg-[#05030d]/70 border-b border-[rgba(180,160,255,0.15)]" : "bg-transparent border-b border-transparent"
      }`}
      data-testid="site-header"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-20 flex justify-between items-center">
        {/* Logo */}
        <button
          onClick={() => handleNavClick("home")}
          className="flex items-center gap-2 text-left focus:outline-none group cursor-pointer"
          data-testid="logo-button"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4ff5ff] via-[#b26bff] to-[#ff5fd4] flex items-center justify-center shadow-[0_0_30px_-4px_rgba(178,107,255,0.7)] group-hover:scale-110 transition-transform">
            <Sparkles className="w-4 h-4 text-[#05030d]" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-lg tracking-tight text-white">
              Facilissimo<span className="holo-text">WEB</span>
            </span>
            <span className="text-[9px] text-[#4ff5ff] font-mono-tech font-bold tracking-[0.3em] mt-1">
              // AI STUDIO
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 holo-panel !rounded-full !py-1.5 !px-2">
          <span className="sheen" />
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative text-[11px] uppercase tracking-[0.18em] font-bold py-2 px-4 rounded-full cursor-pointer transition-all duration-300 font-mono-tech ${
                  isActive
                    ? "text-[#05030d] bg-gradient-to-r from-[#4ff5ff] via-[#b26bff] to-[#ff5fd4]"
                    : "text-[#f2ecff]/60 hover:text-white"
                }`}
                data-testid={`nav-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex">
          <button
            onClick={() => handleNavClick("contatti")}
            className="btn-holo !py-2.5 !px-5 !text-[10px]"
            data-testid="header-cta-btn"
          >
            Iniziamo →
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-white focus:outline-none cursor-pointer holo-panel !rounded-xl !w-10 !h-10 flex items-center justify-center"
          data-testid="mobile-menu-toggle"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 holo-panel !rounded-2xl p-4" data-testid="mobile-drawer">
          <span className="sheen" />
          <div className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-xs uppercase tracking-widest py-3 px-4 rounded-xl transition-all font-mono-tech font-bold ${
                    isActive
                      ? "bg-gradient-to-r from-[#4ff5ff] via-[#b26bff] to-[#ff5fd4] text-[#05030d]"
                      : "text-[#f2ecff]/70 hover:bg-white/5"
                  }`}
                  data-testid={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick("contatti")}
              className="mt-2 btn-holo w-full justify-center"
              data-testid="mobile-header-cta-btn"
            >
              Richiedi Preventivo →
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
