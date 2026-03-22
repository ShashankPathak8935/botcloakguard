import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function BotSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const selected = options.find((o) => o.name === value);

  // close when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {/* Selected */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full flex items-center justify-between
          rounded-xl px-4 py-2.5
          bg-white dark:bg-[#020617]
          border border-gray-300 dark:border-white/10
          hover:border-blue-500/50
          shadow-sm hover:shadow-md
          transition
        "
      >
        <div className="flex items-center gap-3">
          {selected && (
            <img
              src={selected.icon}
              alt=""
              className="w-5 h-5 rounded-sm object-cover"
            />
          )}
          <span className="text-sm text-gray-800 dark:text-white">
            {selected?.name || "Select Bot"}
          </span>
        </div>

        <ChevronDown
          size={18}
          className={`transition ${
            open ? "rotate-180" : ""
          } text-gray-500`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute z-50 mt-2 w-full
            rounded-xl overflow-hidden
            bg-white dark:bg-[#020617]
            border border-gray-200 dark:border-white/10
            shadow-xl backdrop-blur-xl
            max-h-64 overflow-y-auto
          "
        >
          {options.map((opt) => (
            <button
              key={opt.name}
              onClick={() => {
                onChange(opt.name);
                setOpen(false);
              }}
              className="
                w-full flex items-center gap-3
                px-4 py-3 text-left
                hover:bg-gray-100
                dark:hover:bg-white/5
                transition
              "
            >
              <img
                src={opt.icon}
                className="w-5 h-5 rounded-sm"
                alt=""
              />

              <span className="text-sm text-gray-700 dark:text-gray-200">
                {opt.name}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}