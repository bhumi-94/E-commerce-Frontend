import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../features/auth/auth.api";
import Loading from "../../Components/common/Loading"

// ================= ICONS =================

const UserIcon = ({ className = "" }) => (
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
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c.8-3.4 3.1-5.2 7-5.2s6.2 1.8 7 5.2" />
  </svg>
);

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

const PhoneIcon = ({ className = "" }) => (
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
    <path
      d="M22 16.92v3a2 2 0 0 1-2.18 2
      19.8 19.8 0 0 1-8.63-3.07
      19.5 19.5 0 0 1-6-6
      A19.8 19.8 0 0 1 2.12 4.18
      2 2 0 0 1 4.11 2h3
      a2 2 0 0 1 2 1.72
      12.8 12.8 0 0 0 .7 2.81
      2 2 0 0 1-.45 2.11L8.09 9.91
      a16 16 0 0 0 6 6l1.27-1.27
      a2 2 0 0 1 2.11-.45
      12.8 12.8 0 0 0 2.81.7
      A2 2 0 0 1 22 16.92z"
    />
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

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // ================= HANDLE CHANGE =================

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

  // ================= HANDLE SUBMIT =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Required fields
    if (
      !formData.first_name.trim() ||
      !formData.last_name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    // Password length
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!termsAccepted) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    try {
      setLoading(true);

      const response = await registerUser({
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      setSuccess(response.message || "Account created successfully.");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full bg-[#fcfbf8] px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
        {/* ================= REGISTER CARD ================= */}

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
          {/* ================= BRAND ================= */}

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

          {/* ================= HEADING ================= */}

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
              Create Account
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-[#a19a96]
                sm:text-base
              "
            >
              Join millions of happy shoppers
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
            {/* ================= FIRST + LAST NAME ================= */}

            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* First Name */}

              <div>
                <label
                  htmlFor="first_name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#171717]
                  "
                >
                  First Name
                </label>

                <div className="relative">
                  <UserIcon
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
                    id="first_name"
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="Aryan"
                    autoComplete="given-name"
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

              {/* Last Name */}

              <div>
                <label
                  htmlFor="last_name"
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-[#171717]
                  "
                >
                  Last Name
                </label>

                <div className="relative">
                  <UserIcon
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
                    id="last_name"
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Kapoor"
                    autoComplete="family-name"
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
            </div>

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

            {/* ================= PHONE ================= */}

            <div className="mb-5">
              <label
                htmlFor="phone"
                className="
                  mb-2
                  block
                  text-sm
                  font-medium
                  text-[#171717]
                "
              >
                Phone
              </label>

              <div className="relative">
                <PhoneIcon
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
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  autoComplete="tel"
                  maxLength="10"
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
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
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

            <div className="mb-6 flex items-start gap-3">
              <input
                id="terms"
                type="checkbox"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                className="
                  mt-[2px]
                  h-4
                  w-4
                  shrink-0
                  cursor-pointer
                  accent-[#8b3905]
                "
              />

              <label
                htmlFor="terms"
                className="
                  cursor-pointer
                  text-sm
                  leading-5
                  text-[#4d4744]
                "
              >
                I agree to the{" "}
                <span className="font-medium text-[#8b3905]">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="font-medium text-[#8b3905]">
                  Privacy Policy
                </span>
              </label>
            </div>

            {/* ================= CREATE ACCOUNT BUTTON ================= */}

            <button
              type="submit"
              disabled={loading}
              className="
                flex
                h-14
                w-full
                items-center
                justify-center
                gap-2
                rounded-[14px]
                bg-[#8b3905]
                text-base
                font-semibold
                text-white
                shadow-sm
                transition
                duration-200
                hover:bg-[#762f04]
                active:scale-[0.99]
                disabled:cursor-not-allowed
                disabled:opacity-70
              "
            >
              {loading ? (
                <>
                  <Loading />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* ================= LOGIN ================= */}

          <p
            className="
              mt-7
              text-center
              text-sm
              text-[#817a76]
              sm:text-base
            "
          >
            Already have an account?{" "}
            <Link
              to="/"
              className="
                font-semibold
                text-[#8b3905]
                transition
                hover:text-[#642803]
              "
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
