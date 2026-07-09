import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home,
  Users,
  Calculator,
  Calendar,
  Heart,
  ShieldCheck,
  Award,
  MapPin,
  Navigation,
  X,
  AlertTriangle,
  ChevronRight,
  CheckSquare,
  CheckCircle,
  Star,
  Wifi,
  Battery,
  Paintbrush
} from "lucide-react";

interface TattooMacerataAppProps {
  lang?: "it" | "en";
}

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  artist: string;
  timeAgo: string;
  verified?: boolean;
}

export default function TattooMacerataApp({ lang = "it" }: TattooMacerataAppProps) {
  // State definitions
  const [currentTab, setCurrentTab] = useState<"home" | "artisti" | "preventivi" | "prenotazioni" | "recensioni">("home");
  const [selectedColor, setSelectedColor] = useState<"black" | "color">("black");
  const [tattooSize, setTattooSize] = useState<number>(2);
  const [complexity, setComplexity] = useState<"simple" | "medium" | "high">("medium");
  const [selectedArtist, setSelectedArtist] = useState<"any" | "kaelen" | "luna" | "sasha">("any");
  
  // Estimate results
  const [priceMin, setPriceMin] = useState<number>(120);
  const [priceMax, setPriceMax] = useState<number>(180);

  // Booking Form State
  const [bookingName, setBookingName] = useState<string>("");
  const [bookingPhone, setBookingPhone] = useState<string>("");
  const [bookingDate, setBookingDate] = useState<string>("");
  const [bookingTime, setBookingTime] = useState<string>("14:30");
  const [bookingDesc, setBookingDesc] = useState<string>("");
  const [bookingPrivacy, setBookingPrivacy] = useState<boolean>(false);
  const [bookingSubmitted, setBookingSubmitted] = useState<boolean>(false);

  // Review System State
  const [reviewUser, setReviewUser] = useState<string>("");
  const [reviewComment, setReviewComment] = useState<string>("");
  const [reviewRating, setReviewRating] = useState<number>(0);
  const [reviewsList, setReviewsList] = useState<Review[]>([
    {
      id: "1",
      userName: "Riccardo M. (Macerata)",
      rating: 5,
      comment: "Kaelen è un vero genio del gotico. Mi ha realizzato una manica esoterica pazzesca. Studio pulitissimo e ragazzi simpaticissimi. Consigliatissimo a Macerata!",
      artist: "Kaelen Darko",
      timeAgo: lang === "it" ? "2 settimane fa" : "2 weeks ago"
    },
    {
      id: "2",
      userName: "Elena V.",
      rating: 5,
      comment: "Ho fatto una scritta gotica sulla spalla da Luna. Linee perfette, precise e nessun dolore. Consiglio moltissimo chi cerca il fineline di alto livello!",
      artist: "Luna Sini",
      timeAgo: lang === "it" ? "1 mese fa" : "1 month ago"
    }
  ]);

  // Toast State
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastType, setToastType] = useState<"success" | "warning">("warning");
  const [toastVisible, setToastVisible] = useState<boolean>(false);

  // Trigger custom toast
  const triggerToast = (message: string, type: "success" | "warning" = "warning") => {
    setToastMessage(message);
    setToastType(type);
    setToastVisible(true);
  };

  useEffect(() => {
    if (toastVisible) {
      const t = setTimeout(() => {
        setToastVisible(false);
      }, 4000);
      return () => clearTimeout(t);
    }
  }, [toastVisible]);

  // Estimate calculator logic
  const calculateEstimate = () => {
    let basePriceMin = 70;
    let basePriceMax = 100;

    if (tattooSize === 1) {
      basePriceMin = 70;
      basePriceMax = 100;
    } else if (tattooSize === 2) {
      basePriceMin = 120;
      basePriceMax = 190;
    } else if (tattooSize === 3) {
      basePriceMin = 220;
      basePriceMax = 350;
    } else if (tattooSize === 4) {
      basePriceMin = 450;
      basePriceMax = 800;
    }

    if (selectedColor === "color") {
      basePriceMin *= 1.25;
      basePriceMax *= 1.25;
    }

    if (complexity === "medium") {
      basePriceMin *= 1.15;
      basePriceMax *= 1.15;
    } else if (complexity === "high") {
      basePriceMin *= 1.4;
      basePriceMax *= 1.4;
    }

    if (selectedArtist === "kaelen") {
      basePriceMin *= 1.15;
      basePriceMax *= 1.15;
    }

    const finalMin = Math.round(basePriceMin / 10) * 10;
    const finalMax = Math.round(basePriceMax / 10) * 10;

    setPriceMin(finalMin);
    setPriceMax(finalMax);
  };

  useEffect(() => {
    calculateEstimate();
  }, [tattooSize, selectedColor, complexity, selectedArtist]);

  // Size labels
  const getSizeLabel = () => {
    if (tattooSize === 1) return lang === "it" ? "Piccolo (<5cm)" : "Small (<5cm)";
    if (tattooSize === 2) return lang === "it" ? "Medio (10-15 cm)" : "Medium (10-15 cm)";
    if (tattooSize === 3) return lang === "it" ? "Grande (15-25 cm)" : "Large (15-25 cm)";
    return lang === "it" ? "Schiena / Manica intera" : "Back / Full sleeve";
  };

  // Convert estimate to Booking description
  const handleUseEstimateInBooking = () => {
    const sizeText = getSizeLabel();
    const complexityText = complexity === "simple" 
      ? (lang === "it" ? "Linee semplici / Scritte minimali" : "Simple lines / Minimalist lettering")
      : complexity === "medium"
      ? (lang === "it" ? "Dettagliato (Sfumature medie, geometrico)" : "Detailed (Medium shading, geometric)")
      : (lang === "it" ? "Altissima complessità (Ritratti, Dark esoterico denso)" : "High complexity (Portraits, dense esoteric blackwork)");
    const colorText = selectedColor === "black" ? "Total Black" : "Colori";
    const budgetText = `€${priceMin} - €${priceMax}`;

    setBookingDesc(
      lang === "it"
        ? `Richiesta Preventivo: Dimensione: ${sizeText}, Colore: ${colorText}, Complessità: ${complexityText}. Budget stimato: ${budgetText}.`
        : `Quote Request: Size: ${sizeText}, Color: ${colorText}, Complexity: ${complexityText}. Estimated budget: ${budgetText}.`
    );
    setCurrentTab("prenotazioni");
    triggerToast(
      lang === "it" ? "Dati del preventivo inseriti nel form!" : "Quote details entered in the form!",
      "success"
    );
  };

  // Handle booking form submission
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName.trim() || !bookingPhone.trim() || !bookingDate) {
      triggerToast(lang === "it" ? "Attenzione! Compila tutti i campi richiesti." : "Please fill in all required fields.", "warning");
      return;
    }
    if (!bookingPrivacy) {
      triggerToast(lang === "it" ? "Devi accettare il trattamento dei dati per procedere." : "You must accept data treatment to proceed.", "warning");
      return;
    }

    setBookingSubmitted(true);
    triggerToast(lang === "it" ? "Prenotazione salvata con successo!" : "Booking successfully saved!", "success");
  };

  const resetBookingForm = () => {
    setBookingName("");
    setBookingPhone("");
    setBookingDate("");
    setBookingTime("14:30");
    setBookingDesc("");
    setBookingPrivacy(false);
    setBookingSubmitted(false);
  };

  // Handle Review submission
  const handleAddReview = () => {
    if (!reviewUser.trim() || !reviewComment.trim()) {
      triggerToast(lang === "it" ? "Fornisci il tuo nome e il commento!" : "Provide your name and comment!", "warning");
      return;
    }
    if (reviewRating === 0) {
      triggerToast(lang === "it" ? "Scegli una valutazione in stelle!" : "Please choose a star rating!", "warning");
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      userName: reviewUser.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      artist: lang === "it" ? "Qualsiasi" : "Any",
      timeAgo: lang === "it" ? "Verificata • Appena pubblicata" : "Verified • Just published",
      verified: true
    };

    setReviewsList([newReview, ...reviewsList]);
    setReviewUser("");
    setReviewComment("");
    setReviewRating(0);
    triggerToast(lang === "it" ? "Recensione aggiunta con successo!" : "Review added successfully!", "success");
  };

  return (
    <div className="w-full h-full bg-[#09070f] font-poppins relative text-gray-100 flex flex-col overflow-hidden">
      
      {/* TOAST NOTIFICATION SYSTEM */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -50, x: "-50%" }}
            className="fixed top-4 left-1/2 z-[9999] bg-[#121214] border border-purple-600 p-4 rounded-xl shadow-2xl flex items-center gap-3 w-[90%] max-w-xs"
          >
            <div className={`w-8 h-8 rounded-full bg-purple-950 flex items-center justify-center ${toastType === "success" ? "text-[#00ff88]" : "text-purple-400"}`}>
              {toastType === "success" ? (
                <CheckSquare className="w-4 h-4 text-[#00ff88]" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-purple-400" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-xs text-gray-200 font-semibold font-poppins">{toastMessage}</p>
            </div>
            <button onClick={() => setToastVisible(false)} className="text-gray-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER APP */}
      <header className="bg-black/80 border-b border-purple-950/50 py-3 px-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="font-gothicClassic text-3xl text-[#00ff88] [text-shadow:0_0_8px_rgba(0,255,136,0.6)]" style={{ fontFamily: "UnifrakturMaguntia, serif" }}>TM</span>
          <div>
            <h1 className="font-gothicModern text-xs tracking-widest text-white leading-none" style={{ fontFamily: '"Cinzel Decorative", serif' }}>TATTOO MACERATA</h1>
            <span className="text-[9px] text-[#8b5cf6] font-semibold uppercase tracking-wider font-poppins">Demo by Facilissimo Web</span>
          </div>
        </div>
        {/* Badge Info Studio */}
        <div className="flex items-center gap-1.5 bg-purple-950/40 border border-purple-800/50 px-2 py-1 rounded-full text-[10px] text-gray-300">
          <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse"></span>
          <span className="font-poppins">{lang === "it" ? "Studio Aperto" : "Studio Open"}</span>
        </div>
      </header>

        {/* AREA CONTENUTO SCROLLABILE */}
        <main className="flex-1 overflow-y-auto pb-24" id="main-content">
          
          {/* TAB 1: STUDIO (HOME) */}
          {currentTab === "home" && (
            <div className="space-y-6 px-4 pt-4">
              
              {/* Hero Banner con Grafica Gotica ed Immagine di Copertura */}
              <div className="relative rounded-2xl overflow-hidden bg-cover bg-center border border-purple-900/40 p-6 flex flex-col justify-end min-h-[220px] shadow-lg" style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.95) 35%, rgba(18,18,20,0.4) 100%), url('https://images.unsplash.com/photo-1598121698156-557c5a9be3b5?auto=format&fit=crop&q=80&w=600')` }}>
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#8b5cf6_1px,transparent_1px)] [background-size:16px_16px]"></div>
                
                {/* Gotico decorativo */}
                <svg className="absolute top-2 right-2 w-16 h-16 text-purple-600/20" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 10 H90 V90 M30 10 V70 H90 M10 30 H70 V90" />
                  <circle cx="50" cy="50" r="5" className="fill-current" />
                </svg>
                
                <span className="text-[#00ff88] text-xs font-bold uppercase tracking-widest mb-1 font-poppins">{lang === "it" ? "Inchiostro & Anima" : "Ink & Soul"}</span>
                <h2 className="font-gothicClassic text-4xl text-white mb-2 leading-tight" style={{ fontFamily: "UnifrakturMaguntia, serif" }}>
                  {lang === "it" ? "L'arte sulla pelle, nel cuore delle Marche." : "Skin Art, in the heart of Marche."}
                </h2>
                <p className="text-xs text-gray-400 mb-4 max-w-[90%] leading-relaxed font-poppins">
                  {lang === "it" 
                    ? "Uno studio d'elite a Macerata. Tre artisti uniti da una sola visione: trasformare le tue idee in opere d'arte eterne."
                    : "An elite studio in Macerata. Three artists united by a single vision: to turn your ideas into eternal masterpieces."}
                </p>
                <div className="flex gap-2">
                  <button onClick={() => setCurrentTab("preventivi")} className="flex-1 bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition shadow-[0_0_15px_rgba(139,92,246,0.4)] font-poppins">
                    <Calculator className="w-4 h-4" /> {lang === "it" ? "Calcola Preventivo" : "Calculate Quote"}
                  </button>
                  <button onClick={() => setCurrentTab("prenotazioni")} className="bg-black border border-[#00ff88] text-[#00ff88] hover:bg-[#00ff88]/10 font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition font-poppins">
                    {lang === "it" ? "Prenota" : "Book"} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Lo Studio & Lo Stile */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="h-px bg-gradient-to-r from-purple-800 to-transparent flex-1"></span>
                  <h3 className="font-gothicModern text-lg text-purple-300" style={{ fontFamily: '"Cinzel Decorative", serif' }}>
                    {lang === "it" ? "LO STUDIO & LO STILE" : "THE STUDIO & STYLE"}
                  </h3>
                  <span className="h-px bg-gradient-to-l from-purple-800 to-transparent flex-1"></span>
                </div>
                
                <p className="text-xs text-gray-400 text-center px-4 leading-relaxed font-poppins">
                  {lang === "it"
                    ? "Il nostro spazio nel centro di Macerata è un tempio dedicato alla creatività e all'igiene rigorosa. Un'atmosfera gotica accogliente, luci soffuse, ottima musica e i più alti standard di sicurezza del settore."
                    : "Our space in downtown Macerata is a sanctuary dedicated to creativity and absolute hygiene. A cozy gothic atmosphere, dim lights, great tunes, and the highest security standards."}
                </p>

                {/* Caratteristiche Icone */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-[#121214] p-3 rounded-xl border border-purple-950/60 text-center space-y-1">
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto text-[#00ff88]">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h4 className="text-[11px] font-bold text-white font-poppins">100% Sterile</h4>
                    <p className="text-[9px] text-gray-500 font-poppins">{lang === "it" ? "Materiali monouso" : "Single-use tools"}</p>
                  </div>
                  <div className="bg-[#121214] p-3 rounded-xl border border-purple-950/60 text-center space-y-1">
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto text-[#8b5cf6]">
                      <Paintbrush className="w-4 h-4" />
                    </div>
                    <h4 className="text-[11px] font-bold text-white font-poppins">Custom Design</h4>
                    <p className="text-[9px] text-gray-500 font-poppins">{lang === "it" ? "Disegni su misura" : "Tailored drawings"}</p>
                  </div>
                  <div className="bg-[#121214] p-3 rounded-xl border border-purple-950/60 text-center space-y-1">
                    <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center mx-auto text-[#00ff88]">
                      <Award className="w-4 h-4" />
                    </div>
                    <h4 className="text-[11px] font-bold text-white font-poppins">{lang === "it" ? "Inchiostri Vegan" : "Vegan Ink"}</h4>
                    <p className="text-[9px] text-gray-500 font-poppins">{lang === "it" ? "Ipoallergenici" : "Hypoallergenic"}</p>
                  </div>
                </div>
              </div>

              {/* Info Orari & Location */}
              <div className="bg-[#121214] rounded-xl p-4 border border-purple-950/60 space-y-3">
                <h4 className="font-gothicModern text-xs text-[#00ff88] uppercase tracking-wider flex items-center gap-2 [text-shadow:0_0_8px_rgba(0,255,136,0.6)]" style={{ fontFamily: '"Cinzel Decorative", serif' }}>
                  <MapPin className="w-4 h-4" /> {lang === "it" ? "Dove trovarci & Contatti" : "Location & Contact"}
                </h4>
                <div className="text-xs text-gray-400 space-y-1.5 font-poppins">
                  <p className="font-semibold text-white">Via Garibaldi, 42 - Macerata (MC)</p>
                  <p>{lang === "it" ? "Lun - Sab: 10:30 - 19:30 (Domenica chiuso)" : "Mon - Sat: 10:30 - 19:30 (Sunday closed)"}</p>
                  <p className="text-purple-400">Tel / WhatsApp: +39 333 456 7890</p>
                </div>
                {/* Mini Mappa Fittizia con Sfondo Studio */}
                <div className="h-24 bg-purple-950/20 rounded-lg overflow-hidden relative border border-purple-900/20 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1605497746444-ac9dbd324ce8?auto=format&fit=crop&q=80&w=600')` }}>
                  <span className="z-10 bg-black/80 px-3 py-1.5 rounded border border-neonGreen/30 text-[10px] text-neonGreen flex items-center gap-1 cursor-pointer font-poppins hover:bg-black transition">
                    <Navigation className="w-3 h-3" /> {lang === "it" ? "Apri in Google Maps" : "Open Google Maps"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ARTISTI */}
          {currentTab === "artisti" && (
            <div className="space-y-6 px-4 pt-4">
              <div className="text-center space-y-1">
                <span className="text-[#00ff88] text-[10px] font-bold uppercase tracking-widest font-poppins">{lang === "it" ? "Le Nostre Anime Creative" : "Our Creative Souls"}</span>
                <h2 className="font-gothicClassic text-4xl text-white" style={{ fontFamily: "UnifrakturMaguntia, serif" }}>{lang === "it" ? "I Tre Maestri" : "The Three Masters"}</h2>
                <p className="text-xs text-gray-400 max-w-xs mx-auto font-poppins">
                  {lang === "it" 
                    ? "Ogni artista è specializzato in uno stile unico per garantirti l'eccellenza assoluta."
                    : "Each artist specializes in a distinct style to ensure absolute excellence."}
                </p>
              </div>

              {/* ARTISTA 1 */}
              <div className="bg-[#121214] rounded-2xl border border-purple-950/60 overflow-hidden">
                <div className="relative h-44 bg-cover bg-center flex items-end overflow-hidden" style={{ backgroundImage: `linear-gradient(to top, rgba(18,18,20,0.95), rgba(18,18,20,0.1)), url('https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=600')` }}>
                  <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded-md border border-[#00ff88]/40 z-10">
                    <span className="text-[10px] text-[#00ff88] font-mono uppercase font-poppins">Master Artist</span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-end">
                    <h3 className="font-gothicClassic text-2xl text-white" style={{ fontFamily: "UnifrakturMaguntia, serif" }}>Kaelen Darko</h3>
                    <span className="text-xs text-purple-400 font-semibold font-gothicModern" style={{ fontFamily: '"Cinzel Decorative", serif' }}>Blackwork & Gotico</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-poppins">
                    {lang === "it"
                      ? "Fondatore dello studio. Specializzato in trame cupe, esoterismo, e pesanti contrasti di nero. I suoi disegni richiamano le incisioni medievali e l'architettura gotica."
                      : "Studio founder. Specialized in dark tones, esotericism, and intense blackwork contrasts. His designs recall medieval engravings and gothic architecture."}
                  </p>
                  <div className="flex gap-1.5 pt-1 flex-wrap font-poppins">
                    <span className="bg-purple-950/40 text-[10px] text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-900/50">Dark Art</span>
                    <span className="bg-purple-950/40 text-[10px] text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-900/50">Engraving</span>
                    <span className="bg-purple-950/40 text-[10px] text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-900/50">Esoteric</span>
                  </div>
                </div>
              </div>

              {/* ARTISTA 2 */}
              <div className="bg-[#121214] rounded-2xl border border-purple-950/60 overflow-hidden">
                <div className="relative h-44 bg-cover bg-center flex items-end overflow-hidden" style={{ backgroundImage: `linear-gradient(to top, rgba(18,18,20,0.95), rgba(18,18,20,0.1)), url('https://images.unsplash.com/photo-1594744803329-e58b31de215f?auto=format&fit=crop&q=80&w=600')` }}>
                  <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded-md border border-[#00ff88]/40 z-10">
                    <span className="text-[10px] text-[#00ff88] font-mono uppercase font-poppins">Fineline Expert</span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-end">
                    <h3 className="font-gothicClassic text-2xl text-white" style={{ fontFamily: "UnifrakturMaguntia, serif" }}>Luna Sini</h3>
                    <span className="text-xs text-purple-400 font-semibold font-gothicModern" style={{ fontFamily: '"Cinzel Decorative", serif' }}>Fine Line & Lettering</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-poppins">
                    {lang === "it"
                      ? "La regina dei dettagli infinitesimali. Specializzata in scritte gotiche eleganti e tracciati geometrici sottili come capelli. Il suo tocco è delicato ma di un carattere immenso."
                      : "The queen of micro details. Specialized in elegant gothic scripts and hair-thin geometric layouts. Her touch is exceptionally delicate yet strong."}
                  </p>
                  <div className="flex gap-1.5 pt-1 flex-wrap font-poppins">
                    <span className="bg-purple-950/40 text-[10px] text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-900/50">Calligraphy</span>
                    <span className="bg-purple-950/40 text-[10px] text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-900/50">Minimal</span>
                    <span className="bg-purple-950/40 text-[10px] text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-900/50">Micro Gotico</span>
                  </div>
                </div>
              </div>

              {/* ARTISTA 3 */}
              <div className="bg-[#121214] rounded-2xl border border-purple-950/60 overflow-hidden">
                <div className="relative h-44 bg-cover bg-center flex items-end overflow-hidden" style={{ backgroundImage: `linear-gradient(to top, rgba(18,18,20,0.95), rgba(18,18,20,0.1)), url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600')` }}>
                  <div className="absolute bottom-3 left-3 bg-black/80 px-2.5 py-1 rounded-md border border-[#00ff88]/40 z-10">
                    <span className="text-[10px] text-[#00ff88] font-mono uppercase font-poppins">Surrealist Guru</span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="flex justify-between items-end">
                    <h3 className="font-gothicClassic text-2xl text-white" style={{ fontFamily: "UnifrakturMaguntia, serif" }}>Sasha Frost</h3>
                    <span className="text-xs text-purple-400 font-semibold font-gothicModern" style={{ fontFamily: '"Cinzel Decorative", serif' }}>Realistico & Neo-Trad</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed font-poppins">
                    {lang === "it"
                      ? "Artista pluripremiato. Unisce il realismo fotografico a elementi fantastici e colorazioni psichedeliche viola-verdi. Perfetto per ritratti ad altissima complessità visiva."
                      : "Award-winning artist. Merges photographic realism with fantastical elements and purple-green psychedelic shades. Excellent for complex portraits."}
                  </p>
                  <div className="flex gap-1.5 pt-1 flex-wrap font-poppins">
                    <span className="bg-purple-950/40 text-[10px] text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-900/50">3D Realistic</span>
                    <span className="bg-purple-950/40 text-[10px] text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-900/50">Psychedelic</span>
                    <span className="bg-purple-950/40 text-[10px] text-purple-300 px-2.5 py-0.5 rounded-full border border-purple-900/50">Color</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PREVENTIVO */}
          {currentTab === "preventivi" && (
            <div className="space-y-6 px-4 pt-4">
              <div className="text-center space-y-1">
                <span className="text-[#00ff88] text-[10px] font-bold uppercase tracking-widest font-poppins">{lang === "it" ? "Prendi le Misure" : "Check dimensions"}</span>
                <h2 className="font-gothicClassic text-4xl text-white" style={{ fontFamily: "UnifrakturMaguntia, serif" }}>{lang === "it" ? "Preventivo Rapido" : "Instant Quote"}</h2>
                <p className="text-xs text-gray-400 font-poppins">
                  {lang === "it" ? "Configura la tua idea in 4 passi e ottieni un calcolo istantaneo del costo indicativo." : "Set up your idea in 4 steps and get an immediate estimated pricing range."}
                </p>
              </div>

              <div className="bg-[#121214] p-5 rounded-2xl border border-purple-950/60 space-y-5">
                {/* Step 1: Dimensione */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center justify-between font-poppins">
                    <span>{lang === "it" ? "1. Dimensione Tattoo" : "1. Tattoo Size"}</span>
                    <span className="text-[#00ff88] font-mono">{getSizeLabel()}</span>
                  </label>
                  <input 
                    type="range" 
                    min="1" 
                    max="4" 
                    value={tattooSize} 
                    onChange={(e) => setTattooSize(parseInt(e.target.value))}
                    className="w-full accent-[#00ff88] bg-purple-950 rounded-lg appearance-none h-2 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-gray-500 font-mono font-poppins">
                    <span>{lang === "it" ? "Piccolo (<5cm)" : "Small (<5cm)"}</span>
                    <span>{lang === "it" ? "Medio" : "Medium"}</span>
                    <span>{lang === "it" ? "Grande" : "Large"}</span>
                    <span>{lang === "it" ? "Schiena/Manica" : "Back/Sleeve"}</span>
                  </div>
                </div>

                {/* Step 2: Colore */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block font-poppins">
                    {lang === "it" ? "2. Colore & Sfumature" : "2. Color & Shades"}
                  </label>
                  <div className="grid grid-cols-2 gap-2 font-poppins">
                    <button 
                      onClick={() => setSelectedColor("black")}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                        selectedColor === "black" 
                          ? "border-[#00ff88] text-white bg-purple-950/40" 
                          : "border-purple-900/40 text-gray-400 bg-transparent"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-black border border-gray-600"></span> Total Black / Grey
                    </button>
                    <button 
                      onClick={() => setSelectedColor("color")}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition ${
                        selectedColor === "color" 
                          ? "border-[#00ff88] text-white bg-purple-950/40" 
                          : "border-purple-900/40 text-gray-400 bg-transparent"
                      }`}
                    >
                      <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-purple-500 to-green-400"></span> {lang === "it" ? "Colori & Sfumature" : "Colors & Shading"}
                    </button>
                  </div>
                </div>

                {/* Step 3: Complessità disegno */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block font-poppins">
                    {lang === "it" ? "3. Complessità del Design" : "3. Design Complexity"}
                  </label>
                  <select 
                    value={complexity} 
                    onChange={(e) => setComplexity(e.target.value as any)}
                    className="w-full bg-black border border-purple-900/60 rounded-xl py-2.5 px-3 text-xs text-gray-300 focus:outline-none focus:border-[#00ff88] font-poppins"
                  >
                    <option value="simple">{lang === "it" ? "Linee semplici / Scritte minimali" : "Simple lines / Minimalist scripts"}</option>
                    <option value="medium">{lang === "it" ? "Dettagliato (Sfumature medie, geometrico)" : "Detailed (Medium shading, geometric)"}</option>
                    <option value="high">{lang === "it" ? "Altissima complessità (Ritratti, Dark esoterico)" : "High complexity (Portraits, dark esoteric)"}</option>
                  </select>
                </div>

                {/* Step 4: Artista Desiderato */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block font-poppins">
                    {lang === "it" ? "4. Scegli l'Artista" : "4. Choose Artist"}
                  </label>
                  <select 
                    value={selectedArtist} 
                    onChange={(e) => setSelectedArtist(e.target.value as any)}
                    className="w-full bg-black border border-purple-900/60 rounded-xl py-2.5 px-3 text-xs text-gray-300 focus:outline-none focus:border-[#00ff88] font-poppins"
                  >
                    <option value="any">{lang === "it" ? "Nessuna preferenza (Qualsiasi disponibile)" : "No preference (Any artist)"}</option>
                    <option value="kaelen">Kaelen Darko (+15% master rate)</option>
                    <option value="luna">Luna Sini</option>
                    <option value="sasha">Sasha Frost</option>
                  </select>
                </div>

                {/* Box Risultato Preventivo */}
                <div className="bg-gradient-to-r from-purple-950/50 to-black p-4 rounded-xl border border-[#00ff88]/30 space-y-2 relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-20 h-20 bg-[#00ff88]/5 rounded-full blur-xl"></div>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-poppins">{lang === "it" ? "Stima Indicativa Prezzo" : "Estimated Price Range"}</span>
                  <div className="flex items-baseline gap-2">
                    <span className="font-gothicModern text-3xl text-[#00ff88] [text-shadow:0_0_8px_rgba(0,255,136,0.6)]" style={{ fontFamily: '"Cinzel Decorative", serif' }}>€{priceMin} - €{priceMax}</span>
                    <span className="text-[10px] text-gray-500 font-mono font-poppins">IVA Incl.</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-normal font-poppins">
                    {lang === "it" 
                      ? "La stima finale varia in base alla precisa zona del corpo e ai tempi effettivi della seduta. Consulenza di disegno inclusa."
                      : "The final cost depends on the body placement and session duration. Design consultancy included."}
                  </p>
                </div>

                {/* CTA Prenota con questi dati */}
                <button 
                  onClick={handleUseEstimateInBooking}
                  className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-black font-extrabold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-[0_0_15px_rgba(0,255,136,0.4)] font-poppins"
                >
                  <CheckSquare className="w-4 h-4" /> {lang === "it" ? "Usa questo preventivo e prenota" : "Use this quote and book"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: PRENOTAZIONI */}
          {currentTab === "prenotazioni" && (
            <div className="space-y-6 px-4 pt-4">
              <div className="text-center space-y-1">
                <span className="text-[#00ff88] text-[10px] font-bold uppercase tracking-widest font-poppins">{lang === "it" ? "Riserva la tua Seduta" : "Reserve your session"}</span>
                <h2 className="font-gothicClassic text-4xl text-white" style={{ fontFamily: "UnifrakturMaguntia, serif" }}>{lang === "it" ? "Prenota Ora" : "Book Now"}</h2>
                <p className="text-xs text-gray-400 font-poppins">
                  {lang === "it" ? "Seleziona la data per una prima consulenza gratuita in studio." : "Choose a date for a free design consultation at the studio."}
                </p>
              </div>

              {!bookingSubmitted ? (
                <form onSubmit={handleBookingSubmit} className="bg-[#121214] p-5 rounded-2xl border border-purple-950/60 space-y-4 font-poppins">
                  {/* Dettagli Personali */}
                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">{lang === "it" ? "1. I tuoi contatti" : "1. Your Contact Details"}</label>
                    <input 
                      type="text" 
                      required 
                      placeholder={lang === "it" ? "Nome e Cognome" : "Full Name"}
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-black border border-purple-900/40 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00ff88]"
                    />
                    <input 
                      type="tel" 
                      required 
                      placeholder={lang === "it" ? "Numero di Telefono" : "Phone Number"}
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full bg-black border border-purple-900/40 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00ff88]"
                    />
                  </div>

                  {/* Selezione Data & Ora */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">{lang === "it" ? "2. Quando vuoi venire?" : "2. Appointment Date & Time"}</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input 
                        type="date" 
                        required 
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="bg-black border border-purple-900/40 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00ff88] font-mono"
                      />
                      <select 
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="bg-black border border-purple-900/40 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00ff88]"
                      >
                        <option value="10:30">{lang === "it" ? "Mattina (10:30)" : "Morning (10:30)"}</option>
                        <option value="14:30">{lang === "it" ? "Pomeriggio (14:30)" : "Afternoon (14:30)"}</option>
                        <option value="17:00">{lang === "it" ? "Sera (17:00)" : "Evening (17:00)"}</option>
                      </select>
                    </div>
                  </div>

                  {/* Note Aggiuntive */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">{lang === "it" ? "3. Dettagli sul Progetto (Opzionale)" : "3. Project Details (Optional)"}</label>
                    <textarea 
                      rows={3} 
                      placeholder={lang === "it" ? "Descrivi brevemente la tua idea di tatuaggio, posizionamento e dimensioni..." : "Describe briefly your tattoo idea, placement, dimensions..."}
                      value={bookingDesc}
                      onChange={(e) => setBookingDesc(e.target.value)}
                      className="w-full bg-black border border-purple-900/40 rounded-xl py-2.5 px-3 text-xs text-white focus:outline-none focus:border-[#00ff88]"
                    ></textarea>
                  </div>

                  {/* Termini e Condizioni */}
                  <div className="flex items-start gap-2 pt-1">
                    <input 
                      type="checkbox" 
                      required 
                      id="privacy_cb"
                      checked={bookingPrivacy}
                      onChange={(e) => setBookingPrivacy(e.target.checked)}
                      className="mt-0.5 accent-[#00ff88]"
                    />
                    <label htmlFor="privacy_cb" className="text-[10px] text-gray-400 leading-normal">
                      {lang === "it" 
                        ? "Acconsento al trattamento dei dati personali ai fini della prenotazione e della consulenza artistica."
                        : "I consent to the processing of personal data for reservation and design consulting purposes."}
                    </label>
                  </div>

                  {/* Tasto invio */}
                  <button type="submit" className="w-full bg-gradient-to-r from-purple-800 to-purple-600 hover:from-purple-700 hover:to-purple-500 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-[0_0_15px_rgba(139,92,246,0.4)]">
                    <Calendar className="w-4 h-4" /> {lang === "it" ? "Invia Richiesta di Prenotazione" : "Submit Booking Request"}
                  </button>
                </form>
              ) : (
                /* Messaggio di Successo Modale (Simulato) */
                <div className="bg-[#121214] p-6 rounded-2xl border-2 border-[#00ff88] text-center space-y-4 relative font-poppins">
                  <div className="w-12 h-12 rounded-full bg-[#00ff88]/20 flex items-center justify-center mx-auto text-[#00ff88]">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="font-gothicModern text-base text-white" style={{ fontFamily: '"Cinzel Decorative", serif' }}>{lang === "it" ? "Prenotazione Inviata!" : "Booking Sent!"}</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {lang === "it"
                      ? "Ti abbiamo inviato un messaggio di conferma su WhatsApp. Il nostro artista ti contatterà entro poche ore per finalizzare il bozzetto."
                      : "We've sent a confirmation notification simulation. Our artist will contact you within hours to finalize the sketch details."}
                  </p>
                  <button onClick={resetBookingForm} className="bg-purple-950 hover:bg-purple-900 text-xs text-purple-300 px-4 py-2 rounded-xl border border-purple-800/40 transition">
                    {lang === "it" ? "Nuova prenotazione" : "New booking"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: RECENSIONI (FEEDBACK) */}
          {currentTab === "recensioni" && (
            <div className="space-y-6 px-4 pt-4">
              <div className="text-center space-y-1">
                <span className="text-[#00ff88] text-[10px] font-bold uppercase tracking-widest font-poppins">{lang === "it" ? "Dicono di Noi" : "Testimonials"}</span>
                <h2 className="font-gothicClassic text-4xl text-white" style={{ fontFamily: "UnifrakturMaguntia, serif" }}>{lang === "it" ? "Le Recensioni" : "Client Reviews"}</h2>
                <p className="text-xs text-gray-400 font-poppins">
                  {lang === "it" ? "La soddisfazione dei nostri clienti è incisa sulla nostra pelle." : "Our clients' satisfaction is engraved on our skin."}
                </p>
              </div>

              {/* Lascia una recensione (Form interattivo) */}
              <div className="bg-[#121214] p-4 rounded-xl border border-purple-950/60 space-y-3 font-poppins">
                <h3 className="font-gothicModern text-xs text-white uppercase tracking-wider" style={{ fontFamily: '"Cinzel Decorative", serif' }}>{lang === "it" ? "Lascia il tuo parere" : "Submit your review"}</h3>
                <div className="flex items-center gap-1">
                  {/* Stelle interattive */}
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button 
                      key={starVal}
                      onClick={() => setReviewRating(starVal)}
                      className={`transition ${starVal <= reviewRating ? "text-[#00ff88]" : "text-gray-600 hover:text-[#00ff88]"}`}
                    >
                      <Star className={`w-5 h-5 ${starVal <= reviewRating ? "fill-current" : ""}`} />
                    </button>
                  ))}
                  <span className={`text-xs font-mono ml-2 ${reviewRating > 0 ? "text-[#00ff88] font-bold" : "text-gray-400"}`}>
                    {reviewRating > 0 ? `(${reviewRating} / 5)` : (lang === "it" ? "(Scegli il voto)" : "(Choose rating)")}
                  </span>
                </div>
                <div className="space-y-2 font-poppins">
                  <input 
                    type="text" 
                    placeholder={lang === "it" ? "Il tuo Nome" : "Your Name"}
                    value={reviewUser}
                    onChange={(e) => setReviewUser(e.target.value)}
                    className="w-full bg-black border border-purple-900/40 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#00ff88]"
                  />
                  <textarea 
                    rows={2} 
                    placeholder={lang === "it" ? "Scrivi la tua esperienza..." : "Describe your experience..."}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-black border border-purple-900/40 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-[#00ff88]"
                  ></textarea>
                </div>
                <button 
                  onClick={handleAddReview}
                  className="w-full bg-purple-950/80 hover:bg-purple-900 text-[#00ff88] font-bold text-xs py-2.5 rounded-xl border border-purple-800/40 transition"
                >
                  {lang === "it" ? "Pubblica Recensione" : "Submit Review"}
                </button>
              </div>

              {/* Feed Recensioni */}
              <div className="space-y-3 font-poppins">
                {reviewsList.map((rev) => (
                  <div key={rev.id} className="bg-[#121214] p-4 rounded-xl border border-purple-950/60 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white">{rev.userName}</span>
                      <div className="flex text-[#00ff88]">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star 
                            key={s} 
                            className={`w-3.5 h-3.5 ${s <= rev.rating ? "fill-current" : "text-gray-800"}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 italic">"{rev.comment}"</p>
                    <span className="text-[9px] text-gray-500 block font-mono">
                      {lang === "it" 
                        ? `Tatuato da: ${rev.artist} • ${rev.timeAgo}` 
                        : `Tattooed by: ${rev.artist} • ${rev.timeAgo}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>

        {/* FOOTER / NAVIGAZIONE IN BASSO */}
        <nav className="absolute bottom-0 left-0 right-0 bg-black/95 border-t border-purple-950/80 py-2.5 px-2 flex justify-around items-center z-50 backdrop-blur-md">
          <button 
            onClick={() => setCurrentTab("home")} 
            className={`flex flex-col items-center gap-1 transition ${currentTab === "home" ? "text-[#00ff88]" : "text-gray-400 hover:text-white"}`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[9px] font-bold tracking-wider font-gothicModern" style={{ fontFamily: '"Cinzel Decorative", serif' }}>STUDIO</span>
          </button>
          <button 
            onClick={() => setCurrentTab("artisti")} 
            className={`flex flex-col items-center gap-1 transition ${currentTab === "artisti" ? "text-[#00ff88]" : "text-gray-400 hover:text-white"}`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[9px] font-bold tracking-wider font-gothicModern" style={{ fontFamily: '"Cinzel Decorative", serif' }}>ARTISTI</span>
          </button>
          <button 
            onClick={() => setCurrentTab("preventivi")} 
            className={`flex flex-col items-center gap-1 transition ${currentTab === "preventivi" ? "text-[#00ff88]" : "text-gray-400 hover:text-white"}`}
          >
            <Calculator className="w-5 h-5" />
            <span className="text-[9px] font-bold tracking-wider font-gothicModern" style={{ fontFamily: '"Cinzel Decorative", serif' }}>PREVENTIVO</span>
          </button>
          <button 
            onClick={() => setCurrentTab("prenotazioni")} 
            className={`flex flex-col items-center gap-1 transition ${currentTab === "prenotazioni" ? "text-[#00ff88]" : "text-gray-400 hover:text-white"}`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[9px] font-bold tracking-wider font-gothicModern" style={{ fontFamily: '"Cinzel Decorative", serif' }}>PRENOTA</span>
          </button>
          <button 
            onClick={() => setCurrentTab("recensioni")} 
            className={`flex flex-col items-center gap-1 transition ${currentTab === "recensioni" ? "text-[#00ff88]" : "text-gray-400 hover:text-white"}`}
          >
            <Heart className="w-5 h-5" />
            <span className="text-[9px] font-bold tracking-wider font-gothicModern" style={{ fontFamily: '"Cinzel Decorative", serif' }}>FEEDBACK</span>
          </button>
        </nav>

      </div>
    );
  }
