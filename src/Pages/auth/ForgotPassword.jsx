import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";
import { forgotPassword } from "../../features/auth/auth.api";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await forgotPassword(email.trim().toLowerCase());

      setMessage(
        response.message ||
          "If an account exists with this email, a password reset link has been sent.",
      );

      setEmail("");
    } catch (error) {
      console.error("FORGOT PASSWORD ERROR:", error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#fcfbf8] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[495px]">
        {/* Card */}
        <div className="bg-white rounded-[28px] shadow-[0_10px_40px_rgba(0,0,0,0.08)] px-6 py-8 sm:px-9 sm:py-9 md:px-10 md:py-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="h-10 w-10 rounded-[14px] bg-[#8b3905] flex items-center justify-center">
              <span className="text-white font-bold text-lg">N</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-[28px] leading-[30px] font-semibold text-gray-900">
              Forgot Password?
            </h1>

            <p className="text-sm text-gray-500 mt-3 leading-6">
              Enter your email address and we'll send you a link to reset your
              password.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div className="mb-4 rounded-xl bg-green-50 border border-green-100 px-4 py-3 text-sm text-green-600">
              {message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full h-12 pl-11 pr-4 rounded-[14px] border border-[#e5e1de] outline-none focus:border-[#8b3905] transition"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 mt-5 rounded-[14px] bg-[#8b3905] text-white font-medium hover:bg-[#743004] transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {/* Back to login */}
          <div className="flex justify-center mt-7">
            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-medium text-[#8b3905] hover:underline"
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
