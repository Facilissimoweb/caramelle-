import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, RotateCw, Sparkles } from "lucide-react";

interface Flashcard {
  frontIt: string;
  backIt: string;
  hintIt: string;
  frontEn: string;
  backEn: string;
  hintEn: string;
}

const flashcardsData: Flashcard[] = [
  {
    frontIt: "Fase 1: Setup e Sviluppo",
    backIt: "Fase iniziale una tantum per la progettazione, creazione e messa online del sito.",
    hintIt: "È il punto di partenza del progetto.",
    frontEn: "Phase 1: Setup & Development",
    backEn: "One-time initial phase for designing, building, and launching the website.",
    hintEn: "The starting point of the project.",
  },
  {
    frontIt: "Obiettivo Hero Section",
    backIt: "Comunicare il valore dell'attività in modo chiaro entro i primi 3 secondi.",
    hintIt: "Riguarda l'impatto immediato.",
    frontEn: "Hero Section Goal",
    backEn: "Communicate the business value clearly within the first 3 seconds.",
    hintEn: "Focuses on immediate impact.",
  },
  {
    frontIt: "Design Moderno",
    backIt: "Struttura personalizzata, ultraleggera, veloce e ottimizzata per mobile e SEO.",
    hintIt: "Pensa alla velocità e facilità d'uso.",
    frontEn: "Modern Design",
    backEn: "Customized, lightweight, ultra-fast structure optimized for mobile and SEO.",
    hintEn: "Speed and ease of use.",
  },
  {
    frontIt: "Architettura e CTA",
    backIt: "Percorsi di navigazione mirati e moduli studiati per generare contatti qualificati.",
    hintIt: "Serve a trasformare visitatori in clienti.",
    frontEn: "Architecture & CTA",
    backEn: "Targeted navigation flows and forms designed to generate qualified leads.",
    hintEn: "Converts visitors into clients.",
  },
  {
    frontIt: "Messa Online",
    backIt: "Configurazione dominio, e-mail, analisi dei dati e conformità legale.",
    hintIt: "Tutto per rendere il sito operativo.",
    frontEn: "Launch & Go-Live",
    backEn: "Domain configuration, email setup, analytics, and legal compliance.",
    hintEn: "Everything to make the site operational.",
  },
  {
    frontIt: "Fase 2: Gestione Continua",
    backIt: "Servizio in abbonamento che include manutenzione, sicurezza e aggiornamenti.",
    hintIt: "La formula SaaS del servizio.",
    frontEn: "Phase 2: Managed Subscription",
    backEn: "Subscription service including ongoing maintenance, active security, and updates.",
    hintEn: "The SaaS formula of the service.",
  },
  {
    frontIt: "Manutenzione e Sicurezza",
    backIt: "Monitoraggio server, aggiornamenti tecnici, backup e protezione attiva.",
    hintIt: "Garantisce che il sito sia sempre protetto.",
    frontEn: "Maintenance & Security",
    backEn: "Server monitoring, technical updates, backups, and active protection.",
    hintEn: "Ensures the site stays safe and online.",
  },
  {
    frontIt: "Aggiornamento Contenuti",
    backIt: "Modifica testi, recensioni e listini inclusi senza costi extra.",
    hintIt: "Niente preventivi per piccole modifiche.",
    frontEn: "Content Updates",
    backEn: "Edits to copy, reviews, and price lists included without extra charges.",
    hintEn: "No separate quotes for small updates.",
  },
  {
    frontIt: "Evoluzione Continua",
    backIt: "Adattamento regolare del sito in base all'analisi dei dati di traffico.",
    hintIt: "Il sito cresce con la tua attività.",
    frontEn: "Continuous Evolution",
    backEn: "Regular site adaptations based on real user traffic data.",
    hintEn: "Your site grows with your business.",
  },
  {
    frontIt: "Vantaggio Setup",
    backIt: "Un sito pronto a convertire visitatori in clienti dal primo giorno.",
    hintIt: "Risultato immediato della Fase 1.",
    frontEn: "Setup Advantage",
    backEn: "A website ready to convert visitors into customers from day one.",
    hintEn: "Immediate outcome of Phase 1.",
  },
  {
    frontIt: "Vantaggio Canone",
    backIt: "Zero pensieri tecnici e uno strumento digitale sempre aggiornato.",
    hintIt: "Tranquillità a lungo termine.",
    frontEn: "Subscription Advantage",
    backEn: "Zero technical worries and a digital tool always up-to-date.",
    hintEn: "Long-term peace of mind.",
  },
  {
    frontIt: "Il Problema Tradizionale",
    backIt: "Alto investimento iniziale e rapida obsolescenza tecnica.",
    hintIt: "Cosa succede se il sito viene abbandonato.",
    frontEn: "Traditional Problem",
    backEn: "High upfront investment followed by rapid technical obsolescence.",
    hintEn: "What happens when a site is left unmanaged.",
  },
  {
    frontIt: "Copywriting Strategico",
    backIt: "Testi che eliminano il gergo tecnico per essere subito comprensibili.",
    hintIt: "Niente parole complicate.",
    frontEn: "Strategic Copywriting",
    backEn: "Clear, jargon-free copy that communicates value immediately.",
    hintEn: "No complicated fluff.",
  },
  {
    frontIt: "Ottimizzazione Mobile",
    backIt: "Garantire che il sito funzioni perfettamente su smartphone e tablet.",
    hintIt: "Fondamentale per la SEO.",
    frontEn: "Mobile Optimization",
    backEn: "Ensuring flawless performance on smartphones and tablets.",
    hintEn: "Essential for search rankings.",
  },
  {
    frontIt: "Moduli di Contatto",
    backIt: "Strumenti ottimizzati per raccogliere lead e richieste dai clienti.",
    hintIt: "Essenziale per convertire.",
    frontEn: "Contact Forms",
    backEn: "Optimized forms built to capture customer inquiries and leads.",
    hintEn: "Key to driving conversions.",
  },
  {
    frontIt: "SaaS in Facilissimo Web",
    backIt: "Hosting, manutenzione, sicurezza, aggiornamenti e supporto.",
    hintIt: "Tutto il pacchetto post-lancio.",
    frontEn: "SaaS at Facilissimo Web",
    backEn: "Hosting, maintenance, security, updates, and direct support.",
    hintEn: "The complete post-launch package.",
  },
  {
    frontIt: "Frequenza backup",
    backIt: "Salvataggi periodici per prevenire la perdita di informazioni.",
    hintIt: "Sicurezza dei dati inclusa.",
    frontEn: "Backup Frequency",
    backEn: "Regular automated backups to prevent any data loss.",
    hintEn: "Data security included.",
  },
  {
    frontIt: "Analisi Traffico",
    backIt: "Monitoraggio del comportamento degli utenti per migliorare le performance.",
    hintIt: "Dati per l'evoluzione continua.",
    frontEn: "Traffic Analytics",
    backEn: "User behavior tracking to continuously boost performance.",
    hintEn: "Data for continuous evolution.",
  },
  {
    frontIt: "Presenza Senza Ansia",
    backIt: "Gestione tecnica affidata interamente a professionisti.",
    hintIt: "Il valore emotivo per il cliente.",
    frontEn: "Worry-Free Web Presence",
    backEn: "Technical management handled entirely by expert care.",
    hintEn: "Peace of mind for the client.",
  },
  {
    frontIt: "Conformità Legale",
    backIt: "Configurazione degli aspetti normativi (Privacy/Cookie) necessari.",
    hintIt: "Aspetto legale gestito.",
    frontEn: "Legal Compliance",
    backEn: "Setup of necessary regulatory standards (Privacy Policy & Cookie Consent).",
    hintEn: "Compliance fully handled.",
  },
  {
    frontIt: "Affiancamento",
    backIt: "Supporto continuo: non sei mai lasciato solo dopo il lancio.",
    hintIt: "Supporto post-vendita costante.",
    frontEn: "Ongoing Support",
    backEn: "Continuous guidance: you are never left alone after launch.",
    hintEn: "Constant post-launch support.",
  },
  {
    frontIt: "Codice Pulito",
    backIt: "Sviluppo ottimizzato per tempi di caricamento minimi.",
    hintIt: "Opposto di un sito pesante.",
    frontEn: "Clean Code",
    backEn: "Optimized code built for lightning-fast loading speeds.",
    hintEn: "The opposite of bloated sites.",
  },
  {
    frontIt: "Costi Imprevisti",
    backIt: "Eliminati grazie alla formula in abbonamento tutto incluso.",
    hintIt: "Vantaggio economico SaaS.",
    frontEn: "Unexpected Costs",
    backEn: "Completely eliminated thanks to the all-inclusive subscription model.",
    hintEn: "Economic advantage of SaaS.",
  },
  {
    frontIt: "Aggiornamento Listini",
    backIt: "Prezzi sempre corretti senza dover pagare extra ogni volta.",
    hintIt: "Gestione contenuti inclusa.",
    frontEn: "Pricing & List Updates",
    backEn: "Always accurate pricing without paying extra fees for small edits.",
    hintEn: "Content management included.",
  },
  {
    frontIt: "Regola dei 3 Secondi",
    backIt: "Tempo massimo per convincere un visitatore a non abbandonare il sito.",
    hintIt: "Obiettivo della Hero Section.",
    frontEn: "The 3-Second Rule",
    backEn: "The crucial window to engage a visitor before they bounce.",
    hintEn: "The primary objective of the Hero Section.",
  },
];

