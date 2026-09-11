import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Lock, Eye, EyeOff } from "lucide-react";
import { resetPassword } from "../../features/auth/authSlice";

const ResetPassword = () => {
  const { token } = useParams();

  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    if (!password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!token) {
      setError("Invalid password reset link.");
      return;
    }

    try {
      setLoading(true);
      const response = await resetPassword(token, password, confirmPassword);

      setMessage(response.message || "Password reset successfully.");

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setError(error.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbf8] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-[495px]">
        <div
          className="
          bg-white
          rounded-[28px]
          shadow-[0_10px_40px_rgba(0,0,0,0.08)]
          px-6 py-8
          sm:px-9 sm:py-9
          md:px-10 md:py-10
        "
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div
              className="
              h-10 w-10
              rounded-[14px]
              bg-[#8b3905]
              flex items-center justify-center
            "
            >
              <span className="text-white font-bold text-lg">N</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1
              className="
              text-[28px]
              leading-[30px]
              font-semibold
              text-gray-900
            "
            >
              Reset Password
            </h1>

            <p
              className="
              text-sm
              text-gray-500
              mt-3
              leading-6
            "
            >
              Create a new password for your Nexora account.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div
              className="
              mb-4
              rounded-xl
              bg-red-50
              border
              border-red-100
              px-4
              py-3
              text-sm
              text-red-600
            "
            >
              {error}
            </div>
          )}

          {/* Success */}
          {message && (
            <div
              className="
              mb-4
              rounded-xl
              bg-green-50
              border
              border-green-100
              px-4
              py-3
              text-sm
              text-green-600
            "
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Password */}
            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
            "
            >
              New Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="
                  w-full
                  h-12
                  pl-11
                  pr-12
                  rounded-[14px]
                  border
                  border-[#e5e1de]
                  outline-none
                  focus:border-[#8b3905]
                  transition
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-[#8b3905]
                "
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <label
              className="
              block
              text-sm
              font-medium
              text-gray-700
              mt-5
              mb-2
            "
            >
              Confirm Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="
                  w-full
                  h-12
                  pl-11
                  pr-12
                  rounded-[14px]
                  border
                  border-[#e5e1de]
                  outline-none
                  focus:border-[#8b3905]
                  transition
                "
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-[#8b3905]
                "
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                h-14
                mt-6
                rounded-[14px]
                bg-[#8b3905]
                text-white
                font-medium
                hover:bg-[#743004]
                transition
                disabled:opacity-60
                disabled:cursor-not-allowed
              "
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          {/* Back */}
          <div className="flex justify-center mt-7">
            <Link
              to="/"
              className="
                flex
                items-center
                gap-2
                text-sm
                font-medium
                text-[#8b3905]
                hover:underline
              "
            >
              {/* <ArrowLeft size={16} /> */}
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
