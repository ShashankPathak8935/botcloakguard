// ── ManageLinks.jsx ───────────────────────────────────────────
import { Link2, BarChart2, Settings, Trash2, ExternalLink } from "lucide-react";

export default function ManageLinks() {
  return (
    <div
      className="rounded-2xl p-8 text-center
      bg-white dark:bg-zinc-900
      border border-dashed border-zinc-200 dark:border-zinc-700"
    >
      <div
        className="h-12 w-12 rounded-2xl mx-auto mb-4 flex items-center justify-center
        bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
      >
        <Link2
          size={20}
          className="text-zinc-400 dark:text-zinc-500"
          strokeWidth={1.8}
        />
      </div>
      <h3 className="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
        No links yet
      </h3>
      <p className="text-sm text-zinc-400 dark:text-zinc-500 max-w-xs mx-auto">
        Links you create will appear here. Go to Create Link to get started.
      </p>
    </div>
  );
}
