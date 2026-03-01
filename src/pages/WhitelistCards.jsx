export const WhitelistCards = ({ title, value, icon, color }) => {
  return (
    <div
      className="flex items-center gap-4 p-5 rounded-xl
      bg-white dark:bg-[#0B1220]
      border border-gray-200 dark:border-gray-800
      shadow-sm"
    >
      <div
        className={`p-3 rounded-lg
        bg-${color}-100 dark:bg-${color}-900/30
        text-${color}-600 dark:text-${color}-400`}
      >
        {icon}
      </div>

      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          {value}
        </h2>
      </div>
    </div>
  );
};
