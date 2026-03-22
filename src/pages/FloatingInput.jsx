export default function FloatingInput({
  label,
  placeholder,
  value,
  setValue,
}) {
  return (
    <div className="relative">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder=" "
        className="
          peer w-full rounded-xl px-4 pt-5 pb-2
          bg-gray-50 dark:bg-[#020617]
          border border-gray-300 dark:border-white/10
          text-gray-900 dark:text-white
          focus:outline-none
          focus:border-blue-500
          focus:ring-2 focus:ring-blue-500/20
          transition
        "
      />

      <label
        className="
          absolute left-4 top-2
          text-xs
          text-gray-500 dark:text-gray-400
          transition-all
          peer-placeholder-shown:top-3
          peer-placeholder-shown:text-sm
          peer-focus:top-2
          peer-focus:text-xs
        "
      >
        {label}
      </label>
    </div>
  );
}