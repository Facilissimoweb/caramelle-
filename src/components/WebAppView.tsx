import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Maximize2, X, ArrowRight } from "lucide-react";
import { translations } from "../translations";
import TattooMacerataApp from "./TattooMacerataApp";
import GustoPassioneApp from "./GustoPassioneApp";
import NidoSogniApp from "./NidoSogniApp";

const logoImage = "/f (1600 x 500 px).webp";

interface WebAppViewProps {
  setCurrentTab: (tab: string) => void;
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function WebAppView({ setCurrentTab, lang, isFacilitated }: WebAppViewProps) {
  const t = translations[lang][isFacilitated ? "facilitated" : "normal"];
  const [activeFullScreenApp, setActiveFullScreenApp] = useState<"gusto" | "tattoo" | "nido" | null>(null);

  const handleOpenFullScreen = (app: "gusto" | "tattoo" | "nido") => {
    setActiveFullScreenApp(app);
    document.body.style.overflow = "hidden";
  };

  const handleCloseFullScreen = () => {
    setActiveFullScreenApp(null);
    document.body.style.overflow = "unset";
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleCloseFullScreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111113] relative selection:bg-[#E35930]/20">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E35930]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Container */}
      <section className="py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          {/* Header Title Section */}
          <div className="flex flex-col sm:flex-row justify-between items-end gap-6 mb-16 border-b border-[#111113]/10 pb-10">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <img
                  src={logoImage}
                  alt="Facilissimo Web Logo"
                  className="w-[150px] h-[150px] object-contain"
                />
              </div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-[#E35930] font-bold uppercase block">
                {lang === "it" ? "[ DEMO LIVE INTERATTIVE ]" : "[ LIVE INTERACTIVE DEMOS ]"}
              </span>
              <h1 className="font-display text-3xl xs:text-4xl sm:text-5xl font-bold tracking-tight text-[#111113] break-words">
                {lang === "it" ? "Web App & Applicativi" : "Web Apps & Applications"}
              </h1>
              <p className="text-[#111113]/70 text-xs sm:text-sm leading-relaxed max-w-xl">
                {lang === "it"
                  ? "Sperimenta in tempo reale la fluidità e il design su misura delle applicazioni mobile-first di Facilissimo Web. Clicca, ordina o calcola un preventivo direttamente nei simulatori."
                  : "Experience in real time the fluidity and bespoke design of mobile-first applications by Facilissimo Web. Click, order, or estimate pricing directly inside the simulators."}
              </p>
            </div>
            
            <button
              onClick={() => setCurrentTab("proposte")}
              className="text-[#E35930] hover:text-[#111113] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-all group cursor-pointer border border-[#E35930]/30 hover:border-[#E35930] px-5 py-3 rounded-none bg-transparent"
              id="webappview-view-services-btn"
            >
              {t.portfolioViewAll}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* DUAL INTERACTIVE APPS GRID */}
          <div className="space-y-24">
            
            {/* APP 1: GUSTO & PASSIONE (FIRST VISIBLE APP) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-600">
                    {lang === "it" ? "DEMO LIVE — FACILISSIMO WEB" : "LIVE DEMO — FACILISSIMO WEB"}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111113] leading-[1.1]">
                  Gusto &amp; Passione — <span className="italic font-normal text-amber-600">{lang === "it" ? "Ristorazione & Delivery" : "Food Delivery App"}</span>
                </h3>
                
                <p className="text-[#111113]/70 font-sans text-xs sm:text-sm leading-relaxed">
                  {lang === "it"
                    ? "Una piattaforma premium sviluppata in ottica mobile-first per ristoranti, pizzerie e locali enogastronomici. Unisce la bellezza estetica delle immagini culinarie alla potenza dell'interactivity: menu con categorie intuitive, ricerca rapida dei piatti, carrello dinamico con fidelizzazione punti lealtà e checkout simulato con carta di credito."
                    : "A premium restaurant platform designed from the ground up for mobile devices. It merges stunning culinary imagery with deep interactive mechanics: tabbed categories, real-time product search, dynamic shopping cart, a point-based customer loyalty card, and a mock credit card transaction gateway."}
                </p>

                <div className="space-y-4 font-sans text-xs text-[#111113]/70 leading-relaxed">
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#111113]">{lang === "it" ? "Menu & Carrello Completi" : "Full Interactive Ordering"}</h4>
                      <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                        {lang === "it" 
                           ? "Filtra per pizze, primi o bibite marchigiane, aggiungi elementi speciali nel carrello e completa l'acquisto simulato." 
                           : "Filter dishes, customize order notes, manage the live cart items, and complete the simulated checkout process."}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#111113]">{lang === "it" ? "Fidelity Card Marchigiana" : "Local Loyalty Card"}</h4>
                      <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                        {lang === "it" 
                           ? "I clienti accumulano punti reali da convertire in regali gastronomici (es. Cantucci o Birra) visibili nella seconda scheda dell'app." 
                           : "Simulates actual reward collection based on order size, redeemable for local delicacies inside the loyalty reward tab."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col items-center gap-4 w-full">
                <div className="w-full max-w-[390px] bg-[#FAF9F6] rounded-[40px] p-3.5 border-4 border-zinc-200/80 shadow-xl relative overflow-hidden">
                  {/* Speaker slot & camera bar */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-zinc-100 rounded-full z-50 flex items-center justify-center gap-1.5 border border-zinc-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                    <span className="w-10 h-1 bg-zinc-200 rounded-full"></span>
                  </div>
                  
                  {/* App Frame Inner Content */}
                  <div className="rounded-[28px] overflow-hidden bg-white border border-zinc-200 h-[640px] relative scrollbar-none">
                    <GustoPassioneApp lang={lang} />
                  </div>
                </div>

                {/* APRI A PAGINA INTERA Button */}
                <button
                  onClick={() => handleOpenFullScreen("gusto")}
                  className="w-full max-w-[390px] py-3.5 px-6 border border-[#E35930] hover:bg-[#E35930] text-[#E35930] hover:text-[#FAF9F6] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#E35930]/10"
                >
                  <Maximize2 className="w-4 h-4 animate-pulse" />
                  {lang === "it" ? "APRI A PAGINA INTERA" : "OPEN FULL PAGE"}
                </button>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#111113]/10 to-transparent"></div>

            {/* APP 2: TATTOO MACERATA (SECOND VISIBLE APP) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full">
                  <Sparkles className="w-3 h-3 text-purple-600" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-purple-600">
                    {lang === "it" ? "DEMO LIVE — FACILISSIMO WEB" : "LIVE DEMO — FACILISSIMO WEB"}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111113] leading-[1.1]">
                  Tattoo Macerata — <span className="italic font-normal text-purple-600">{lang === "it" ? "Studio Tattoo & Booking" : "Tattoo Studio App"}</span>
                </h3>
                
                <p className="text-[#111113]/70 font-sans text-xs sm:text-sm leading-relaxed">
                  {lang === "it"
                    ? "Un'applicazione mobile-first ad altissimo impatto scenico gotico, progettata per studi di tatuaggi d'elite, barbieri o attività artistiche delle Marche. Combina l'estetica delle texture di inchiostro scuro a calcolatori dinamici di preventivo basati su dimensioni e complessità del tatuaggio, prenotazione della prima consulenza gratuita e recensioni reali."
                    : "A highly evocative dark/gothic-themed mobile app tailored for elite tattoo artists, studios, and niche artistic services. Integrates comprehensive studio details, an interactive price slider reflecting design dimensions and color complexities, and a live testimonial feed."}
                </p>

                <div className="space-y-4 font-sans text-xs text-[#111113]/70 leading-relaxed">
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#111113]">{lang === "it" ? "Preventivatore di Costo Rapido" : "Instant Price Estimator"}</h4>
                      <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                        {lang === "it" 
                          ? "Sposta il cursore per simulare la dimensione del tatuaggio, seleziona i colori e la complessità per calcolare istantaneamente la stima del prezzo." 
                          : "Move the slider to configure size, choose colors and complexity to get an immediate cost estimation range."}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#111113]">{lang === "it" ? "Integrazione Automatica del Preventivo" : "One-Click Quote Transfer"}</h4>
                      <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                        {lang === "it" 
                          ? "Invia i parametri del preventivo direttamente nel modulo di prenotazione con un semplice click, facilitando la prenotazione della consulenza." 
                          : "Transfer the calculated cost estimation directly into the booking parameters with one click to streamline consultation scheduling."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col items-center gap-4 w-full">
                <div className="w-full max-w-[390px] bg-[#FAF9F6] rounded-[40px] p-3.5 border-4 border-zinc-200/80 shadow-xl relative overflow-hidden">
                  {/* Speaker slot & camera bar */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-zinc-100 rounded-full z-50 flex items-center justify-center gap-1.5 border border-zinc-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                    <span className="w-10 h-1 bg-zinc-200 rounded-full"></span>
                  </div>
                  
                  {/* App Frame Inner Content */}
                  <div className="rounded-[28px] overflow-hidden bg-black border border-zinc-200 h-[640px] relative scrollbar-none">
                    <TattooMacerataApp lang={lang} />
                  </div>
                </div>

                {/* APRI A PAGINA INTERA Button */}
                <button
                  onClick={() => handleOpenFullScreen("tattoo")}
                  className="w-full max-w-[390px] py-3.5 px-6 border border-[#E35930] hover:bg-[#E35930] text-[#E35930] hover:text-[#FAF9F6] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#E35930]/10"
                >
                  <Maximize2 className="w-4 h-4 animate-pulse" />
                  {lang === "it" ? "APRI A PAGINA INTERA" : "OPEN FULL PAGE"}
                </button>
              </div>
            </div>

            {/* DIVIDER */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#111113]/10 to-transparent"></div>

            {/* APP 3: IL NIDO DEI SOGNI (THIRD VISIBLE APP) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-pink-500/10 border border-pink-500/30 rounded-full">
                  <Sparkles className="w-3 h-3 text-pink-500" />
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-pink-600">
                    {lang === "it" ? "DEMO LIVE — FACILISSIMO WEB" : "LIVE DEMO — FACILISSIMO WEB"}
                  </span>
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111113] leading-[1.1]">
                  Il Nido dei Sogni — <span className="italic font-normal text-pink-500">{lang === "it" ? "Asilo Nido & Servizi Infanzia" : "Nursery & Childcare App"}</span>
                </h3>
                
                <p className="text-[#111113]/70 font-sans text-xs sm:text-sm leading-relaxed">
                  {lang === "it"
                    ? "Un'applicazione mobile-first luminosa e rassicurante, su misura per asili nido, scuole dell'infanzia, ludoteche o educatrici professionali di Macerata e delle Marche. Integra la bellezza delle foto delle aule biologiche a strumenti pedagogici e interattivi per le famiglie: un generatore di avatar mascotte per l'armadietto dei bambini, il diario di bordo giornaliero digitale (pasti, sonno, umore) e prenotazione visite guidate."
                    : "A bright and welcoming mobile-first web app designed for nurseries, kindergartens, playrooms, and child education professionals in Macerata. Merges high-quality classroom imagery with engaging features: a customized mascot avatar generator for kids, a daily digital board reporting meal and sleep statuses, and a streamlined tour booking form."}
                </p>

                <div className="space-y-4 font-sans text-xs text-[#111113]/70 leading-relaxed">
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#111113]">{lang === "it" ? "Generatore di Mascotte Interattivo" : "Interactive Mascot Builder"}</h4>
                      <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                        {lang === "it" 
                          ? "I genitori possono digitare il nome del bambino, scegliere l'animaletto della sezione, il colore preferito e un simpatico accessorio creando l'avatar per l'armadietto." 
                          : "Parents can personalize school cabinet labels by writing the child's name, picking a cartoon mascot, customizing the brand color, and overlaying sweet decorations."}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                    <div>
                      <h4 className="font-display font-bold text-xs text-[#111113]">{lang === "it" ? "Diario di Bordo Digitale" : "Live Children Log Sheet"}</h4>
                      <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                        {lang === "it" 
                          ? "Simula la bacheca in tempo reale che mostra l'andamento della giornata: orari del pranzo bio, ore di riposino e livello di felicità per tenere i genitori sereni." 
                          : "Simulates daily activity logs tracking bio-organic meals, nap cycles, and sensory play milestones to provide full family visibility."}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col items-center gap-4 w-full">
                <div className="w-full max-w-[390px] bg-[#FAF9F6] rounded-[40px] p-3.5 border-4 border-zinc-200/80 shadow-xl relative overflow-hidden">
                  {/* Speaker slot & camera bar */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-zinc-100 rounded-full z-50 flex items-center justify-center gap-1.5 border border-zinc-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                    <span className="w-10 h-1 bg-zinc-200 rounded-full"></span>
                  </div>
                  
                  {/* App Frame Inner Content */}
                  <div className="rounded-[28px] overflow-hidden bg-[#FFF5F5] border border-zinc-200 h-[640px] relative scrollbar-none">
                    <NidoSogniApp lang={lang} />
                  </div>
                </div>

                {/* APRI A PAGINA INTERA Button */}
                <button
                  onClick={() => handleOpenFullScreen("nido")}
                  className="w-full max-w-[390px] py-3.5 px-6 border border-[#E35930] hover:bg-[#E35930] text-[#E35930] hover:text-[#FAF9F6] font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#E35930]/10"
                >
                  <Maximize2 className="w-4 h-4 animate-pulse" />
                  {lang === "it" ? "APRI A PAGINA INTERA" : "OPEN FULL PAGE"}
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FULL-SCREEN OVERLAY PORTAL FOR DEMO APPS */}
      <AnimatePresence>
        {activeFullScreenApp && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#F8F7F4] z-[99999] flex flex-col overflow-hidden font-sans text-[#111113]"
          >
            {/* Top control and branding bar */}
            <div className="bg-[#FAF9F6] border-b border-[#111113]/10 px-4 sm:px-6 py-3.5 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E35930] animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]">
                  {activeFullScreenApp === "gusto" 
                    ? (lang === "it" ? "Gusto & Passione — Demo Web App" : "Gusto & Passione — Food Delivery Web App")
                    : activeFullScreenApp === "tattoo"
                    ? (lang === "it" ? "Tattoo Macerata — Demo Web App" : "Tattoo Macerata — Tattoo Booking Web App")
                    : (lang === "it" ? "Il Nido dei Sogni — Demo Web App" : "Dreamy Nursery — Childcare Web App")
                  }
                </span>
                <span className="hidden sm:inline px-2.5 py-0.5 bg-[#111113]/5 border border-[#111113]/10 font-mono text-[9px] text-[#111113]/50 rounded font-bold uppercase tracking-widest">
                  {lang === "it" ? "Pagina Intera" : "Full View Mode"}
                </span>
              </div>
              
              <button
                onClick={handleCloseFullScreen}
                className="px-4 py-2 bg-[#E35930] text-[#FAF9F6] border border-[#E35930] font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-250 flex items-center gap-2 cursor-pointer"
                title={lang === "it" ? "Chiudi e torna al sito" : "Close and return to site"}
              >
                <X className="w-4 h-4" />
                <span>{lang === "it" ? "TORNA INDIETRO" : "CLOSE FULL SCREEN"}</span>
              </button>
            </div>

            {/* Simulated browser window wrapper / main workspace */}
            <div className="flex-grow w-full bg-[#FAF9F6] flex justify-center items-center overflow-hidden p-0 sm:p-4">
              <div className="w-full h-full max-w-5xl bg-[#FAF9F6] shadow-2xl sm:border border-[#111113]/10 flex flex-col overflow-hidden relative">
                {activeFullScreenApp === "gusto" ? (
                  <div className="w-full h-full bg-zinc-50 overflow-hidden relative text-zinc-950">
                    <GustoPassioneApp lang={lang} />
                  </div>
                ) : activeFullScreenApp === "tattoo" ? (
                  <div className="w-full h-full bg-[#09070f] overflow-hidden relative text-gray-100">
                    <TattooMacerataApp lang={lang} />
                  </div>
                ) : (
                  <div className="w-full h-full bg-[#FFF5F5] overflow-hidden relative text-slate-700">
                    <NidoSogniApp lang={lang} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
