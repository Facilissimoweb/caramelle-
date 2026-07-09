import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Heart,
  Smile,
  BookOpen,
  Palette,
  CheckCircle2,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Plus,
  X,
  ChevronRight,
  Baby,
  Map,
} from "lucide-react";

// --- INLINE SVG ANIMAL ICONS & ILLUSTRATIONS ---
interface AnimalIconProps {
  type: string;
  color?: string;
  size?: number;
  className?: string;
}

const AnimalIcon: React.FC<AnimalIconProps> = ({ type, color = "#F472B6", size = 64, className = "" }) => {
  switch (type) {
    case "bear":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
          <circle cx="28" cy="28" r="12" fill={color} opacity="0.8" />
          <circle cx="72" cy="28" r="12" fill={color} opacity="0.8" />
          <circle cx="28" cy="28" r="6" fill="#FEE2E2" />
          <circle cx="72" cy="28" r="6" fill="#FEE2E2" />
          <circle cx="50" cy="55" r="35" fill={color} />
          <circle cx="50" cy="58" r="14" fill="#FFF" />
          <circle cx="40" cy="46" r="3.5" fill="#1F2937" />
          <circle cx="60" cy="46" r="3.5" fill="#1F2937" />
          <circle cx="37" cy="44" r="1" fill="#FFF" />
          <circle cx="57" cy="44" r="1" fill="#FFF" />
          <circle cx="34" cy="52" r="4.5" fill="#F87171" opacity="0.6" />
          <circle cx="66" cy="52" r="4.5" fill="#F87171" opacity="0.6" />
          <path d="M 47,56 Q 50,59 53,56" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 50,56 L 50,53" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="50" cy="52" rx="4" ry="2.5" fill="#1F2937" />
        </svg>
      );
    case "bunny":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
          <rect x="30" y="8" width="12" height="35" rx="6" fill={color} opacity="0.8" />
          <rect x="58" y="8" width="12" height="35" rx="6" fill={color} opacity="0.8" />
          <rect x="33" y="14" width="6" height="22" rx="3" fill="#FEE2E2" />
          <rect x="61" y="14" width="6" height="22" rx="3" fill="#FEE2E2" />
          <circle cx="50" cy="58" r="28" fill={color} />
          <circle cx="50" cy="62" r="11" fill="#FFF" />
          <circle cx="42" cy="52" r="3" fill="#1F2937" />
          <circle cx="58" cy="52" r="3" fill="#1F2937" />
          <circle cx="36" cy="58" r="4" fill="#F87171" opacity="0.6" />
          <circle cx="64" cy="58" r="4" fill="#F87171" opacity="0.6" />
          <polygon points="48,58 52,58 50,60" fill="#1F2937" />
          <path d="M 47,63 Q 50,65 53,63" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case "fox":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
          <polygon points="20,25 42,45 22,55" fill={color} opacity="0.9" />
          <polygon points="80,25 58,45 78,55" fill={color} opacity="0.9" />
          <polygon points="24,31 37,44 26,49" fill="#FEE2E2" />
          <polygon points="76,31 63,44 74,49" fill="#FEE2E2" />
          <path d="M 20,50 Q 50,25 80,50 Q 80,70 50,85 Q 20,70 20,50 Z" fill={color} />
          <path d="M 20,50 Q 38,62 50,62 Q 62,62 80,50 Q 70,75 50,85 Q 30,75 20,50 Z" fill="#FFF" />
          <circle cx="38" cy="48" r="3" fill="#1F2937" />
          <circle cx="62" cy="48" r="3" fill="#1F2937" />
          <circle cx="28" cy="54" r="3.5" fill="#F87171" opacity="0.6" />
          <circle cx="72" cy="54" r="3.5" fill="#F87171" opacity="0.6" />
          <circle cx="50" cy="80" r="4.5" fill="#1F2937" />
        </svg>
      );
    case "owl":
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className={className}>
          <polygon points="25,25 35,35 20,45" fill={color} />
          <polygon points="75,25 65,35 80,45" fill={color} />
          <rect x="24" y="32" width="52" height="52" rx="26" fill={color} />
          <ellipse cx="50" cy="65" rx="18" ry="14" fill="#FFF" opacity="0.8" />
          <path d="M 44,62 Q 50,65 56,62 M 42,67 Q 50,70 58,67" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="39" cy="48" r="11" fill="#FFF" />
          <circle cx="61" cy="48" r="11" fill="#FFF" />
          <circle cx="39" cy="48" r="5" fill="#1F2937" />
          <circle cx="61" cy="48" r="5" fill="#1F2937" />
          <circle cx="37" cy="46" r="1.5" fill="#FFF" />
          <circle cx="59" cy="46" r="1.5" fill="#FFF" />
          <polygon points="46,54 54,54 50,62" fill="#FBBF24" />
        </svg>
      );
    default:
      return null;
  }
};

