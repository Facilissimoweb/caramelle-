import React from "react";

interface RightSidebarProps {
  lang?: string;
  setCurrentTab?: (tab: string) => void;
  onOpenChat?: () => void;
}

export default function RightSidebar({}: RightSidebarProps) {
  return (
    <aside 
      className="hidden 2xl:flex w-[240px] h-screen fixed right-0 top-0 border-l border-[#111113]/15 bg-[#111113] flex-col justify-center items-center z-30 select-none overflow-hidden"
      id="desktop-right-sidebar"
    >
      <div className="relative w-full h-full flex items-center justify-center bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/f (1600 x 500 px).webp"
          className="w-full h-full object-cover"
        >
          <source src="/FACILISSIMO WEB MACERATA (1).mp4" type="video/mp4" />
          <source src="/FACILISSIMO WEB MACERATA.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </aside>
  );
}
