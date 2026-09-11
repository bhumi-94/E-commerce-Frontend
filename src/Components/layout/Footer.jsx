import React from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#1c1917] text-white">
      {/* ================= MAIN FOOTER ================= */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* ================= NEXORA ================= */}
          <div>
            {/* Logo */}
            <Link to="/dashboard" className="inline-flex items-center gap-2">
              <div className="h-10 w-10 rounded-[10px] bg-[#8b3905] flex items-center justify-center">
                <span className="text-white text-lg font-bold">N</span>
              </div>

              <span className="text-[22px] font-bold text-white">Nexora</span>
            </Link>

            {/* Description */}
            <p className="mt-5 max-w-[370px] text-[15px] leading-7 text-[#b5aea8]">
              Premium products. Better prices. Delivered to your door. Shop the
              latest trends across electronics, fashion, beauty, and more.
            </p>
          
          </div>

          {/* ================= SHOP ================= */}
          <div>
            <h3 className="text-[16px] font-semibold tracking-wide">SHOP</h3>

            <div className="flex flex-col gap-4 mt-6">
              <Link
                to="/electronics"
                className="text-[15px] text-[#d0c9c3] hover:text-[#c76b32] transition"
              >
                Electronics
              </Link>

              <Link
                to="/shop"
                className="text-[15px] text-[#d0c9c3] hover:text-[#c76b32] transition"
              >
                Men's Fashion
              </Link>

              <Link
                to="/shop"
                className="text-[15px] text-[#d0c9c3] hover:text-[#c76b32] transition"
              >
                Women's Fashion
              </Link>

              <Link
                to="/shop"
                className="text-[15px] text-[#d0c9c3] hover:text-[#c76b32] transition"
              >
                Beauty
              </Link>

              <Link
                to="/shop"
                className="text-[15px] text-[#d0c9c3] hover:text-[#c76b32] transition"
              >
                Sports
              </Link>

              <Link
                to="/shop"
                className="text-[15px] text-[#d0c9c3] hover:text-[#c76b32] transition"
              >
                Home & Living
              </Link>
            </div>
          </div>

          {/* ================= SUPPORT ================= */}
          <div>
            <h3 className="text-[16px] font-semibold tracking-wide">SUPPORT</h3>

            <div className="flex flex-col gap-4 mt-6">
              <Link
                to="/profile"
                className="text-[15px] text-[#d0c9c3] hover:text-[#c76b32] transition"
              >
                My Account
              </Link>

              <Link
                to="/orders"
                className="text-[15px] text-[#d0c9c3] hover:text-[#c76b32] transition"
              >
                My Orders
              </Link>

              <Link
                to="/track-order"
                className="text-[15px] text-[#d0c9c3] hover:text-[#c76b32] transition"
              >
                Track Order
              </Link>

              <Link
                to="/wishlist"
                className="text-[15px] text-[#d0c9c3] hover:text-[#c76b32] transition"
              >
                Wishlist
              </Link>

              <Link
                to="/returns"
                className="text-[15px] text-[#d0c9c3] hover:text-[#c76b32] transition"
              >
                Return Policy
              </Link>

              <Link
                to="/help"
                className="text-[15px] text-[#d0c9c3] hover:text-[#c76b32] transition"
              >
                Help Center
              </Link>
            </div>
          </div>

          {/* ================= CONTACT ================= */}
          <div>
            <h3 className="text-[16px] font-semibold tracking-wide">CONTACT</h3>

            <div className="flex flex-col gap-5 mt-6">
              {/* Email */}
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#d66b18] mt-0.5 shrink-0" />

                <a
                  href="mailto:support@nexora.in"
                  className="text-[15px] text-[#d0c9c3] hover:text-white transition"
                >
                  support@nexora.in
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#d66b18] mt-0.5 shrink-0" />

                <a
                  href="tel:+911800000000"
                  className="text-[15px] leading-6 text-[#d0c9c3] hover:text-white transition"
                >
                  1800-000-NEXORA
                  <br />
                  <span className="text-[#aaa29b]">(Mon–Sat, 9–6)</span>
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#d66b18] mt-0.5 shrink-0" />

                <p className="text-[15px] leading-6 text-[#d0c9c3]">
                  New Delhi, India
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-[#302c29]">
        <div
          className="
          max-w-[1400px]
          mx-auto
          px-6
          lg:px-10
          py-6
          flex
          flex-col
          md:flex-row
          items-center
          justify-between
          gap-4
        "
        >
          {/* Copyright */}
          <p className="text-[13px] text-[#817a74]">
            © {new Date().getFullYear()} Nexora. All rights reserved.
          </p>

          {/* Legal Links */}
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-[13px] text-[#817a74] hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="text-[13px] text-[#817a74] hover:text-white transition"
            >
              Terms of Service
            </Link>

            <Link
              to="/cookies"
              className="text-[13px] text-[#817a74] hover:text-white transition"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
