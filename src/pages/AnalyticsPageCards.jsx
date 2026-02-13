import React from "react";
import { Users, TrendingDown, BadgeCheck, Share2 } from "lucide-react";

export default function AnalyticsPageCards() {
  const cards = [
    {
      title: "Total Visitors",
      value: "5.9M",
      subtitle: "See in-depth Traffic sources",
      icon: Users,
      iconBg: "bg-blue-100 dark:bg-blue-900/40",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Bounce Rate",
      value: "62.11%",
      subtitle: "See page-wise Performance",
      icon: TrendingDown,
      iconBg: "bg-orange-100 dark:bg-orange-900/40",
      iconColor: "text-orange-600 dark:text-orange-400",
    },
    {
      title: "Conversion",
      value: "21.91%",
      subtitle: "See last week's Top Products",
      icon: BadgeCheck,
      iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
      iconColor: "text-emerald-600 dark:text-emerald-400",
    },
    {
      title: "Active Referrals",
      value: "470",
      subtitle: "See all inbound Referral links",
      icon: Share2,
      iconBg: "bg-cyan-100 dark:bg-cyan-900/40",
      iconColor: "text-cyan-600 dark:text-cyan-400",
    },
  ];

  return (
    <div
      className="
        grid grid-cols-1 md:grid-cols-4 rounded-xl overflow-hidden transition
        border border-gray-200 bg-white text-gray-900
        dark:border-white/10 dark:bg-[#0B0E18] dark:text-white
      "
    >
      {cards.map((card, i) => {
        const Icon = card.icon;

        return (
          <div
            key={i}
            className="
              p-6 flex flex-col gap-4
              border-r border-gray-200
              last:border-r-0
              dark:border-white/10
            "
          >
            {/* Title */}
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {card.title}
            </p>

            {/* Icon */}
            <div
              className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.iconBg}`}
            >
              <Icon size={20} className={card.iconColor} />
            </div>

            {/* Value */}
            <h2 className="text-3xl font-semibold">{card.value}</h2>

            {/* Link */}
            <p className="text-sm text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
              {card.subtitle}
            </p>
          </div>
        );
      })}
    </div>
  );
}
