import React from "react";
import { 
  Rocket, 
  AlertTriangle, 
  CheckCircle2, 
  Layers, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Clock, 
  Settings, 
  TrendingUp, 
  Headphones
} from "lucide-react";

interface SubscriptionViewProps {
  lang: "it" | "en";
  isFacilitated?: boolean;
  setCurrentTab: (tab: string) => void;
}

export const SubscriptionView: React.FC<SubscriptionViewProps> = ({
  lang,
  isFacilitated,
  setCurrentTab,
}) => {
  const isIt = lang === "it";

  return (
    <div className="pt-28 pb-24 min-h-screen bg-[#F8F7F4] text-[#111113] selection:bg-black selection:text-white">
      <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* HERO SECTION */}
        <section className="relative bg-[#FAF9F6] border border-[#111113]/15 p-8 md:p-14 overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#111113] text-[#FAF9F6] text-xs font-mono uppercase tracking-widest font-bold">
              <Rocket className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>{isIt ? "PROPOSTA FACILISSIMO WEB" : "FACILISSIMO WEB OFFER"}</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#111113] tracking-tight leading-[1.15]">
              {isIt ? (
                <>Sito Web in Abbonamento <span className="font-serif italic font-normal text-black/80">(WaaS / SaaS)</span></>
              ) : (
                <>Website as a Service <span className="font-serif italic font-normal text-black/80">(WaaS / SaaS)</span></>
              )}
            </h1>

            <p className="text-[#111113]/80 font-sans text-lg sm:text-xl leading-relaxed font-medium">
              {isIt
                ? "Un sito web moderno, leggero e sempre aggiornato, senza l'ansia della gestione tecnica e con un affiancamento costante."
                : "A modern, lightweight, and continuously updated website without technical stress, backed by ongoing support."}
            </p>

            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => setCurrentTab("contatti")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#111113] text-white font-mono text-xs uppercase tracking-wider font-bold hover:bg-black transition-all shadow-md group"
              >
                <span>{isIt ? "Richiedi la Tua Proposta" : "Request Your Proposal"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-amber-400" />
              </button>

              <button
                onClick={() => setCurrentTab("contatti")}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#111113]/30 font-mono text-xs uppercase tracking-wider font-bold hover:border-black transition-colors"
              >
                <Headphones className="w-4 h-4 text-[#111113]" />
                <span>{isIt ? "Parla con lo Studio" : "Talk to the Studio"}</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION 1: IL PROBLEMA DEL SITO TRADIZIONALE */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-5 bg-[#111113] text-white p-8 md:p-10 flex flex-col justify-between border border-[#111113]">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-widest font-bold">
                <AlertTriangle className="w-4 h-4" />
                <span>{isIt ? "LIMITI DEL PASSATO" : "TRADITIONAL LIMITS"}</span>
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white">
                {isIt ? "Il Problema del Sito Tradizionale" : "The Problem with Traditional Sites"}
              </h2>
            </div>
            <div className="mt-8 pt-6 border-t border-white/15 text-xs font-mono text-white/70 uppercase tracking-wider space-y-2">
              <p>• {isIt ? "Alti costi iniziali" : "High upfront costs"}</p>
              <p>• {isIt ? "Abbandono tecnico post-consegna" : "Technical abandonment post-launch"}</p>
              <p>• {isIt ? "Invecchiamento rapido dei contenuti" : "Rapid content obsolescence"}</p>
            </div>
          </div>

          <div className="md:col-span-7 bg-white border border-[#111113]/15 p-8 md:p-10 flex flex-col justify-center space-y-6 shadow-sm">
            <p className="text-base md:text-lg text-[#111113]/90 leading-relaxed font-sans">
              {isIt ? (
                <>
                  I siti web tradizionali hanno un grande difetto: richiedono un <strong>investimento importante all'inizio</strong> e, una volta consegnati, vengono lasciati a se stessi.
                </>
              ) : (
                <>
                  Traditional websites have a major flaw: they require a <strong>heavy initial investment</strong> and, once delivered, are often left unattended.
                </>
              )}
            </p>
            <p className="text-sm md:text-base text-[#111113]/75 leading-relaxed font-sans">
              {isIt ? (
                <>
                  Dopo pochi mesi i plugin non sono aggiornati, i testi diventano vecchi, le recensioni non vengono aggiunte e la grafica invecchia, rischiando problemi di sicurezza o cali nei motori di ricerca.
                </>
              ) : (
                <>
                  After a few months, plugins become outdated, copy goes stale, new reviews aren't added, and the visual layout ages, exposing your business to security risks or search ranking drops.
                </>
              )}
            </p>
            <div className="p-5 bg-[#F8F7F4] border-l-4 border-amber-500 font-sans text-sm text-[#111113] font-medium leading-relaxed">
              {isIt ? (
                <>
                  <strong>La Soluzione Facilissimo Web:</strong> Con la modalità in <em>Abbonamento + Gestione</em>, creo la tua struttura da zero e continuo a curarla mese dopo mese.
                </>
              ) : (
                <>
                  <strong>The Facilissimo Web Solution:</strong> With the <em>Subscription + Management</em> model, I build your site from scratch and keep refining it month after month.
                </>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 2: COME FUNZIONA IL SERVIZIO (FASE 1 & FASE 2) */}
        <section className="space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 bg-[#111113] text-white font-mono text-xs uppercase tracking-widest font-bold">
              {isIt ? "STRUTTURA DEL SERVIZIO" : "SERVICE STRUCTURE"}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#111113]">
              {isIt ? "Come Funziona il Servizio" : "How the Service Works"}
            </h2>
            <p className="text-sm text-[#111113]/70 font-sans">
              {isIt
                ? "Un percorso chiaro diviso in due fasi sinergiche per garantirti massime prestazioni fin da subito e zero obsolescenza nel tempo."
                : "A clear two-phase workflow ensuring peak performance from day one and zero obsolescence over time."}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* PHASE 1: SETUP E SVILUPPO INIZIALE */}
            <div className="bg-white border border-[#111113]/15 p-8 md:p-10 space-y-8 shadow-sm relative overflow-hidden flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-[#111113]/10">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-amber-600 bg-amber-50 px-3 py-1 border border-amber-200">
                    <Zap className="w-3.5 h-3.5" />
                    <span>FASE 1</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#111113]/50 uppercase">
                    {isIt ? "UNA TANTUM" : "ONE-TIME SETUP"}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-[#111113]">
                    {isIt ? "Phase 1: Setup e Sviluppo Iniziale" : "Phase 1: Initial Setup & Development"}
                  </h3>
                  <p className="text-xs font-mono text-[#111113]/60 uppercase tracking-wider mt-1">
                    {isIt ? "Progettazione e pubblicazione della struttura" : "Architecture design and launch"}
                  </p>
                </div>

                <div className="space-y-5 pt-2">
                  <div className="flex gap-4 items-start">
                    <div className="w-7 h-7 shrink-0 bg-[#111113] text-white flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                      1
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-[#111113]">
                        {isIt ? "Copywriting e Messaggio Diretto" : "Copywriting & Direct Messaging"}
                      </h4>
                      <p className="text-xs text-[#111113]/75 leading-relaxed">
                        {isIt
                          ? "Definisco un'intestazione chiara (Hero Section) e testi d'impatto che spiegano subito cosa fai nei primi 3 secondi, senza supercazzoli."
                          : "I craft a compelling Hero Section and high-impact copy that explains your value within 3 seconds."}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-7 h-7 shrink-0 bg-[#111113] text-white flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                      2
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-[#111113]">
                        {isIt ? "Design Moderno e Codice Pulito" : "Modern Design & Clean Code"}
                      </h4>
                      <p className="text-xs text-[#111113]/75 leading-relaxed">
                        {isIt
                          ? "Struttura visiva curata, personalizzata, ultraleggera e veloce nell'apertura (ottima per la SEO e da mobile)."
                          : "Custom tailored visual structure, lightweight and lightning-fast loading (optimal for mobile & SEO)."}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-7 h-7 shrink-0 bg-[#111113] text-white flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                      3
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-[#111113]">
                        {isIt ? "Pagine e CTA Strategiche" : "Strategic Pages & CTAs"}
                      </h4>
                      <p className="text-xs text-[#111113]/75 leading-relaxed">
                        {isIt
                          ? "Architettura del sito con percorsi mirati per i tuoi diversi tipi di clienti e moduli di contatto studiati per convertire."
                          : "User paths engineered for different client profiles with high-converting contact forms."}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-7 h-7 shrink-0 bg-[#111113] text-white flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                      4
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-[#111113]">
                        {isIt ? "Messa Online e Tracciamenti" : "Go-Live & Tracking Setup"}
                      </h4>
                      <p className="text-xs text-[#111113]/75 leading-relaxed">
                        {isIt
                          ? "Configurazione dominio, posta, strumenti di analisi e conformità di base."
                          : "Domain, business email, analytics tools configuration, and essential privacy compliance."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#111113]/10 text-xs font-mono text-[#111113]/60">
                ✓ {isIt ? "Pronto per la vendita fin dal primo giorno" : "Ready to drive sales from day one"}
              </div>
            </div>

            {/* PHASE 2: CANONE DI GESTIONE CONTINUA */}
            <div className="bg-[#111113] text-white p-8 md:p-10 space-y-8 shadow-md relative overflow-hidden flex flex-col justify-between border border-black">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/15">
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold text-amber-400 bg-white/10 px-3 py-1 border border-white/20">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
                    <span>FASE 2</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-white/60 uppercase">
                    {isIt ? "RICORRENTE (MENSILE/ANNUALE)" : "RECURRING SUBSCRIPTION"}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    {isIt ? "Phase 2: Canone di Gestione Continua" : "Phase 2: Continuous Managed Care"}
                  </h3>
                  <p className="text-xs font-mono text-amber-400 uppercase tracking-wider mt-1">
                    {isIt ? "Abbonamento Mensile o Annuale" : "Monthly or Yearly Subscription"}
                  </p>
                </div>

                <div className="space-y-5 pt-2">
                  <div className="flex gap-4 items-start">
                    <div className="w-7 h-7 shrink-0 bg-amber-400 text-[#111113] flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-white">
                        {isIt ? "Manutenzione e Sicurezza" : "Maintenance & Active Security"}
                      </h4>
                      <p className="text-xs text-white/75 leading-relaxed">
                        {isIt
                          ? "Gestione server, aggiornamenti tecnici, backup e protezione attiva per garantire che il sito sia sempre raggiungibile e veloce."
                          : "Server management, technical updates, backups, and proactive security ensuring maximum uptime."}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-7 h-7 shrink-0 bg-amber-400 text-[#111113] flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-white">
                        {isIt ? "Modifiche e Aggiornamenti Contenuti" : "Content Tweaks & Updates Included"}
                      </h4>
                      <p className="text-xs text-white/75 leading-relaxed">
                        {isIt
                          ? "Aggiunta di nuove testimonianze, aggiornamento prezzi, nuovi servizi o cambi di testo inclusi, senza dover chiedere ogni volta un preventivo a parte."
                          : "New testimonials, updated price lists, new services, or copy adjustments included without quote friction."}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-7 h-7 shrink-0 bg-amber-400 text-[#111113] flex items-center justify-center font-mono text-xs font-bold mt-0.5">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-sm text-white">
                        {isIt ? "Ottimizzazione nel Tempo" : "Continuous Optimization"}
                      </h4>
                      <p className="text-xs text-white/75 leading-relaxed">
                        {isIt
                          ? "Il sito non diventa mai obsoleto perché lo monitoro e lo adatto continuamente alle esigenze della tua attività."
                          : "Your site never goes obsolete because I continuously monitor and adapt it to your growing business needs."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/15 text-xs font-mono text-amber-400">
                ✓ {isIt ? "Zero pensieri tecnici e sito sempre all'avanguardia" : "Zero technical stress & a site that never gets old"}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: SCHEDA SINTETICA DEL MODELLO */}
        <section className="bg-white border border-[#111113]/15 p-8 md:p-12 space-y-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#111113]/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-amber-600 font-bold">
                {isIt ? "TABELLA RIASSUNTIVA" : "SUMMARY TABLE"}
              </span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-[#111113]">
                {isIt ? "Scheda Sintetica del Modello" : "Summary Model Overview"}
              </h2>
            </div>
            <p className="text-xs font-mono text-[#111113]/60 uppercase tracking-wider">
              {isIt ? "In sintesi: trasparenza e valore continuo" : "In short: transparency and long-term value"}
            </p>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans">
              <thead>
                <tr className="bg-[#111113] text-white font-mono text-xs uppercase tracking-wider">
                  <th className="p-4 font-bold border border-[#111113] w-1/4">
                    {isIt ? "Fase" : "Phase"}
                  </th>
                  <th className="p-4 font-bold border border-[#111113] w-5/12">
                    {isIt ? "Cosa comprende" : "What it includes"}
                  </th>
                  <th className="p-4 font-bold border border-[#111113] w-5/12">
                    {isIt ? "Risultato per te" : "Your Outcome"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#111113]/10 text-sm">
                <tr className="hover:bg-[#F8F7F4] transition-colors">
                  <td className="p-5 font-bold font-mono text-[#111113] border border-[#111113]/15 align-top">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-600" />
                      <span>{isIt ? "Sviluppo Iniziale (Setup)" : "Initial Setup"}</span>
                    </div>
                  </td>
                  <td className="p-5 text-[#111113]/85 border border-[#111113]/15 align-top leading-relaxed">
                    {isIt
                      ? "Progettazione grafica, copywriting, sviluppo codice e configurazione"
                      : "Graphic design, copywriting, clean code development, and server setup"}
                  </td>
                  <td className="p-5 font-medium text-[#111113] bg-amber-500/5 border border-[#111113]/15 align-top leading-relaxed">
                    {isIt
                      ? "Un sito moderno, veloce e pronto per la vendita fin dal primo giorno"
                      : "A modern, fast, sales-ready website from day one"}
                  </td>
                </tr>
                <tr className="hover:bg-[#F8F7F4] transition-colors">
                  <td className="p-5 font-bold font-mono text-[#111113] border border-[#111113]/15 align-top">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-amber-600" />
                      <span>{isIt ? "Canone Mensile (SaaS)" : "Monthly SaaS Care"}</span>
                    </div>
                  </td>
                  <td className="p-5 text-[#111113]/85 border border-[#111113]/15 align-top leading-relaxed">
                    {isIt
                      ? "Hosting, manutenzione, sicurezza, aggiornamenti contenuti e supporto"
                      : "Hosting, active maintenance, security, content updates, and dedicated support"}
                  </td>
                  <td className="p-5 font-medium text-[#111113] bg-amber-500/5 border border-[#111113]/15 align-top leading-relaxed">
                    {isIt
                      ? "Zero pensieri tecnici, nessun costo improvviso per modifiche e un sito che non invecchia mai."
                      : "Zero technical worries, no surprise costs for tweaks, and a site that never gets old."}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile Cards View */}
          <div className="block md:hidden space-y-6">
            <div className="bg-[#F8F7F4] p-6 border border-[#111113]/15 space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-700">
                <Zap className="w-4 h-4" />
                <span>{isIt ? "Sviluppo Iniziale (Setup)" : "Initial Setup"}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#111113]/50 block">
                  {isIt ? "Cosa comprende" : "Includes"}
                </span>
                <p className="text-sm text-[#111113]/90 font-medium">
                  {isIt ? "Progettazione grafica, copywriting, sviluppo codice e configurazione" : "Graphic design, copywriting, code build, configuration"}
                </p>
              </div>
              <div className="pt-3 border-t border-[#111113]/10">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#111113]/50 block">
                  {isIt ? "Risultato per te" : "Your Outcome"}
                </span>
                <p className="text-sm font-bold text-black mt-0.5">
                  {isIt ? "Un sito moderno, veloce e pronto per la vendita fin dal primo giorno" : "A modern, fast, sales-ready website from day one"}
                </p>
              </div>
            </div>

            <div className="bg-[#111113] text-white p-6 border border-black space-y-4">
              <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-amber-400">
                <RefreshCw className="w-4 h-4" />
                <span>{isIt ? "Canone Mensile (SaaS)" : "Monthly SaaS Care"}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                  {isIt ? "Cosa comprende" : "Includes"}
                </span>
                <p className="text-sm text-white/90 font-medium">
                  {isIt ? "Hosting, manutenzione, sicurezza, aggiornamenti contenuti e supporto" : "Hosting, active maintenance, security, content updates, support"}
                </p>
              </div>
              <div className="pt-3 border-t border-white/15">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">
                  {isIt ? "Risultato per te" : "Your Outcome"}
                </span>
                <p className="text-sm font-bold text-amber-300 mt-0.5">
                  {isIt ? "Zero pensieri tecnici, nessun costo improvviso per modifiche e un sito che non invecchia mai." : "Zero technical worries, no surprise costs for tweaks, and a site that never gets old."}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="bg-[#111113] text-white p-8 md:p-14 text-center space-y-6 relative overflow-hidden border border-black shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="inline-block px-3 py-1 bg-amber-400 text-black font-mono text-xs uppercase tracking-widest font-bold">
              {isIt ? "LANCIA IL TUO SITO IN ABBONAMENTO" : "LAUNCH YOUR SUBSCRIPTION WEBSITE"}
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-white">
              {isIt ? "Pronto a digitalizzare la tua attività senza ansia tecnica?" : "Ready to digitize your business without technical stress?"}
            </h2>
            <p className="text-sm md:text-base text-white/80 font-sans leading-relaxed">
              {isIt
                ? "Contattami direttamente per analizzare il tuo progetto e ricevere una proposta personalizzata su misura."
                : "Contact me directly to analyze your project and receive a tailored proposal."}
            </p>
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setCurrentTab("contatti")}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#111113] font-mono text-xs uppercase tracking-wider font-bold hover:bg-amber-400 transition-all shadow-lg group"
              >
                <span>{isIt ? "Richiedi Informazioni o Preventivo" : "Request Quote / More Info"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};
