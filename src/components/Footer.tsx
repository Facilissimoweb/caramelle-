import { Mail, ArrowUp, Phone, MapPin } from "lucide-react";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenModal: (type: "privacy" | "terms" | "ethics" | "sitemap") => void;
  lang: "it" | "en";
  onOpenCookieSettings: () => void;
}

export default function Footer({ setCurrentTab, onOpenModal, lang, onOpenCookieSettings }: FooterProps) {
  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#151518] border-t border-[rgba(248,247,244,0.1)] pt-16 pb-12 transition-all text-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold italic text-[#F8F7F4] tracking-tight">
              Facilissimo Web
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#F8F7F4]/70 max-w-sm leading-relaxed font-sans">
            Siti web evoluti, veloci e performanti, progettati e sviluppati su misura grazie alla potenza dell'Intelligenza Artificiale.
          </p>
          <div className="pt-2 text-[10px] text-[#E35930] font-mono space-y-1 uppercase tracking-wider font-bold">
            <p>Titolare: M. Teresa Rogani</p>
            <p>Freelance Web Designer &amp; AI Specialist</p>
            <p className="text-[#F8F7F4]/60 flex items-center gap-1.5 normal-case font-sans">
              <MapPin className="w-3.5 h-3.5 text-[#E35930]" /> Macerata (Marche), Italia
            </p>
            <p className="text-[#F8F7F4]/40 font-normal">P.IVA: IT01234567890 (Simulata)</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-3">
          <h4 className="text-[10px] uppercase tracking-widest text-[#E35930] font-bold mb-4 font-mono">
            Menu Sito
          </h4>
          <ul className="space-y-2.5 text-xs font-mono uppercase tracking-wider">
            {[
              { id: "home", label: "Home" },
              { id: "chi-sono", label: "Chi Sono" },
              { id: "proposte", label: "Proposte" },
              { id: "contatti", label: "Contatti" },
              { id: "chat", label: "Assistente Chat AI" },
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="text-[#F8F7F4]/70 hover:text-[#E35930] hover:underline cursor-pointer transition-colors text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Philosophy */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-[10px] uppercase tracking-widest text-[#E35930] font-bold mb-1 font-mono">
            Contatto Diretto
          </h4>
          <p className="text-xs sm:text-sm text-[#F8F7F4]/70 leading-relaxed font-sans">
            Nessun intermediario, nessun call center. Parli direttamente con me per ogni singola riga di codice o pixel di design.
          </p>
          <div className="flex flex-col gap-2.5 pt-2">
            <a
              href="mailto:facilissimoweb.mc@gmail.com"
              className="flex items-center gap-2.5 text-xs text-[#F8F7F4] hover:text-[#E35930] transition-all border border-[rgba(248,247,244,0.15)] hover:border-[#E35930] px-3.5 py-2.5 rounded-none w-fit"
              title="Invia Email"
            >
              <Mail className="w-4 h-4 text-[#E35930]" />
              <span className="font-medium font-mono">facilissimoweb.mc@gmail.com</span>
            </a>
            
            <a
              href="tel:+393793603321"
              className="flex items-center gap-2.5 text-xs text-[#F8F7F4] hover:text-[#E35930] transition-all border border-[rgba(248,247,244,0.15)] hover:border-[#E35930] px-3.5 py-2.5 rounded-none w-fit"
              title="Chiama al Telefono"
            >
              <Phone className="w-4 h-4 text-[#E35930]" />
              <span className="font-medium font-mono">+39 379 360 3321</span>
            </a>
          </div>
        </div>
      </div>

      {/* Under Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 pt-8 border-t border-[rgba(248,247,244,0.1)] flex flex-col lg:flex-row justify-between items-center gap-6 text-xs text-[#F8F7F4]/50 font-mono">
        <div className="text-center lg:text-left">
          © {currentYear} Facilissimo Web di M. Teresa Rogani. Tutti i diritti riservati.
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 uppercase tracking-wider text-xs md:text-sm">
          <button
            onClick={() => onOpenModal("privacy")}
            className="hover:text-[#E35930] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs md:text-sm uppercase tracking-wider font-mono font-bold"
            id="footer-privacy-btn"
          >
            {lang === "it" ? "Privacy Policy" : "Privacy Policy"}
          </button>
          <button
            onClick={() => onOpenModal("terms")}
            className="hover:text-[#E35930] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs md:text-sm uppercase tracking-wider font-mono font-bold"
            id="footer-terms-btn"
          >
            {lang === "it" ? "Termini di Servizio" : "Terms of Service"}
          </button>
          <button
            onClick={() => onOpenModal("ethics")}
            className="hover:text-[#E35930] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs md:text-sm uppercase tracking-wider font-mono font-bold"
            id="footer-ethics-btn"
          >
            {lang === "it" ? "AI Ethics & Trasparenza" : "AI Ethics & Transparency"}
          </button>
          <button
            onClick={() => onOpenModal("sitemap")}
            className="hover:text-[#E35930] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs md:text-sm uppercase tracking-wider font-mono font-bold"
            id="footer-sitemap-btn"
          >
            {lang === "it" ? "Sitemap" : "Sitemap"}
          </button>
          <button
            onClick={onOpenCookieSettings}
            className="hover:text-[#E35930] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs md:text-sm uppercase tracking-wider font-mono font-bold text-[#E35930]"
            id="footer-cookie-btn"
          >
            {lang === "it" ? "Gestione Cookie" : "Cookie Preferences"}
          </button>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1.5 hover:text-[#E35930] transition-colors font-mono tracking-widest cursor-pointer uppercase text-xs font-bold shrink-0"
          id="scroll-to-top"
        >
          <span>Torna su</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#E35930]" />
        </button>
      </div>
    </footer>
  );
}

