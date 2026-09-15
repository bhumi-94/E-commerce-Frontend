import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/auth/auth.api";

const MailIcon = ({ className = "" }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

const LockIcon = ({ className = "" }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="4" y="10" width="16" height="11" rx="2" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
  </svg>
);

const EyeIcon = ({ className = "" }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = ({ className = "" }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 3l18 18" />
    <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
    <path d="M9.9 5.1A10.6 10.6 0 0 1 12 5c6.5 0 10 7 10 7a18.7 18.7 0 0 1-3.2 4.2" />
    <path d="M6.6 6.6C3.6 8.5 2 12 2 12s3.5 7 10 7a10.7 10.7 0 0 0 4-.8" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M21.35 12.23c0-.79-.07-1.55-.23-2.23H12v4.22h5.24a4.48 4.48 0 0 1-1.95 2.94v2.45h3.16c1.85-1.7 2.9-4.2 2.9-7.38z"
    />

    <path
      fill="#34A853"
      d="M12 21.5c2.65 0 4.88-.88 6.51-2.39l-3.16-2.45c-.88.59-2 .94-3.35.94-2.57 0-4.75-1.74-5.53-4.08H3.2v2.53A9.83 9.83 0 0 0 12 21.5z"
    />

    <path
      fill="#FBBC05"
      d="M6.47 13.52A5.91 5.91 0 0 1 6.16 12c0-.53.11-1.05.31-1.52V7.95H3.2A9.83 9.83 0 0 0 2.17 12c0 1.58.38 3.07 1.03 4.05l3.27-2.53z"
    />

    <path
      fill="#EA4335"
      d="M12 6.39c1.45 0 2.75.5 3.77 1.48l2.82-2.82C16.88 3.4 14.65 2.5 12 2.5a9.83 9.83 0 0 0-8.8 5.45l3.27 2.53c1.02-2.34 3.2-4.08 5.77-4.08z"
    />
  </svg>
);

// ================= LOGIN =================

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await loginUser({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        rememberMe,
      });

      console.log("Login response:", response);

      setSuccess(response.message || "Login successful!");

      if (response.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error("Login error:", error);

      setError(error.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fcfbf8] px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
       <div
          className="
            w-full
            max-w-[495px]
            rounded-[28px]
            bg-white
            px-6
            py-8
            shadow-[0_10px_40px_rgba(0,0,0,0.08)]
            sm:px-9
            sm:py-9
            md:px-10
            md:py-10
          "
        >
          <div className="mb-7 flex items-center justify-center gap-3">
            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-[14px]
                bg-[#8b3905]
                text-2xl
                font-bold
                text-white
              "
            >
              N
            </div>

            <h1
              className="
                font-serif
                text-[27px]
                font-bold
                tracking-[-0.8px]
                text-[#111111]
              "
            >
              Nexora
            </h1>
          </div>

          <div className="mb-7 text-center">
            <h2
              className="
                text-[28px]
                font-bold
                tracking-[-0.6px]
                text-[#111111]
                sm:text-[30px]
              "
            >
              Welcome back
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-[#a19a96]
                sm:text-base
              "
            >
              Sign in to your account to continue
            </p>
          </div>

          {/* ================= ERROR ================= */}

          {error && (
            <div
              className="
                mb-5
                rounded-xl
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* ================= SUCCESS ================= */}

          {success && (
            <div
              className="
                mb-5
                rounded-xl
                border
                border-green-200
                bg-green-50
                px-4
                py-3
                text-sm
                text-green-700
              "
            >
              {success}
            </div>
          )}

          {/* ================= FORM ================= */}

          <form onSubmit={handleSubmit}>
            {/* ================= EMAIL ================= */}

            <div className="mb-5">
              <label
                htmlFor="email"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#171717]
                "
              >
                Email
              </label>

              <div className="relative">
                <MailIcon
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#aaa4a0]
                  "
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="
                    h-12
                    w-full
                    rounded-[14px]
                    border
                    border-[#e5e1de]
                    bg-white
                    pl-12
                    pr-4
                    text-sm
                    text-[#222]
                    outline-none
                    transition
                    placeholder:text-[#aaa4a0]
                    focus:border-[#8b3905]
                    focus:ring-2
                    focus:ring-[#8b3905]/10
                  "
                />
              </div>
            </div>

            {/* ================= PASSWORD ================= */}

            <div className="mb-5">
              <label
                htmlFor="password"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#171717]
                "
              >
                Password
              </label>

              <div className="relative">
                <LockIcon
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-[#aaa4a0]
                  "
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="
                    h-12
                    w-full
                    rounded-[14px]
                    border
                    border-[#e5e1de]
                    bg-white
                    pl-12
                    pr-12
                    text-sm
                    text-[#222]
                    outline-none
                    transition
                    placeholder:text-[#aaa4a0]
                    focus:border-[#8b3905]
                    focus:ring-2
                    focus:ring-[#8b3905]/10
                  "
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    text-[#aaa4a0]
                    transition
                    hover:text-[#8b3905]
                  "
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>

            {/* ================= REMEMBER / FORGOT ================= */}

            <div className="mb-6 flex items-center justify-between">
              <label
                htmlFor="rememberMe"
                className="
                  flex
                  cursor-pointer
                  items-center
                  gap-2
                "
              >
                <input
                  id="rememberMe"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="
                    h-4
                    w-4
                    cursor-pointer
                    accent-[#8b3905]
                  "
                />

                <span
                  className="
                    text-sm
                    text-[#4d4744]
                  "
                >
                  Remember me
                </span>
              </label>

              <Link
                to="/forgot-password"
                className="
                  text-sm
                  font-medium
                  text-[#8b3905]
                  transition
                  hover:text-[#642803]
                "
              >
                Forgot password?
              </Link>
            </div>

            {/* ================= SIGN IN ================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                h-14
                w-full
                items-center
                justify-center
                rounded-[14px]
                bg-[#762f04]
                text-base
                font-semibold
                text-white
                shadow-sm
                transition
                duration-200
                hover:bg-[#8b3905]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          {/* ================= DIVIDER ================= */}

          <div className="my-7 flex items-center gap-4">
            <div className="h-px flex-1 bg-[#eeeae7]" />

            <span
              className="
                whitespace-nowrap
                text-sm
                text-[#a19a96]
              "
            >
              or continue with
            </span>

            <div className="h-px flex-1 bg-[#eeeae7]" />
          </div>

          {/* ================= GOOGLE ================= */}

          <button
            type="button"
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-3
              rounded-[14px]
              border
              border-[#e5e1de]
              bg-white
              text-sm
              font-medium
              text-[#222]
              transition
              hover:bg-[#faf9f7]
            "
          >
            <GoogleIcon />
            Continue with Google
          </button>

          {/* ================= REGISTER ================= */}

          <p
            className="
              mt-7
              text-center
              text-sm
              text-[#817a76]
              sm:text-base
            "
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="
                font-semibold
                text-[#8b3905]
                transition
                hover:text-[#642803]
              "
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
