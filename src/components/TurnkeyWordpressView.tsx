import React from "react";
import { 
  Server, 
  Globe, 
  CheckCircle2, 
  Sparkles, 
  Key, 
  Zap, 
  ShieldCheck, 
  Layout, 
  Lock, 
  Mail, 
  Cpu, 
  FileCode2, 
  HelpCircle, 
  ArrowRight,
  MousePointerClick,
  Sliders,
  Database
} from "lucide-react";

interface TurnkeyWordpressViewProps {
  lang: "it" | "en";
  isFacilitated?: boolean;
  setCurrentTab?: (tab: string) => void;
}

export default function TurnkeyWordpressView({ lang, isFacilitated, setCurrentTab }: TurnkeyWordpressViewProps) {
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
        {/* Subtle grid pattern background */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-3 py-1 bg-amber-400 text-black text-[11px] font-mono font-bold uppercase tracking-widest">
            <Key className="w-3.5 h-3.5" />
            <span>{isIt ? "SOLUZIONE CHIAVI IN MANO • HOSTINGER & WORDPRESS" : "TURNKEY SOLUTION • HOSTINGER & WORDPRESS"}</span>
          </div>

          <div className="space-y-4">
            <h1 className="font-tan text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              {isIt ? "Sito Web Chiavi in Mano" : "Turnkey Professional Website"}
            </h1>
            <p className="font-display text-lg sm:text-2xl text-amber-300 font-semibold tracking-tight">
              {isIt 
                ? "Ospitato su Server Hostinger ad Altissime Prestazioni • Gestito con CMS WordPress" 
                : "Hosted on High-Performance Hostinger Infrastructure • Powered by WordPress CMS"}
            </p>
          </div>

          <p className="text-sm sm:text-base text-white/80 max-w-3xl leading-relaxed font-sans font-light">
            {isIt
              ? "La soluzione ideale per professionisti, aziende e attività commerciali che desiderano un sito web moderno, autonomo e ultra-veloce senza doversi preoccupare della complessità tecnica. Facilissimo Web (M. Teresa Rogani) si occupa dell'intero setup: dalla registrazione del dominio e configurazione dell'hosting Hostinger, allo sviluppo del layout grafico su WordPress, fino alla consegna del sito pronto per ricevere clienti."
              : "The ideal turnkey solution for businesses and professionals seeking a modern, autonomous, ultra-fast website without technical headaches. Facilissimo Web handles everything: domain registration, Hostinger server setup, WordPress custom design, and full launch delivery."}
          </p>

          {/* HIGHLIGHT BADGES */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/15">
            <div className="bg-white/5 border border-white/10 p-3 text-center space-y-1">
              <Server className="w-5 h-5 text-amber-400 mx-auto" />
              <p className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">Hostinger NVMe</p>
              <p className="text-[10px] text-white/60 font-sans">{isIt ? "Cloud Server in Europa" : "European Cloud Server"}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 text-center space-y-1">
              <Globe className="w-5 h-5 text-amber-400 mx-auto" />
              <p className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">CMS WordPress</p>
              <p className="text-[10px] text-white/60 font-sans">{isIt ? "Gestione Autonoma" : "Full Ownership"}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 text-center space-y-1">
              <Zap className="w-5 h-5 text-amber-400 mx-auto" />
              <p className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">LiteSpeed Speed</p>

              <p className="text-[10px] text-white/60 font-sans">{isIt ? "Caricamento Istantaneo" : "Instant Loading"}</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-3 text-center space-y-1">
              <Lock className="w-5 h-5 text-amber-400 mx-auto" />
              <p className="text-[11px] font-mono font-bold text-white uppercase tracking-wider">Sicurezza SSL</p>
              <p className="text-[10px] text-white/60 font-sans">{isIt ? "HTTPS & Firewall" : "HTTPS & Protection"}</p>
            </div>
          </div>

          {/* CTA BUTTONS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
            <button
              onClick={handleContactClick}
              className="px-8 py-4 bg-amber-400 text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isIt ? "Richiedi il tuo Sito Chiavi in Mano" : "Get Your Turnkey Website"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {setCurrentTab && (
              <button
                onClick={() => setCurrentTab("abbonamento")}
                className="px-6 py-4 bg-transparent text-white border border-white/30 font-mono text-xs uppercase tracking-widest font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{isIt ? "Confronta con Abbonamento WaaS" : "Compare with WaaS Plan"}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 xl:px-12 pt-16 space-y-16">
        
        {/* SECTION 1: CHE COS'È LA SOLUZIONE CHIAVI IN MANO */}
        <section className="bg-white border border-[#111113]/15 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{isIt ? "IL CONCETTO CHIAVI IN MANO" : "THE TURNKEY CONCEPT"}</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111113]">
            {isIt ? "Dalle tue idee al sito online, senza stress e senza sorprese" : "From your ideas to live online presence, zero stress"}
          </h2>

          <p className="text-sm sm:text-base text-[#111113]/80 leading-relaxed font-sans font-normal">
            {isIt
              ? "Creare un sito web richiede solitamente l'acquisto separato di domini, la configurazione di server DNS, l'installazione di database, la scelta di temi e la gestione della sicurezza. Con la formula Chiavi in Mano di Facilissimo Web, non devi preoccuparti di nessun passaggio tecnico. M. Teresa Rogani sviluppa la tua presenza digitale completa, testata ed efficiente, consegnandoti direttamente le chiavi di accesso per la gestione quotidiana."
              : "Building a website usually involves buying domains, configuring DNS servers, setting up databases, choosing themes, and managing security. With Facilissimo Web's Turnkey option, you skip all technical friction. M. Teresa Rogani delivers a fully configured, tested, and optimized digital platform."}
          </p>

          <div className="grid sm:grid-cols-3 gap-6 pt-6 border-t border-[#111113]/10">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-black text-white font-mono text-xs font-bold flex items-center justify-center">01</div>
              <h3 className="font-display font-bold text-base text-[#111113]">
                {isIt ? "1. Analisi & Contenuti" : "1. Strategy & Content"}
              </h3>
              <p className="text-xs text-[#111113]/70 leading-relaxed font-sans">
                {isIt 
                  ? "Definiamo insieme la struttura delle pagine, raccogliamo testi, immagini e loghi della tua attività." 
                  : "We map out the page structure and gather copy, imagery, and brand assets."}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 bg-black text-white font-mono text-xs font-bold flex items-center justify-center">02</div>
              <h3 className="font-display font-bold text-base text-[#111113]">
                {isIt ? "2. Setup Hostinger & WP" : "2. Hostinger & WP Setup"}
              </h3>
              <p className="text-xs text-[#111113]/70 leading-relaxed font-sans">
                {isIt 
                  ? "Attiviamo il server Cloud Hostinger, colleghiamo il dominio, installiamo WordPress ed elaboriamo il design grafico." 
                  : "We launch the Hostinger server, map the domain, install WordPress, and craft custom visual styling."}
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-8 h-8 bg-black text-white font-mono text-xs font-bold flex items-center justify-center">03</div>
              <h3 className="font-display font-bold text-base text-[#111113]">
                {isIt ? "3. Collaudo & Consegna" : "3. Testing & Handover"}
              </h3>
              <p className="text-xs text-[#111113]/70 leading-relaxed font-sans">
                {isIt 
                  ? "Verifichiamo le prestazioni, la sicurezza e la visualizzazione mobile, per poi consegnarti il sito pronto e funzionante." 
                  : "We test speed, mobile responsiveness, and security before handing over live access keys."}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: I DUE PILASTRI - HOSTINGER & WORDPRESS */}
        <section className="space-y-8">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#111113]/60">
              {isIt ? "TECNOLOGIA ALL'AVANGUARDIA" : "STATE-OF-THE-ART TECH STACK"}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111113]">
              {isIt ? "Perché il Binomio Hostinger + WordPress?" : "Why Hostinger + WordPress?"}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* CARD 1: HOSTINGER */}
            <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <div className="flex items-center gap-3">
                    <Server className="w-6 h-6 text-black" />
                    <span className="font-display font-bold text-lg text-[#111113]">Hostinger Cloud Hosting</span>
                  </div>
                  <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 uppercase tracking-wider font-bold">
                    {isIt ? "INFASTRUTTURA" : "HOSTING"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#111113]/80 leading-relaxed font-sans">
                  {isIt
                    ? "Hostinger è uno dei provider hosting più veloci, affidabili e moderni a livello globale. Con data center avanzati in Europa e dischi NVMe high-speed, garantisce caricamenti fulminei per i tuoi clienti."
                    : "Hostinger provides high-performance Europe-based cloud servers with NVMe storage, ensuring maximum speed and reliable 99.9% uptime."}
                </p>

                <ul className="space-y-2.5 text-xs font-sans text-[#111113]/85">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Dischi NVMe High-Speed:</strong> Tempi di lettura e scrittura dati fino a 10 volte più veloci dei classici SSD.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>LiteSpeed Web Server:</strong> Modulo di caching nativo integrato per velocizzare l'apertura delle pagine.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Sicurezza Integrata:</strong> Protezione DDoS Cloudflare, Firewall e Certificato SSL HTTPS sempre attivo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>E-mail Professionali:</strong> Configurazione di caselle mail aziendali con il tuo nome dominio (es. info@tuodominio.it).</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-black/10 text-[11px] font-mono text-[#111113]/60 uppercase tracking-wider">
                ✓ Hosting gestito e pre-configurato
              </div>
            </div>

            {/* CARD 2: WORDPRESS */}
            <div className="bg-white border-2 border-black p-6 sm:p-8 space-y-6 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-black/10 pb-4">
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-black" />
                    <span className="font-display font-bold text-lg text-[#111113]">CMS WordPress</span>
                  </div>
                  <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 uppercase tracking-wider font-bold">
                    {isIt ? "PIATTAFORMA" : "CMS"}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#111113]/80 leading-relaxed font-sans">
                  {isIt
                    ? "WordPress è il sistema di gestione dei contenuti più utilizzato al mondo. Offre la combinazione perfetta tra flessibilità, personalizzazione grafica e facilità di gestione per il cliente finale."
                    : "WordPress powers over 43% of the web. It delivers total content control, rich plugin ecosystems, and intuitive editing tools."}
                </p>

                <ul className="space-y-2.5 text-xs font-sans text-[#111113]/85">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Autonomia nei Contenuti:</strong> Cambia testi, inserisci immagini e pubblica articoli con un pannello intuitivo in italiano.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Scalabilità Senza Limiti:</strong> Possibilità di aggiungere sezioni, e-commerce o sistemi di prenotazione in futuro.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>SEO-Friendly:</strong> Struttura del codice ottimizzata per la massima indicizzazione sui motori di ricerca come Google.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Proprietà al 100%:</strong> Nessun vincolo proprietario: il codice, il database e i dati rimangono completamente tuoi.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-black/10 text-[11px] font-mono text-[#111113]/60 uppercase tracking-wider">
                ✓ Piena titolarità dei tuoi dati
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: COSA COMPRENDE IL PACCHETTO "CHIAVI IN MANO" */}
        <section className="bg-white border border-[#111113]/15 p-6 sm:p-10 shadow-sm space-y-8">
          <div className="space-y-2 border-b border-[#111113]/10 pb-6">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 bg-black text-white w-fit block">
              {isIt ? "PACCHETTO COMPLETO" : "WHAT'S INCLUDED"}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111113]">
              {isIt ? "Cosa è incluso nel tuo Sito Web Chiavi in Mano" : "Everything included in your Turnkey Website"}
            </h2>
            <p className="text-xs sm:text-sm text-[#111113]/70 font-sans">
              {isIt 
                ? "Tutti gli elementi indispensabili per lanciare la tua attività sul web con standard professionali:" 
                : "All essential features and configurations for a successful professional website launch:"}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6] space-y-3">
              <Layout className="w-6 h-6 text-black" />
              <h3 className="font-display font-bold text-base text-[#111113]">
                {isIt ? "Design Su Misura & Mobile-First" : "Bespoke Mobile-First Design"}
              </h3>
              <p className="text-xs text-[#111113]/75 leading-relaxed font-sans">
                {isIt 
                  ? "Layout grafico unico curato nei minimi dettagli da M. Teresa Rogani, perfettamente visibile e veloce su smartphone e computer." 
                  : "Tailored visual design crafted by M. Teresa Rogani, fully responsive across smartphones, tablets, and desktop computers."}
              </p>
            </div>

            <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6] space-y-3">
              <Server className="w-6 h-6 text-black" />
              <h3 className="font-display font-bold text-base text-[#111113]">
                {isIt ? "Setup Hosting Hostinger & SSL" : "Hostinger Server & SSL Setup"}
              </h3>
              <p className="text-xs text-[#111113]/75 leading-relaxed font-sans">
                {isIt 
                  ? "Configurazione completa del server Hostinger, associazione del tuo dominio e installazione del certificato di sicurezza SSL." 
                  : "Complete Hostinger cloud server setup, domain mapping, and HTTPS SSL security deployment."}
              </p>
            </div>

            <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6] space-y-3">
              <Mail className="w-6 h-6 text-black" />
              <h3 className="font-display font-bold text-base text-[#111113]">
                {isIt ? "E-mail Professionali Incluse" : "Professional Email Accounts"}
              </h3>
              <p className="text-xs text-[#111113]/75 leading-relaxed font-sans">
                {isIt 
                  ? "Creazione e configurazione delle caselle di posta aziendali collegate al dominio (es. info@nomeazienda.it)." 
                  : "Setup of custom business email accounts tied directly to your business domain name."}
              </p>
            </div>

            <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6] space-y-3">
              <Lock className="w-6 h-6 text-black" />
              <h3 className="font-display font-bold text-base text-[#111113]">
                {isIt ? "Conformità GDPR & Privacy" : "GDPR & Legal Compliance"}
              </h3>
              <p className="text-xs text-[#111113]/75 leading-relaxed font-sans">
                {isIt 
                  ? "Integrazione del banner cookie a norma di legge e predisposizione della pagina di Privacy Policy e Termini." 
                  : "Integration of compliant cookie banners, privacy policy structures, and legal terms setup."}
              </p>
            </div>

            <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6] space-y-3">
              <Zap className="w-6 h-6 text-black" />
              <h3 className="font-display font-bold text-base text-[#111113]">
                {isIt ? "Ottimizzazione SEO Iniziale" : "Initial Search Engine Setup"}
              </h3>
              <p className="text-xs text-[#111113]/75 leading-relaxed font-sans">
                {isIt 
                  ? "Meta tag, parole chiave essenziali, mappa del sito XML e indicizzazione immediata su Google Search Console." 
                  : "Essential meta tags, XML sitemap generation, and immediate Google Search Console indexing."}
              </p>
            </div>

            <div className="p-5 border border-[#111113]/10 bg-[#FAF9F6] space-y-3">
              <MousePointerClick className="w-6 h-6 text-black" />
              <h3 className="font-display font-bold text-base text-[#111113]">
                {isIt ? "Form Contatto & WhatsApp" : "Contact Forms & WhatsApp"}
              </h3>
              <p className="text-xs text-[#111113]/75 leading-relaxed font-sans">
                {isIt 
                  ? "Moduli di contatto interattivi per ricevere richieste via e-mail e pulsante diretto di chat WhatsApp per i clienti." 
                  : "Interactive inquiry forms and direct one-click WhatsApp chat buttons for immediate lead conversion."}
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 4: CONFRONTO - FAI DA TE VS AGENZIA VS FACILISSIMO WEB */}
        <section className="bg-white border border-[#111113]/15 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest px-2.5 py-0.5 bg-black text-white w-fit block">
              {isIt ? "PERCHÉ SCEGLIERCI" : "WHY FACILISSIMO WEB"}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111113]">
              {isIt ? "Confronta le opzioni sul mercato" : "Compare your options"}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm font-sans">
              <thead>
                <tr className="border-b-2 border-black bg-[#111113] text-white">
                  <th className="p-3 sm:p-4 font-mono uppercase tracking-wider text-[11px] font-bold">Caratteristica</th>
                  <th className="p-3 sm:p-4 font-mono uppercase tracking-wider text-[11px] font-bold opacity-70">Fai da Te</th>
                  <th className="p-3 sm:p-4 font-mono uppercase tracking-wider text-[11px] font-bold opacity-70">Agenzie Tradizionali</th>
                  <th className="p-3 sm:p-4 font-mono uppercase tracking-wider text-[11px] font-bold bg-amber-400 text-black">Facilissimo Web</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#111113]/10">
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-[#111113]">Setup Tecnico</td>
                  <td className="p-3 sm:p-4 text-red-600 font-medium">A tuo carico (complesso)</td>
                  <td className="p-3 sm:p-4 text-emerald-700">Incluso</td>
                  <td className="p-3 sm:p-4 font-bold text-emerald-800 bg-amber-50">100% Gestito e Inserito</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-[#111113]">Prestazioni Server</td>
                  <td className="p-3 sm:p-4 text-amber-700">Base o da scegliere</td>
                  <td className="p-3 sm:p-4 text-neutral-600">Spesso condivise e lente</td>
                  <td className="p-3 sm:p-4 font-bold text-emerald-800 bg-amber-50">Hostinger Cloud NVMe Fast</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-[#111113]">Gestione Contenuti</td>
                  <td className="p-3 sm:p-4 text-neutral-600">Autonoma ma difficile</td>
                  <td className="p-3 sm:p-4 text-red-600">Spesso blindata dall'agenzia</td>
                  <td className="p-3 sm:p-4 font-bold text-emerald-800 bg-amber-50">WordPress Facile & Autonomo</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-[#111113]">Supporto e Referente</td>
                  <td className="p-3 sm:p-4 text-neutral-600">Nessuno (forum o ticket)</td>
                  <td className="p-3 sm:p-4 text-amber-700">Lento / Intermediari</td>
                  <td className="p-3 sm:p-4 font-bold text-emerald-800 bg-amber-50">Diretto con M. Teresa Rogani</td>
                </tr>
                <tr>
                  <td className="p-3 sm:p-4 font-bold text-[#111113]">Tempi di Consegna</td>
                  <td className="p-3 sm:p-4 text-amber-700">Indefiniti</td>
                  <td className="p-3 sm:p-4 text-red-600">Da 2 a 6 mesi</td>
                  <td className="p-3 sm:p-4 font-bold text-emerald-800 bg-amber-50">Rapidi (circa 14 giorni)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 5: DOMANDE FREQUENTI (FAQ) */}
        <section className="bg-white border border-[#111113]/15 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest w-fit">
            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>DOMANDE FREQUENTI</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#111113]">
            {isIt ? "Domande sul Sito Web Chiavi in Mano" : "Frequently Asked Questions"}
          </h2>

          <div className="space-y-4 pt-2">
            <div className="border border-black/10 p-4 bg-[#FAF9F6]">
              <h3 className="font-display font-bold text-base text-[#111113]">
                {isIt ? "Devo acquistare io l'hosting su Hostinger?" : "Do I need to purchase the Hostinger hosting myself?"}
              </h3>
              <p className="text-xs sm:text-sm text-[#111113]/80 leading-relaxed font-sans mt-2">
                {isIt 
                  ? "No, possiamo gestire interamente l'attivazione per tuo conto oppure guidarti passo-passo nell'acquisto del piano Hostinger più adatto a te per mantenere l'intestazione diretta dell'account." 
                  : "No, we can either set up the Hostinger hosting account for you or guide you step-by-step so the account stays directly under your name."}
              </p>
            </div>

            <div className="border border-black/10 p-4 bg-[#FAF9F6]">
              <h3 className="font-display font-bold text-base text-[#111113]">
                {isIt ? "Posso aggiornare i testi e i prodotti da solo?" : "Can I update content and products on my own?"}
              </h3>
              <p className="text-xs sm:text-sm text-[#111113]/80 leading-relaxed font-sans mt-2">
                {isIt 
                  ? "Certamente! Essendo sviluppato su WordPress, avrai un pannello di controllo riservato in cui potrai accedere per modificare testi, immagini, articoli del blog e listini in modo estremamente semplice." 
                  : "Absolutely! Powered by WordPress, you get a dedicated user-friendly admin dashboard to edit copy, publish blog posts, and upload images effortlessly."}
              </p>
            </div>

            <div className="border border-black/10 p-4 bg-[#FAF9F6]">
              <h3 className="font-display font-bold text-base text-[#111113]">
                {isIt ? "E se in futuro volessi affidarvi anche la gestione tecnica?" : "What if I want ongoing managed updates in the future?"}
              </h3>
              <p className="text-xs sm:text-sm text-[#111113]/80 leading-relaxed font-sans mt-2">
                {isIt 
                  ? "Puoi affiancare in qualsiasi momento la nostra proposta di 'Sito in Abbonamento (WaaS)', lasciando a Facilissimo Web l'onere di aggiornamenti di sicurezza, backup periodici e modifiche ai contenuti senza pensieri." 
                  : "You can seamlessly transition or add our Website-as-a-Service (WaaS) plan anytime to let Facilissimo Web handle backups, security updates, and active content edits."}
              </p>
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="bg-[#111113] text-white p-8 sm:p-12 border-2 border-black shadow-lg text-center space-y-6">
          <span className="inline-block px-3 py-1 bg-amber-400 text-black font-mono text-[10px] font-bold uppercase tracking-widest">
            {isIt ? "INIZIA ORA" : "GET STARTED"}
          </span>
          
          <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white">
            {isIt ? "Pronto per il tuo Sito Web Chiavi in Mano?" : "Ready for Your Turnkey Website?"}
          </h2>

          <p className="text-xs sm:text-sm text-white/80 max-w-2xl mx-auto font-sans leading-relaxed">
            {isIt 
              ? "Richiedi ora una consulenza o un preventivo personalizzato a M. Teresa Rogani. Riceverai un'analisi chiara, tempi trasparenti e la certezza di un lavoro artigianale di altissimo livello." 
              : "Request a personalized consultation with M. Teresa Rogani today. Clear scope, transparent timeline, and artisan quality guaranteed."}
          </p>

          <div className="pt-4 flex justify-center">
            <button
              onClick={handleContactClick}
              className="px-8 py-4 bg-amber-400 text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-white transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{isIt ? "Richiedi Preventivo Chiavi in Mano" : "Request Turnkey Quote"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
