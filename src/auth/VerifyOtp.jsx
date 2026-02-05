import React, { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import { createApiFunction } from "../api/ApiFunction";
import { verifyOtpApi, resendOtpApi, signupApi } from "../api/Apis";
import { showErrorToast, showSuccessToast } from "../components/toast/toast";
import { set } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  ShieldCheckIcon,
  EnvelopeIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";

export default function VerifyOtp() {
  const navigate = useNavigate();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const signupData = JSON.parse(localStorage.getItem("signup_data"));
  const email = signupData?.email;

  useEffect(() => {
    if (!signupData) navigate("/signup");
  }, [signupData, navigate]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    // only single digit number
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        // clear current
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        // move focus back
        document.getElementById(`otp-${index - 1}`)?.focus();
      }
    }
  };

  // Optional but professional: paste full OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (pastedData.length === 0) return;

    const newOtp = pastedData.split("");
    while (newOtp.length < 6) newOtp.push("");

    setOtp(newOtp);

    const focusIndex = Math.min(pastedData.length, 5);
    document.getElementById(`otp-${focusIndex}`)?.focus();
  };

  const handleVerify = async () => {
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      showErrorToast("Please enter complete OTP");
      return;
    }

    const payload = {
      name: signupData?.name,
      email,
      password: signupData?.password,
      otp: finalOtp,
    };

    setLoading(true);
    try {
      const res = await createApiFunction("post", verifyOtpApi, null, payload);

      if (res?.status === 201) {
        showSuccessToast("Account created successfully 🎉");
        localStorage.removeItem("signup_data");
        navigate("/signin");
      } else {
        showErrorToast(res?.message || "Invalid OTP");
      }
    } catch (err) {
      showErrorToast(err?.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    const payload = {
      name: signupData?.name,
      email,
      password: signupData?.password,
    };
    try {
      const response = await createApiFunction(
        "post",
        signupApi,
        null,
        payload,
      );

      setOtp(["", "", "", "", "", ""]);

      if (response?.data?.success) {
        showSuccessToast("OTP resent successfully!");
      }
    } catch {
      showErrorToast("Failed to resend OTP");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen w-screen bg-[#F8F8F8] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm px-8 py-10 text-center">
        {/* TOP ICON */}
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center">
            <ShieldCheckIcon className="h-7 w-7 text-indigo-600" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Verify Email
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          Please enter the six digit verification code sent to
        </p>

        {/* EMAIL */}
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700 mb-8">
          <EnvelopeIcon className="h-4 w-4 text-gray-400" />
          <b>{signupData.email}</b>
        </div>

        {/* OTP INPUTS */}
        <div onPaste={handlePaste} className="flex justify-center gap-3 mb-8">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="
            w-12 h-12
            rounded-full
            border border-gray-300
            text-center
            text-lg font-semibold
            text-gray-800
            focus:outline-none
            focus:ring-2
            focus:ring-indigo-500
            transition
          "
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full h-12 rounded-full text-white font-medium text-sm transition mb-6 hover:opacity-90"
          style={{ backgroundColor: "#EA454C" }}
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {/* RESEND */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <button
            onClick={handleResend}
            disabled={resending}
            className={`text-sm font-medium flex items-center gap-2 transition
          ${
            resending
              ? "text-gray-400 cursor-not-allowed"
              : "text-indigo-600 hover:text-indigo-700 cursor-pointer"
          }
        `}
          >
            <ArrowPathIcon
              className={`h-4 w-4 ${resending ? "animate-spin" : ""}`}
            />
            {resending ? "Resending..." : "Resend OTP"}
          </button>
        </div>

        {/* BACK */}
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </Link>
      </div>
    </div>
  );
}
