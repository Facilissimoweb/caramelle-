import React from "react";
import { 
  Key, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Zap,
  HelpCircle,
  Clock,
  Layers
} from "lucide-react";

interface TurnkeyWordpressViewProps {
  lang: "it" | "en";
  isFacilitated?: boolean;
  setCurrentTab?: (tab: string) => void;
}

export default function TurnkeyWordpressView({ lang, setCurrentTab }: TurnkeyWordpressViewProps) {
  const isIt = lang === "it";

  const handleContactClick = (packageName?: string) => {
    if (setCurrentTab) {
      setCurrentTab("contatti");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F7F4] text-[#111113] pb-24 selection:bg-black selection:text-white">
      {/* HERO SECTION */}
      <section className="relative bg-[#111113] text-white pt-16 pb-16 px-4 sm:px-6 xl:px-12 border-b border-black">
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
        />

        <div className="max-w-4xl mx-auto space-y-5 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-black text-[11px] font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isIt ? "CONFRONTO MODELLI DI SERVIZIO" : "SERVICE MODELS COMPARISON"}</span>
          </div>

          <h1 className="font-tan text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            {isIt ? "Sito Web: Chiavi in Mano o In Abbonamento?" : "Website: Turnkey or Subscription?"}
          </h1>

          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed font-sans font-light">
            {isIt
              ? "Due formule trasparenti per la tua presenza online. Confronta le differenze a colpo d'occhio e scegli la soluzione ideale per la tua attività."
              : "Two transparent approaches for your online presence. Compare differences at a glance and choose what fits best."}
          </p>
        </div>
      </section>

      {/* MAIN CONTENT: ULTRA-SYNTHETIC COMPARISON */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 xl:px-12 pt-12 space-y-12">

        {/* SIDE-BY-SIDE CARDS COMPARISON */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          {/* CARD 1: CHIAVI IN MANO */}
          <div className="bg-white border-2 border-[#111113] p-6 sm:p-8 flex flex-col justify-between shadow-md relative group hover:shadow-xl transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#111113]/10 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-black text-amber-400 font-mono font-bold flex items-center justify-center shrink-0">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-widest block">
                      {isIt ? "ACQUISTO UNA TANTUM" : "ONE-TIME PURCHASE"}
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-[#111113]">
                      {isIt ? "Chiavi in Mano" : "Turnkey Website"}
                    </h2>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold bg-[#111113] text-white px-2.5 py-1">
                  0 Canoni
                </span>
              </div>

              <p className="text-sm text-[#111113]/80 leading-relaxed font-sans">
                {isIt
                  ? "Sito WordPress completo e subito pronto all'uso su hosting Hostinger. Paghi una sola volta, il sito è tuo al 100% e lo gestisci in totale autonomia."
                  : "Complete WordPress site hosted on Cloud Hostinger. One-time payment, 100% your property, managed independently."}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-[#111113]">
                    <strong>{isIt ? "Proprietà Totale (100%):" : "100% Code Ownership:"}</strong> {isIt ? "Nessun vincolo o piattaforma chiusa." : "No vendor lock-in or proprietary code."}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-[#111113]">
                    <strong>{isIt ? "Autonomia WordPress:" : "WordPress Autonomy:"}</strong> {isIt ? "Gestisci testi e immagini facilmente da solo." : "Edit copy & images easily on your own."}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-[#111113]">
                    <strong>{isIt ? "Zero Canoni Mensili:" : "Zero Monthly Fees:"}</strong> {isIt ? "Nessun abbonamento ricorsivo obbligatorio." : "No mandatory recurring subscriptions."}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-[#111113]">
                    <strong>{isIt ? "Cloud Hostinger:" : "Cloud Hostinger:"}</strong> {isIt ? "Infrastruttura veloce, sicura e scalabile." : "Fast, secure & scalable server setup."}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#111113]/10 mt-6 space-y-4">
              <div className="bg-[#FAF9F6] p-3 border border-[#111113]/10 text-xs font-mono text-[#111113]/80">
                👉 <strong>{isIt ? "A chi conviene:" : "Best for:"}</strong> {isIt ? "Chi desidera possedere il sito e gestirlo senza costi fissi mensili." : "Anyone who wants full site ownership with zero ongoing monthly fees."}
              </div>

              <button
                onClick={() => handleContactClick("chiavi-in-mano")}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#111113] hover:bg-black text-white font-bold text-xs uppercase font-mono tracking-wider transition-all"
              >
                <span>{isIt ? "Scegli Chiavi in Mano" : "Choose Turnkey Site"}</span>
                <ArrowRight className="w-4 h-4 text-amber-400" />
              </button>
            </div>
          </div>

          {/* CARD 2: IN ABBONAMENTO */}
          <div className="bg-[#111113] text-white border-2 border-black p-6 sm:p-8 flex flex-col justify-between shadow-md relative group hover:shadow-xl transition-all">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-amber-400 text-black font-mono font-bold flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                      {isIt ? "CANONE CONTINUO (WaaS)" : "MONTHLY / YEARLY CARE"}
                    </span>
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-white">
                      {isIt ? "In Abbonamento" : "Subscription Model"}
                    </h2>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold bg-amber-400 text-black px-2.5 py-1">
                  Tutto Incluso
                </span>
              </div>

              <p className="text-sm text-white/80 leading-relaxed font-sans">
                {isIt
                  ? "Sito web evoluto con affiancamento costante. Zero grandi costi iniziali, hosting e manutenzione inclusi, modifiche e aggiornamenti sempre garantiti."
                  : "Evolving website with continuous managed care. No heavy upfront costs, hosting & maintenance included, hassle-free updates."}
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-white/90">
                    <strong>{isIt ? "Zero Ansia Tecnica:" : "Zero Tech Stress:"}</strong> {isIt ? "Server, sicurezza, backup e aggiornamenti curati per te." : "Server, security, backups & updates handled for you."}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-white/90">
                    <strong>{isIt ? "Modifiche Incluse:" : "Content Tweaks Included:"}</strong> {isIt ? "Aggiungi testi, foto o prezzi senza preventivi extra." : "Update text, photos or services without extra quotes."}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-white/90">
                    <strong>{isIt ? "Sito Mai Obsoleto:" : "Never Outdated:"}</strong> {isIt ? "Evoluzione grafica e funzionale continua nel tempo." : "Continuous visual & functional enhancements over time."}
                  </span>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-medium text-white/90">
                    <strong>{isIt ? "Assistenza Diretta:" : "Direct Support:"}</strong> {isIt ? "Supporto telefonico ed email senza intermediari." : "Direct phone and email support with M. Teresa Rogani."}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/15 mt-6 space-y-4">
              <div className="bg-white/10 p-3 border border-white/15 text-xs font-mono text-white/90">
                👉 <strong>{isIt ? "A chi conviene:" : "Best for:"}</strong> {isIt ? "Chi desidera un investimento iniziale contenuto e la tranquillità della gestione continua." : "Businesses wanting low entry cost and zero technical worries."}
              </div>

              <button
                onClick={() => handleContactClick("abbonamento")}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase font-mono tracking-wider transition-all"
              >
                <span>{isIt ? "Scegli Abbonamento" : "Choose Subscription"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* COMPARISON TABLE */}
        <section className="bg-white border border-[#111113]/15 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#111113]/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-600 font-bold">
                {isIt ? "TABELLA COMPARATIVA" : "COMPARISON MATRIX"}
              </span>
              <h2 className="font-display text-2xl font-bold text-[#111113]">
                {isIt ? "Confronto Diretto a Colpo d'Occhio" : "Direct Side-by-Side Comparison"}
              </h2>
            </div>
            <span className="text-xs font-mono text-[#111113]/60 uppercase">
              {isIt ? "Consegna in 14 Giorni per entrambi" : "14-Day Delivery for Both"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#111113] text-white font-mono text-xs uppercase tracking-wider">
                  <th className="p-3.5 font-bold border border-[#111113] w-1/3">
                    {isIt ? "Caratteristica" : "Feature"}
                  </th>
                  <th className="p-3.5 font-bold border border-[#111113] text-amber-400 w-1/3">
                    {isIt ? "Chiavi in Mano (Una Tantum)" : "Turnkey (One-off)"}
                  </th>
                  <th className="p-3.5 font-bold border border-[#111113] text-amber-400 w-1/3">
                    {isIt ? "In Abbonamento (SaaS)" : "Subscription (Care)"}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#111113]/10">
                <tr className="hover:bg-[#FAF9F6]">
                  <td className="p-3.5 font-bold font-mono text-[#111113] border border-[#111113]/15">
                    {isIt ? "Costo Iniziale" : "Upfront Cost"}
                  </td>
                  <td className="p-3.5 border border-[#111113]/15">
                    {isIt ? "Investimento una tantum" : "One-time initial fee"}
                  </td>
                  <td className="p-3.5 font-medium text-emerald-800 bg-emerald-50/50 border border-[#111113]/15">
                    {isIt ? "Ridotto / Basso costo d'ingresso" : "Low entry investment"}
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF9F6]">
                  <td className="p-3.5 font-bold font-mono text-[#111113] border border-[#111113]/15">
                    {isIt ? "Canone Ricorrente" : "Ongoing Fees"}
                  </td>
                  <td className="p-3.5 font-medium text-emerald-800 bg-emerald-50/50 border border-[#111113]/15">
                    {isIt ? "Nessuno (€0 al mese)" : "None (€0/month)"}
                  </td>
                  <td className="p-3.5 border border-[#111113]/15">
                    {isIt ? "Canone mensile o annuale" : "Monthly or annual plan"}
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF9F6]">
                  <td className="p-3.5 font-bold font-mono text-[#111113] border border-[#111113]/15">
                    {isIt ? "Proprietà del Sito" : "Code Ownership"}
                  </td>
                  <td className="p-3.5 font-bold text-[#111113] border border-[#111113]/15">
                    {isIt ? "100% Tuo fin dal primo giorno" : "100% Yours from day one"}
                  </td>
                  <td className="p-3.5 border border-[#111113]/15">
                    {isIt ? "Incluso con il servizio attivo" : "Included while plan is active"}
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF9F6]">
                  <td className="p-3.5 font-bold font-mono text-[#111113] border border-[#111113]/15">
                    {isIt ? "Gestione Tecnica & Backup" : "Tech Maintenance & Backups"}
                  </td>
                  <td className="p-3.5 border border-[#111113]/15">
                    {isIt ? "In autonomia con WordPress" : "Self-managed via WordPress"}
                  </td>
                  <td className="p-3.5 font-bold text-amber-800 bg-amber-50/50 border border-[#111113]/15">
                    {isIt ? "100% Inclusa e Gestita dallo Studio" : "100% Handled by the Studio"}
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF9F6]">
                  <td className="p-3.5 font-bold font-mono text-[#111113] border border-[#111113]/15">
                    {isIt ? "Aggiornamenti & Modifiche" : "Updates & Modifications"}
                  </td>
                  <td className="p-3.5 border border-[#111113]/15">
                    {isIt ? "Fai-da-te semplice da bacheca" : "Do-it-yourself via admin panel"}
                  </td>
                  <td className="p-3.5 font-bold text-amber-800 bg-amber-50/50 border border-[#111113]/15">
                    {isIt ? "Inclusi senza costi aggiuntivi" : "Included without extra fees"}
                  </td>
                </tr>

                <tr className="hover:bg-[#FAF9F6]">
                  <td className="p-3.5 font-bold font-mono text-[#111113] border border-[#111113]/15">
                    {isIt ? "Hosting & Sicurezza" : "Hosting & Security"}
                  </td>
                  <td className="p-3.5 border border-[#111113]/15">
                    {isIt ? "Su tuo piano Cloud Hostinger" : "On your Cloud Hostinger plan"}
                  </td>
                  <td className="p-3.5 border border-[#111113]/15">
                    {isIt ? "Inclusi nel canone" : "Included in your subscription"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 3 SINTESI FONDAMENTALI */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white border border-[#111113]/15 p-6 space-y-2">
            <div className="w-8 h-8 bg-[#111113] text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
              01
            </div>
            <h3 className="font-display font-bold text-base text-[#111113]">
              {isIt ? "Qualità & Design Identici" : "Identical Quality & Craft"}
            </h3>
            <p className="text-xs text-[#111113]/75 leading-relaxed font-sans">
              {isIt
                ? "Sia con Chiavi in Mano che in Abbonamento ricevi un sito moderno, veloce, responsive e curato da M. Teresa Rogani."
                : "Regardless of the plan, you get a modern, fast, responsive site crafted directly by M. Teresa Rogani."}
            </p>
          </div>

          <div className="bg-white border border-[#111113]/15 p-6 space-y-2">
            <div className="w-8 h-8 bg-[#111113] text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
              02
            </div>
            <h3 className="font-display font-bold text-base text-[#111113]">
              {isIt ? "Trasparenza al 100%" : "100% Pricing Transparency"}
            </h3>
            <p className="text-xs text-[#111113]/75 leading-relaxed font-sans">
              {isIt
                ? "Nessuna sorpresa, nessun costo nascosto. Sai esattamente cosa ottieni e quali sono le condizioni fin dal giorno zero."
                : "No hidden costs or fine print. Clear scope and transparent conditions from day zero."}
            </p>
          </div>

          <div className="bg-white border border-[#111113]/15 p-6 space-y-2">
            <div className="w-8 h-8 bg-[#111113] text-amber-400 font-mono font-bold flex items-center justify-center text-xs">
              03
            </div>
            <h3 className="font-display font-bold text-base text-[#111113]">
              {isIt ? "Consegna in 14 Giorni" : "Ready in 14 Days"}
            </h3>
            <p className="text-xs text-[#111113]/75 leading-relaxed font-sans">
              {isIt
                ? "Tempi certi e rapidi. Il tuo sito sarà online e operativo nei motori di ricerca in sole due settimane."
                : "Certain and rapid timelines. Your site goes online and ready for sales in just two weeks."}
            </p>
          </div>
        </div>

        {/* BOTTOM CALL TO ACTION */}
        <section className="bg-[#111113] text-white p-8 sm:p-12 border border-black text-center space-y-6 shadow-md relative overflow-hidden">
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 bg-white/10 px-3 py-1 font-bold">
              {isIt ? "PARLIAMO DEL TUO PROGETTO" : "DISCUSS YOUR PROJECT"}
            </span>

            <h2 className="font-tan text-2xl sm:text-4xl font-bold text-white tracking-tight">
              {isIt ? "Non sai quale formula scegliere?" : "Unsure Which Option Fits You Best?"}
            </h2>

            <p className="text-xs sm:text-sm text-white/80 font-sans leading-relaxed">
              {isIt 
                ? "Scrivimi per valutare insieme le tue esigenze: ti consiglierò la formula più conveniente ed efficace per il tuo business." 
                : "Get in touch to review your goals together: I will recommend the most cost-effective path for your goals."}
            </p>

            <div className="pt-2 flex justify-center">
              <button
                onClick={() => handleContactClick()}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-black font-bold text-xs uppercase font-mono tracking-wider transition-all shadow-lg active:scale-98 cursor-pointer"
              >
                <span>{isIt ? "Richiedi una Consulenza Gratuita" : "Request Free Consultation"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
