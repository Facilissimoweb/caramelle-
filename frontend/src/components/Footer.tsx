import { Mail, ArrowUp, Sparkles } from "lucide-react";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="section relative w-full pt-24 pb-10 mt-24" data-testid="site-footer">
      <div className="holo-divider mb-16" />
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5 space-y-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4ff5ff] via-[#b26bff] to-[#ff5fd4] flex items-center justify-center shadow-[0_0_30px_-4px_rgba(178,107,255,0.7)]">
              <Sparkles className="w-4 h-4 text-[#05030d]" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display font-bold text-xl leading-none text-white">
                Facilissimo<span className="holo-text">WEB</span>
              </div>
              <div className="text-[10px] text-[#4ff5ff] font-mono-tech tracking-[0.3em] mt-1">// AI STUDIO</div>
            </div>
          </div>
          <p className="text-sm text-[#f2ecff]/70 max-w-sm leading-relaxed">
            Siti web evoluti, veloci e su misura. Progettati con l'AI, rifiniti a mano — direttamente da chi li costruisce.
          </p>
          <div className="pt-2 text-[10px] font-mono-tech uppercase tracking-widest space-y-1">
            <p className="text-[#f2ecff]">Titolare: <span className="holo-text font-bold">M. Teresa Rogani</span></p>
            <p className="text-[#f2ecff]/60">Freelance Web Designer &amp; AI Specialist</p>
          </div>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-[10px] uppercase tracking-[0.25em] holo-text font-bold mb-4 font-mono-tech">
            Naviga
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { id: "home", label: "Home" },
              { id: "chi-sono", label: "Chi Sono" },
              { id: "proposte", label: "Proposte" },
              { id: "contatti", label: "Contatti" },
              { id: "chat", label: "Chat AI" },
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  className="text-[#f2ecff]/70 hover:text-[#4ff5ff] cursor-pointer transition-colors text-left font-mono-tech text-xs uppercase tracking-widest"
                  data-testid={`footer-nav-${link.id}`}
                >
                  › {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4 space-y-4">
          <h4 className="text-[10px] uppercase tracking-[0.25em] holo-text font-bold mb-1 font-mono-tech">
            Contatto Diretto
          </h4>
          <p className="text-sm text-[#f2ecff]/70 leading-relaxed">
            Nessun intermediario. Parli direttamente con me per ogni pixel e riga di codice.
          </p>
          <a
            href="mailto:mariateresarogani@gmail.com"
            className="holo-panel flex items-center gap-3 p-3 hover:scale-[1.02] transition-transform"
            data-testid="footer-email-link"
          >
            <span className="sheen" />
            <Mail className="w-4 h-4 text-[#4ff5ff]" />
            <span className="text-xs font-mono-tech text-white">mariateresarogani@gmail.com</span>
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-14 pt-6 border-t border-[rgba(180,160,255,0.14)] flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#f2ecff]/50 font-mono-tech">
        <div>© {currentYear} Facilissimo Web · M. Teresa Rogani</div>
        <div className="flex gap-5 uppercase tracking-widest text-[9px]">
          <a href="#" className="hover:text-[#4ff5ff] transition-colors">Privacy</a>
          <a href="#" className="hover:text-[#4ff5ff] transition-colors">Termini</a>
          <a href="#" className="hover:text-[#4ff5ff] transition-colors">AI Ethics</a>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1.5 hover:text-[#4ff5ff] transition-colors uppercase text-[9px] font-bold tracking-widest cursor-pointer"
          data-testid="scroll-to-top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
}
