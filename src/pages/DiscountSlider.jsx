import { useEffect, useState, } from "react";
import { useNavigate } from "react-router-dom";

export default function DiscountSlider() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);

  // ⭐ 12 hour deal timer
  const [timeLeft, setTimeLeft] = useState(12 * 60 * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (sec) => {
    const h = String(Math.floor(sec / 3600)).padStart(2, "0");
    const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  // ⭐ slides content
  const slides = [
    {
      title: "Starter Plan — $49 / month",
      desc: "1 Campaign • Unlimited Clicks • Full Bot & VPN Protection",
      offer: "Save 20% on Quarterly • Save 35% on Yearly",
      bg: "from-blue-600 to-indigo-700",
    },
    {
      title: "Pro Plan — $99 / month",
      desc: "10 Campaigns • Advanced Analytics • Realtime Click Tracking",
      offer: "Most Popular 🚀 — Save 25% on Quarterly • Save 40% on Yearly",
      bg: "from-purple-600 to-pink-600",
    },
    {
      title: "Enterprise — $149 / month",
      desc: "Unlimited Campaigns • Maximum Security • Priority Performance",
      offer: "Custom Enterprise Deals + Dedicated Support",
      bg: "from-gray-700 to-black",
    },
    {
      title: "🔥 Limited Time Deal",
      desc: "Upgrade your plan & unlock premium features instantly",
      offer: "Extra benefits on yearly plans + advanced protection",
      bg: "from-green-600 to-teal-600",
    },
  ];

  // ⭐ auto change slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[350px] rounded-2xl overflow-hidden relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`
            absolute inset-0 flex items-center justify-center
            bg-gradient-to-r ${slide.bg}
            text-white transition-opacity duration-700
            ${index === current ? "opacity-100" : "opacity-0"}
          `}
        >
          <div className="text-center px-6 max-w-xl">
            {/* Title */}
            <h2 className="text-3xl font-bold mb-3">{slide.title}</h2>

            {/* Description */}
            <p className="text-lg opacity-90 mb-3">{slide.desc}</p>

            {/* Offer */}
            <p className="text-sm opacity-80 mb-6">{slide.offer}</p>

            {/* Countdown */}
            <div className="mb-5">
              <p className="text-sm opacity-80">Deal ends in</p>
              <div className="text-2xl font-semibold tracking-widest">
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate("/Dashboard/pricing")}
              className="
                px-6 py-3 rounded-lg font-semibold
                bg-white text-black cursor-pointer
                hover:scale-105 transition
                shadow-lg
              "
            >
              Upgrade Your Plan Now →
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
