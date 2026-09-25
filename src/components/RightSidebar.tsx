import React from "react";

interface RightSidebarProps {
  lang?: string;
  setCurrentTab?: (tab: string) => void;
  onOpenChat?: () => void;
}

export default function RightSidebar({}: RightSidebarProps) {
  return (
    <aside 
      className="hidden 2xl:flex w-[240px] h-screen fixed right-0 top-0 border-l border-white bg-[#111113] flex-col justify-center items-center z-30 select-none overflow-hidden"
      id="desktop-right-sidebar"
    >
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <img
          src="/images/facilissimo%20web%20di%20maria%20teresa%20rogani%20.png"
          alt="Facilissimo Web di Maria Teresa Rogani"
          className="w-full h-full object-cover"
        />
      </div>
    </aside>
  );
}