interface WaasFlashcardsProps {
  lang: "it" | "en";
}

export const WaasFlashcards: React.FC<WaasFlashcardsProps> = ({ lang }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const isIt = lang === "it";

  const total = flashcardsData.length;
  const currentCard = flashcardsData[currentIndex];

  const handleFlip = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
    }, 150);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === " " || e.key === "Enter") {
        // Prevent scroll on space
        if (document.activeElement?.tagName !== "BUTTON") {
          e.preventDefault();
          handleFlip();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex]);

  const frontText = isIt ? currentCard.frontIt : currentCard.frontEn;
  const backText = isIt ? currentCard.backIt : currentCard.backEn;
  const hintText = isIt ? currentCard.hintIt : currentCard.hintEn;

  return (
    <div className="w-full max-w-xl mx-auto my-12 flex flex-col items-center select-none">
      {/* HEADER */}
      <div className="text-center mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>FACILISSIMO WEB • FLASHCARDS</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-display font-bold tracking-tight text-[#111113]">
          {isIt ? "Scopri il Modello Web-as-a-Service" : "Explore the Web-as-a-Service Model"}
        </h3>
        <p className="text-xs text-[#111113]/60 font-mono uppercase tracking-wider">
          {isIt ? "Tocca la carta per scoprire i dettagli • Usa le frecce per navigare" : "Tap card to flip • Use arrows to navigate"}
        </p>
      </div>

      {/* CARD CONTAINER */}
      <div 
        className="w-full max-w-[500px] h-[340px] cursor-pointer"
        onClick={handleFlip}
        style={{ perspective: "1000px" }}
      >
        <div
          className="relative w-full h-full text-center transition-transform duration-500 rounded-none shadow-md"
          style={{
            transformStyle: "preserve-3d",
            transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* FRONT */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col justify-between items-center p-8 bg-white border-2 border-black"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-full flex items-center justify-between border-b border-black/10 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 font-bold">
                {isIt ? "CONCETTO" : "CONCEPT"}
              </span>
              <RotateCw className="w-3.5 h-3.5 opacity-40 hover:opacity-100 transition-opacity" />
            </div>

            <div className="my-auto space-y-3 px-2">
              <h2 className="text-xl sm:text-2xl font-display font-bold uppercase tracking-tight leading-snug text-[#111113]">
                {frontText}
              </h2>
            </div>

            <div className="w-full pt-3 border-t border-black/10">
              <p className="text-xs font-sans italic text-black/50">
                💡 {hintText}
              </p>
            </div>
          </div>

          {/* BACK */}
          <div
            className="absolute inset-0 w-full h-full flex flex-col justify-between items-center p-8 bg-black text-white border-2 border-black"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="w-full flex items-center justify-between border-b border-white/20 pb-3">
              <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 font-bold text-amber-400">
                {isIt ? "SOLUZIONE FACILISSIMO WEB" : "FACILISSIMO WEB SOLUTION"}
              </span>
              <RotateCw className="w-3.5 h-3.5 opacity-60 hover:opacity-100 transition-opacity" />
            </div>

            <div className="my-auto px-2">
              <p className="text-base sm:text-lg font-sans font-light leading-relaxed text-white/95">
                {backText}
              </p>
            </div>

            <div className="w-full pt-3 border-t border-white/20">
              <p className="text-[11px] font-mono tracking-wider uppercase opacity-50">
                {isIt ? "Tocca per tornare al concetto" : "Tap to return to concept"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex items-center justify-between w-full max-w-[500px] mt-8 px-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-black bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all shadow-sm"
          aria-label="Card precedente"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>{isIt ? "Indietro" : "Prev"}</span>
        </button>

        <span className="text-xs font-mono font-bold tracking-tighter text-[#111113]">
          {String(currentIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="inline-flex items-center gap-2 px-5 py-2.5 border border-black bg-white text-black font-mono text-xs uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-all shadow-sm"
          aria-label="Card successiva"
        >
          <span>{isIt ? "Avanti" : "Next"}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* PROGRESS BAR */}
      <div className="w-full max-w-[500px] mt-4 px-2">
        <div className="w-full h-1 bg-black/10 overflow-hidden">
          <div
            className="h-full bg-black transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
