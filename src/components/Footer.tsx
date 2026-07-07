import { useState } from "react";
import { Mail, ArrowUp, Phone, MapPin, Share2, Copy, Check } from "lucide-react";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenModal: (type: "privacy" | "terms" | "ethics" | "sitemap") => void;
  lang: "it" | "en";
  onOpenCookieSettings: () => void;
  currentTab: string;
  selectedArticle: string | null;
}

export default function Footer({
  setCurrentTab,
  onOpenModal,
  lang,
  onOpenCookieSettings,
  currentTab,
  selectedArticle,
}: FooterProps) {
  const [copiedLink, setCopiedLink] = useState(false);

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
          
          <p className="text-[10px] text-[#F8F7F4]/50 leading-relaxed font-sans italic border-t border-[rgba(248,247,244,0.08)] pt-3 mt-3">
            {lang === "it"
              ? "Sito co-creato con AI: tutti gli articoli, le immagini e i contenuti presenti su questo sito sono stati creati con il coinvolgimento di sistemi di Intelligenza Artificiale (AI) e rifiniti manualmente."
              : "AI Co-created site: all articles, images, and content displayed on this website were created with the involvement of Artificial Intelligence (AI) and manually refined."}
          </p>
          
          <div className="pt-4 space-y-2.5">
            <span className="text-[9px] font-mono tracking-[0.2em] text-[#F8F7F4]/40 uppercase block">
              {lang === "it" ? "METODI DI PAGAMENTO SICURI" : "SECURE PAYMENT METHODS"}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {/* Stripe */}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1a1a1e] border border-[rgba(248,247,244,0.06)] hover:border-[#E35930]/30 transition-all rounded-sm text-[9px] font-mono text-[#F8F7F4]/80 cursor-default select-none">
                <svg className="h-2.5 w-auto fill-current text-[#635BFF] shrink-0" viewBox="0 0 40 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4.05 6.94c0-.85.64-1.2 1.58-1.2.91 0 1.63.29 2.05.51v-1.1c0-.8-.57-1.18-1.46-1.18-.8 0-1.5.25-1.93.45l-.42-.92c.57-.28 1.48-.52 2.47-.52 1.53 0 2.45.71 2.45 2.12v4.57c-.4.18-.94.34-1.52.34-1.6 0-3.22-.55-3.22-3.11zm3.17.65V7.4c-.2-.11-.53-.22-.92-.22-.5 0-.81.21-.81.58 0 .42.38.56.9.56.34 0 .66-.08.83-.15zm6.54-3.8c.88 0 1.43.37 1.69.58l-.51.88c-.2-.17-.6-.44-1.14-.44-.71 0-1.18.45-1.18 1.15v2.85h-1.07V3.92h1.07v.75c.24-.46.74-.91 1.14-.91zm4.12-.55a.69.69 0 110-1.39.69.69 0 010 1.39zm-.53 1.28h1.07v5.18h-1.07zM20.5 4.54c.26-.45.76-.75 1.25-.75.46 0 .8.14.95.27l-.37 1.01c-.18-.13-.44-.22-.72-.22-.53 0-.97.43-.97 1.08v2.79h-1.07V3.92H20.5zm6.16-.75c1.47 0 2.25.91 2.25 2.24V6.2h-3.28c.03.74.45 1.1 1.15 1.1.53 0 .97-.19 1.24-.34l.36.83c-.41.27-1.11.5-1.78.5-1.48 0-2.31-.95-2.31-2.43 0-1.43.86-2.37 2.37-2.37zm1.18 1.58c0-.52-.3-.88-.93-.88-.6 0-.96.38-1.06.88h1.99z" />
                </svg>
                <span>Stripe</span>
              </div>

              {/* Visa */}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1a1a1e] border border-[rgba(248,247,244,0.06)] hover:border-[#E35930]/30 transition-all rounded-sm text-[9px] font-mono text-[#F8F7F4]/80 cursor-default select-none">
                <svg className="h-2 w-auto fill-current text-[#00579F] shrink-0" viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M11.8 0L9.4 10H7.1L4.7 0H1.5L0 1.8V2.1C1.2 2.4 2.8 2.9 3.9 3.5L4.4 10H6.8L10.6 0H11.8ZM18.9 0L17.1 10H14.9L16.7 0H18.9ZM25.4 3.7C24.4 3.2 23.1 2.8 22 2.8C19.4 2.8 18.2 4 18.2 5.5C18.2 8.1 21.8 8 21.8 9.2C21.8 9.6 21 10 19.9 10C18.7 10 17.5 9.6 16.7 9.1L16.3 8.8L15.9 10H18.1C21 10 22.3 8.7 22.3 7.2C22.3 4.8 18.7 4.7 18.7 3.7C18.7 3.4 19.4 3 20.6 3C21.7 3 22.8 3.3 23.6 3.7L24 3.9L25.4 3.7Z" />
                </svg>
                <span>Visa</span>
              </div>

              {/* Mastercard */}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1a1a1e] border border-[rgba(248,247,244,0.06)] hover:border-[#E35930]/30 transition-all rounded-sm text-[9px] font-mono text-[#F8F7F4]/80 cursor-default select-none">
                <div className="flex -space-x-1 shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#EB001B]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#F79E1B]/90"></div>
                </div>
                <span>Mastercard</span>
              </div>

              {/* Bonifico SEPA */}
              <div className="flex items-center gap-1.5 px-2 py-1 bg-[#1a1a1e] border border-[rgba(248,247,244,0.06)] hover:border-[#E35930]/30 transition-all rounded-sm text-[9px] font-mono text-[#F8F7F4]/80 cursor-default select-none">
                <svg className="w-3 h-3 text-[#E35930] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>{lang === "it" ? "Bonifico SEPA" : "SEPA Transfer"}</span>
              </div>
            </div>
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
              { id: "blog", label: "Blog & News" },
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

          {/* Dynamic Page Sharing Section inside Footer */}
          <div className="pt-6 border-t border-[rgba(248,247,244,0.06)] mt-6 space-y-3">
            <h5 className="text-[9px] uppercase tracking-[0.2em] text-[#F8F7F4]/40 font-bold font-mono">
              {lang === "it" ? "Condividi questa pagina" : "Share this page"}
            </h5>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <button
                onClick={() => {
                  let targetUrl = window.location.origin + window.location.pathname;
                  if (currentTab === "blog" && selectedArticle) {
                    targetUrl += `#/blog/${selectedArticle}`;
                  } else {
                    targetUrl += `#/${currentTab}`;
                  }

                  if (navigator.share) {
                    navigator.share({
                      title: "Facilissimo Web",
                      text: lang === "it" 
                        ? `Scopri Facilissimo Web` 
                        : `Discover Facilissimo Web`,
                      url: targetUrl,
                    }).catch(err => console.debug("Share failed", err));
                  } else {
                    navigator.clipboard.writeText(targetUrl).then(() => {
                      setCopiedLink(true);
                      setTimeout(() => setCopiedLink(false), 2000);
                    });
                  }
                }}
                className="flex items-center justify-center gap-2 text-[10px] text-[#F8F7F4] hover:text-[#E35930] transition-all bg-[#1b1b1f] border border-[rgba(248,247,244,0.1)] hover:border-[#E35930] px-3.5 py-2 cursor-pointer uppercase font-mono font-bold"
                id="footer-share-action-btn"
              >
                <Share2 className="w-3.5 h-3.5 text-[#E35930]" />
                <span>
                  {lang === "it" ? "Invia / Condividi" : "Send / Share"}
                </span>
              </button>

              <button
                onClick={() => {
                  let targetUrl = window.location.origin + window.location.pathname;
                  if (currentTab === "blog" && selectedArticle) {
                    targetUrl += `#/blog/${selectedArticle}`;
                  } else {
                    targetUrl += `#/${currentTab}`;
                  }
                  navigator.clipboard.writeText(targetUrl).then(() => {
                    setCopiedLink(true);
                    setTimeout(() => setCopiedLink(false), 2000);
                  });
                }}
                className="flex items-center justify-center gap-2 text-[10px] text-[#F8F7F4] hover:text-[#E35930] transition-all bg-[#1b1b1f] border border-[rgba(248,247,244,0.1)] hover:border-[#E35930] px-3.5 py-2 cursor-pointer uppercase font-mono font-bold"
                id="footer-copy-action-btn"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-mono">
                      {lang === "it" ? "Copiato!" : "Copied!"}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#E35930]" />
                    <span className="font-mono">
                      {lang === "it" ? "Copia Link" : "Copy Link"}
                    </span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[9px] text-[#F8F7F4]/40 font-mono italic">
              {lang === "it" 
                ? `Link pronto per: ${currentTab === "blog" && selectedArticle ? `Articolo (${selectedArticle})` : `Sezione ${currentTab}`}` 
                : `Ready link for: ${currentTab === "blog" && selectedArticle ? `Article (${selectedArticle})` : `Section ${currentTab}`}`
              }
            </p>
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

