import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ProposteView from "./components/ProposteView";
import ContattiView from "./components/ContattiView";
import ChatView from "./components/ChatView";
import InfoModal from "./components/InfoModal";

const SEO_METADATA: Record<string, { title: string; description: string; keywords: string }> = {
  home: {
    title: "Facilissimo Web — Realizzazione Siti Web Macerata e Marche",
    description: "Studio Facilissimo Web a Macerata (Marche). Progettazione e realizzazione siti web veloci, moderni e ottimizzati SEO con Intelligenza Artificiale di M. Teresa Rogani.",
    keywords: "realizzazione siti web macerata, web designer marche, siti web veloci marche, siti web economici macerata, intelligenza artificiale macerata, seo macerata, m teresa rogani",
  },
  "chi-sono": {
    title: "Chi Sono — Facilissimo Web | Teresa Rogani Web Designer Macerata",
    description: "Scopri chi c'è dietro Facilissimo Web. M. Teresa Rogani, freelance web designer e AI specialist a Macerata, Marche. Creazione siti web professionali e su misura.",
    keywords: "teresa rogani, freelance web designer macerata, ai specialist marche, realizzazione siti web professionali marche, sviluppo siti web marche",
  },
  proposte: {
    title: "Proposte e Listino Prezzi — Facilissimo Web Macerata",
    description: "Piani e prezzi trasparenti per la creazione del tuo sito web professionale nelle Marche. Soluzioni Landing Page, siti multipagina e e-commerce con IA integrata.",
    keywords: "prezzi siti web macerata, costo sito internet marche, preventivo sito web macerata, listino prezzi web agency macerata",
  },
  contatti: {
    title: "Contatti — Facilissimo Web | Preventivo Sito Web Macerata",
    description: "Richiedi un preventivo gratuito per il tuo nuovo sito web a Macerata e nelle Marche. Scrivi a facilissimoweb.mc@gmail.com o chiama il +39 379 360 3321.",
    keywords: "contatti web designer macerata, telefono facilissimo web, email facilissimo web, preventivo sito internet macerata",
  },
  chat: {
    title: "Assistente AI Live — Facilissimo Web Macerata",
    description: "Parla subito con il nostro Assistente Virtuale basato su IA. Ricevi risposte istantanee su servizi, tempi e prezzi per siti web a Macerata e nelle Marche.",
    keywords: "chat ai macerata, assistente virtuale marche, intelligenza artificiale assistente, consulenza ai marche",
  },
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [lang, setLang] = useState<"it" | "en">("it");
  const [isFacilitated, setIsFacilitated] = useState<boolean>(() => {
    const saved = localStorage.getItem("facilissimo-facil");
    return saved === "true";
  });
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "ethics" | null>(null);

  // SEO Dynamic Updates
  useEffect(() => {
    const meta = SEO_METADATA[currentTab] || SEO_METADATA.home;
    
    // Set Document Title
    document.title = meta.title;

    // Set or Update Meta Description
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', meta.description);

    // Set or Update Meta Keywords
    let keywordsTag = document.querySelector('meta[name="keywords"]');
    if (!keywordsTag) {
      keywordsTag = document.createElement('meta');
      keywordsTag.setAttribute('name', 'keywords');
      document.head.appendChild(keywordsTag);
    }
    keywordsTag.setAttribute('content', meta.keywords);

    // Set or Update OpenGraph Tags
    const ogTags = [
      { property: "og:title", content: meta.title },
      { property: "og:description", content: meta.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: window.location.href }
    ];

    ogTags.forEach(({ property, content }) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (!ogTag) {
        ogTag = document.createElement('meta');
        ogTag.setAttribute('property', property);
        document.head.appendChild(ogTag);
      }
      ogTag.setAttribute('content', content);
    });
  }, [currentTab]);

  useEffect(() => {
    localStorage.setItem("facilissimo-lang", lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("facilissimo-facil", String(isFacilitated));
  }, [isFacilitated]);

  const renderActiveView = () => {
    switch (currentTab) {
      case "home":
        return <HomeView setCurrentTab={setCurrentTab} lang={lang} isFacilitated={isFacilitated} />;
      case "chi-sono":
        return <AboutView setCurrentTab={setCurrentTab} lang={lang} isFacilitated={isFacilitated} />;
      case "proposte":
        return <ProposteView setCurrentTab={setCurrentTab} lang={lang} isFacilitated={isFacilitated} />;
      case "contatti":
        return <ContattiView lang={lang} isFacilitated={isFacilitated} />;
      case "chat":
        return <ChatView lang={lang} isFacilitated={isFacilitated} />;
      default:
        return <HomeView setCurrentTab={setCurrentTab} lang={lang} isFacilitated={isFacilitated} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#111113] text-[#F8F7F4] font-sans flex flex-col selection:bg-[#E35930]/20 selection:text-[#E35930] antialiased ${
      isFacilitated ? "text-lg contrast-125" : ""
    }`}>
      {/* Navigation Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        lang={lang}
        setLang={setLang}
        isFacilitated={isFacilitated}
        setIsFacilitated={setIsFacilitated}
      />

      {/* Main View Area with top offset to clear fixed header */}
      <main className="flex-grow pt-20">
        <div className="w-full">
          {isFacilitated && (
            <div className="bg-[#E35930] text-[#111113] text-center text-xs py-2 px-4 font-mono font-bold uppercase tracking-wider animate-pulse" id="facilitated-badge-banner">
              {lang === "it"
                ? "Modalità Semplificata Attiva — Caratteri ingranditi e testi più facili"
                : "Simplified Mode Active — Larger fonts and simpler layout"}
            </div>
          )}
          {renderActiveView()}
        </div>
      </main>

      {/* Page Footer */}
      <Footer setCurrentTab={setCurrentTab} onOpenModal={setActiveModal} lang={lang} />

      {/* Popups (Modals) */}
      <InfoModal
        isOpen={activeModal !== null}
        type={activeModal}
        onClose={() => setActiveModal(null)}
        lang={lang}
        isFacilitated={isFacilitated}
      />
    </div>
  );
}
