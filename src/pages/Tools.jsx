import { useState, useRef, useEffect } from "react";
import { Link2, Globe, Bot, Wrench } from "lucide-react";

import RedirectChecker from "../pages/RedirectChecker";
import IpLookup from "./IpLookup";
import BotChecker from "./BotCheker";
import UrlBuilder from "./UrlBuilder";

export default function Tools() {
  const [activeTab, setActiveTab] = useState("redirect");

  const [glider, setGlider] = useState({ left: 0, width: 0 });
const tabRefs = useRef({});
const shellRef = useRef(null);

useEffect(() => {
  const activeEl = tabRefs.current[activeTab];
  const shell = shellRef.current;
  if (!activeEl || !shell) return;
  const shellRect = shell.getBoundingClientRect();
  const btnRect = activeEl.getBoundingClientRect();
  setGlider({
    left: btnRect.left - shellRect.left - 8,
    width: btnRect.width,
  });
}, [activeTab]);

  const tabs = [
    {
      id: "redirect",
      name: "Redirect Checker",
      icon: Link2,
    },
    {
      id: "ip",
      name: "IP Lookup",
      icon: Globe,
    },
    {
      id: "bot",
      name: "Bot Test",
      icon: Bot,
    },
    {
      id: "builder",
      name: "URL Builder",
      icon: Wrench,
    },
  ];

  const renderComponent = () => {
    switch (activeTab) {
      case "redirect":
        return <RedirectChecker />;
      case "ip":
        return <IpLookup />;
      case "bot":
        return <BotChecker />;
      case "builder":
        return <UrlBuilder />;
      default:
        return null;
    }
  };

  return (
    <div 
    className="
  p-6 space-y-6 min-h-screen
  bg-gradient-to-b
  from-gray-200 to-gray-400
  dark:from-[#0B0F19] dark:to-[#070B14]
">

  {/* ===== HEADER ===== */}
<div
  className="
    relative overflow-hidden
    rounded-2xl
    border border-gray-200 dark:border-[#1f2433]
    bg-white/80 dark:bg-[#141824]/80
    backdrop-blur-xl
     hover:shadow-md
    transition-all duration-300
    p-6 md:p-8
  "
>
  {/* subtle gradient accent */}
  <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-80"></div>

  <div className="space-y-3">
    {/* Badge */}
    <div
      className="
        inline-flex items-center gap-2 px-3 py-1 rounded-full
        bg-blue-50 dark:bg-blue-500/10
        text-blue-700 dark:text-blue-400
        text-xs font-medium w-fit
        border border-blue-100 dark:border-blue-500/20
      "
    >
      <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
      Tools Center
    </div>

    {/* Heading */}
    <h1
      className="
        text-3xl md:text-[32px]
        font-semibold tracking-tight
        text-gray-900 dark:text-white
      "
    >
      Tools
    </h1>

    {/* Description */}
    <p
      className="
        text-sm md:text-[15px]
        leading-relaxed max-w-2xl ml-60
        text-gray-600 dark:text-gray-400
      "
    >
      Analyze redirects, inspect IP intelligence, validate bot behavior,
      and generate optimized campaign URLs using powerful built-in utilities
      designed for performance and accuracy.
    </p>
  </div>
</div>

  {/* ===== TABS ===== */}
 <div
  ref={shellRef}
  className="
    relative flex flex-wrap gap-1 p-2
    rounded-2xl cursor-pointer
    bg-gradient-to-b
    from-white to-gray-50
    dark:from-[#141824] dark:to-[#0f1320]
    border border-gray-200 dark:border-white/10
    shadow-sm
    backdrop-blur-xl
  "
>
  {/* Sliding glider pill */}
  <div
    className="absolute top-2 h-[calc(100%-16px)] rounded-xl bg-blue-600 z-0 pointer-events-none"
    style={{
      left: 8,
      width: glider.width,
      transform: `translateX(${glider.left}px)`,
      transition:
        "transform 0.4s cubic-bezier(0.34,1.35,0.64,1), width 0.4s cubic-bezier(0.34,1.35,0.64,1)",
      boxShadow: "0 4px 20px rgba(37,99,235,0.4)",
    }}
  />

  {tabs.map((tab) => {
    const Icon = tab.icon;
    const active = activeTab === tab.id;

    return (
      <button
        key={tab.id}
        ref={(el) => (tabRefs.current[tab.id] = el)}
        onClick={() => setActiveTab(tab.id)}
        className={`
          relative z-10 flex items-center gap-2
          px-4 py-2.5 rounded-xl text-sm font-medium
          transition-colors duration-200 cursor-pointer
          select-none
          ${
            active
              ? "text-white"
              : `
                text-gray-600 dark:text-gray-300
                hover:text-gray-900 dark:hover:text-white
                hover:bg-gray-100/70 dark:hover:bg-white/5
                active:scale-[0.97]
              `
          }
        `}
      >
        <Icon
          className="w-4 h-4"
          style={{
            transition: "transform 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            transform: active ? "scale(1.2)" : "scale(1)",
          }}
        />
        {tab.name}
      </button>
    );
  })}
</div>

  {/* ===== TAB CONTENT ===== */}
  <div
    className="
      relative
      rounded-2xl
      min-h-[400px]
      bg-white dark:bg-[#111827]
      border border-gray-200 dark:border-white/10
      shadow-sm
      transition-colors duration-300
      p-5
    "
  >
    {renderComponent()}
  </div>

</div>
  );
}