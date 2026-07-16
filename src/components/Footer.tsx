import { useState } from "react";
import { Mail, ArrowUp, Phone, MapPin, Share2, Copy, Check } from "lucide-react";

const logoImage = "/f (1600 x 500 px) (1).svg";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
  onOpenModal: (type: "privacy" | "terms" | "ethics" | "sitemap") => void;
  lang: "it" | "en";
  currentTab: string;
  selectedArticle: string | null;
}

export default function Footer({
  setCurrentTab,
  onOpenModal,
  lang,
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
    <footer className="w-full bg-[#544848] border-t border-[rgba(248,247,244,0.1)] pt-16 pb-12 transition-all text-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Info */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <img
              src={logoImage}
              alt="Facilissimo Web Logo"
              className="w-12 h-12 object-contain rounded-full border border-[rgba(248,247,244,0.1)]"
            />
            <span className="font-display text-xl font-bold italic text-[#F8F7F4] tracking-tight">
              Facilissimo Web
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#F8F7F4]/70 max-w-sm leading-relaxed font-sans">
            Siti web evoluti, veloci e performanti, progettati e sviluppati su misura grazie alla potenza dell'Intelligenza Artificiale.
          </p>
          <div className="pt-2 text-[10px] text-[#a3e635] font-mono space-y-1 uppercase tracking-wider font-bold">
            <p>Titolare: M. Teresa Rogani</p>
            <p>Freelance Web Designer &amp; AI Specialist</p>
            <p className="text-[#F8F7F4]/60 flex items-center gap-1.5 normal-case font-sans">
              <MapPin className="w-3.5 h-3.5 text-[#a3e635]" /> Macerata (Marche), Italia
            </p>
            <p className="text-[#F8F7F4]/40 font-normal">P.IVA: 02136780430</p>
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
            <div className="flex flex-wrap gap-2 pt-1">
              {/* Stripe */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#17171c] border border-white/10 hover:border-[#635BFF]/50 transition-all rounded-md text-[10px] font-sans font-medium text-[#F8F7F4]/90 cursor-default select-none">
                <svg className="h-4 w-auto text-[#635BFF] fill-current shrink-0" viewBox="0 0 40 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M40 8.07c0-3.32-1.74-4.82-4.57-4.82-3.04 0-4.75 1.76-4.75 4.8 0 3.52 1.83 4.88 4.79 4.88 1.15 0 2.22-.18 3.1-.53v-1.75c-.83.33-1.8.48-2.67.48-1.57 0-2.39-.56-2.48-1.72h7.49c.04-.42.09-1.01.09-1.34zm-6.59-.87c0-1 .59-1.53 1.54-1.53.91 0 1.5.52 1.5 1.53h-3.04zm-5.69 5.34V3.41h-2.2v1.07c-.45-.73-1.33-1.23-2.31-1.23-2.12 0-3.79 1.74-3.79 4.74 0 3.2 1.63 4.93 3.8 4.93 1.05 0 1.94-.52 2.36-1.27v1.09h2.14zm-5.74-4.48c0-1.72.82-2.73 1.98-2.73 1.14 0 1.94 1.01 1.94 2.73 0 1.76-.8 2.75-1.94 2.75-1.16 0-1.98-.99-1.98-2.75zm-6.23 4.48V5.37h1.49V3.41h-1.49V1.43l-2.2.47V3.4h-.97v1.97h.97v4.61c0 1.54.91 2.45 2.48 2.45.62 0 1.19-.11 1.58-.29v-1.82c-.28.1-.64.15-.99.15-.55 0-.87-.27-.87-.99zm-4.4-4.57V3.41h-2.2v9.13h2.2V7.12c0-1.35.85-2 1.88-2 .26 0 .53.03.73.09V3.29c-.27-.08-.6-.11-.88-.11-.83 0-1.47.41-1.73.94zm-5.83 4.57V3.41H3.32v1.11C2.86 3.79 1.97 3.25 1 3.25c-2.12 0-3.73 1.74-3.73 4.75 0 3.19 1.62 4.92 3.74 4.92.97 0 1.87-.53 2.31-1.24v1.09h2.2zm-5.74-4.49c0-1.72.82-2.72 1.98-2.72s1.95 1.01 1.95 2.72c0 1.76-.8 2.75-1.95 2.75s-1.98-.99-1.98-2.75zM1.2 5.06c.6-.45 1.4-.73 2.25-.73 1.63 0 2.65.81 2.65 2.29v4.93H4.6v-1.1c-.43.76-1.32 1.25-2.3 1.25-1.63 0-2.83-1.07-2.83-2.65 0-1.83 1.34-2.65 3.11-2.65.89 0 1.61.16 2.02.32V6.5c0-.66-.45-1.01-1.33-1.01-.73 0-1.39.2-1.93.53l-.17.1L1.2 5.06zm3.4 3.13c-.23-.1-.66-.21-1.14-.21-.71 0-1.18.35-1.18.91 0 .52.4.88 1.04.88.58 0 1.04-.37 1.18-.89v-.69z" />
                </svg>
                <span>Stripe</span>
              </div>

              {/* Visa */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#17171c] border border-white/10 hover:border-[#1A1F71]/50 transition-all rounded-md text-[10px] font-sans font-medium text-[#F8F7F4]/90 cursor-default select-none">
                <svg className="h-3 w-auto text-[#00579F] fill-current shrink-0" viewBox="0 0 48 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M18.23 15.65h2.9L22.95.35h-2.9L18.23 15.65zm14.88-14.88c-.64-.25-1.64-.52-2.88-.52-3.17 0-5.4 1.69-5.42 4.11-.02 1.78 1.59 2.77 2.8 3.37 1.25.6 1.67 1 1.67 1.54-.01.83-.99 1.2-1.91 1.2-1.28 0-1.97-.2-3.03-.66l-.42-.2-1.15 1.83c.5.23 1.43.43 2.4.45 3.37 0 5.56-1.67 5.59-4.26.02-1.42-.85-2.5-2.72-3.4-.13-.07-.4-.2-.59-.3-.59-.32-.8-.54-.8-.87.01-.52.58-.89 1.45-.89.83-.02 1.44.18 1.91.38l.23.1.98-1.78zm10.74 5.34c.15-.41.73-1.99.73-1.99s.15-.41.25-.7l.13.6c.35 1.71 1.42 6.88 1.42 6.88h2.52L45 .35h-2.65c-.83 0-1.53.48-1.84 1.23L35.6 15.65h2.9l.58-1.61h3.54l.35 1.61zm-19.34.01l-1.72-11.4c-.11-.47-.48-.71-.88-.73H17.2L13 .35c-.13.04-.26.11-.35.19-.09.09-.15.21-.17.34L8.76 15.65h2.9L17.32.35l3.25 15.3h2.9L24.51.35zm-20.73 0L3.5.35H.35v.47c3.15.8 5.25 2.12 6.1 3.2L3.78 15.65H6.8l4.57-15.3h-2.9z" />
                </svg>
                <span>Visa</span>
              </div>

              {/* Mastercard */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#17171c] border border-white/10 hover:border-[#FF5F00]/50 transition-all rounded-md text-[10px] font-sans font-medium text-[#F8F7F4]/90 cursor-default select-none">
                <svg className="h-4.5 w-auto shrink-0" viewBox="0 0 24 16" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <circle cx="7.3" cy="8" r="6" fill="#EB001B" />
                  <circle cx="16.7" cy="8" r="6" fill="#F79E1B" opacity="0.9" />
                  <path d="M12 2.7a5.9 5.9 0 0 1 2.3 5.3A5.9 5.9 0 0 1 12 13.3a5.9 5.9 0 0 1-2.3-5.3A5.9 5.9 0 0 1 12 2.7z" fill="#FF5F00" />
                </svg>
                <span>Mastercard</span>
              </div>

              {/* Bonifico SEPA */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#17171c] border border-white/10 hover:border-[#a3e635]/50 transition-all rounded-md text-[10px] font-sans font-medium text-[#F8F7F4]/90 cursor-default select-none">
                <svg className="h-4 w-auto text-[#a3e635] fill-current shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M2 22h20v-2H2v2zm1-3h18v-9H3v9zm11-8h3v7h-3v-7zm-5 0h3v7H9v-7zM4 11h3v7H4v-7zM12 2L2 7v2h20V7L12 2z"/>
                </svg>
                <span>{lang === "it" ? "Bonifico SEPA" : "SEPA Transfer"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="md:col-span-3">
          <h4 className="text-[10px] uppercase tracking-widest text-[#a3e635] font-bold mb-4 font-mono">
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
                  className="text-[#F8F7F4]/70 hover:text-[#a3e635] hover:underline cursor-pointer transition-colors text-left"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Support & Philosophy */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-[10px] uppercase tracking-widest text-[#a3e635] font-bold mb-1 font-mono">
            Contatto Diretto
          </h4>
          <p className="text-xs sm:text-sm text-[#F8F7F4]/70 leading-relaxed font-sans">
            Nessun intermediario, nessun call center. Parli direttamente con me per ogni singola riga di codice o pixel di design.
          </p>
          <div className="flex flex-col gap-2.5 pt-2">
            <a
              href="mailto:facilissimoweb.mc@gmail.com"
              className="flex items-center gap-2.5 text-xs text-[#F8F7F4] hover:text-[#a3e635] transition-all border border-[rgba(248,247,244,0.15)] hover:border-[#a3e635] px-3.5 py-2.5 rounded-none w-fit"
              title="Invia Email"
            >
              <Mail className="w-4 h-4 text-[#a3e635]" />
              <span className="font-medium font-mono">facilissimoweb.mc@gmail.com</span>
            </a>
            
            <a
              href="tel:+393793603321"
              className="flex items-center gap-2.5 text-xs text-[#F8F7F4] hover:text-[#a3e635] transition-all border border-[rgba(248,247,244,0.15)] hover:border-[#a3e635] px-3.5 py-2.5 rounded-none w-fit"
              title="Chiama al Telefono"
            >
              <Phone className="w-4 h-4 text-[#a3e635]" />
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
                className="flex items-center justify-center gap-2 text-[10px] text-[#F8F7F4] hover:text-[#a3e635] transition-all bg-[#1b1b1f] border border-[rgba(248,247,244,0.1)] hover:border-[#a3e635] px-3.5 py-2 cursor-pointer uppercase font-mono font-bold"
                id="footer-share-action-btn"
              >
                <Share2 className="w-3.5 h-3.5 text-[#a3e635]" />
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
                className="flex items-center justify-center gap-2 text-[10px] text-[#F8F7F4] hover:text-[#a3e635] transition-all bg-[#1b1b1f] border border-[rgba(248,247,244,0.1)] hover:border-[#a3e635] px-3.5 py-2 cursor-pointer uppercase font-mono font-bold"
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
                    <Copy className="w-3.5 h-3.5 text-[#a3e635]" />
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
            className="hover:text-[#a3e635] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs md:text-sm uppercase tracking-wider font-mono font-bold"
            id="footer-privacy-btn"
          >
            {lang === "it" ? "Privacy Policy" : "Privacy Policy"}
          </button>
          <button
            onClick={() => onOpenModal("terms")}
            className="hover:text-[#a3e635] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs md:text-sm uppercase tracking-wider font-mono font-bold"
            id="footer-terms-btn"
          >
            {lang === "it" ? "Termini di Servizio" : "Terms of Service"}
          </button>
          <button
            onClick={() => onOpenModal("ethics")}
            className="hover:text-[#a3e635] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs md:text-sm uppercase tracking-wider font-mono font-bold"
            id="footer-ethics-btn"
          >
            {lang === "it" ? "AI Ethics & Trasparenza" : "AI Ethics & Transparency"}
          </button>
          <button
            onClick={() => onOpenModal("sitemap")}
            className="hover:text-[#a3e635] transition-colors cursor-pointer bg-transparent border-none p-0 text-xs md:text-sm uppercase tracking-wider font-mono font-bold"
            id="footer-sitemap-btn"
          >
            {lang === "it" ? "Sitemap" : "Sitemap"}
          </button>
        </div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1.5 hover:text-[#a3e635] transition-colors font-mono tracking-widest cursor-pointer uppercase text-xs font-bold shrink-0"
          id="scroll-to-top"
        >
          <span>Torna su</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#a3e635]" />
        </button>
      </div>
    </footer>
  );
}

