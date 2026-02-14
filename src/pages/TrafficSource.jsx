const sourceLogos = {
  google: "https://cdn.simpleicons.org/google",
  facebook: "https://cdn.simpleicons.org/facebook",
  tiktok: "https://cdn.simpleicons.org/tiktok",
  linkedin: "https://cdn.simpleicons.org/linkedin",
  instagram: "https://cdn.simpleicons.org/instagram",
  amazon: "https://cdn.simpleicons.org/amazon",
  twitter: "https://cdn.simpleicons.org/twitter",
  pinterest: "https://cdn.simpleicons.org/pinterest",
  snapchat: "https://cdn.simpleicons.org/snapchat",
  yandex: "https://cdn.simpleicons.org/yandex",
  unity: "https://cdn.simpleicons.org/unity",
  admob: "https://cdn.simpleicons.org/googleads",
  outbrain: "https://cdn.simpleicons.org/outbrain",
  taboola: "https://cdn.simpleicons.org/taboola",
  mgid: "https://cdn.simpleicons.org/mgid",
};

const TrafficSource = ({ source }) => {
  const normalized = source?.toLowerCase() || "";

  const logoKey = Object.keys(sourceLogos).find((key) =>
    normalized.includes(key),
  );

  const logo = logoKey
    ? sourceLogos[logoKey]
    : "https://cdn.simpleicons.org/internetexplorer"; // fallback icon

  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt={source} className="w-5 h-5 object-contain" />
      <span>{source || "-"}</span>
    </div>
  );
};

export default TrafficSource;