interface NidoSogniAppProps {
  lang: "it" | "en";
}

export default function NidoSogniApp({ lang = "it" }: NidoSogniAppProps) {
  const [activeTab, setActiveTab] = useState<string>("home");

  // Custom Avatar Generator State
  const [avatarAnimal, setAvatarAnimal] = useState<string>("bunny");
  const [avatarColor, setAvatarColor] = useState<string>("#F472B6"); // soft pink
  const [avatarAccessory, setAvatarAccessory] = useState<string>("none");
  const [kidName, setKidName] = useState<string>("");

  // Interactive Classroom State
  const [selectedClassroom, setSelectedClassroom] = useState<string>("infant");

  // Contact form simulated state
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [bookingName, setBookingName] = useState<string>("");
  const [bookingEmail, setBookingEmail] = useState<string>("");
  const [bookingPhone, setBookingPhone] = useState<string>("");
  const [bookingNote, setBookingNote] = useState<string>("");

  // Pastel Color Options for Avatar
  const colors = [
    { name: lang === "it" ? "Rosa Confetto" : "Sweet Pink", hex: "#F472B6" },
    { name: lang === "it" ? "Azzurro Cielo" : "Sky Blue", hex: "#60A5FA" },
    { name: lang === "it" ? "Menta Fresca" : "Fresh Mint", hex: "#34D399" },
    { name: lang === "it" ? "Giallo Miele" : "Honey Yellow", hex: "#FBBF24" },
    { name: lang === "it" ? "Lilla Sogno" : "Dreamy Lilac", hex: "#C084FC" },
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingPhone) return;
    setFormSubmitted(true);
  };

  const resetForm = () => {
    setBookingName("");
    setBookingEmail("");
    setBookingPhone("");
    setBookingNote("");
    setFormSubmitted(false);
  };

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#FFF5F5] via-[#FFFBF0] to-[#EBF8FF] text-slate-700 font-sans flex flex-col relative overflow-hidden">
      
      {/* HEADER PRESENTAZIONE PREMIUM */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 px-4 py-3 border-b border-pink-100 flex items-center justify-between shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-pink-100 p-1.5 rounded-xl shrink-0">
            <AnimalIcon type="bunny" color="#F472B6" size={24} />
          </div>
          <div className="leading-tight">
            <h1 className="text-sm font-black tracking-tight bg-gradient-to-r from-pink-500 via-purple-500 to-sky-500 bg-clip-text text-transparent">
              {lang === "it" ? "Il Nido dei Sogni" : "Dreamy Nursery"}
            </h1>
            <p className="text-[8px] text-slate-400 font-bold tracking-wider uppercase">
              {lang === "it" ? "Asilo Nido • Macerata" : "Nursery • Macerata"}
            </p>
          </div>
        </div>
        <button
          onClick={() => setActiveTab("contatti")}
          className="bg-gradient-to-r from-pink-500 to-amber-500 text-white font-extrabold text-[10px] px-3 py-1.5 rounded-full shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer uppercase tracking-wider"
        >
          {lang === "it" ? "Prenota Visita" : "Book a Visit"}
        </button>
      </header>

      {/* CONTENUTO PRINCIPALE (SIMULATORE DI WEB APP MOBILE - SCROLLABILE) */}
      <main className="flex-1 overflow-y-auto p-4 pb-24">
        
        {/* TAB 1: HOME PAGE */}
        {activeTab === "home" && (
          <div className="space-y-5 animate-fadeIn">
            
            {/* HERO SECTION */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-100/90 to-amber-100/90 p-5 text-center border border-white/40 shadow-sm">
              <div className="absolute -top-3 -right-3 opacity-15">
                <AnimalIcon type="owl" color="#FBBF24" size={90} />
              </div>
              <span className="inline-block bg-white/95 text-pink-600 text-[9px] font-extrabold px-2.5 py-1 rounded-full mb-2.5 shadow-sm uppercase tracking-wider border border-pink-100">
                🌸 {lang === "it" ? "Iscrizioni Aperte 2026/2027" : "Enrollment Open 2026/2027"}
              </span>
              <h2 className="text-lg font-black text-slate-800 leading-tight">
                {lang === "it" ? (
                  <>Il luogo perfetto per <span className="text-pink-500">crescere</span> giocando.</>
                ) : (
                  <>The perfect place to <span className="text-pink-500">grow</span> through play.</>
                )}
              </h2>
              <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                {lang === "it" 
                  ? "Un nido accogliente, sicuro e innovativo nel cuore di Macerata. Pedagogia attiva, ampi spazi verdi e cucina interna biologica."
                  : "A cozy, safe, and innovative nursery in the heart of Macerata. Active pedagogy, large gardens, and a certified organic kitchen."}
              </p>
              
              <div className="mt-4 flex gap-2 justify-center">
                <button 
                  onClick={() => setActiveTab("tour")} 
                  className="bg-white/90 hover:bg-white text-slate-700 hover:text-pink-500 font-extrabold text-[10px] px-3.5 py-2 rounded-xl shadow-sm border border-pink-100 transition cursor-pointer"
                >
                  {lang === "it" ? "Esplora Spazi 🔍" : "Explore Rooms 🔍"}
                </button>
                <button 
                  onClick={() => setActiveTab("avatar")} 
                  className="bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-[10px] px-3.5 py-2 rounded-xl shadow-sm transition cursor-pointer"
                >
                  {lang === "it" ? "Crea Mascotte 🎨" : "Create Mascot 🎨"}
                </button>
              </div>
            </div>

            {/* SEZIONE VALORI / SERVIZI */}
            <div className="space-y-2.5">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">
                {lang === "it" ? "Perché Sceglierci?" : "Why Choose Us?"}
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="bg-white p-3.5 rounded-2xl border border-pink-100/50 shadow-sm flex flex-col items-center text-center">
                  <div className="bg-emerald-50 w-8 h-8 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-base">🌱</span>
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-800">{lang === "it" ? "Cucina Bio Interna" : "Organic Kitchen"}</h4>
                  <p className="text-[9px] text-slate-400 mt-1 leading-snug">
                    {lang === "it" ? "Menu approvato da pediatri con ingredienti a km 0 marchigiani." : "Pediatric-approved menu with local Marche zero-mile ingredients."}
                  </p>
                </div>
                
                <div className="bg-white p-3.5 rounded-2xl border border-pink-100/50 shadow-sm flex flex-col items-center text-center">
                  <div className="bg-purple-50 w-8 h-8 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-base">🇬🇧</span>
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-800">{lang === "it" ? "Bilinguismo Naturale" : "Natural Bilingualism"}</h4>
                  <p className="text-[9px] text-slate-400 mt-1 leading-snug">
                    {lang === "it" ? "Accostamento all'inglese quotidiano tramite canti e favole." : "Daily English immersion using play-based songs and tales."}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-pink-100/50 shadow-sm flex flex-col items-center text-center">
                  <div className="bg-amber-50 w-8 h-8 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-base">🌳</span>
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-800">{lang === "it" ? "Outdoor Education" : "Outdoor Play"}</h4>
                  <p className="text-[9px] text-slate-400 mt-1 leading-snug">
                    {lang === "it" ? "Ampio giardino protetto per esplorare la natura e raccogliere foglie." : "Protected wooden gardens to safely explore and collect flowers."}
                  </p>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-pink-100/50 shadow-sm flex flex-col items-center text-center">
                  <div className="bg-pink-50 w-8 h-8 rounded-xl flex items-center justify-center mb-2">
                    <span className="text-base">📱</span>
                  </div>
                  <h4 className="text-[11px] font-bold text-slate-800">{lang === "it" ? "Diario Digitale" : "Digital Journal"}</h4>
                  <p className="text-[9px] text-slate-400 mt-1 leading-snug">
                    {lang === "it" ? "Notifiche in tempo reale su pasti, nanne e splendide foto." : "Realtime logs for meals, diaper changes, and magical photos."}
                  </p>
                </div>
              </div>
            </div>

            {/* LE NOSTRE MAESTRE */}
            <div className="bg-white p-4 rounded-3xl border border-pink-100/30 shadow-sm space-y-3">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {lang === "it" ? "Le Nostre Educatrici" : "Our Educators"}
              </h3>
              
              <div className="flex gap-3 overflow-x-auto pb-1 snap-x scrollbar-none no-scrollbar">
                
                <div className="snap-start flex-none w-32 bg-pink-50/50 p-3 rounded-2xl text-center border border-pink-100/20">
                  <div className="w-14 h-14 rounded-full bg-pink-100 mx-auto mb-2 overflow-hidden border-2 border-white shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200" 
                      alt="Maestra Chiara"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-[10px] font-extrabold text-slate-800">
                    {lang === "it" ? "Maestra Chiara" : "Teacher Chiara"}
                  </h4>
                  <p className="text-[8px] text-slate-500 mt-0.5 leading-tight">
                    {lang === "it" ? "Coordinatrice & Green Guide" : "Coordinator & Green Guide"}
                  </p>
                </div>

                <div className="snap-start flex-none w-32 bg-amber-50/50 p-3 rounded-2xl text-center border border-amber-100/20">
                  <div className="w-14 h-14 rounded-full bg-amber-100 mx-auto mb-2 overflow-hidden border-2 border-white shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=200" 
                      alt="Maestra Giulia"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-[10px] font-extrabold text-slate-800">
                    {lang === "it" ? "Maestra Giulia" : "Teacher Giulia"}
                  </h4>
                  <p className="text-[8px] text-slate-500 mt-0.5 leading-tight">
                    {lang === "it" ? "Atelierista d'Arte & Musica" : "Art & Music Educator"}
                  </p>
                </div>

                <div className="snap-start flex-none w-32 bg-sky-50/50 p-3 rounded-2xl text-center border border-sky-100/20">
                  <div className="w-14 h-14 rounded-full bg-sky-100 mx-auto mb-2 overflow-hidden border-2 border-white shadow-sm">
                    <img 
                      src="https://images.unsplash.com/photo-1580894732444-8fecef2271ff?auto=format&fit=crop&q=80&w=200" 
                      alt="Maestra Elena"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="text-[10px] font-extrabold text-slate-800">
                    {lang === "it" ? "Maestra Elena" : "Teacher Elena"}
                  </h4>
                  <p className="text-[8px] text-slate-500 mt-0.5 leading-tight">
                    {lang === "it" ? "Psicomotricista Clinica" : "Clinical Psychomotor"}
                  </p>
                </div>

              </div>
            </div>

            {/* TESTIMONIANZA LOCAL */}
            <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-100/30 text-center space-y-1">
              <p className="italic text-[11px] text-slate-600 leading-relaxed">
                {lang === "it" 
                  ? '"Trovare un nido d\'infanzia così accogliente e professionale a Macerata è stato un miracolo. Il diario quotidiano ci fa stare sereni ad ogni ora!"'
                  : '"Finding such a professional and warm nursery school here in Macerata was a true lifesaver. The live digital journal keeps us relaxed all day long!"'}
              </p>
              <span className="block text-[9px] font-bold text-sky-600">
                — Mamma Valentina & Tommaso
              </span>
            </div>

          </div>
        )}

        {/* TAB 2: VIRTUAL TOUR */}
        {activeTab === "tour" && (
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-base font-black text-slate-800">
                {lang === "it" ? "Esplora i Nostri Spazi" : "Explore Our Settings"}
              </h2>
              <p className="text-[11px] text-slate-500">
                {lang === "it" ? "Struttura pensata a misura di bambino, sicura ed ecosostenibile." : "Bright spaces tailor-made for infants, organic and 100% safe."}
              </p>
            </div>

            {/* SELEZIONE CLASSROOMS */}
            <div className="flex bg-white p-1 rounded-2xl border border-pink-100/60 gap-1 shadow-sm shrink-0">
              <button 
                onClick={() => setSelectedClassroom("infant")}
                className={`flex-1 py-1.5 text-[10px] font-extrabold rounded-xl transition-all cursor-pointer ${selectedClassroom === "infant" ? "bg-pink-500 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}
              >
                👶 {lang === "it" ? "Lattanti" : "Infants"}
              </button>
              <button 
                onClick={() => setSelectedClassroom("play")}
                className={`flex-1 py-1.5 text-[10px] font-extrabold rounded-xl transition-all cursor-pointer ${selectedClassroom === "play" ? "bg-amber-400 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}
              >
                🎨 {lang === "it" ? "Atelier" : "Atelier"}
              </button>
              <button 
                onClick={() => setSelectedClassroom("garden")}
                className={`flex-1 py-1.5 text-[10px] font-extrabold rounded-xl transition-all cursor-pointer ${selectedClassroom === "garden" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}
              >
                🌳 {lang === "it" ? "Giardino" : "Garden"}
              </button>
            </div>

            {/* HIGH QUALITY PREMIUM PHOTO AND CORRESPONDING DESCRIPTION */}
            <div className="bg-white p-3 rounded-3xl border border-pink-100/30 shadow-sm space-y-4">
              <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100 shadow-inner flex flex-col justify-end">
                
                {/* Real beautiful Unsplash photo background */}
                {selectedClassroom === "infant" && (
                  <img 
                    src="https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&q=80&w=600" 
                    alt="Sezione Lattanti"
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                {selectedClassroom === "play" && (
                  <img 
                    src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600" 
                    alt="Atelier Creativo"
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                {selectedClassroom === "garden" && (
                  <img 
                    src="https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&q=80&w=600" 
                    alt="Giardino delle Fiabe"
                    className="absolute inset-0 w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}

                {/* Dark transparent gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Content over image */}
                <div className="relative p-4 z-10 text-white">
                  <div className="flex gap-1.5 mb-1 flex-wrap">
                    <span className="bg-white/20 backdrop-blur-md text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
                      {selectedClassroom === "infant" && (lang === "it" ? "Culle in legno" : "Natural cribs")}
                      {selectedClassroom === "play" && (lang === "it" ? "Montessori" : "Montessori")}
                      {selectedClassroom === "garden" && (lang === "it" ? "Giardino Protetto" : "Protected Park")}
                    </span>
                    <span className="bg-[#00ff88]/30 backdrop-blur-md text-[8px] font-black px-2 py-0.5 rounded text-[#00ff88] uppercase tracking-wider">
                      {lang === "it" ? "Sicurezza 100%" : "100% Safe"}
                    </span>
                  </div>
                  
                  <h3 className="text-sm font-extrabold">
                    {selectedClassroom === "infant" && (lang === "it" ? "La Stanza dei Sogni" : "The Dream Room")}
                    {selectedClassroom === "play" && (lang === "it" ? "Atelier dei Piccoli Artisti" : "Tiny Artists Atelier")}
                    {selectedClassroom === "garden" && (lang === "it" ? "L'Orto delle Fiabe e Natura" : "Fairytale Nursery Gardens")}
                  </h3>
                </div>
              </div>

              {/* Text Description Box */}
              <div className="space-y-2">
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  {selectedClassroom === "infant" && (
                    lang === "it" 
                      ? "Il nido dei lattanti dispone di culle biologiche di betulla, pavimentazione anti-trauma imbottita, termoregolazione costante e una sala allattamento riservata per le mamme."
                      : "The infant section offers organic birchwood cribs, padded medical-grade flooring, constant dynamic climate control, and a dedicated lactation room for mothers."
                  )}
                  {selectedClassroom === "play" && (
                    lang === "it" 
                      ? "Un atelier luminoso provvisto di giochi sensoriali di pezza, tavole luminose regolate, colori commestibili a base di amido di riso ed elementi naturali per la manipolazione."
                      : "A sunny sensory workshop fitted with bespoke wooden tables, organic rice-based paint pots, wool artifacts, and natural materials to explore textures safely."
                  )}
                  {selectedClassroom === "garden" && (
                    lang === "it" 
                      ? "Un giardino erboso sicuro di oltre 300mq con alberi da frutto, piccoli filari per l'educazione botanica e giochi all'aperto in legno certificato FSC."
                      : "Over 300sqm of pristine, childproof organic grass area featuring flower fields, friendly vegetable patches, and customized wooden climbing structures."
                  )}
                </p>

                {/* Safety checklist badges */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-pink-100/10">
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 text-xs font-bold">✔</span>
                    <span className="text-[9px] font-medium text-slate-600">
                      {lang === "it" ? "Materiali anallergici" : "Allergy-safe woods"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-500 text-xs font-bold">✔</span>
                    <span className="text-[9px] font-medium text-slate-600">
                      {lang === "it" ? "Accesso videosorvegliato" : "Secure security cameras"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* VIDEO TOUR TEASER */}
            <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200/40 flex items-center gap-3">
              <span className="text-xl shrink-0">📹</span>
              <div>
                <h4 className="text-[11px] font-bold text-slate-800">
                  {lang === "it" ? "Vorresti fare una video-visita?" : "Want a live video tour?"}
                </h4>
                <p className="text-[9px] text-slate-500 leading-tight">
                  {lang === "it" 
                    ? "La maestra ti mostrerà le sezioni in diretta video con WhatsApp o Teams!" 
                    : "An educator will guide you through the classroom live via WhatsApp or Meet!"}
                </p>
              </div>
              <button 
                onClick={() => setActiveTab("contatti")} 
                className="ml-auto bg-amber-400 text-white text-[9px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-sm cursor-pointer"
              >
                {lang === "it" ? "Prenota" : "Book"} ➜
              </button>
            </div>

          </div>
        )}

        {/* TAB 3: DIARIO DI BORDO SIMULATOR */}
        {activeTab === "diario" && (
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-base font-black text-slate-800">
                {lang === "it" ? "Diario di Bordo Digitale" : "Digital Live Diary"}
              </h2>
              <p className="text-[11px] text-slate-500">
                {lang === "it" ? "Ecco come l'applicazione tiene aggiornata la famiglia in tempo reale." : "How our dedicated system logs feed, sleep, and happiness updates."}
              </p>
            </div>

            {/* LIVE TIMELINE SIMULATOR */}
            <div className="bg-white p-4.5 rounded-3xl border border-pink-100/30 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider">
                    {lang === "it" ? "Registrazioni di Oggi" : "Today's Live Journal"}
                  </span>
                </div>
                <span className="text-[9px] bg-pink-100 text-pink-700 font-extrabold px-2 py-0.5 rounded-full">
                  {lang === "it" ? "Bimbo: Leonardo 👶" : "Child: Leonardo 👶"}
                </span>
              </div>

              <div className="space-y-4">
                {/* Event 1 */}
                <div className="flex gap-2.5">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="bg-sky-100 w-7 h-7 rounded-full flex items-center justify-center">
                      <span className="text-xs">🥣</span>
                    </div>
                    <div className="w-0.5 flex-grow bg-slate-150 my-1"></div>
                  </div>
                  <div className="pb-1">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">
                      {lang === "it" ? "Ore 12:15 • PRANZO" : "12:15 PM • LUNCH"}
                    </span>
                    <h4 className="text-[11px] font-bold text-slate-800">
                      {lang === "it" ? "Pappa Spazzolata! 🥣" : "Super Hungry Meal! 🥣"}
                    </h4>
                    <p className="text-[9px] text-slate-500 mt-0.5 leading-relaxed">
                      {lang === "it" 
                        ? "Oggi vellutata bio di zucca marchigiana, dadini di formaggio morbido e pane di grano antico. Ha divorato tutto!"
                        : "Organic pumpkin soup with fresh local cheese curds and organic bread. He absolutely loved it and asked for seconds!"}
                    </p>
                  </div>
                </div>

                {/* Event 2 */}
                <div className="flex gap-2.5">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="bg-amber-100 w-7 h-7 rounded-full flex items-center justify-center">
                      <span className="text-xs">💤</span>
                    </div>
                    <div className="w-0.5 flex-grow bg-slate-150 my-1"></div>
                  </div>
                  <div className="pb-1">
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">
                      {lang === "it" ? "Ore 13:30 • NANNA" : "1:30 PM • NAP TIME"}
                    </span>
                    <h4 className="text-[11px] font-bold text-slate-800">
                      {lang === "it" ? "Sogni d'Oro 💤" : "Sweet dreams 💤"}
                    </h4>
                    <p className="text-[9px] text-slate-500 mt-0.5 leading-relaxed">
                      {lang === "it" 
                        ? "Si è addormentato in soli 5 minuti sul suo lettino con la musica del carillon. Molto rilassato."
                        : "Fell asleep smoothly inside his custom wooden cot with beautiful ambient chimes playing. Sleeping deeply."}
                    </p>
                  </div>
                </div>

                {/* Event 3 */}
                <div className="flex gap-2.5">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="bg-purple-100 w-7 h-7 rounded-full flex items-center justify-center">
                      <span className="text-xs">🎨</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-slate-400 uppercase tracking-wider">
                      {lang === "it" ? "Ore 15:30 • LABORATORIO" : "3:30 PM • PLAY"}
                    </span>
                    <h4 className="text-[11px] font-bold text-slate-800">
                      {lang === "it" ? "Manipolazione Sensoriale 🎨" : "Sensory Workshop 🎨"}
                    </h4>
                    <p className="text-[9px] text-slate-500 mt-0.5 leading-relaxed">
                      {lang === "it" 
                        ? "Leo ha lavorato alla manipolazione di panetti di pasta di sale biologica colorati con succo di spinaci e barbabietola."
                        : "Leo participated in shaping organic flour dough dyed with spinach juice and sweet carrots. Great fine-motor feedback."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Realtime Stats */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center">
                <div className="bg-emerald-50/50 p-2 rounded-xl border border-emerald-100/10">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                    {lang === "it" ? "Pasto" : "Lunch"}
                  </span>
                  <span className="text-[10px] font-black text-emerald-600">
                    {lang === "it" ? "Completo" : "Finished"}
                  </span>
                </div>
                <div className="bg-amber-50/50 p-2 rounded-xl border border-amber-100/10">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                    {lang === "it" ? "Riposo" : "Nap"}
                  </span>
                  <span className="text-[10px] font-black text-amber-600">
                    1h 45m
                  </span>
                </div>
                <div className="bg-purple-50/50 p-2 rounded-xl border border-purple-100/10">
                  <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-wider">
                    {lang === "it" ? "Umore" : "Mood"}
                  </span>
                  <span className="text-[10px] font-black text-purple-600">
                    {lang === "it" ? "Felicissimo" : "Very Happy"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: AVATAR CREATOR */}
        {activeTab === "avatar" && (
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-base font-black text-slate-800">
                {lang === "it" ? "Crea l'Avatar Mascotte" : "Design the Mascot"}
              </h2>
              <p className="text-[11px] text-slate-500">
                {lang === "it" 
                  ? "Personalizza la simpatica mascotte del tuo bambino per l'armadietto di scuola!" 
                  : "Customize a sweet animal friend for your child's wooden personal cabinet!"}
              </p>
            </div>

            {/* PREVIEW CONTAINER */}
            <div className="bg-white p-5 rounded-3xl border border-pink-100/30 shadow-sm flex flex-col items-center justify-center space-y-3.5">
              
              <div 
                className="w-36 h-36 rounded-full flex items-center justify-center relative shadow-inner transition-all duration-300"
                style={{ backgroundColor: `${avatarColor}20`, border: `4px solid ${avatarColor}` }}
              >
                <AnimalIcon type={avatarAnimal} color={avatarColor} size={90} />
                
                {/* Accessory overlay */}
                {avatarAccessory === "crown" && (
                  <span className="absolute top-2 text-2xl animate-bounce">👑</span>
                )}
                {avatarAccessory === "glasses" && (
                  <span className="absolute top-1/2 -translate-y-5 text-xl">👓</span>
                )}
                {avatarAccessory === "balloon" && (
                  <span className="absolute bottom-2 -right-1 text-2xl animate-pulse">🎈</span>
                )}
              </div>

              {/* Kid Badge Display */}
              <div className="text-center space-y-0.5">
                <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">
                  {lang === "it" ? "Mascotte di" : "Mascot for"}
                </span>
                <p className="text-sm font-black text-slate-800 min-h-[20px]">
                  {kidName ? kidName : (lang === "it" ? "Digita il nome sotto..." : "Enter name below...")}
                </p>
              </div>
            </div>

            {/* CONTROLS */}
            <div className="bg-white p-4 rounded-3xl border border-pink-100/30 shadow-sm space-y-3.5">
              
              {/* Input Nome */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  {lang === "it" ? "Nome del Bambino" : "Child's Name"}
                </label>
                <input 
                  type="text" 
                  placeholder={lang === "it" ? "Scrivi qui il suo nome..." : "Type their name..."}
                  value={kidName}
                  onChange={(e) => setKidName(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300 bg-slate-50/50"
                />
              </div>

              {/* Scelta Animale */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  {lang === "it" ? "Seleziona Animale" : "Choose Animal"}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: "bunny", label: lang === "it" ? "Coniglio" : "Bunny" },
                    { id: "bear", label: lang === "it" ? "Orsetto" : "Bear" },
                    { id: "fox", label: lang === "it" ? "Volpe" : "Fox" },
                    { id: "owl", label: lang === "it" ? "Gufo" : "Owl" }
                  ].map((animal) => (
                    <button
                      key={animal.id}
                      onClick={() => setAvatarAnimal(animal.id)}
                      className={`py-1.5 text-[9px] font-black rounded-lg border transition cursor-pointer ${avatarAnimal === animal.id ? "bg-pink-500 text-white border-pink-500" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`}
                    >
                      {animal.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scelta Colore */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  {lang === "it" ? "Colore della Mascotte" : "Mascot Color"}
                </label>
                <div className="flex gap-2 justify-between">
                  {colors.map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => setAvatarColor(col.hex)}
                      className={`w-7 h-7 rounded-full border-2 transition-transform cursor-pointer ${avatarColor === col.hex ? "scale-110 border-slate-700 shadow-sm" : "border-transparent"}`}
                      style={{ backgroundColor: col.hex }}
                      title={col.name}
                    />
                  ))}
                </div>
              </div>

              {/* Scelta Accessorio */}
              <div className="space-y-1">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                  {lang === "it" ? "Aggiungi un Accessorio" : "Add an Accessory"}
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { id: "none", label: lang === "it" ? "Nessuno" : "None" },
                    { id: "crown", label: lang === "it" ? "Corona 👑" : "Crown 👑" },
                    { id: "glasses", label: lang === "it" ? "Occhiali 👓" : "Glasses 👓" },
                    { id: "balloon", label: lang === "it" ? "Pallone 🎈" : "Balloon 🎈" }
                  ].map((acc) => (
                    <button
                      key={acc.id}
                      onClick={() => setAvatarAccessory(acc.id)}
                      className={`py-1.5 text-[9px] font-black rounded-lg border transition cursor-pointer ${avatarAccessory === acc.id ? "bg-amber-400 text-slate-800 border-amber-400" : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"}`}
                    >
                      {acc.label}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: CONTATTI */}
        {activeTab === "contatti" && (
          <div className="space-y-5 animate-fadeIn">
            <div className="text-center">
              <h2 className="text-base font-black text-slate-800">
                {lang === "it" ? "Parla con le Maestre" : "Get in Touch"}
              </h2>
              <p className="text-[11px] text-slate-500">
                {lang === "it" 
                  ? "Pianifica un incontro personalizzato ed esplora l'asilo con la tua famiglia." 
                  : "Book a personalized consultation and tour our organic school."}
              </p>
            </div>

            {/* INFO RAPIDE */}
            <div className="bg-white p-3.5 rounded-2xl border border-pink-100/30 shadow-sm space-y-2.5">
              <div className="flex items-center gap-3">
                <span className="text-base shrink-0">📍</span>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase leading-none">Indirizzo</h4>
                  <p className="text-[11px] text-slate-800 font-medium mt-1">Via della Fiaba, 12, Macerata (MC)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base shrink-0">📞</span>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase leading-none">Telefono / WhatsApp</h4>
                  <p className="text-[11px] text-slate-800 font-medium mt-1">+39 345 678 9101</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-base shrink-0">✉️</span>
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase leading-none">Email</h4>
                  <p className="text-[11px] text-slate-800 font-medium mt-1">direzione@ilnidodeisognimacerata.it</p>
                </div>
              </div>
            </div>

            {/* FORM DI PRENOTAZIONE */}
            <div className="bg-white p-4.5 rounded-3xl border border-pink-100/30 shadow-sm">
              {!formSubmitted ? (
                <form onSubmit={handleBookingSubmit} className="space-y-3">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    {lang === "it" ? "Richiedi Informazioni o Prenota Tour" : "Request Info or School Tour"}
                  </h3>
                  
                  <div>
                    <input 
                      type="text" 
                      placeholder={lang === "it" ? "Nome e Cognome Genitore" : "Parent's Full Name"} 
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </div>

                  <div>
                    <input 
                      type="email" 
                      placeholder={lang === "it" ? "Indirizzo Email" : "Email Address"} 
                      required
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </div>

                  <div>
                    <input 
                      type="tel" 
                      placeholder={lang === "it" ? "Numero di Telefono" : "Phone Number"} 
                      required
                      value={bookingPhone}
                      onChange={(e) => setBookingPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                    />
                  </div>

                  <div>
                    <textarea 
                      placeholder={lang === "it" ? "Domande o note (età del bambino, preferenze orario...)" : "Additional info (child age, specific requests, hours...)"} 
                      rows={3}
                      value={bookingNote}
                      onChange={(e) => setBookingNote(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-300"
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-amber-400 text-white font-extrabold text-xs rounded-xl shadow-md hover:scale-[1.01] active:scale-95 transition-all uppercase tracking-wider cursor-pointer"
                  >
                    {lang === "it" ? "Invia Richiesta ✨" : "Send Request ✨"}
                  </button>
                </form>
              ) : (
                <div className="text-center py-4 space-y-3 animate-scaleUp">
                  <span className="text-4xl inline-block animate-bounce">💌</span>
                  <h3 className="text-sm font-black text-slate-800">
                    {lang === "it" ? `Grazie ${bookingName}!` : `Thank you ${bookingName}!`}
                  </h3>
                  <p className="text-[11px] text-slate-500 px-2 leading-relaxed">
                    {lang === "it" 
                      ? "La Coordinatrice Chiara ha ricevuto la tua richiesta. Ti contatteremo telefonicamente entro 24 ore per confermare l'orario della tua visita!"
                      : "Our director Chiara has received your booking inquiry. We'll give you a quick phone call within 24 hours to organize your personal tour!"}
                  </p>
                  <button 
                    onClick={resetForm}
                    className="text-[10px] font-extrabold text-pink-500 hover:underline pt-2 block mx-auto cursor-pointer"
                  >
                    {lang === "it" ? "Invia un'altra richiesta" : "Send another inquiry"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      {/* FOOTER DI NAVIGAZIONE MOBILE-NATIVE */}
      <footer className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-pink-100 shadow-xl py-1.5 px-2 flex justify-around items-center z-40 shrink-0">
        
        <button 
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${activeTab === "home" ? "text-pink-500 font-extrabold bg-pink-50/50" : "text-slate-400 hover:text-slate-600"}`}
        >
          <span className="text-sm">🏠</span>
          <span className="text-[8px] tracking-tight font-extrabold uppercase">Home</span>
        </button>

        <button 
          onClick={() => setActiveTab("tour")}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${activeTab === "tour" ? "text-amber-500 font-extrabold bg-amber-50/50" : "text-slate-400 hover:text-slate-600"}`}
        >
          <span className="text-sm">🔍</span>
          <span className="text-[8px] tracking-tight font-extrabold uppercase">{lang === "it" ? "Spazi" : "Rooms"}</span>
        </button>

        <button 
          onClick={() => setActiveTab("diario")}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${activeTab === "diario" ? "text-sky-500 font-extrabold bg-sky-50/50" : "text-slate-400 hover:text-slate-600"}`}
        >
          <span className="text-sm">📱</span>
          <span className="text-[8px] tracking-tight font-extrabold uppercase">{lang === "it" ? "Diario" : "Logs"}</span>
        </button>

        <button 
          onClick={() => setActiveTab("avatar")}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${activeTab === "avatar" ? "text-purple-500 font-extrabold bg-purple-50/50" : "text-slate-400 hover:text-slate-600"}`}
        >
          <span className="text-sm">🎨</span>
          <span className="text-[8px] tracking-tight font-extrabold uppercase">Mascotte</span>
        </button>

        <button 
          onClick={() => setActiveTab("contatti")}
          className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition-all cursor-pointer ${activeTab === "contatti" ? "text-emerald-500 font-extrabold bg-emerald-50/50" : "text-slate-400 hover:text-slate-600"}`}
        >
          <span className="text-sm">✉️</span>
          <span className="text-[8px] tracking-tight font-extrabold uppercase">{lang === "it" ? "Visita" : "Visit"}</span>
        </button>

      </footer>
    </div>
  );
}
