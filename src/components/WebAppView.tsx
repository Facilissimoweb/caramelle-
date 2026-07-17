import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Maximize2, X, ArrowRight, Smartphone, Monitor } from "lucide-react";
import { translations } from "../translations";

const logoImage = "/f (1600 x 500 px).webp";

interface MockupProps {
  aspect: "vertical" | "horizontal";
  lang: "it" | "en";
}

function FloristMockup({ aspect, lang }: MockupProps) {
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [showToast, setShowToast] = useState<string | null>(null);

  const flowers = [
    { id: "peonie", name: lang === "it" ? "Bouquet Dusty Peonies" : "Dusty Peonies Bouquet", price: "€45", color: "bg-[#e4d5d3]", desc: lang === "it" ? "Fiori freschi di stagione dai toni cipria" : "Fresh seasonal blooms in powdery pinks" },
    { id: "green", name: lang === "it" ? "Minimal Botanical Green" : "Minimal Botanical Green", price: "€35", color: "bg-[#d3e0d8]", desc: lang === "it" ? "Eucalipto, rami e felci biologiche" : "Organic eucalyptus, branches & ferns" },
    { id: "lime", name: lang === "it" ? "Lime & White Accent" : "Lime & White Accent", price: "€60", color: "bg-[#e6ebd9]", desc: lang === "it" ? "Rose bianche e boccioli verde acido" : "White roses with acid-green highlights" },
  ];

  const handleSelect = (name: string) => {
    setSelectedFlowers((prev) => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
    setShowToast(lang === "it" ? `${name} selezionato!` : `${name} selected!`);
    setTimeout(() => setShowToast(null), 1500);
  };

  return (
    <div className="absolute inset-0 bg-[#FAF2F0] text-[#1b3d2f] font-sans flex flex-col justify-between p-4 sm:p-6 select-none overflow-y-auto">
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-[#1b3d2f]/10 pb-3">
          <span className="font-serif italic text-base sm:text-lg font-bold tracking-tight">Fleur & Co.</span>
          <span className="text-[8px] font-mono uppercase tracking-widest bg-[#1b3d2f] text-white px-2 py-0.5 rounded-none font-bold">Studio</span>
        </div>

        <div className="space-y-1.5 py-1 sm:py-2">
          <h1 className="font-serif text-2xl sm:text-3xl leading-none font-extrabold text-[#1b3d2f]">
            Stile <span className="italic text-[#a3e635] bg-[#1b3d2f] px-1.5 py-0.5 rounded-sm">Botanico</span>
          </h1>
          <p className="text-[10px] sm:text-xs text-[#1b3d2f]/70 max-w-xs leading-relaxed">
            {lang === "it" 
              ? "Design floreali artigianali e installazioni d'arte su misura firmati Maria Teresa Rogani."
              : "Bespoke handcrafted floral designs and art installations by Maria Teresa Rogani."}
          </p>
        </div>

        <div className={`grid gap-3 ${aspect === "horizontal" ? "grid-cols-3" : "grid-cols-1"}`}>
          {flowers.map((f) => {
            const isSelected = selectedFlowers.includes(f.name);
            return (
              <div 
                key={f.id} 
                onClick={() => handleSelect(f.name)}
                className={`bg-white p-3 border rounded-none transition-all cursor-pointer ${
                  isSelected ? "border-[#a3e635] shadow-md ring-1 ring-[#a3e635]" : "border-[#1b3d2f]/10 hover:border-[#1b3d2f]/30"
                }`}
              >
                <div className={`aspect-[16/10] ${f.color} flex items-center justify-center font-serif text-[#1b3d2f]/40 italic text-xs mb-2 transition-all`}>
                  {isSelected ? "✨ (selezionato)" : "Fleur & Co."}
                </div>
                <div className="flex justify-between items-start gap-1">
                  <div>
                    <h3 className="font-serif font-bold text-xs leading-tight">{f.name}</h3>
                    <p className="text-[9px] text-[#1b3d2f]/60 mt-0.5">{f.desc}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#1b3d2f]/80 shrink-0">{f.price}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showToast && (
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-[#1b3d2f] text-[#FAF2F0] px-3 py-1.5 text-[9px] font-mono tracking-wider uppercase rounded-none shadow-lg z-50">
          {showToast}
        </div>
      )}

      <div className="border-t border-[#1b3d2f]/10 pt-3 flex justify-between items-center text-[8px] font-mono text-[#1b3d2f]/50 gap-2 mt-4 shrink-0">
        <span>©2026 Fleur Studio</span>
        <span>Facilissimo Web Design</span>
      </div>
    </div>
  );
}

function MealPlannerMockup({ aspect, lang }: MockupProps) {
  const [selectedDay, setSelectedDay] = useState<number>(0);
  const [showMacros, setShowMacros] = useState(false);

  const days = [
    { name: "LUN", meal: lang === "it" ? "Insalata di Quinoa & Pollo" : "Quinoa Salad & Grilled Chicken", cal: "520 kcal", p: "45g", c: "55g", f: "14g" },
    { name: "MAR", meal: lang === "it" ? "Salmone al Forno con Broccoli" : "Baked Salmon & Garlic Broccoli", cal: "610 kcal", p: "48g", c: "12g", f: "34g" },
    { name: "MER", meal: lang === "it" ? "Avocado Toast con Uova" : "Avocado Toast with Poached Eggs", cal: "450 kcal", p: "22g", c: "38g", f: "21g" },
    { name: "GIO", meal: lang === "it" ? "Poke Bowl con Tofu Grigliato" : "Tofu Poke Bowl with Sesame Rice", cal: "490 kcal", p: "18g", c: "75g", f: "11g" },
    { name: "VEN", meal: lang === "it" ? "Yogurt Greco con Frutti di Bosco" : "Greek Yogurt with Berries & Honey", cal: "310 kcal", p: "25g", c: "28g", f: "4g" },
  ];

  return (
    <div className="absolute inset-0 bg-[#121214] text-gray-200 font-sans flex flex-col justify-between p-4 sm:p-6 select-none overflow-y-auto">
      <div className="space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#e3ff54] animate-pulse"></div>
            <span className="font-mono text-xs uppercase tracking-widest font-extrabold text-white">Daily Planner</span>
          </div>
          <button 
            onClick={() => setShowMacros(!showMacros)}
            className="text-[8px] font-mono uppercase bg-[#f37e84]/20 hover:bg-[#f37e84]/30 text-[#f37e84] border border-[#f37e84]/30 px-2 py-0.5 font-bold transition-all cursor-pointer"
          >
            {showMacros ? "Nascondi Macro" : "Mostra Macro"}
          </button>
        </div>

        <div className="bg-white/[0.03] border border-white/5 p-3.5 rounded-none flex justify-between items-center">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-[#e3ff54]">1,850 Kcal</h2>
            <p className="text-[9px] text-gray-400 uppercase tracking-wider">{lang === "it" ? "Budget Energetico" : "Daily Calorie Budget"}</p>
          </div>
          <div className="text-right text-[10px] font-mono text-[#f37e84] space-y-0.5">
            <div>PROTEINE: 125g</div>
            <div>CARBOIDRATI: 180g</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-[9px] font-mono uppercase tracking-wider text-gray-400">
            {lang === "it" ? "Piano Nutrizionale Giornaliero (Clicca per selezionare)" : "Daily Nutritional Plan (Click to select)"}
          </h3>
          <div className={`grid gap-2 ${aspect === "horizontal" ? "grid-cols-2" : "grid-cols-1"}`}>
            {days.map((d, idx) => {
              const isSelected = selectedDay === idx;
              return (
                <div 
                  key={idx} 
                  onClick={() => setSelectedDay(idx)}
                  className={`border p-3 transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-white/[0.05] border-[#e3ff54]" 
                      : "bg-white/[0.01] border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? "bg-[#e3ff54] text-black" : "bg-white/10 text-gray-300"
                      }`}>{d.name}</span>
                      <div>
                        <h4 className="text-xs font-bold text-white line-clamp-1">{d.meal}</h4>
                        <span className="text-[8px] text-gray-400 uppercase tracking-widest">{d.cal}</span>
                      </div>
                    </div>
                    {isSelected && <span className="w-1.5 h-1.5 bg-[#e3ff54] rounded-full"></span>}
                  </div>

                  {(isSelected || showMacros) && (
                    <div className="mt-2 pt-2 border-t border-white/5 flex gap-4 text-[9px] font-mono text-[#f37e84]/90">
                      <span>P: {d.p}</span>
                      <span>C: {d.c}</span>
                      <span>F: {d.f}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 pt-3 text-center text-[8px] font-mono text-gray-500 uppercase tracking-widest mt-4 shrink-0">
        Facilissimo Web App • Design di M. Teresa Rogani
      </div>
    </div>
  );
}

function MenuMockup({ aspect, lang }: MockupProps) {
  const [selectedCategory, setSelectedCategory] = useState<"tutti" | "piatti" | "dolci">("tutti");
  const [cartCount, setCartCount] = useState(0);

  const items = [
    { name: "Risotto Magenta", cat: "piatti", desc: lang === "it" ? "Arborio cotto a puntino con barbabietola, fonduta di caprino ed erbe aromatiche." : "Creamy arborio rice with beetroot reduction, goat cheese fondue & aromatic herbs.", price: "€18" },
    { name: "Tataki di Tonno", cat: "piatti", desc: lang === "it" ? "Tonno in crosta di sesamo nero, crema di avocado e riduzione di agrumi freschi." : "Black sesame crusted tuna steak, avocado emulsion & citrus reduction.", price: "€24" },
    { name: "Tartelletta al Pistacchio", cat: "dolci", desc: lang === "it" ? "Frolla friabile con ganache al pistacchio di Bronte e lamponi selvatici." : "Crispy shortcrust pastry with Bronte pistachio ganache & wild berries.", price: "€9" },
    { name: "Mousse ai Tre Cioccolati", cat: "dolci", desc: lang === "it" ? "Bavarese al cioccolato fondente, al latte e bianco con granella di fave di cacao." : "Decadent dark, milk & white chocolate bavarian cream with cocoa nibs.", price: "€10" },
  ];

  const filteredItems = selectedCategory === "tutti" 
    ? items 
    : items.filter(it => it.cat === selectedCategory);

  return (
    <div className="absolute inset-0 bg-[#2d0a0d] text-[#f5ebd6] font-sans flex flex-col justify-between p-4 sm:p-6 select-none overflow-y-auto">
      <div className="space-y-4">
        <div className="text-center space-y-1.5 py-2 border-b border-[#f5ebd6]/10">
          <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-[#f5ebd6]/60">
            <span>Ristorante Gourmet</span>
            <button 
              onClick={() => setCartCount(c => c + 1)}
              className="bg-[#ff5126]/20 hover:bg-[#ff5126]/40 text-[#ff5126] border border-[#ff5126]/30 px-2 py-0.5 rounded-full text-[8px] tracking-normal font-mono cursor-pointer transition-all"
            >
              🛒 {lang === "it" ? "Selezionati" : "Selected"}: {cartCount}
            </button>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl tracking-widest uppercase font-extrabold text-[#ff5126]">L'Opera</h1>
          <p className="text-[8px] font-mono tracking-[0.25em] uppercase text-[#f5ebd6]/40">{lang === "it" ? "La Cucina di Maria Teresa Rogani" : "The Kitchen of Maria Teresa Rogani"}</p>
        </div>

        <div className="flex justify-center gap-1.5">
          {["tutti", "piatti", "dolci"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat as any)}
              className={`px-3 py-1 text-[8px] font-mono uppercase tracking-wider transition-all cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-[#ff5126] border-[#ff5126] text-[#2d0a0d] font-bold"
                  : "bg-transparent border-[#f5ebd6]/10 text-[#f5ebd6]/70 hover:text-[#f5ebd6]"
              }`}
            >
              {cat === "tutti" ? (lang === "it" ? "Tutti" : "All") : cat.toUpperCase()}
            </button>
          ))}
        </div>

        <div className={`grid gap-3 ${aspect === "horizontal" ? "grid-cols-2" : "grid-cols-1"}`}>
          {filteredItems.map((it, idx) => (
            <div 
              key={idx} 
              onClick={() => setCartCount(c => c + 1)}
              className="border border-[#f5ebd6]/10 bg-[#381114] p-3 space-y-1.5 hover:border-[#ff5126]/30 transition-all cursor-pointer relative group"
            >
              <div className="flex justify-between items-baseline gap-2">
                <h3 className="font-serif font-bold text-xs text-[#f5ebd6] group-hover:text-[#ff5126] transition-colors">{it.name}</h3>
                <span className="text-xs font-mono font-bold text-[#ff5126]">{it.price}</span>
              </div>
              <p className="text-[9px] text-[#f5ebd6]/75 leading-relaxed line-clamp-2">{it.desc}</p>
              <div className="text-[7px] font-mono uppercase text-[#ff5126]/40 group-hover:text-[#ff5126]/80 text-right transition-colors">
                {lang === "it" ? "Clicca per prenotare piatto" : "Click to book dish"}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[#f5ebd6]/10 pt-3 text-center text-[8px] font-mono text-[#f5ebd6]/30 uppercase tracking-[0.2em] mt-4 shrink-0">
        Facilissimo Menu • Chef & Tech by Maria Teresa Rogani
      </div>
    </div>
  );
}

interface WebAppViewProps {
  setCurrentTab: (tab: string) => void;
  lang: "it" | "en";
  isFacilitated: boolean;
}

export default function WebAppView({ setCurrentTab, lang, isFacilitated }: WebAppViewProps) {
  const t = translations[lang][isFacilitated ? "facilitated" : "normal"];

  const floristEmbedUrl = "https://www.canva.com/design/DAHPcbuC8m4/SHDh85WpbFgG_aPjdWMFPw/view?embed";
  const plannerEmbedUrl = "https://www.canva.com/design/DAHPcvbf6Xw/71T8NgKSR3RbbSnRYQdnKw/view?embed";
  const menuEmbedUrl = "https://www.canva.com/design/DAHPcvucZxA/r_nqimNICuTjos8vXg6DEg/view?embed";
  
  // Independent simulator states for each project
  const [aspectRatioFlorist, setAspectRatioFlorist] = useState<"vertical" | "horizontal">("vertical");
  const [isFullscreenFlorist, setIsFullscreenFlorist] = useState(false);

  const [aspectRatioPlanner, setAspectRatioPlanner] = useState<"vertical" | "horizontal">("vertical");
  const [isFullscreenPlanner, setIsFullscreenPlanner] = useState(false);

  const [aspectRatioMenu, setAspectRatioMenu] = useState<"vertical" | "horizontal">("vertical");
  const [isFullscreenMenu, setIsFullscreenMenu] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreenFlorist(false);
        setIsFullscreenPlanner(false);
        setIsFullscreenMenu(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#111113] relative selection:bg-[#a3e635]/20">
      {/* Decorative background ambient light */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#a3e635]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Section */}
      <section className="py-12 sm:py-20 bg-[#F8F7F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 border-b border-[#111113]/10 pb-8">
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <img
                  src={logoImage}
                  alt="Facilissimo Web Logo"
                  className="w-[120px] sm:w-[150px] h-auto object-contain"
                />
              </div>
              <span className="inline-block bg-black py-[12px] px-6 text-[13px] font-mono tracking-[0em] text-[#a3e635] font-bold uppercase" style={{ letterSpacing: '0px' }}>
                {lang === "it" ? "[ PROGETTI ATTIVI & INTERATTIVI ]" : "[ ACTIVE & INTERACTIVE PROJECTS ]"}
              </span>
              <h1 className="font-tan text-3xl sm:text-5xl font-bold tracking-tight text-[#111113]">
                {lang === "it" ? "Web App & Progetti" : "Web Apps & Projects"}
              </h1>
              <p className="text-[#111113]/70 text-xs sm:text-sm leading-relaxed max-w-xl">
                {lang === "it"
                  ? "Esplora i miei progetti web App e le creazioni interattive realizzate da Facilissimo Web di M. Teresa Rogani. Puoi testarne l'esperienza d'uso simulando diversi dispositivi direttamente qui sotto."
                  : "Explore my web App projects and interactive creations crafted by M. Teresa Rogani's Facilissimo Web. You can test the experience across different devices directly below."}
              </p>
            </div>
            
            <button
              onClick={() => setCurrentTab("proposte")}
              className="text-[#a3e635] hover:text-[#111113] font-mono text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-all group cursor-pointer border border-[#a3e635]/30 hover:border-[#a3e635] px-5 py-3 rounded-none bg-transparent self-stretch md:self-auto justify-center text-center"
              id="webappview-view-services-btn"
            >
              {t.portfolioViewAll}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* PROJECT 1: FLORIST LANDING PAGE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
            
            {/* Descriptive Side Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#a3e635]/10 border border-[#a3e635]/30 rounded-full">
                <Sparkles className="w-3 h-3 text-[#a3e635]" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#a3e635]">
                  {lang === "it" ? "PROGETTO SELEZIONATO — 1" : "FEATURED PROJECT — 1"}
                </span>
              </div>
              
              <h3 className="font-tan text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111113] leading-[1.1]">
                Interactive Florist Landing Page — <span className="italic font-normal text-[#a3e635]">Dusty Pink, Dark Green, Lime Green</span>
              </h3>
              
              <p className="text-[#111113]/70 font-sans text-xs sm:text-sm leading-relaxed">
                {lang === "it"
                  ? "Interactive Florist Landing Page in Dusty Pink Dark Green Lime Green Soft & Clean Style di Maria Teresa Rogani. Un design pulito, delicato ed estremamente moderno creato per valorizzare ogni dettaglio floreale."
                  : "Interactive Florist Landing Page in Dusty Pink Dark Green Lime Green Soft & Clean Style by Maria Teresa Rogani. A clean, delicate, and extremely modern design crafted to elevate every floral detail."}
              </p>

              <div className="space-y-4 font-sans text-xs text-[#111113]/70 leading-relaxed border-t border-[#111113]/10 pt-6">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#111113]">
                  {lang === "it" ? "Dettagli dell'Estetica:" : "Aesthetic Details:"}
                </h4>
                
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 flex items-center justify-center text-[#a3e635] text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111113]">{lang === "it" ? "Fiori & Eleganza" : "Floral Grace & Balance"}</h5>
                    <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                      {lang === "it" 
                         ? "Colori pastello finemente bilanciati con toni scuri naturali per catturare l'essenza dell'artigianalità." 
                         : "Pastel tones finely contrasted with deep organic greens to capture true craftsmanship."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 flex items-center justify-center text-[#a3e635] text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111113]">{lang === "it" ? "Simulatore Interattivo" : "Interactive Mockup"}</h5>
                    <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                      {lang === "it" 
                         ? "Utilizza i controlli per alternare tra la visualizzazione smartphone (Verticale) e orizzontale." 
                         : "Use the control bar to toggle between Vertical (mobile) and Horizontal layouts."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Simulator Column */}
            <div className="lg:col-span-7 flex flex-col items-center gap-4 w-full">
              
              {/* Aspect Ratio Selector bar */}
              <div className="flex items-center justify-between w-full max-w-[390px] bg-[#FAF9F6] border border-[#111113]/10 p-2 rounded-none">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#111113]/50 px-2">
                  {lang === "it" ? "Formato:" : "Format:"}
                </span>
                <div className="inline-flex bg-[#111113]/5 p-0.5">
                  <button
                    onClick={() => setAspectRatioFlorist("vertical")}
                    className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      aspectRatioFlorist === "vertical"
                        ? "bg-[#a3e635] text-white shadow-sm"
                        : "text-[#111113]/60 hover:text-[#111113]"
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    {lang === "it" ? "Cell" : "Mobile"}
                  </button>
                  <button
                    onClick={() => setAspectRatioFlorist("horizontal")}
                    className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      aspectRatioFlorist === "horizontal"
                        ? "bg-[#a3e635] text-white shadow-sm"
                        : "text-[#111113]/60 hover:text-[#111113]"
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    {lang === "it" ? "Orizzontale" : "Desktop"}
                  </button>
                </div>
              </div>

              {/* Simulator Device Frame */}
              <div className={`w-full transition-all duration-300 ${
                aspectRatioFlorist === "vertical" 
                  ? "max-w-[390px] border-4 border-zinc-200 bg-[#FAF9F6] rounded-[40px] p-3 shadow-xl relative" 
                  : "max-w-full border border-[#111113]/10 p-2 bg-[#FAF9F6] shadow-md"
              }`}>
                {aspectRatioFlorist === "vertical" && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-100 rounded-full z-50 flex items-center justify-center gap-1.5 border border-zinc-200">
                    <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                    <span className="w-8 h-1 bg-zinc-200 rounded-full"></span>
                  </div>
                )}

                {/* Simulated Screen */}
                <div 
                  className={`relative w-full overflow-hidden bg-white ${
                    aspectRatioFlorist === "vertical" ? "rounded-[28px] border border-zinc-200" : "border border-[#111113]/5"
                  }`}
                  style={{
                    paddingTop: aspectRatioFlorist === "vertical" ? "177.78%" : "56.25%",
                    willChange: "transform"
                  }}
                >
                  <iframe 
                    loading="lazy" 
                    style={{ 
                      position: "absolute", 
                      width: "100%", 
                      height: "100%", 
                      top: 0, 
                      left: 0, 
                      border: "none", 
                      padding: 0, 
                      margin: 0 
                    }}
                    src={floristEmbedUrl} 
                    allowFullScreen={true}
                    allow="fullscreen"
                    title="Interactive Florist Landing Page"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 w-full max-w-[390px]">
                <button
                  onClick={() => setIsFullscreenFlorist(true)}
                  className="flex-1 py-3.5 px-6 border border-[#a3e635] hover:bg-[#a3e635] text-[#a3e635] hover:text-[#FAF9F6] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Maximize2 className="w-4 h-4 animate-pulse" />
                  {lang === "it" ? "SCHERMO INTERO" : "FULL VIEW"}
                </button>
              </div>

            </div>

          </div>

          {/* ELEGANT LINE DIVIDER */}
          <div className="w-full h-px bg-[#111113]/10 my-20" />

          {/* PROJECT 2: MEAL PLANNER */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Descriptive Side Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-600">
                  {lang === "it" ? "PROGETTO SELEZIONATO — 2" : "FEATURED PROJECT — 2"}
                </span>
              </div>
              
              <h3 className="font-tan text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111113] leading-[1.1]">
                Interactive Meal Planner — <span className="italic font-normal text-amber-600">Neon Yellow, Grey, Pink</span>
              </h3>
              
              <p className="text-[#111113]/70 font-sans text-xs sm:text-sm leading-relaxed">
                {lang === "it"
                  ? "Interactive Meal Planner in Neon Yellow Grey Pink Soft & Clean Style di Maria Teresa Rogani. Un planner innovativo, vivace e strutturato per gestire con eleganza ed energia i tuoi pasti quotidiani."
                  : "Interactive Meal Planner in Neon Yellow Grey Pink Soft & Clean Style by Maria Teresa Rogani. An innovative, vibrant, and structured planner designed to manage your daily meals with elegance and energy."}
              </p>

              <div className="space-y-4 font-sans text-xs text-[#111113]/70 leading-relaxed border-t border-[#111113]/10 pt-6">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#111113]">
                  {lang === "it" ? "Caratteristiche del Design:" : "Design Keynotes:"}
                </h4>
                
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111113]">{lang === "it" ? "Contrasto e Pulizia Visiva" : "High Contrast & Cleanliness"}</h5>
                    <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                      {lang === "it" 
                         ? "Colori bilanciati per guidare l'attenzione dell'utente sugli elementi chiave senza distrazioni." 
                         : "Balanced tones tailored to draw client attention to focal products without visual noise."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111113]">{lang === "it" ? "Ottimizzazione Multidispositivo" : "Multi-device Optimization"}</h5>
                    <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                      {lang === "it" 
                         ? "Utilizza i controlli a lato per vedere come si comporta il layout in versione verticale o orizzontale." 
                         : "Use the toggles on the simulator to see how the layout performs in vertical or horizontal formats."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Simulator Column */}
            <div className="lg:col-span-7 flex flex-col items-center gap-4 w-full">
              
              {/* Aspect Ratio Selector bar */}
              <div className="flex items-center justify-between w-full max-w-[390px] bg-[#FAF9F6] border border-[#111113]/10 p-2 rounded-none">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#111113]/50 px-2">
                  {lang === "it" ? "Formato:" : "Format:"}
                </span>
                <div className="inline-flex bg-[#111113]/5 p-0.5">
                  <button
                    onClick={() => setAspectRatioPlanner("vertical")}
                    className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      aspectRatioPlanner === "vertical"
                        ? "bg-[#a3e635] text-white shadow-sm"
                        : "text-[#111113]/60 hover:text-[#111113]"
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    {lang === "it" ? "Cell" : "Mobile"}
                  </button>
                  <button
                    onClick={() => setAspectRatioPlanner("horizontal")}
                    className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      aspectRatioPlanner === "horizontal"
                        ? "bg-[#a3e635] text-white shadow-sm"
                        : "text-[#111113]/60 hover:text-[#111113]"
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    {lang === "it" ? "Orizzontale" : "Desktop"}
                  </button>
                </div>
              </div>

              {/* Simulator Device Frame */}
              <div className={`w-full transition-all duration-300 ${
                aspectRatioPlanner === "vertical" 
                  ? "max-w-[390px] border-4 border-zinc-200 bg-[#FAF9F6] rounded-[40px] p-3 shadow-xl relative" 
                  : "max-w-full border border-[#111113]/10 p-2 bg-[#FAF9F6] shadow-md"
              }`}>
                {aspectRatioPlanner === "vertical" && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-100 rounded-full z-50 flex items-center justify-center gap-1.5 border border-zinc-200">
                    <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                    <span className="w-8 h-1 bg-zinc-200 rounded-full"></span>
                  </div>
                )}

                {/* Simulated Screen */}
                <div 
                  className={`relative w-full overflow-hidden bg-white ${
                    aspectRatioPlanner === "vertical" ? "rounded-[28px] border border-zinc-200" : "border border-[#111113]/5"
                  }`}
                  style={{
                    paddingTop: aspectRatioPlanner === "vertical" ? "177.78%" : "56.25%",
                    willChange: "transform"
                  }}
                >
                  <iframe 
                    loading="lazy" 
                    style={{ 
                      position: "absolute", 
                      width: "100%", 
                      height: "100%", 
                      top: 0, 
                      left: 0, 
                      border: "none", 
                      padding: 0, 
                      margin: 0 
                    }}
                    src={plannerEmbedUrl} 
                    allowFullScreen={true}
                    allow="fullscreen"
                    title="Interactive Meal Planner"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 w-full max-w-[390px]">
                <button
                  onClick={() => setIsFullscreenPlanner(true)}
                  className="flex-1 py-3.5 px-6 border border-[#a3e635] hover:bg-[#a3e635] text-[#a3e635] hover:text-[#FAF9F6] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Maximize2 className="w-4 h-4 animate-pulse" />
                  {lang === "it" ? "SCHERMO INTERO" : "FULL VIEW"}
                </button>
              </div>

            </div>

          </div>

          {/* ELEGANT LINE DIVIDER */}
          <div className="w-full h-px bg-[#111113]/10 my-20" />

          {/* PROJECT 3: INTERACTIVE MENU */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Descriptive Side Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/30 rounded-full">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-600">
                  {lang === "it" ? "PROGETTO SELEZIONATO — 3" : "FEATURED PROJECT — 3"}
                </span>
              </div>
              
              <h3 className="font-tan text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#111113] leading-[1.1]">
                Interactive Menu — <span className="italic font-normal text-rose-700">Dark Red, Bright Orange, Beige</span>
              </h3>
              
              <p className="text-[#111113]/70 font-sans text-xs sm:text-sm leading-relaxed">
                {lang === "it"
                  ? "Interactive Menu in Dark Red Bright Orange Beige Elegant Photocentric Style di Maria Teresa Rogani. Un menù digitale raffinato e incentrato sulla fotografia, progettato per trasmettere calore ed eccellenza culinaria."
                  : "Interactive Menu in Dark Red Bright Orange Beige Elegant Photocentric Style by Maria Teresa Rogani. A refined, photography-focused digital menu designed to convey warmth and culinary excellence."}
              </p>

              <div className="space-y-4 font-sans text-xs text-[#111113]/70 leading-relaxed border-t border-[#111113]/10 pt-6">
                <h4 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#111113]">
                  {lang === "it" ? "Caratteristiche del Design:" : "Design Keynotes:"}
                </h4>
                
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111113]">{lang === "it" ? "Focus Fotografico & Lusso" : "Photocentric & Luxurious"}</h5>
                    <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                      {lang === "it" 
                         ? "Layout sofisticati e contrasti caldi ideati per mettere in risalto immagini ad alta risoluzione." 
                         : "Sophisticated layouts and warm contrasts crafted to highlight high-resolution imagery."}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-700 text-[10px] font-mono shrink-0 mt-0.5">✓</div>
                  <div>
                    <h5 className="font-bold text-xs text-[#111113]">{lang === "it" ? "Esperienza Immersiva" : "Immersive Interaction"}</h5>
                    <p className="text-[11px] text-[#111113]/50 leading-relaxed">
                      {lang === "it" 
                         ? "Interagisci con il simulatore o clicca sul pulsante sottostante per vederlo a schermo intero." 
                         : "Interact with the preview mockup or click below to explore the immersive full screen view."}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Simulator Column */}
            <div className="lg:col-span-7 flex flex-col items-center gap-4 w-full">
              
              {/* Aspect Ratio Selector bar */}
              <div className="flex items-center justify-between w-full max-w-[390px] bg-[#FAF9F6] border border-[#111113]/10 p-2 rounded-none">
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#111113]/50 px-2">
                  {lang === "it" ? "Formato:" : "Format:"}
                </span>
                <div className="inline-flex bg-[#111113]/5 p-0.5">
                  <button
                    onClick={() => setAspectRatioMenu("vertical")}
                    className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      aspectRatioMenu === "vertical"
                        ? "bg-[#a3e635] text-white shadow-sm"
                        : "text-[#111113]/60 hover:text-[#111113]"
                    }`}
                  >
                    <Smartphone className="w-3 h-3" />
                    {lang === "it" ? "Cell" : "Mobile"}
                  </button>
                  <button
                    onClick={() => setAspectRatioMenu("horizontal")}
                    className={`px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      aspectRatioMenu === "horizontal"
                        ? "bg-[#a3e635] text-white shadow-sm"
                        : "text-[#111113]/60 hover:text-[#111113]"
                    }`}
                  >
                    <Monitor className="w-3 h-3" />
                    {lang === "it" ? "Orizzontale" : "Desktop"}
                  </button>
                </div>
              </div>

              {/* Simulator Device Frame */}
              <div className={`w-full transition-all duration-300 ${
                aspectRatioMenu === "vertical" 
                  ? "max-w-[390px] border-4 border-zinc-200 bg-[#FAF9F6] rounded-[40px] p-3 shadow-xl relative" 
                  : "max-w-full border border-[#111113]/10 p-2 bg-[#FAF9F6] shadow-md"
              }`}>
                {aspectRatioMenu === "vertical" && (
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-100 rounded-full z-50 flex items-center justify-center gap-1.5 border border-zinc-200">
                    <span className="w-1 h-1 bg-zinc-300 rounded-full"></span>
                    <span className="w-8 h-1 bg-zinc-200 rounded-full"></span>
                  </div>
                )}

                {/* Simulated Screen */}
                <div 
                  className={`relative w-full overflow-hidden bg-white ${
                    aspectRatioMenu === "vertical" ? "rounded-[28px] border border-zinc-200" : "border border-[#111113]/5"
                  }`}
                  style={{
                    paddingTop: aspectRatioMenu === "vertical" ? "177.78%" : "56.25%",
                    willChange: "transform"
                  }}
                >
                  <iframe 
                    loading="lazy" 
                    style={{ 
                      position: "absolute", 
                      width: "100%", 
                      height: "100%", 
                      top: 0, 
                      left: 0, 
                      border: "none", 
                      padding: 0, 
                      margin: 0 
                    }}
                    src={menuEmbedUrl} 
                    allowFullScreen={true}
                    allow="fullscreen"
                    title="Interactive Menu"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 w-full max-w-[390px]">
                <button
                  onClick={() => setIsFullscreenMenu(true)}
                  className="flex-1 py-3.5 px-6 border border-[#a3e635] hover:bg-[#a3e635] text-[#a3e635] hover:text-[#FAF9F6] font-mono text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                >
                  <Maximize2 className="w-4 h-4 animate-pulse" />
                  {lang === "it" ? "SCHERMO INTERO" : "FULL VIEW"}
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FULL-SCREEN OVERLAYS */}
      <AnimatePresence>
        {isFullscreenFlorist && (
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
                <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]">
                  Interactive Florist Landing Page
                </span>
                <span className="hidden sm:inline px-2.5 py-0.5 bg-[#111113]/5 border border-[#111113]/10 font-mono text-[9px] text-[#111113]/50 rounded font-bold uppercase tracking-widest">
                  {lang === "it" ? "Progetto Presentazione" : "Project Presentation"}
                </span>
              </div>
              
              <button
                onClick={() => setIsFullscreenFlorist(false)}
                className="px-4 py-2 bg-[#a3e635] text-[#FAF9F6] border border-[#a3e635] font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-250 flex items-center gap-2 cursor-pointer"
                title={lang === "it" ? "Chiudi" : "Close"}
              >
                <X className="w-4 h-4" />
                <span>{lang === "it" ? "CHIUDI" : "CLOSE"}</span>
              </button>
            </div>

            {/* Main view area */}
            <div className="flex-grow w-full bg-[#FAF9F6] flex justify-center items-center overflow-hidden p-0 sm:p-4">
              <div className="w-full h-full max-w-5xl bg-[#FAF9F6] shadow-2xl sm:border border-[#111113]/10 flex flex-col overflow-hidden relative">
                <iframe 
                  loading="lazy" 
                  style={{ 
                    position: "absolute", 
                    width: "100%", 
                    height: "100%", 
                    top: 0, 
                    left: 0, 
                    border: "none", 
                    padding: 0, 
                    margin: 0 
                  }}
                  src={floristEmbedUrl} 
                  allowFullScreen={true}
                  allow="fullscreen"
                  title="Interactive Florist Landing Page"
                />
              </div>
            </div>
          </motion.div>
        )}

        {isFullscreenPlanner && (
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
                <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]">
                  Interactive Meal Planner
                </span>
                <span className="hidden sm:inline px-2.5 py-0.5 bg-[#111113]/5 border border-[#111113]/10 font-mono text-[9px] text-[#111113]/50 rounded font-bold uppercase tracking-widest">
                  {lang === "it" ? "Progetto Presentazione" : "Project Presentation"}
                </span>
              </div>
              
              <button
                onClick={() => setIsFullscreenPlanner(false)}
                className="px-4 py-2 bg-[#a3e635] text-[#FAF9F6] border border-[#a3e635] font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-250 flex items-center gap-2 cursor-pointer"
                title={lang === "it" ? "Chiudi" : "Close"}
              >
                <X className="w-4 h-4" />
                <span>{lang === "it" ? "CHIUDI" : "CLOSE"}</span>
              </button>
            </div>

            {/* Main view area */}
            <div className="flex-grow w-full bg-[#FAF9F6] flex justify-center items-center overflow-hidden p-0 sm:p-4">
              <div className="w-full h-full max-w-5xl bg-[#FAF9F6] shadow-2xl sm:border border-[#111113]/10 flex flex-col overflow-hidden relative">
                <iframe 
                  loading="lazy" 
                  style={{ 
                    position: "absolute", 
                    width: "100%", 
                    height: "100%", 
                    top: 0, 
                    left: 0, 
                    border: "none", 
                    padding: 0, 
                    margin: 0 
                  }}
                  src={plannerEmbedUrl} 
                  allowFullScreen={true}
                  allow="fullscreen"
                  title="Interactive Meal Planner"
                />
              </div>
            </div>
          </motion.div>
        )}

        {isFullscreenMenu && (
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
                <span className="w-2.5 h-2.5 rounded-full bg-[#a3e635] animate-pulse"></span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111113]">
                  Interactive Menu
                </span>
                <span className="hidden sm:inline px-2.5 py-0.5 bg-[#111113]/5 border border-[#111113]/10 font-mono text-[9px] text-[#111113]/50 rounded font-bold uppercase tracking-widest">
                  {lang === "it" ? "Progetto Presentazione" : "Project Presentation"}
                </span>
              </div>
              
              <button
                onClick={() => setIsFullscreenMenu(false)}
                className="px-4 py-2 bg-[#a3e635] text-[#FAF9F6] border border-[#a3e635] font-mono text-[10px] font-bold uppercase tracking-widest transition-all duration-250 flex items-center gap-2 cursor-pointer"
                title={lang === "it" ? "Chiudi" : "Close"}
              >
                <X className="w-4 h-4" />
                <span>{lang === "it" ? "CHIUDI" : "CLOSE"}</span>
              </button>
            </div>

            {/* Main view area */}
            <div className="flex-grow w-full bg-[#FAF9F6] flex justify-center items-center overflow-hidden p-0 sm:p-4">
              <div className="w-full h-full max-w-5xl bg-[#FAF9F6] shadow-2xl sm:border border-[#111113]/10 flex flex-col overflow-hidden relative">
                <iframe 
                  loading="lazy" 
                  style={{ 
                    position: "absolute", 
                    width: "100%", 
                    height: "100%", 
                    top: 0, 
                    left: 0, 
                    border: "none", 
                    padding: 0, 
                    margin: 0 
                  }}
                  src={menuEmbedUrl} 
                  allowFullScreen={true}
                  allow="fullscreen"
                  title="Interactive Menu"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
