import { useState, useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ProposteView from "./components/ProposteView";
import ContattiView from "./components/ContattiView";
import ChatView from "./components/ChatView";
import InfoModal from "./components/InfoModal";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  const [lang, setLang] = useState<"it" | "en">("it");
  const [isFacilitated, setIsFacilitated] = useState<boolean>(() => {
    const saved = localStorage.getItem("facilissimo-facil");
    return saved === "true";
  });
  const [activeModal, setActiveModal] = useState<"privacy" | "terms" | "ethics" | null>(null);

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
