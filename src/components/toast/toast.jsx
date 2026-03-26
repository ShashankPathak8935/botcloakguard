import toast from "react-hot-toast";

const isDark = () => document.documentElement.classList.contains("dark");

const THEMES = {
  success: {
    light: {
      bg: "#ffffff",
      border: "0.5px solid #d1fae5",
      shadow:
        "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(16,185,129,0.08), 0 0 0 1px rgba(16,185,129,0.04)",
      iconBg: "#f0fdf4",
      iconBorder: "0.5px solid #bbf7d0",
      iconStroke: "#16a34a",
      title: "#0f172a",
      sub: "#15803d",
      trackBg: "#dcfce7",
      barColor: "linear-gradient(90deg,#16a34a,#4ade80)",
      dot: "#22c55e",
      dotRing: "rgba(34,197,94,0.15)",
    },
    dark: {
      bg: "#0c1710",
      border: "0.5px solid rgba(34,197,94,0.18)",
      shadow:
        "0 2px 4px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
      iconBg: "rgba(34,197,94,0.08)",
      iconBorder: "0.5px solid rgba(34,197,94,0.2)",
      iconStroke: "#4ade80",
      title: "#f1f5f9",
      sub: "#4ade80",
      trackBg: "rgba(34,197,94,0.07)",
      barColor: "linear-gradient(90deg,#16a34a,#4ade80)",
      dot: "#22c55e",
      dotRing: "rgba(34,197,94,0.12)",
    },
  },
  error: {
    light: {
      bg: "#ffffff",
      border: "0.5px solid #fecdd3",
      shadow:
        "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(239,68,68,0.08), 0 0 0 1px rgba(239,68,68,0.04)",
      iconBg: "#fff1f2",
      iconBorder: "0.5px solid #fecdd3",
      iconStroke: "#dc2626",
      title: "#0f172a",
      sub: "#dc2626",
      trackBg: "#fee2e2",
      barColor: "linear-gradient(90deg,#dc2626,#f87171)",
      dot: "#ef4444",
      dotRing: "rgba(239,68,68,0.15)",
    },
    dark: {
      bg: "#150a0a",
      border: "0.5px solid rgba(239,68,68,0.18)",
      shadow:
        "0 2px 4px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
      iconBg: "rgba(239,68,68,0.08)",
      iconBorder: "0.5px solid rgba(239,68,68,0.2)",
      iconStroke: "#f87171",
      title: "#f1f5f9",
      sub: "#f87171",
      trackBg: "rgba(239,68,68,0.07)",
      barColor: "linear-gradient(90deg,#dc2626,#f87171)",
      dot: "#ef4444",
      dotRing: "rgba(239,68,68,0.12)",
    },
  },
  warning: {
    light: {
      bg: "#ffffff",
      border: "0.5px solid #fde68a",
      shadow:
        "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(245,158,11,0.08), 0 0 0 1px rgba(245,158,11,0.04)",
      iconBg: "#fffbeb",
      iconBorder: "0.5px solid #fde68a",
      iconStroke: "#d97706",
      title: "#0f172a",
      sub: "#b45309",
      trackBg: "#fef3c7",
      barColor: "linear-gradient(90deg,#d97706,#fbbf24)",
      dot: "#f59e0b",
      dotRing: "rgba(245,158,11,0.15)",
    },
    dark: {
      bg: "#120f00",
      border: "0.5px solid rgba(245,158,11,0.18)",
      shadow:
        "0 2px 4px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
      iconBg: "rgba(245,158,11,0.08)",
      iconBorder: "0.5px solid rgba(245,158,11,0.2)",
      iconStroke: "#fbbf24",
      title: "#f1f5f9",
      sub: "#fbbf24",
      trackBg: "rgba(245,158,11,0.07)",
      barColor: "linear-gradient(90deg,#d97706,#fbbf24)",
      dot: "#f59e0b",
      dotRing: "rgba(245,158,11,0.12)",
    },
  },
  info: {
    light: {
      bg: "#ffffff",
      border: "0.5px solid #bfdbfe",
      shadow:
        "0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(59,130,246,0.08), 0 0 0 1px rgba(59,130,246,0.04)",
      iconBg: "#eff6ff",
      iconBorder: "0.5px solid #bfdbfe",
      iconStroke: "#2563eb",
      title: "#0f172a",
      sub: "#2563eb",
      trackBg: "#dbeafe",
      barColor: "linear-gradient(90deg,#2563eb,#60a5fa)",
      dot: "#3b82f6",
      dotRing: "rgba(59,130,246,0.15)",
    },
    dark: {
      bg: "#060e1a",
      border: "0.5px solid rgba(59,130,246,0.18)",
      shadow:
        "0 2px 4px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)",
      iconBg: "rgba(59,130,246,0.08)",
      iconBorder: "0.5px solid rgba(59,130,246,0.2)",
      iconStroke: "#60a5fa",
      title: "#f1f5f9",
      sub: "#60a5fa",
      trackBg: "rgba(59,130,246,0.07)",
      barColor: "linear-gradient(90deg,#2563eb,#60a5fa)",
      dot: "#3b82f6",
      dotRing: "rgba(59,130,246,0.12)",
    },
  },
};

