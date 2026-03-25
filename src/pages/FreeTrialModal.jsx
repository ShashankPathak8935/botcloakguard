import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function FreeTrialModal({ open, onClose }) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (open) {
      setShowConfetti(true);

      setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
      {/* 🎉 Confetti */}
      {showConfetti && (
        <Confetti
          recycle={false}
          numberOfPieces={1000}
          className="!fixed !inset-0 z-[60]"
        />
      )}

      {/* Modal Card */}
      <div
        className="
      relative w-[92%] max-w-md
      rounded-3xl
      bg-white dark:bg-[#0f1320]
      border border-gray-200 dark:border-[#1f2433]
      shadow-[0_20px_60px_rgba(0,0,0,0.25)]
      p-8 text-center
      animate-fadeIn
      overflow-hidden
    "
      >
        {/* Glow Background */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-orange-400/20 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-red-500/20 blur-3xl rounded-full"></div>

        {/* Success Icon Circle */}
        <div
          className="
        mx-auto mb-5
        w-20 h-20
        flex items-center justify-center
        rounded-full
        bg-gradient-to-br from-orange-500 to-red-500
        text-white text-4xl
        shadow-lg shadow-orange-500/30
        animate-bounce
      "
        >
          🎉
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Free Trial Activated!
        </h2>

        {/* Subtext */}
        <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
          Welcome aboard 🚀
          <br />
          Your{" "}
          <span className="font-semibold text-orange-500">
            24-hour Free Trial
          </span>{" "}
          has been successfully activated.
          <br />
          Our team will verify your access shortly so you can explore all
          premium features.
        </p>

        {/* Divider */}
        <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-[#2a2f3a] to-transparent"></div>

        {/* CTA Button */}
        <button
          onClick={onClose}
          className="
        w-full py-3 rounded-xl cursor-pointer
        font-semibold text-white
        bg-gradient-to-r from-orange-500 to-red-500
        hover:from-orange-600 hover:to-red-600
        shadow-lg hover:shadow-orange-500/40
        hover:scale-[1.03]
        active:scale-[0.96]
        transition-all duration-300
      "
        >
          Awesome — Let’s Go 🚀
        </button>
      </div>
    </div>
  );
}
