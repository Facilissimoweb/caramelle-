import React from "react";
import { 
  Zap, 
  ShieldCheck, 
  MessageSquare, 
  ArrowRight, 
  Sparkles, 
  Calendar,
  Phone,
  Lock,
  Clock
} from "lucide-react";

interface RightSidebarProps {
  lang: string;
  setCurrentTab: (tab: string) => void;
  onOpenChat: () => void;
}

export default function RightSidebar({ lang, setCurrentTab, onOpenChat }: RightSidebarProps) {
  const isIt = lang === "it";

  return (
    <aside 
      className="hidden 2xl:flex w-[240px] h-screen fixed right-0 top-0 border-l border-[#111113]/15 bg-[#FAF9F6] p-6 flex-col justify-between z-30 select-none text-[#111113] overflow-y-auto"
      id="desktop-right-sidebar"
    >
      <div className="space-y-6">
        {/* Availability & Status Badge */}
        <div className="p-4 bg-[#111113] text-white rounded-sm space-y-3 shadow-sm border border-[#111113]">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              {isIt ? "Stato Studio" : "Studio Status"}
            </span>
            <span className="text-[9px] font-mono text-white/50 uppercase">Q3/Q4</span>
          </div>

          <div>
            <div className="text-xs font-bold leading-tight text-white font-sans">
              {isIt ? "Disponibile per 2 Nuovi Progetti" : "Available for 2 New Projects"}
            </div>
            <p className="text-[10px] text-white/70 font-mono mt-1">
              {isIt ? "Slot di sviluppo attivi" : "Active development slots"}
            </p>
          </div>

          <button
            onClick={() => setCurrentTab("contatti")}
            className="w-full py-2 px-3 bg-amber-400 hover:bg-amber-300 text-[#111113] font-mono text-[10px] font-extrabold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer rounded-sm"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>{isIt ? "Prenota Call" : "Book Call"}</span>
          </button>
        </div>

        {/* AI Quick Assistant Launcher */}
        <div className="p-3.5 border border-[#111113]/15 bg-white rounded-sm space-y-2.5 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-amber-400/20 text-[#111113] rounded-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            </div>
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider text-[#111113]">
              {isIt ? "Assistente AI Live" : "AI Live Assistant"}
            </span>
          </div>
          <p className="text-[11px] text-[#111113]/75 leading-snug font-sans">
            {isIt 
              ? "Calcola subito stime di costo e risposte su misura per il tuo sito."
              : "Get instant cost estimates and tailored answers for your site."}
          </p>
          <button
            onClick={onOpenChat}
            className="w-full py-2 px-3 bg-[#111113] hover:bg-black text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer rounded-sm"
          >
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-3 h-3 text-amber-400" />
              <span>{isIt ? "Apri Chat" : "Open Chat"}</span>
            </span>
            <ArrowRight className="w-3 h-3 text-amber-400" />
          </button>
        </div>

        {/* Key Guarantees / Studio Strengths */}
        <div className="space-y-3 pt-2 border-t border-[#111113]/10">
          <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#111113]/50">
            [ {isIt ? "Garanzie dello Studio" : "Studio Guarantees"} ]
          </div>

          <ul className="space-y-2.5 text-xs text-[#111113]/85 font-sans">
            <li className="flex items-start gap-2.5">
              <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <strong className="block text-[11px] font-bold text-[#111113]">
                  {isIt ? "Consegna in 14 Giorni" : "14-Day Delivery"}
                </strong>
                <span className="text-[10px] text-[#111113]/60 font-mono">
                  {isIt ? "Tempi certi e pattuiti" : "Guaranteed timeframe"}
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <strong className="block text-[11px] font-bold text-[#111113]">
                  {isIt ? "Codice Proprietà 100%" : "100% Owned Code"}
                </strong>
                <span className="text-[10px] text-[#111113]/60 font-mono">
                  {isIt ? "Zero lock-in" : "No platform lock-in"}
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <strong className="block text-[11px] font-bold text-[#111113]">
                  {isIt ? "Zero Canoni Obbligatori" : "Zero Mandatory Fees"}
                </strong>
                <span className="text-[10px] text-[#111113]/60 font-mono">
                  {isIt ? "Paghi solo quello che vuoi" : "Pay only what you need"}
                </span>
              </div>
            </li>

            <li className="flex items-start gap-2.5">
              <Zap className="w-3.5 h-3.5 text-purple-600 shrink-0 mt-0.5" />
              <div className="leading-tight">
                <strong className="block text-[11px] font-bold text-[#111113]">
                  {isIt ? "Velocità 100/100" : "100/100 PageSpeed"}
                </strong>
                <span className="text-[10px] text-[#111113]/60 font-mono">
                  {isIt ? "Infrastruttura ultra veloci" : "Ultra-fast performance"}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Quick Direct WhatsApp Contact */}
      <div className="pt-4 border-t border-[#111113]/10 space-y-2">
        <a
          href="https://wa.me/393793603321"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2 px-3 border border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer rounded-sm"
        >
          <Phone className="w-3.5 h-3.5 text-emerald-600" />
          <span>WhatsApp Direct</span>
        </a>
        <div className="text-center font-mono text-[9px] text-[#111113]/40 uppercase tracking-widest">
          FACILISSIMO WEB © 2026
        </div>
      </div>
    </aside>
  );
}