const ICONS = {
  success: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
  warning: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  ),
  info: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  ),
};

const ProgressToast = ({ t, type, title, subtitle, duration = 2500 }) => {
  const c = THEMES[type][isDark() ? "dark" : "light"];

  return (
    <div
      style={{
        background: c.bg,
        border: c.border,
        borderRadius: "14px",
        overflow: "hidden",
        minWidth: "320px",
        maxWidth: "400px",
        boxShadow: c.shadow,
        opacity: t.visible ? 1 : 0,
        transform: t.visible
          ? "translateY(0) scale(1)"
          : "translateY(-14px) scale(0.96)",
        transition:
          "opacity 0.35s ease, transform 0.4s cubic-bezier(.22,1,.36,1)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "13px",
          padding: "15px 16px 13px",
        }}
      >
        {/* Icon */}
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "9px",
            flexShrink: 0,
            marginTop: "1px",
            background: c.iconBg,
            border: c.iconBorder,
            color: c.iconStroke,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {ICONS[type]}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p
            style={{
              fontSize: "13.5px",
              fontWeight: 600,
              color: c.title,
              margin: "0 0 3px",
              letterSpacing: "-0.01em",
            }}
          >
            {title}
          </p>
          {subtitle && (
            <p
              style={{
                fontSize: "12px",
                color: c.sub,
                margin: 0,
                opacity: 0.85,
                fontWeight: 400,
              }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Live dot */}
        <div
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            flexShrink: 0,
            marginTop: "6px",
            background: c.dot,
            boxShadow: `0 0 0 3px ${c.dotRing}`,
          }}
        />
      </div>

      {/* Progress bar */}
      <div style={{ height: "2px", background: c.trackBg }}>
        <div
          style={{
            height: "100%",
            width: "100%",
            background: c.barColor,
            transformOrigin: "left",
            animation: `drainBar ${duration}ms linear forwards`,
          }}
        />
      </div>

      <style>{`@keyframes drainBar{from{transform:scaleX(1)}to{transform:scaleX(0)}}`}</style>
    </div>
  );
};

export const showSuccessToast = (title, subtitle) =>
  toast.custom(
    (t) => (
      <ProgressToast t={t} type="success" title={title} subtitle={subtitle} />
    ),
    { duration: 2500 },
  );

// export const showErrorToast = (message) =>
//   toast.error(message, {
//     duration: 2000,
//     style: {
//       background: "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
//       color: "#ffffff",
//       border: "1px solid rgba(220, 38, 38, 0.3)",
//       padding: "16px 20px",
//       fontSize: "14px",
//       fontWeight: "500",
//       borderRadius: "12px",
//       boxShadow:
//         "0 8px 32px rgba(220, 38, 38, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1)",
//       backdropFilter: "blur(10px)",
//       maxWidth: "400px",
//       minWidth: "300px",
//       animation: "slideIn 0.3s ease-out",
//     },
//     iconTheme: {
//       primary: "#ffffff",
//       secondary: "#dc2626",
//     },
//   });

export const showErrorToast = (title, subtitle) =>
  toast.custom(
    (t) => (
      <ProgressToast t={t} type="error" title={title} subtitle={subtitle} />
    ),
    { duration: 3000 },
  );

// export const showWarningToast = (message) =>
//   toast(message, {
//     duration: 2000,
//     icon: "⚠️",
//     style: {
//       background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
//       color: "#ffffff",
//       border: "1px solid rgba(245, 158, 11, 0.3)",
//       padding: "16px 20px",
//       fontSize: "14px",
//       fontWeight: "500",
//       borderRadius: "12px",
//       boxShadow:
//         "0 8px 32px rgba(245, 158, 11, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1)",
//       backdropFilter: "blur(10px)",
//       maxWidth: "400px",
//       minWidth: "300px",
//       animation: "slideIn 0.3s ease-out",
//     },
//   });

export const showWarningToast = (title, subtitle) =>
  toast.custom(
    (t) => (
      <ProgressToast t={t} type="warning" title={title} subtitle={subtitle} />
    ),
    { duration: 3000 },
  );

// export const showInfoToast = (message) =>
//   toast(message, {
//     duration: 2000,
//     icon: "ℹ️",
//     style: {
//       background: "linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)",
//       color: "#ffffff",
//       border: "1px solid rgba(59, 130, 246, 0.3)",
//       padding: "16px 20px",
//       fontSize: "14px",
//       fontWeight: "500",
//       borderRadius: "12px",
//       boxShadow:
//         "0 8px 32px rgba(59, 130, 246, 0.25), 0 2px 8px rgba(0, 0, 0, 0.1)",
//       backdropFilter: "blur(10px)",
//       maxWidth: "400px",
//       minWidth: "300px",
//       animation: "slideIn 0.3s ease-out",
//     },
//   });

export const showInfoToast = (title, subtitle) =>
  toast.custom(
    (t) => (
      <ProgressToast t={t} type="info" title={title} subtitle={subtitle} />
    ),
    { duration: 2500 },
  );