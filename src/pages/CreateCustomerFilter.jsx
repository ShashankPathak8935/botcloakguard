import React, { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  X,
  Globe,
  MapPin,
  Building2,
  Hash,
  Monitor,
  Smartphone,
  Network,
  Link,
  Shield,
  User,
  SquarePen,
  Trash2,
  Settings,
} from "lucide-react";
import { COUNTRY_LIST, BROWSER_LIST } from "../data/dataList";

/* ================= ICON MAP ================= */

const OPTION_ICONS = {
  Country: Globe,
  State: MapPin,
  City: Building2,
  "Zip Code": Hash,
  Browser: Monitor,
  Device: Smartphone,
  ASN: Network,
  Referrer: Link,
  IP: Shield,
  UserAgent: User,
};

/* ================= OPTIONS ================= */

const OPTIONS = [
  "Country",
  "State",
  "City",
  "Zip Code",
  "Browser",
  "Device",
  "ASN",
  "Referrer",
  "IP",
  "UserAgent",
];

/* ================= CONFIG ================= */

// const CONDITION_CONFIG = {
//   Country: { type: "select", options: ["India", "USA", "Canada"] },
//   State: { type: "select", options: ["UP", "Delhi", "Punjab"] },
//   City: { type: "select", options: ["Noida", "Delhi", "Mumbai"] },
//   Browser: { type: "select", options: ["Chrome", "Firefox", "Safari"] },
//   Device: { type: "select", options: ["Mobile", "Desktop"] },

//   "Zip Code": { type: "input" },
//   ASN: { type: "input" },
//   Referrer: { type: "input" },
//   IP: { type: "input" },
//   UserAgent: { type: "input" },
// };


const CONDITION_CONFIG = {
  Country: {
    type: "select",
    data: COUNTRY_LIST,
    labelKey: "country",
  },

  Browser: {
    type: "select",
    data: BROWSER_LIST,
    labelKey: "browser",
  },

  Device: {
    type: "select",
    data: [
      { id: 1, name: "Mobile" },
      { id: 2, name: "Desktop" },
    ],
    labelKey: "name",
  },
  State: { type: "input" },
  City: { type: "input" },
  "Zip Code": { type: "input" },
  ASN: { type: "input" },
  Referrer: { type: "input" },
  IP: { type: "input" },
  UserAgent: { type: "input" },
};
/* ================= INPUT CHIP ================= */

function InputChip({ editingCondition, setEditingCondition }) {
  const [input, setInput] = useState("");

  const addValue = () => {
    if (!input.trim()) return;

    setEditingCondition({
      ...editingCondition,
      values: [...editingCondition.values, input],
    });

    setInput("");
  };

  return (
    <>
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter value"
          className="w-full px-3 py-2 rounded-lg
        bg-white dark:bg-zinc-900
        border border-zinc-700 dark:border-zinc-600
        text-zinc-900 dark:text-zinc-100
        placeholder:text-zinc-400 dark:placeholder:text-zinc-500
        focus:outline-none focus:ring-2 focus:ring-indigo-500/30
        focus:border-indigo-400 dark:focus:border-indigo-500
        transition-colors duration-150"
        />
        <button
          onClick={addValue}
          className="px-4 rounded-lg text-sm font-medium cursor-pointer
        bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
        text-white
        shadow-[0_2px_8px_rgba(99,102,241,0.3)]
        active:scale-[0.97] transition-all duration-150 select-none"
        >
          Add
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {editingCondition.values.map((v) => (
          <div
            key={v}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
          bg-indigo-50 dark:bg-indigo-500/15
          border border-indigo-100 dark:border-indigo-500/25
          text-indigo-700 dark:text-indigo-300
          text-sm font-medium"
          >
            {v}
            <X
              size={14}
              className="flex items-center justify-center
            h-4 w-4 rounded-full cursor-pointer
            text-indigo-400 hover:text-indigo-700
            dark:hover:text-indigo-200
            hover:bg-indigo-100 dark:hover:bg-indigo-500/30
            transition-colors duration-150"
              onClick={() =>
                setEditingCondition({
                  ...editingCondition,
                  values: editingCondition.values.filter((x) => x !== v),
                })
              }
            />
          </div>
        ))}
      </div>
    </>
  );
}

/* ================= MAIN COMPONENT ================= */



