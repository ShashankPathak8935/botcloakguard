import { useState } from "react";
import { Trash2, AlertTriangle } from "lucide-react";



const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, campaignName }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[420px] rounded-[20px] overflow-hidden
          bg-white dark:bg-[#0f0f10]
          border border-zinc-200/80 dark:border-white/[0.07]
          shadow-[0_32px_64px_rgba(0,0,0,0.14),0_8px_24px_rgba(0,0,0,0.06)]
          dark:shadow-[0_32px_64px_rgba(0,0,0,0.6),0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.05)]
          animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Body */}
        <div className="p-7 pb-6">
          {/* Icon + Text row */}
          <div className="flex items-start gap-4">
            <div
              className="h-11 w-11 rounded-xl flex items-center justify-center shrink-0 mt-0.5
              bg-rose-50 dark:bg-rose-500/10
              border border-rose-100 dark:border-rose-500/20"
            >
              <Trash2
                size={20}
                className="text-rose-500 dark:text-rose-400"
                strokeWidth={1.8}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-[16px] font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight mb-1.5">
                Delete campaign?
              </h2>
              <p className="text-[13.5px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {campaignName && (
                  <span className="font-medium text-zinc-700 dark:text-zinc-300">
                    "{campaignName}"
                  </span>
                )}{" "}
                will be permanently removed along with all click data,
                analytics, and tracking links.
              </p>
            </div>
          </div>

          {/* Warning chip */}
          <div
            className="mt-5 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl
            bg-rose-50 dark:bg-rose-500/[0.08]
            border border-rose-100 dark:border-rose-500/[0.18]"
          >
            <AlertTriangle
              size={13}
              className="text-rose-500 dark:text-rose-400 shrink-0"
              strokeWidth={2.5}
            />
            <p className="text-[12px] font-medium text-rose-600 dark:text-rose-400">
              This action is permanent and cannot be undone.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-7 pb-7 flex items-center gap-2.5">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-[13.5px] font-medium cursor-pointer
              bg-zinc-100 dark:bg-zinc-800/80
              text-zinc-600 dark:text-zinc-400
              border border-zinc-200 dark:border-zinc-700/60
              hover:bg-zinc-200 dark:hover:bg-zinc-700
              hover:text-zinc-800 dark:hover:text-zinc-200
              active:scale-[0.98] transition-all duration-150 select-none"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="flex-1 py-2.5 rounded-xl text-[13.5px] font-semibold cursor-pointer
              bg-rose-600 hover:bg-rose-500 active:bg-rose-700
              text-white
              shadow-[0_2px_12px_rgba(225,29,72,0.35)] hover:shadow-[0_4px_20px_rgba(225,29,72,0.45)]
              active:scale-[0.98] transition-all duration-150 select-none"
          >
            Delete campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;