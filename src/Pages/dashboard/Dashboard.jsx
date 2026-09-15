import React from "react";
import { ArrowRight, Check, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Nexora from "../../assets/Nexora.png"

const Home = () => {
  return (
    <section className="min-h-[calc(100vh-68px)] bg-[#FCFBF3]">
      {/* HERO SECTION */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* LEFT CONTENT */}
          <div className="flex flex-col items-start">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#fff1c9] text-[#a14b0b] px-3 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-[#e89a32]" />
              New Arrivals Every Week
            </div>

            {/* Heading */}
            <h1 className="font-serif text-[56px] sm:text-[60px] lg:text-[64px] leading-[0.98] font-bold text-[#211f1d] tracking-[-2px] max-w-[650px]">
              Discover Products
              <br />
              You’ll Love
            </h1>

            {/* Description */}
            <p className="mt-6 text-lg lg:text-xl text-[#77716d] leading-relaxed">
              Premium products. Better prices. Delivered to your door.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              <Link
                to="/shop"
                className="group flex items-center gap-3 bg-[#8b3905] hover:bg-[#722e04] text-white px-7 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Shop Now
                <ArrowRight
                  size={20}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>

              <Link
                to="/deals"
                className="flex items-center justify-center border border-[#ddd6d0] hover:border-[#8b3905] hover:text-[#8b3905] text-[#403c39] px-7 py-3 rounded-xl font-semibold transition-all duration-300"
              >
                Explore Deals
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-10 sm:gap-14 mt-10">
              <div>
                <h3 className="text-3xl font-bold text-[#211f1d]">10M+</h3>
                <p className="text-sm text-[#aaa39e] mt-1">Happy Customers</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#211f1d]">500+</h3>
                <p className="text-sm text-[#aaa39e] mt-1">Top Brands</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-[#211f1d]">1M+</h3>
                <p className="text-sm text-[#aaa39e] mt-1">Products</p>
              </div>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Main Image */}
            <div className="relative w-full max-w-[520px]">
              <img
                src={Nexora}
                alt="Nexora fashion store"
                className="w-full h-[200px] lg:h-[500px] object-cover rounded-[30px]"
              />

              {/* Rating Card */}
              <div className="absolute top-[-20px] right-[-20px] bg-white rounded-2xl px-4 py-3 shadow-xl">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      fill="currentColor"
                      className="text-[#df7100]"
                    />
                  ))}
                </div>

                <p className="text-xs font-bold text-[#211f1d]">4.9/5 Rating</p>

                <p className="text-xs text-[#aaa39e]">10M+ reviews</p>
              </div>

              {/* Free Delivery Card */}
              <div className="absolute bottom-[-20px] left-[-30px] bg-white rounded-2xl px-4 py-3 shadow-xl flex items-center gap-4">
                <div className="w-8 h-8 rounded-xl bg-[#d9f8e8] flex items-center justify-center">
                  <Check size={25} className="text-[#167447]" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-[#211f1d]">Free Delivery</p>

                  <p className="text-xs text-[#aaa39e]">On orders ₹999+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
