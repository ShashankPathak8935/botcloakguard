import { useState } from "react";
import { Search, Globe } from "lucide-react";
import BotSelect from "./BotSelect";

/*
  👉 Put your PNG icons inside:
  /public/bots/
  Example:
  /bots/google.png
  /bots/bing.png
  /bots/facebook.png
  /bots/yahoo.png
  /bots/yandex.png
  /bots/desktop.png
  /bots/mobile.png
*/

export default function BotChecker() {
  const [url, setUrl] = useState("");
  const [device, setDevice] = useState("Desktop");
  const [showResult, setShowResult] = useState(false);
  
  // ===== BOT OPTIONS =====
  const botOptions = [
      { name: "AdsBot Google Mobile", icon: "/icons/bots/google.jpg" },
      { name: "AdsBot Google Android", icon: "/icons/bots/google.jpg" },
      { name: "AdsBot Google Desktop", icon: "/icons/bots/google.jpg" },
      { name: "Bingbot Mobile", icon: "/icons/bots/bing.png" },
      { name: "Bingbot Desktop", icon: "/icons/bots/bing.png" },
      { name: "Facebook Bot", icon: "/icons/bots/facebook.png" },
      { name: "Yahoo Slurp", icon: "/icons/bots/yahoo.jpg" },
      { name: "Yandex", icon: "/icons/bots/yandex.jpg" },
    ];
    const [bot, setBot] = useState(botOptions[0].name);


  

  const devices = [
    { name: "Desktop", icon: "/bots/desktop.png" },
    { name: "Mobile", icon: "/bots/mobile.png" },
  ];

  const handleTest = () => {
    if (!url) return;
    setShowResult(true); // dummy trigger
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* ================= HEADER ================= */}
      <div
        className="
          rounded-3xl p-6
          bg-white dark:bg-[#0b1220]
          border border-gray-200 dark:border-white/10
          shadow-sm
        "
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Bot Checker
        </h2>

        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Test how search engine bots and crawlers view your website.
          Simulate real bot requests and inspect response behavior instantly.
        </p>

        {/* ================= INPUT ROW ================= */}
        <div className="grid lg:grid-cols-4 gap-3 mt-6">

          {/* URL INPUT */}
          <div className="relative lg:col-span-2">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />

            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="
                w-full pl-9 pr-3 py-2.5 rounded-xl
                bg-gray-50 dark:bg-[#020617]
                border border-gray-300 dark:border-white/10
                text-gray-800 dark:text-white
                focus:ring-2 focus:ring-blue-500 outline-none
              "
            />
          </div>

          {/* BOT SELECT */}
          <BotSelect
           value={bot}
            onChange={setBot}
           options={botOptions} 
          />

          {/* DEVICE SELECT */}
          <select
            value={device}
            onChange={(e) => setDevice(e.target.value)}
            className="
              rounded-xl px-3 py-2.5
              bg-gray-50 dark:bg-[#020617]
              border border-gray-300 dark:border-white/10
              text-gray-800 dark:text-white
            "
          >
            {devices.map((d) => (
              <option key={d.name}>{d.name}</option>
            ))}
          </select>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleTest}
          className="
            mt-4 flex items-center gap-2
            bg-blue-600 hover:bg-blue-700
            text-white px-5 py-2.5 rounded-xl
            transition-all duration-200
            shadow hover:shadow-lg
          "
        >
          <Search size={16} />
          Test Bot
        </button>
      </div>

      {/* ================= RESULT ================= */}
      {showResult && (
        <div
          className="
            grid lg:grid-cols-2 gap-6
            rounded-3xl p-6
            bg-white dark:bg-[#0b1220]
            border border-gray-200 dark:border-white/10
            shadow-sm
          "
        >
          {/* LEFT RESULT TABLE */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Result
            </h3>

            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-white/10">
              {[
                ["URL", url],
                ["Title", "Not defined"],
                ["Description", "Not defined"],
                ["Keywords", "Not defined"],
                ["HTTP Code", "404"],
                ["Execution Time", "0.3s"],
              ].map(([key, value]) => (
                <div
                  key={key}
                  className="
                    grid grid-cols-2 text-sm
                    border-b last:border-none
                    border-gray-200 dark:border-white/10
                  "
                >
                  <div className="p-3 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-[#020617]">
                    {key}
                  </div>

                  <div className="p-3 text-gray-900 dark:text-white">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT PREVIEW CARD */}
          <div
            className="
              flex items-center justify-center
              rounded-2xl
              bg-gradient-to-br
              from-gray-100 to-gray-50
              dark:from-[#020617] dark:to-[#020617]
              border border-gray-200 dark:border-white/10
              min-h-[260px]
            "
          >
            <div className="text-center">
              <h1 className="text-5xl font-bold text-red-500">404</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Page preview simulation
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}