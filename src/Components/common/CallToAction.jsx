import React from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "./Logo";

const CallToAction = () => {
  return (
    <section className="w-full px-6 lg:px-10 py-15">
      <div className="relative max-w-[1200px] mx-auto overflow-hidden rounded-3xl bg-[#54240e] px-6 sm:px-10 py-15">
        {/* Glow */}
        <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-[#c66b2b]/25 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Logo */}
          <div className="mb-3 scale-75">
            <Logo />
          </div>

          {/* Small label */}
          <div className="flex items-center gap-1.5 text-white/75 text-xs">
            <Sparkles size={13} />
            <span>Discover something new</span>
          </div>

          {/* Heading */}
          <h2 className="mt-3 text-2xl sm:text-3xl font-serif font-bold text-white">
            Find Something <span className="text-[#f4c28a]">You’ll Love</span>
          </h2>

          {/* Description */}
          <p className="mt-2 max-w-xl text-sm text-white/65 leading-relaxed">
            Discover everyday essentials, stylish finds, and products worth
            adding to your collection.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-5">
            <Link
              to="/shop"
              className="group flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-xs font-semibold text-[#54240e] hover:bg-[#fff7ef] transition"
            >
              Explore Collection
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              to="/deals"
              className="rounded-lg border border-white/25 px-5 py-2.5 text-xs font-semibold text-white hover:bg-white/10 transition"
            >
              View Deals
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
