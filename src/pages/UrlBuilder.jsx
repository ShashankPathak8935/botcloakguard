import { useState } from "react";
import { Copy } from "lucide-react";
import FloatingInput from "./FloatingInput";
import UtmInfo from "./UtmInfo";
import { showErrorToast, showSuccessToast } from "../components/toast/toast";

export default function UrlBuilder() {
  const [url, setUrl] = useState("");
  const [source, setSource] = useState("");
  const [medium, setMedium] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [campaign, setCampaign] = useState("");
  const [campaignTerm, setCampaignTerm] = useState("");
  const [campaignContent, setCampaignContent] = useState("");


const generatedUrl = (() => {
  if (!url) return "";

  const params = new URLSearchParams();

  if (source) params.append("utm_source", source);
  if (medium) params.append("utm_medium", medium);
  if (campaign) params.append("utm_campaign", campaign);
  if (campaignId) params.append("utm_id", campaignId);
  if (campaignTerm) params.append("utm_term", campaignTerm);
  if (campaignContent) params.append("utm_content", campaignContent);

  const queryString = params.toString();

  if (!queryString) return url;

  return url.includes("?")
    ? `${url}&${queryString}`
    : `${url}?${queryString}`;
})();

  return (
    <div className="w-full space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Campaign URL Builder
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Create optimized tracking links for marketing campaigns.
        </p>
      </div>

      {/* Layout */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* ================= FORM CARD ================= */}
        <div
          className="
            rounded-2xl p-6
            bg-white dark:bg-[#020617]
            border border-gray-200 dark:border-white/10
            shadow-lg dark:shadow-none
          "
        >
          <h2 className="font-semibold mb-6 text-gray-800 dark:text-white">
            Campaign Details
          </h2>

          <div className="space-y-5">
            <FloatingInput
              label="Website URL"
              placeholder="https://example.com"
              value={url}
              setValue={setUrl}
            />

            <FloatingInput
              label="Campaign Source"
              placeholder="google, newsletter"
              value={source}
              setValue={setSource}
            />

            <FloatingInput
              label="Marketing Medium"
              placeholder="cpc, banner, email"
              value={medium}
              setValue={setMedium}
            />

            <FloatingInput
              label="Campaign Id"
              placeholder="Campaign ID"
              value={campaignId}
              setValue={setCampaignId}
            />
            <FloatingInput
              label="Campaign Name"
              placeholder="campaign name"
              value={campaign}
              setValue={setCampaign}
            />
            <FloatingInput
              label="Identify The Paid Keywords"
              placeholder="Campaign Term"
              value={campaignTerm}
              setValue={setCampaignTerm}
            />
            <FloatingInput
              label="Use to diffrentiate Ads"
              placeholder="Campaign Content"
              value={campaignContent}
              setValue={setCampaignContent}
            />
          </div>
        </div>

        {/* ================= PREVIEW CARD ================= */}
        <div
          className="
            rounded-2xl p-6
            bg-gradient-to-br
            from-blue-50 to-indigo-50
            dark:from-[#020617] dark:to-[#020617]
            border border-blue-100 dark:border-white/10
            shadow-xl
          "
        >
          <h2 className="font-semibold text-gray-900 dark:text-white mb-2">
            Live Campaign URL
          </h2>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Share this generated link in your marketing channels.
          </p>

          {/* URL BOX */}
          <div
            className="
              flex items-center justify-between
              rounded-xl p-4
              bg-white dark:bg-[#030712]
              border border-gray-200 dark:border-white/10
            "
          >
            <span className="text-sm text-gray-700 dark:text-gray-300 break-all">
              {generatedUrl}
            </span>

            <button
          disabled={!generatedUrl}
          onClick={async () => {
          if (!generatedUrl) {
          showErrorToast("Generate URL first");
          return;
          }

         try {
         await navigator.clipboard.writeText(generatedUrl);
        showSuccessToast("Url Copied");
        } catch (error) {
        showErrorToast("Copy failed");
        }
       }}
      className={`
      ml-4 flex items-center gap-2
      px-3 py-2 rounded-lg
      text-sm transition-all duration-200

       ${
        generatedUrl
        ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow hover:shadow-md"
        : "bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed"
       }
     `}
     >
      <Copy size={16} />
        Copy
          </button>
          </div>

          {/* Shorten */}
          <button
         disabled={!generatedUrl}
         className={`
          mt-6 w-full
          rounded-xl py-3
          font-medium
          text-white
          transition-all duration-300
          shadow-lg
         ${
         generatedUrl
          ? `
          bg-gradient-to-r
          from-indigo-500 via-violet-500 to-blue-500
          hover:from-indigo-600 hover:via-violet-600 hover:to-blue-600
          hover:shadow-2xl
          active:scale-[0.98]
          cursor-pointer
        `
        : `
          bg-zinc-300 dark:bg-zinc-700
          text-zinc-500 dark:text-zinc-400
          cursor-not-allowed
          shadow-none
        `
        }
        `}
          >
          Shorten Link
          </button>
        </div>
      </div>
      <div className="mt-4">
        <UtmInfo/>
      </div>
    </div>
  );
}