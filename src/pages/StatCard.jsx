import { ArrowUpRight, Activity, Pause, Layers, Crown } from "lucide-react";

const icons = {
  "Total Campaign": Layers,
  "Active Campaign": Activity,
  "Paused Campaign": Pause,
  Plan: Crown,
};

export const StatCard = ({
  title,
  value,
  amount,
  footer,
  iconBg,
  iconColor,
  highlight,
}) => {
  const Icon = icons[title];

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>

        <div
          className={`h-10 w-10 flex items-center justify-center rounded-full ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </div>

      {/* MAIN VALUE */}
      <div className="mt-4">
        <h2 className="text-3xl font-semibold text-gray-900">{value}</h2>

        {amount && (
          <p className="mt-1 text-sm font-medium text-gray-600">{amount}</p>
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-xs text-gray-500">{footer}</p>

        <ArrowUpRight className="h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};
