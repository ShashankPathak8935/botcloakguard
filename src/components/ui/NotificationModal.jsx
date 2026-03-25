import { useState, useRef, useEffect } from "react";
import { X, CheckCheck } from "lucide-react";

export default function NotificationModal({ open, onClose }) {
  const modalRef = useRef(null);

  /* ---------------- STATIC DATA ---------------- */

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Free Trial Activated 🎉",
      message: "Your free trial is now active.",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Campaign Approved",
      message: "Your campaign has been approved successfully.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      title: "Security Alert",
      message: "New login detected from Chrome browser.",
      time: "Yesterday",
      read: false,
    },
  ]);

  /* ---------------- CLOSE OUTSIDE CLICK ---------------- */

  useEffect(() => {
    const handler = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!open) return null;

  /* ---------------- ACTIONS ---------------- */

  const markAsRead = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const readAll = () => {
    setNotifications([]);
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-md">
      <div
        ref={modalRef}
        className="
      w-[400px] h-full
      flex flex-col

      /* GLASS + PREMIUM BG */
      bg-gradient-to-b
      from-white via-white to-gray-50
      dark:from-[#0b0f19]
      dark:via-[#0f1320]
      dark:to-[#0b0f19]

      border-l border-white/40
      dark:border-[#1b2130]

      shadow-[0_0_60px_rgba(0,0,0,0.25)]
      animate-fadeIn
    "
      >
        {/* HEADER */}
        <div
          className="
        flex items-center justify-between
        px-6 py-5

        bg-gradient-to-r
        from-orange-50 to-transparent
        dark:from-orange-500/10 dark:to-transparent

        border-b border-gray-200/60
        dark:border-[#1b2130]
      "
        >
          <h2 className="font-semibold text-gray-800 dark:text-white tracking-wide">
            🔔 Notifications
          </h2>

          <X
            onClick={onClose}
            className="
          cursor-pointer rounded-lg p-1
          text-gray-500 dark:text-gray-300
          hover:bg-red-100 dark:hover:bg-red-500/20
          hover:text-red-500
          transition
        "
          />
        </div>

        {/* LIST */}
        <div className="flex-1 overflow-y-auto px-2">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No notifications found 🔔
              </p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => markAsRead(n.id)}
                className="
              group cursor-pointer
              mx-2 my-2 px-4 py-4
              rounded-xl

              bg-white/70 dark:bg-[#12172a]/70
              backdrop-blur-md

              hover:bg-orange-50
              dark:hover:bg-[#18203a]

              transition-all duration-200
              hover:shadow-lg
              hover:shadow-orange-500/10
            "
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {n.title}
                    </p>

                    <p className="text-sm mt-1 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {n.message}
                    </p>

                    <span className="text-xs text-gray-400 mt-2 block">
                      {n.time}
                    </span>
                  </div>

                  {/* UNREAD DOT */}
                  <span
                    className="
                  w-2.5 h-2.5 mt-2
                  rounded-full
                  bg-gradient-to-r
                  from-orange-400 to-red-500
                  shadow-[0_0_8px_rgba(255,120,60,0.8)]
                "
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        {notifications.length > 0 && (
          <div
            className="
          p-5
          border-t border-gray-200/60
          dark:border-[#1b2130]
          bg-white/60 dark:bg-[#0f1320]/60
          backdrop-blur-md
        "
          >
            <button
              onClick={readAll}
              className="
            w-full flex items-center justify-center gap-2
            py-3 rounded-xl text-sm font-semibold text-white

            bg-gradient-to-r
            from-orange-500 via-red-500 to-pink-500

            hover:scale-[1.02]
            active:scale-95
            transition-all duration-300

            shadow-lg hover:shadow-orange-500/30
          "
            >
              <CheckCheck size={16} />
              Read All Notifications
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
