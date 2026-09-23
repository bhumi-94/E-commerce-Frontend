import React, { useState } from "react";
import { Mail } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setSubmitted(true);
    setEmail("");
  };

  return (
    <>
    
      <section className="w-full px-6 lg:px-10 py-20">
        <div className="max-w-[1200px] mx-auto rounded-3xl bg-[#faf5ef] border border-[#eaded2] px-6 sm:px-10 py-10 text-center">
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#211f1d]">
            Get 10% Off Your First Order
          </h2>

          {/* Description */}
          <p className="max-w-lg mx-auto mt-3 text-sm text-[#8d8580] leading-relaxed">
            Join the Nexora community for exclusive offers, new arrivals, and
            special deals delivered straight to your inbox.
          </p>

          {/* Newsletter Form */}
          <form
            onSubmit={handleSubmit}
            className="relative flex items-center max-w-md w-full mx-auto mt-6 bg-white border border-[#ded5cd] rounded-xl p-1.5 focus-within:border-[#8b3905] transition-colors"
          >
            <Mail size={18} className="ml-3 shrink-0 text-[#9b918b]" />

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSubmitted(false);
              }}
              placeholder="Enter your email"
              className="flex-1 min-w-0 px-3 py-2.5 text-sm text-[#211f1d] bg-transparent outline-none placeholder:text-[#aaa39e]"
              required
            />

            <button
              type="submit"
              className="shrink-0 px-5 py-2.5 rounded-lg bg-[#54240e] hover:bg-[#722e04] text-white text-sm font-semibold transition-all duration-300 active:scale-95"
            >
              Subscribe
            </button>
          </form>

          {/* Success message */}
          {submitted && (
            <p className="mt-3 text-sm font-medium text-[#167447]">
              Thanks for subscribing! Your 10% offer is on its way.
            </p>
          )}

          {/* Small privacy text */}
          {!submitted && (
            <p className="mt-3 text-xs text-[#aaa39e]">
              No spam. Just useful updates and exclusive offers.
            </p>
          )}
        </div>
      </section>
    </>
  );
};

export default Newsletter;