function SearchableSelect({ config, editingCondition, setEditingCondition }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const wrapperRef = useRef(null); // ✅ reference for outside click

  const labelKey = config.labelKey;

  const filtered = config.data.filter((item) =>
    item[labelKey].toLowerCase().includes(search.toLowerCase()),
  );

  const toggleValue = (value) => {
    const exists = editingCondition.values.includes(value);

    setEditingCondition({
      ...editingCondition,
      values: exists
        ? editingCondition.values.filter((v) => v !== value)
        : [...editingCondition.values, value],
    });
  };

  /* ✅ CLOSE DROPDOWN WHEN CLICK OUTSIDE */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      {/* SELECTED CHIPS */}
      <div className="flex flex-wrap gap-2 mt-3">
        {editingCondition.values.map((v) => (
          <div
            key={v}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full
      bg-indigo-50 dark:bg-indigo-500/15
      border border-indigo-100 dark:border-indigo-500/25
      text-indigo-700 dark:text-indigo-300
      text-sm font-medium"
          >
            {v}
            <button
              onClick={() =>
                setEditingCondition({
                  ...editingCondition,
                  values: editingCondition.values.filter((x) => x !== v),
                })
              }
              className="flex items-center justify-center
        h-4 w-4 rounded-full cursor-pointer
        text-indigo-400 dark:text-indigo-400
        hover:text-indigo-700 dark:hover:text-indigo-200
        hover:bg-indigo-100 dark:hover:bg-indigo-500/30
        transition-colors duration-150"
            >
              <X size={10} strokeWidth={2.5} />
            </button>
          </div>
        ))}
      </div>

      {/* INPUT */}
      <input
        placeholder="Search..."
        value={search}
        onClick={() => setOpen((prev) => !prev)}
        onChange={(e) => setSearch(e.target.value)}
       className="w-full px-4 py-2 rounded-lg
    bg-white dark:bg-zinc-900
    border border-zinc-800 dark:border-zinc-700  {/* ← always visible */}
    text-zinc-900 dark:text-zinc-100
    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
    focus:outline-none focus:ring-2 focus:ring-indigo-500/30
    focus:border-indigo-400 dark:focus:border-indigo-500
    transition-colors duration-150"
      />

      {/* DROPDOWN */}
      {open && (
        <div
          className="
            absolute w-full mt-2 max-h-60 overflow-y-auto
            rounded-xl shadow-lg z-50
            bg-white dark:bg-[#141824]
            border dark:border-[#1f2433]
          "
        >
          {filtered.map((item) => {
            const label = item[labelKey];
            const active = editingCondition.values.includes(label);

            return (
              <div
                key={item.id}
                onClick={() => toggleValue(label)}
                className="
                  flex items-center gap-3 px-4 py-2 cursor-pointer
                  hover:bg-blue-400 dark:hover:bg-[#1f2433]
                "
              >
                {item.code && (
                  <img
                    src={`/flags/${item.code}.png`}
                    className="w-5 h-4 object-cover rounded-sm"
                  />
                )}

                <span
                  className={`
                 transition-colors duration-200
                ${
                  active
                    ? "font-semibold text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-400"
                }
                `}
                >
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CreateCustomFilter() {
  const [filterName, setFilterName] = useState("");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const [conditions, setConditions] = useState([]);
  const [editingCondition, setEditingCondition] = useState(null);

  /* ---------- available dropdown options ---------- */

  const availableOptions = OPTIONS.filter(
    (opt) => !conditions.find((c) => c.type === opt),
  );

  /* ---------- select dropdown option ---------- */

  const handleSelectOption = (option) => {
    setEditingCondition({
      type: option,
      values: [],
      action: "allow",
    });

    setModalOpen(true);
    setOpenDropdown(false);
  };

  /* ---------- save condition ---------- */

  const saveCondition = () => {
    setConditions((prev) => {
      const exists = prev.find((c) => c.type === editingCondition.type);

      if (exists) {
        return prev.map((c) =>
          c.type === editingCondition.type ? editingCondition : c,
        );
      }

      return [...prev, editingCondition];
    });

    setModalOpen(false);
  };

  const removeAllConditions = () => {
    setConditions([]);
  };

  const config = editingCondition && CONDITION_CONFIG[editingCondition.type];

  return (
    <div
      className="max-w-2xl mx-auto p-6 mt-6 rounded-2xl
      bg-white dark:bg-[#141824]
      border border-gray-200 dark:border-[#1f2433]"
    >
      {/* ================= HEADER ================= */}

      <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
        Create Custom Filter
      </h2>

      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Define smart conditions to manage traffic rules.
      </p>

      {/* ================= FILTER NAME ================= */}

      <input
        value={filterName}
        onChange={(e) => setFilterName(e.target.value)}
        placeholder="Filter Name"
        className="w-full px-4 py-2 mb-5 rounded-lg border
    bg-white dark:bg-transparent
    border-zinc-500 dark:border-zinc-300
    text-zinc-900 dark:text-zinc-100
    placeholder:text-zinc-400 dark:placeholder:text-zinc-500
    focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 dark:focus:border-indigo-500
    transition-colors duration-150"
      />

      {/* ================= DROPDOWN ================= */}
      <div className="flex items-start justify-between gap-6 relative">
        {/* LEFT SIDE (Dropdown Area) */}
        <div className="relative w-[60%]">
          <button
            onClick={() => setOpenDropdown(!openDropdown)}
            className="w-full flex justify-between items-center
      px-4 py-2.5 rounded-xl border
      bg-white dark:bg-zinc-900
      border-zinc-400 dark:border-zinc-300
      hover:bg-zinc-50 dark:hover:bg-zinc-800
      text-zinc-900 dark:text-zinc-400
      transition-all duration-150 shadow-sm"
          >
            <span className="text-sm font-medium">Select Condition</span>
            <ChevronDown
              size={18}
              className="text-zinc-800 dark:text-zinc-300"
            />
          </button>

          {openDropdown && (
            <div
              className="absolute left-0 top-full w-full mt-2 rounded-xl z-20 overflow-hidden
      bg-white dark:bg-zinc-900
      border border-zinc-800 dark:border-zinc-300
      shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
            >
              {availableOptions.map((opt) => {
                const Icon = OPTION_ICONS[opt];
                return (
                  <div
                    key={opt}
                    onClick={() => handleSelectOption(opt)}
                    className="flex items-center gap-3 px-4 py-2.5 cursor-pointer
              text-zinc-900 dark:text-zinc-300
              hover:bg-blue-500 dark:hover:bg-blue-600
              hover:text-zinc-900 dark:hover:text-zinc-100
              transition-colors duration-150 text-sm"
                  >
                    <Icon
                      size={15}
                      className="text-zinc-800 dark:text-zinc-200 shrink-0"
                    />
                    {opt}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT SIDE BUTTON */}
        <button
          onClick={removeAllConditions}
          disabled={conditions.length === 0}
          className="
             px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap
           text-white cursor-pointer
           bg-red-600
           hover:bg-red-700
           active:bg-red-800
           dark:bg-red-500
          dark:hover:bg-red-600
          dark:active:bg-red-700
            shadow-lg hover:shadow-red-500/30
            hover:scale-[1.04]
            active:scale-[0.96]
            transition-all duration-200 ease-out
            disabled:opacity-40
            disabled:cursor-not-allowed
            "
        >
          Remove All
        </button>
      </div>

      {/* ================= SELECTED CONDITIONS ================= */}
      <div className="mt-6 space-y-3">
        {conditions.map((cond) => (
          <div
            key={cond.type}
            className="
        group
        flex justify-between items-center
        p-4 rounded-xl
        border
        bg-white dark:bg-[#141824]
        border-gray-200 dark:border-[#1f2433]
        hover:shadow-md dark:hover:shadow-black/30
        transition-all duration-200
      "
          >
            {/* LEFT CONTENT */}
            <div className="min-w-0">
              <p className="font-semibold text-gray-800 dark:text-gray-100">
                {cond.type}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {cond.values.join(", ")}
              </p>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex items-center gap-2">
              {/* EDIT */}
              <button
                onClick={() => {
                  setEditingCondition(cond);
                  setModalOpen(true);
                }}
                className="
                p-2 rounded-lg cursor-pointer
              text-cyan-700 dark:text-cyan-300
              bg-cyan-50 dark:bg-cyan-500/20
              hover:bg-cyan-100
              dark:hover:bg-cyan-500/30
                hover:scale-105 active:scale-95
                shadow-sm hover:shadow-md
                transition-all duration-200
                "
              >
                <SquarePen size={18} strokeWidth={2.2} />
              </button>

              {/* DELETE */}
              <button
                onClick={() =>
                  setConditions((prev) =>
                    prev.filter((c) => c.type !== cond.type),
                  )
                }
                className="
            p-2 rounded-lg cursor-pointer
            text-red-600
            dark:text-red-600
            bg-red-50 dark:bg-red-500/10
            hover:bg-red-100 dark:hover:bg-red-500/20
            hover:scale-105 active:scale-95
            transition-all duration-200
          "
              >
                <Trash2 size={18} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}

      {/* {modalOpen && editingCondition && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div
            className="w-[420px] p-6 rounded-2xl
            bg-white dark:bg-[#141824]
            border dark:border-[#1f2433]"
          >
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold">{editingCondition.type}</h3>
              <X
                className="cursor-pointer"
                onClick={() => setModalOpen(false)}
              />
            </div>

          
            {config.type === "select" && (
              <SearchableSelect
                config={config}
                editingCondition={editingCondition}
                setEditingCondition={setEditingCondition}
              />
            )}

            
            {config.type === "input" && (
              <InputChip
                editingCondition={editingCondition}
                setEditingCondition={setEditingCondition}
              />
            )}

            
            <div className="flex gap-3 mt-6">
              {["allow", "block"].map((act) => (
                <button
                  key={act}
                  onClick={() =>
                    setEditingCondition({
                      ...editingCondition,
                      action: act,
                    })
                  }
                  className={`flex-1 py-2 rounded-lg border
                  ${
                    editingCondition.action === act
                      ? "bg-indigo-600 text-white"
                      : ""
                  }`}
                >
                  {act}
                </button>
              ))}
            </div>

            <button
              onClick={saveCondition}
              className="w-full mt-6 py-2 rounded-lg
              bg-indigo-600 text-white"
            >
              Save Condition
            </button>
          </div>
        </div>
      )} */}

      {modalOpen && editingCondition && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          onClick={() => setModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[440px] rounded-2xl overflow-hidden
        bg-white dark:bg-zinc-900
        border border-zinc-200 dark:border-zinc-800
        shadow-[0_24px_60px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4
        border-b border-zinc-100 dark:border-zinc-800"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="h-7 w-7 rounded-lg flex items-center justify-center
            bg-indigo-50 dark:bg-indigo-500/10
            border border-indigo-100 dark:border-indigo-500/20"
                >
                  <Settings
                    size={13}
                    className="text-indigo-500 dark:text-indigo-400"
                    strokeWidth={2}
                  />
                </div>
                <h3 className="text-[20px] font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {editingCondition.type}
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="h-7 w-7 rounded-lg flex items-center justify-center cursor-pointer
            text-zinc-800 dark:text-zinc-100
            hover:text-blue-700 dark:hover:text-blue-300
            hover:bg-zinc-100 dark:hover:bg-zinc-800
            transition-all duration-150"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Body */}
            <div className="px-6 py-5 space-y-5">
              {/* SELECT TYPE */}
              {config.type === "select" && (
                <SearchableSelect
                  config={config}
                  editingCondition={editingCondition}
                  setEditingCondition={setEditingCondition}
                />
              )}

              {/* INPUT TYPE */}
              {config.type === "input" && (
                <InputChip
                  editingCondition={editingCondition}
                  setEditingCondition={setEditingCondition}
                />
              )}

              {/* ALLOW / BLOCK toggle */}
              <div>
                <p className="text-[11.5px] font-medium text-zinc-900 dark:text-zinc-200 uppercase tracking-wider mb-2.5">
                  Action
                </p>
                <div
                  className="flex gap-2 p-1 rounded-xl
            bg-zinc-300 dark:bg-zinc-800
            border border-zinc-400 dark:border-zinc-500"
                >
                  {["allow", "block"].map((act) => (
                    <button
                      key={act}
                      onClick={() =>
                        setEditingCondition({
                          ...editingCondition,
                          action: act,
                        })
                      }
                      className={`flex-1 py-2 rounded-lg text-sm font-medium capitalize cursor-pointer
                  transition-all duration-150 select-none
                  ${
                    editingCondition.action === act
                      ? act === "allow"
                        ? "bg-emerald-500 dark:bg-emerald-600 text-white shadow-[0_2px_8px_rgba(16,185,129,0.3)]"
                        : "bg-red-500 dark:bg-red-600 text-white shadow-[0_2px_8px_rgba(239,68,68,0.3)]"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-white/70 dark:hover:bg-zinc-700/50"
                  }`}
                    >
                      {act === "allow" ? "✓  Allow" : "✕  Block"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex gap-2.5">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl text-sm font-medium cursor-pointer
            bg-zinc-500 dark:bg-zinc-300
            text-zinc-200 dark:text-zinc-800
            border border-zinc-200 dark:border-zinc-700/60
            hover:bg-zinc-200 dark:hover:bg-zinc-700
            hover:text-zinc-800 dark:hover:text-zinc-200
            active:scale-[0.98] transition-all duration-150 select-none"
              >
                Cancel
              </button>
              <button
                onClick={saveCondition}
                className="flex-1 py-2.5 rounded-xl text-sm font-semibold cursor-pointer
            bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700
            text-white
            shadow-[0_2px_10px_rgba(99,102,241,0.35)] hover:shadow-[0_4px_16px_rgba(99,102,241,0.45)]
            active:scale-[0.98] transition-all duration-150 select-none"
              >
                Save Condition
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}