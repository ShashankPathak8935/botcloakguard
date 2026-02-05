import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Turnstile } from "@marsidev/react-turnstile";
import { createApiFunction } from "../api/ApiFunction";
import { googleLoginApi, logInApi } from "../api/Apis";
import {
  EyeIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";

import { showErrorToast, showSuccessToast } from "../components/toast/toast";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

export default function LoginPage() {
  const navigate = useNavigate();

  // ✅ UI & Form States
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState(null); // Turnstile token state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit Handler with full safety
  const onSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Frontend validation
    if (!formData.email.trim() || !formData.password.trim()) {
      showErrorToast("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await createApiFunction(
        "post",
        logInApi,
        null,
        formData,
      );

      if (response && response.data?.token) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("plan");

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("plan", JSON.stringify(response.data.plan));
        // showErrorToast("working on dashboard");

        showSuccessToast("Signin successful!");

        await new Promise((res) => setTimeout(res, 400));
        navigate("/Dashboard/allStats");
      } else {
        showErrorToast("Unexpected response from server. Please try again.");
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      const msg =
        err.response?.data?.message ||
        "Invalid credentials or server error. Please try again.";
      showErrorToast(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ✅ Google Login Handler
  const loginWithGoogle = async (googleToken) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const response = await createApiFunction("post", googleLoginApi, null, {
        token: googleToken,
      });

      if (response && response.data?.token) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("plan");

        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("plan", JSON.stringify(response.data.plan));
        // showErrorToast("working on dashboard");
        showSuccessToast("Signin successful!");

        await new Promise((res) => setTimeout(res, 400));
        navigate("/Dashboard/allStats");
      } else {
        showErrorToast("Unexpected response from server. Please try again.");
      }
    } catch (err) {
      console.error("❌ Google login error:", err);
      const msg =
        err.response?.data?.message || "Google login failed. Please try again.";
      showErrorToast(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm">
        {/* ================= HEADING ================= */}
        <h1 className="text-3xl font-bold text-gray-900 mb-1 text-center">
          WELCOME BACK
        </h1>
        <p className="text-gray-500 mb-8 text-center">
          Welcome back! Please enter your details.
        </p>

        {/* ================= GOOGLE SIGN IN ================= */}
        <div className="flex justify-center items-center mb-6">
          <GoogleOAuthProvider clientId="841461646285-9dimu89k2vjo4cbdj69ound7s0j7jm2s.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                loginWithGoogle(credentialResponse.credential);
              }}
              onError={() => console.log("Login Failed")}
            />
          </GoogleOAuthProvider>
        </div>

        {/* ================= OR DIVIDER ================= */}
        <div className="flex items-center mb-6">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="px-3 text-gray-400 text-sm">Or</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={onSubmit}
          onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
        >
          {/* ================= EMAIL ================= */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                name="email"
                autoComplete="off"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-11 pl-10 pr-3 rounded-lg border border-gray-300 text-sm
              placeholder:text-gray-400 text-gray-800
              focus:outline-none focus:ring-2 focus:ring-red-200"
              />
            </div>
          </div>

          {/* ================= PASSWORD ================= */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>

            <div className="relative">
              <LockClosedIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                autoComplete="new-password"
                placeholder="********"
                value={formData.password}
                onChange={handleChange}
                className="w-full h-11 pl-10 pr-10 rounded-lg border border-gray-300 text-sm
              placeholder:text-gray-400 text-gray-800
              focus:outline-none focus:ring-2 focus:ring-red-200"
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                role="button"
                tabIndex={0}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </span>
            </div>
          </div>

          {/* ================= REMEMBER / FORGOT ================= */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="rounded border-gray-300 text-red-500 focus:ring-red-400"
              />
              Remember me
            </label>

            <Link
              to="/reset-password"
              className="text-sm text-red-500 font-medium hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* ================= TURNSTILE ================= */}
          <div className="mb-6">
            <Turnstile
              siteKey="0x4AAAAAACMpjTD163cCGaKh"
              onSuccess={(token) => setToken(token)}
              onExpire={() => setToken(null)}
            />
          </div>

          {/* ================= SUBMIT ================= */}
          <button
            disabled={isSubmitting}
            onClick={!isSubmitting ? onSubmit : undefined}
            className={`w-full h-11 rounded-lg text-white font-medium transition
          flex items-center justify-center gap-2
          ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"
          }`}
            style={{ backgroundColor: "#EA454C" }}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  />
                </svg>
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>

          {/* ================= SIGNUP ================= */}
          <p className="text-sm text-gray-600 mt-6 text-center">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-red-500 font-medium hover:underline"
            >
              Sign up for free
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
