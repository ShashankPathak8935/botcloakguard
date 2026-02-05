import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { showErrorToast, showSuccessToast } from "../../components/toast/toast";
import { googleLoginApi } from "../../api/Apis";
import { createApiFunction } from "../../api/ApiFunction";

export default function LandingActions() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/signin");
  };

  // ✅ Google Login Handler
  const loginWithGoogle = async (googleToken) => {
    // if (isSubmitting) return;
    // setIsSubmitting(true);

    try {
      const response = await createApiFunction("post", googleLoginApi, null, {
        token: googleToken,
      });

      if (response && response.data?.token) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("plan", JSON.stringify(response?.data?.plan));
        // showErrorToast("Working in dashboard");
        showSuccessToast("Signin successful!");

        await new Promise((res) => setTimeout(res, 400));
        navigate("/Dashboard/allStats");
      } else {
        showErrorToast("Unexpected response from server. Please try again.");
      }
    } catch (err) {
      // console.error("❌ Google login error:", err);
      const msg =
        err.response?.data?.message || "Google login failed. Please try again.";
      showErrorToast(msg);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8 text-center">
        {/* ================= HEADING ================= */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome 👋</h1>

        <p className="text-gray-500 mb-8">
          {user
            ? "Continue to your dashboard"
            : "Sign in to continue or create a new account"}
        </p>

        {/* ================= GOOGLE LOGIN ================= */}
        {!user && (
          <>
            <div className="mb-6">
              <GoogleOAuthProvider clientId="841461646285-9dimu89k2vjo4cbdj69ound7s0j7jm2s.apps.googleusercontent.com">
                <div className="w-full h-11 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      loginWithGoogle(credentialResponse.credential);
                    }}
                    onError={() => console.log("Login Failed")}
                  />
                </div>
              </GoogleOAuthProvider>
            </div>

            {/* ================= OR DIVIDER ================= */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
          </>
        )}

        {/* ================= ACTION BUTTONS ================= */}
        {user ? (
          <>
            <PrimaryButton
              label="Go to Dashboard"
              onClick={() => navigate("/dashboard/allStats")}
            />

            <button
              onClick={handleLogout}
              className="w-full h-11 mt-4 rounded-lg border border-[#EA454C] text-[#EA454C] font-medium hover:bg-red-50 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <>
            <PrimaryButton
              label="Sign in"
              onClick={() => navigate("/signin")}
            />

            <p className="text-sm text-gray-600 mt-6">
              Don’t have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-[#EA454C] font-medium cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= BUTTON ================= */
function PrimaryButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full h-11 rounded-lg text-white font-medium flex items-center justify-center transition hover:opacity-90"
      style={{ backgroundColor: "#EA454C" }}
    >
      {label}
    </button>
  );
}
