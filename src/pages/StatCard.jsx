import { ArrowUpRight } from "lucide-react";

export const StatCard = ({ title, value, footer }) => {
  return (
    <div
      className="
        rounded-2xl p-5 cursor-pointer transition
        bg-white border border-gray-200
        text-gray-900
        hover:shadow-lg

        dark:bg-[#0F111A]
        dark:border-white/10
        dark:text-gray-100
      "
    >
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h4 className="text-sm text-gray-500 dark:text-gray-400">{title}</h4>

        <ArrowUpRight className="h-4 w-4 text-gray-400 dark:text-gray-500" />
      </div>

      {/* VALUE */}
      <h2 className="mt-4 text-3xl font-semibold">{value}</h2>

      {/* FOOTER */}
      <p className="mt-3 text-xs font-medium text-emerald-500 dark:text-emerald-400">
        {footer}
      </p>
    </div>
  );
};
