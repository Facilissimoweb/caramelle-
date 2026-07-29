import React from "react";
import { 
  Key, 
  CheckCircle2, 
  Sliders, 
  ShieldCheck, 
  Rocket, 
  ArrowRight,
  Sparkles,
  Layers,
  Search,
  Lock,
  MousePointerClick
} from "lucide-react";

interface TurnkeyWordpressViewProps {
  lang: "it" | "en";
  isFacilitated?: boolean;
  setCurrentTab?: (tab: string) => void;
}

export default function TurnkeyWordpressView({ lang, setCurrentTab }: TurnkeyWordpressViewProps) {
  const isIt = lang === "it";

  const handleContactClick = () => {
    if (setCurrentTab) {
      setCurrentTab("contatti");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F7F4] text-[#111113] pb-24">
      {/* HERO BANNER SECTION */}
      <section className="relative bg-[#111113] text-white pt-16 pb-20 px-4 sm:px-6 xl:px-12 overflow-hidden border-b border-black">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        <div className="max-w-4xl mx-auto space-y-6 relative z-10 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-black text-[11px] font-mono font-bold uppercase tracking-widest">
            <Key className="w-3.5 h-3.5" />
            <span>{isIt ? "SOLUZIONE CHIAVI IN MANO • WORDPRESS" : "TURNKEY SOLUTION • WORDPRESS"}</span>
          </div>

          <div className="space-y-3">
            <h1 className="font-tan text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              {isIt ? "Sito Web Chiavi in Mano" : "Turnkey Professional Website"}
            </h1>
            <p className="font-display text-lg sm:text-2xl text-amber-300 font-semibold tracking-tight">
              {isIt 
                ? "Autonomia, Proprietà 100% e Crescita Senza Limiti" 
                : "Full Autonomy, 100% Ownership & Unlimited Growth"}
            </p>
          </div>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl leading-relaxed font-sans font-light">
            {isIt
              ? "Tutto ciò che ti serve per portare la tua attività online con standard professionali: semplice da gestire, completamente tuo e progettato per scalare nel tempo."
              : "Everything you need to take your business online with professional standards: easy to manage, 100% yours, and built to scale over time."}
          </p>

          <div className="pt-2 flex flex-wrap gap-4 justify-center sm:justify-start">
            <button
              onClick={handleContactClick}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm tracking-wide transition-all shadow-md active:scale-98"
            >
              <span>{isIt ? "Richiedi un Preventivo" : "Request a Quote"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3 BLOCCHI DI SINTESI */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 xl:px-12 pt-12 space-y-10">

        {/* BLOCCO 1: PIENA AUTONOMIA E FACILITÀ DI GESTIONE */}
        <section className="bg-white border border-[#111113]/15 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-[#111113]/10 pb-4">
            <div className="w-10 h-10 bg-black text-amber-400 font-mono text-base font-bold flex items-center justify-center shrink-0">
              01
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#111113]/60 uppercase tracking-widest block">
                {isIt ? "GESTIONE SEMPLICE & AUTONOMA" : "EASY & AUTONOMOUS MANAGEMENT"}
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111113] tracking-tight">
                {isIt ? "1. Piena Autonomia e Facilità di Gestione" : "1. Full Autonomy and Easy Management"}
              </h2>
            </div>
          </div>

          <p className="text-sm text-[#111113]/80 leading-relaxed font-sans">
            {isIt 
              ? "Il pannello di controllo WordPress è progettato per chi non ha competenze tecniche. La gestione quotidiana dei contenuti non richiede la scrittura di codice ed è estremamente intuitiva."
              : "The WordPress control panel is designed for non-technical users. Daily content management requires no code writing and is completely intuitive."}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#FAF9F6] border border-[#111113]/10 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-[#111113] font-bold text-sm font-display">
                <Sliders className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{isIt ? "Editor Visivo a Blocchi" : "Visual Block Editor"}</span>
              </div>
              <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
                {isIt 
                  ? "Modifichi testi, immagini e layout vedendo in tempo reale l'aspetto finale della pagina."
                  : "Edit text, images, and layouts while seeing the real-time final appearance."}
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-[#111113]/10 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-[#111113] font-bold text-sm font-display">
                <MousePointerClick className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{isIt ? "Gestione Media Drag-and-Drop" : "Intuitive Media Drag & Drop"}</span>
              </div>
              <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
                {isIt 
                  ? "Carichi immagini, documenti PDF e video semplicemente trascinandoli nella bacheca."
                  : "Upload images, PDF documents, and videos simply by dragging and dropping."}
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-[#111113]/10 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-[#111113] font-bold text-sm font-display">
                <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{isIt ? "Ruoli Utente Personalizzati" : "Custom User Roles"}</span>
              </div>
              <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
                {isIt 
                  ? "Crea accessi limitati per i collaboratori (es. inserimento articoli o ordini) senza esporre impostazioni sensibili."
                  : "Create limited access accounts for staff (e.g. blog or order management) without exposing sensitive settings."}
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-[#111113]/10 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-[#111113] font-bold text-sm font-display">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isIt ? "Aggiornamenti in 1 Clic" : "One-Click Safe Updates"}</span>
              </div>
              <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
                {isIt 
                  ? "La piattaforma e i suoi componenti si aggiornano in modo sicuro e guidato direttamente dalla bacheca."
                  : "The platform and plugins update securely directly from your admin dashboard."}
              </p>
            </div>
          </div>
        </section>

        {/* BLOCCO 2: PROPRIETÀ TOTALE E ASSENZA DI VINCOLI */}
        <section className="bg-white border border-[#111113]/15 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-[#111113]/10 pb-4">
            <div className="w-10 h-10 bg-black text-amber-400 font-mono text-base font-bold flex items-center justify-center shrink-0">
              02
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#111113]/60 uppercase tracking-widest block">
                {isIt ? "LIBERTÀ & PROPRIETÀ" : "100% OWNERSHIP & FREEDOM"}
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111113] tracking-tight">
                {isIt ? "2. Proprietà Totale e Assenza di Vincoli" : "2. Complete Ownership & Zero Lock-in"}
              </h2>
            </div>
          </div>

          <p className="text-sm text-[#111113]/80 leading-relaxed font-sans">
            {isIt 
              ? "A differenza delle piattaforme proprietarie chiuse (Shopify, Wix) o dei codici vincolanti legati a una singola agenzia, WordPress ti garantisce la massima libertà sul tuo patrimonio digitale."
              : "Unlike closed proprietary SaaS platforms (Shopify, Wix) or vendor lock-in code, WordPress guarantees total freedom over your digital assets."}
          </p>

          <div className="grid sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-[#FAF9F6] border border-[#111113]/10 p-4 space-y-2">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
              <h3 className="font-display font-bold text-sm text-[#111113]">
                {isIt ? "Proprietà del Codice 100%" : "100% Code Ownership"}
              </h3>
              <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
                {isIt 
                  ? "Il sito è tuo al 100%. Puoi scaricare backup completi e trasferire database e file dove preferisci."
                  : "The site is 100% yours. Download full backups and move files and databases anywhere."}
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-[#111113]/10 p-4 space-y-2">
              <Layers className="w-5 h-5 text-emerald-700" />
              <h3 className="font-display font-bold text-sm text-[#111113]">
                {isIt ? "Libertà di Hosting" : "Hosting Freedom"}
              </h3>
              <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
                {isIt 
                  ? "Scegli liberamente qualsiasi fornitore sul mercato, senza canoni vincolanti o costrizioni proprietarie."
                  : "Choose any hosting provider on the market, optimizing your annual operational costs."}
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-[#111113]/10 p-4 space-y-2">
              <Sparkles className="w-5 h-5 text-emerald-700" />
              <h3 className="font-display font-bold text-sm text-[#111113]">
                {isIt ? "Ampia Rete di Professionisti" : "Global Developer Ecosystem"}
              </h3>
              <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
                {isIt 
                  ? "Troverai sempre migliaia di esperti pronti a subentrare o ad ampliare il tuo progetto senza rifare nulla da capo."
                  : "Thousands of developers worldwide can maintain or update your site without starting from scratch."}
              </p>
            </div>
          </div>
        </section>

        {/* BLOCCO 3: MODULARITÀ, ESPANDIBILITÀ ED EFFICIENZA SEO */}
        <section className="bg-white border border-[#111113]/15 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-[#111113]/10 pb-4">
            <div className="w-10 h-10 bg-black text-amber-400 font-mono text-base font-bold flex items-center justify-center shrink-0">
              03
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#111113]/60 uppercase tracking-widest block">
                {isIt ? "CRESCITA & MARKETING" : "GROWTH & SEO MARKETING"}
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111113] tracking-tight">
                {isIt ? "3. Modularità, Espandibilità e Predisposizione SEO" : "3. Scalability, Modular Extensions & Native SEO"}
              </h2>
            </div>
          </div>

          <p className="text-sm text-[#111113]/80 leading-relaxed font-sans">
            {isIt 
              ? "Un sito chiavi in mano risponde alle esigenze attuali ma cresce assieme al tuo business, con una struttura nativamente ottimizzata per i motori di ricerca come Google."
              : "A turnkey website solves present needs while scaling alongside your business, natively structured to rank on Google."}
          </p>

          <div className="grid sm:grid-cols-2 gap-4 pt-2">
            <div className="bg-[#FAF9F6] border border-[#111113]/10 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-[#111113] font-bold text-sm font-display">
                <Rocket className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{isIt ? "Integrazione E-Commerce & Funzioni" : "E-Commerce & Advanced Features"}</span>
              </div>
              <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
                {isIt 
                  ? "Trasforma il sito vetrina in uno store WooCommerce, oppure aggiungi aree riservate, cataloghi e corsi online."
                  : "Turn your showcase site into a WooCommerce store, or integrate private client areas and courses."}
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-[#111113]/10 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-[#111113] font-bold text-sm font-display">
                <Layers className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{isIt ? "Automazione Contatti & CRM" : "Contact Automation & CRM"}</span>
              </div>
              <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
                {isIt 
                  ? "Collega sistemi di prenotazione, chat in tempo reale e piattaforme email marketing senza stravolgere la grafica."
                  : "Connect booking calendars, live chat, and email marketing without breaking the site design."}
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-[#111113]/10 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-[#111113] font-bold text-sm font-display">
                <Search className="w-4 h-4 text-blue-600 shrink-0" />
                <span>{isIt ? "Codice Pulito & Strumenti SEO" : "Clean Code & SEO Optimization"}</span>
              </div>
              <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
                {isIt 
                  ? "Struttura interna predisposta per l'indicizzazione rapida su Google e gestione guidata di meta tag e parole chiave."
                  : "Clean underlying codebase for quick Google crawling and guided keyword optimization."}
              </p>
            </div>

            <div className="bg-[#FAF9F6] border border-[#111113]/10 p-4 space-y-1.5">
              <div className="flex items-center gap-2 text-[#111113] font-bold text-sm font-display">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isIt ? "Velocità & Prestazioni Integrate" : "Fast Speed & Caching"}</span>
              </div>
              <p className="text-xs text-[#111113]/70 font-sans leading-relaxed">
                {isIt 
                  ? "Sistemi di memorizzazione dati (caching) e compressione immagini integrati per tempi di caricamento fulminei."
                  : "Integrated caching mechanisms and automatic image optimization for lightning speed."}
              </p>
            </div>
          </div>
        </section>

        {/* CALL TO ACTION FINAL BLOCK */}
        <section className="bg-[#111113] text-white p-8 sm:p-12 border border-black text-center space-y-6 shadow-md relative overflow-hidden">
          <div 
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
              backgroundSize: "20px 20px"
            }}
          />

          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-white/10 px-3 py-1 font-bold">
              {isIt ? "PRONTO A COMINCIARE?" : "READY TO START?"}
            </span>

            <h2 className="font-tan text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {isIt ? "Richiedi ora il tuo Sito Chiavi in Mano" : "Get Your Turnkey Website Delivered"}
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              {isIt 
                ? "Raccontaci il tuo progetto e ricevi un'analisi chiara, tempi trasparenti e la garanzia di un risultato professionale curato nei dettagli." 
                : "Tell us about your project and get a clear analysis, transparent delivery roadmap, and artisan quality."}
            </p>

            <div className="pt-2 flex justify-center">
              <button
                onClick={handleContactClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-bold text-sm tracking-wide transition-all shadow-lg active:scale-98"
              >
                <span>{isIt ? "Contattaci per una Consulenza Gratis" : "Contact Us for a Free Consultation"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
