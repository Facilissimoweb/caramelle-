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
    <div className="min-h-screen bg-background text-on-background font-sans flex flex-col selection:bg-secondary/20 selection:text-secondary antialiased">
      {/* Navigation Header */}
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main View Area with top offset to clear fixed header */}
      <main className="flex-grow pt-20">
        <div className="w-full">
          {renderActiveView()}
        </div>
      </main>

      {/* Page Footer */}
      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}
