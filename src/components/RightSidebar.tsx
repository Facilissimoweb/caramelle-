import React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

interface RightSidebarProps {
  lang?: string;
  setCurrentTab?: (tab: string) => void;
  onOpenChat?: () => void;
}

export default function RightSidebar({}: RightSidebarProps) {
  const { scrollYProgress } = useScroll();

  // Smooth spring for silky-smooth parallax response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001
  });

  // Vertical parallax offset as the page scrolls
  const y = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [1.14, 1.2, 1.14]);

  return (
    <aside 
      className="hidden 2xl:flex w-[240px] h-screen fixed right-0 top-0 border-l border-white/20 bg-[#0a0a0c] flex-col justify-center items-center z-30 select-none overflow-hidden shadow-2xl"
      id="desktop-right-sidebar"
    >
      <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden group">
        <motion.img
          src="/images/facilissimo%20web%20di%20maria%20teresa%20rogani%20.png"
          alt="Facilissimo Web di Maria Teresa Rogani"
          className="absolute inset-0 w-full h-[125%] -top-[12.5%] object-cover object-center transition-all duration-300 group-hover:brightness-105"
          style={{ y, scale }}
        />

        {/* Effetto Copertina: Dorso / costola libro/rivista a sinistra */}
        <div className="absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-black/85 via-white/10 to-transparent pointer-events-none z-10" />

        {/* Effetto Copertina: Riflesso patinato / sheen diagonale */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none z-10 opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Effetto Copertina: Profondità interna e vignettatura */}
        <div className="absolute inset-0 shadow-[inset_0_0_35px_rgba(0,0,0,0.85)] pointer-events-none z-10" />
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/70 via-black/20 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none z-10" />
      </div>
    </aside>
  );
}
