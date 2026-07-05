import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import ProposteView from "./components/ProposteView";
import ContattiView from "./components/ContattiView";
import ChatView from "./components/ChatView";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");

  const renderActiveView = () => {
    switch (currentTab) {
      case "home":
        return <HomeView setCurrentTab={setCurrentTab} />;
      case "chi-sono":
        return <AboutView setCurrentTab={setCurrentTab} />;
      case "proposte":
        return <ProposteView setCurrentTab={setCurrentTab} />;
      case "contatti":
        return <ContattiView />;
      case "chat":
        return <ChatView />;
      default:
        return <HomeView setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05030d] text-[#f2ecff] font-sans flex flex-col antialiased" data-testid="app-root">
      {/* Ambient background layers */}
      <div className="aurora-bg" aria-hidden="true">
        <div className="aurora-blob b1" />
        <div className="aurora-blob b2" />
        <div className="aurora-blob b3" />
      </div>
      <div className="grid-overlay" aria-hidden="true" />
      <div className="grain-overlay" aria-hidden="true" />

      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      <main className="section flex-grow pt-24">
        <div className="w-full">{renderActiveView()}</div>
      </main>

      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}
