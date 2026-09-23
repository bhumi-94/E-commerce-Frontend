import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Clock3, Flame, Tag, Sparkles } from "lucide-react";

import { fetchProducts } from "../../features/product/productSlice";
import Card from "../../Components/common/Card";
import Loading from "../../Components/common/Loading";
import Newsletter from "../../Components/common/Newsletter";

const Deal = () => {
  const dispatch = useDispatch();

  const [dealProducts, setDealProducts] = useState([]);

  const [timeLeft, setTimeLeft] = useState({
    hours: 3,
    minutes: 41,
    seconds: 37,
  });

  const { products, loading, error } = useSelector((state) => state.product);

  // Fetch products
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Select random products
  useEffect(() => {
    if (products?.length > 0) {
      const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

      setDealProducts(shuffledProducts.slice(0, 12));
    }
  }, [products]);

  // Countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          hours = 5;
          minutes = 50;
          seconds = 50;
        }

        return {
          hours,
          minutes,
          seconds,
        };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-[#faf8f5]">
      {/* ================= HERO ================= */}
      <section className="w-full bg-[#211612]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Content */}
            <div>
              <div className="flex items-center gap-2 text-[#f4c28a] mb-4">
                <Flame size={20} />

                <span className="text-sm font-semibold uppercase tracking-[3px]">
                  Limited Time Offers
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Big Deals.
                <br />
                <span className="text-[#f4c28a]">Better Prices.</span>
              </h1>

              <p className="mt-5 max-w-lg text-white/65 leading-relaxed">
                Discover special offers and limited-time deals across our
                collection. Grab your favorites before the offer ends.
              </p>

              {/* Discount Badge */}
              <div className="flex items-center gap-3 mt-7">
                <div className="flex items-center gap-2 bg-[#8b3905] text-white px-5 py-3 rounded-xl">
                  <Tag size={18} />

                  <span className="font-semibold">Up to 20% OFF</span>
                </div>

                <div className="flex items-center gap-2 text-white/70">
                  <Sparkles size={17} />
                  <span className="text-sm">Limited stock</span>
                </div>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-3xl bg-white/10 border border-white/10 p-8 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-2 text-[#f4c28a]">
                  <Clock3 size={19} />

                  <span className="text-sm font-semibold uppercase tracking-[2px]">
                    Offer Ends In
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-7">
                  <div className="bg-white rounded-2xl py-5 text-center">
                    <p className="text-3xl font-bold text-[#211612]">
                      {String(timeLeft.hours).padStart(2, "0")}
                    </p>

                    <p className="text-xs text-[#8d8580] mt-1">Hours</p>
                  </div>

                  <div className="bg-white rounded-2xl py-5 text-center">
                    <p className="text-3xl font-bold text-[#211612]">
                      {String(timeLeft.minutes).padStart(2, "0")}
                    </p>

                    <p className="text-xs text-[#8d8580] mt-1">Minutes</p>
                  </div>

                  <div className="bg-white rounded-2xl py-5 text-center">
                    <p className="text-3xl font-bold text-[#211612]">
                      {String(timeLeft.seconds).padStart(2, "0")}
                    </p>

                    <p className="text-xs text-[#8d8580] mt-1">Seconds</p>
                  </div>
                </div>

                <p className="text-center text-white/50 text-xs mt-5">
                  Don't miss today's special offers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEAL PRODUCTS ================= */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16">
        {/* Heading */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Flame size={18} className="text-[#8b3905]" />

            <p className="text-sm font-semibold uppercase tracking-[2px] text-[#a14b0b]">
              Today's Deals
            </p>
          </div>

          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#211f1d]">
            Deals You Don't Want to Miss
          </h2>

          <p className="mt-2 text-[#8d8580]">
            Shop our handpicked deals before they're gone.
          </p>
        </div>

        {/* Error */}
        {error && <div className="text-center py-16 text-red-500">{error}</div>}

        {/* Loading */}
        {loading && dealProducts.length === 0 && (
          <div className="flex justify-center py-20">
            <Loading />
          </div>
        )}

        {/* Products */}
        {!loading && !error && dealProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dealProducts.map((product) => (
              <div key={product.id} className="relative">
                {/* Deal Badge */}
                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 bg-[#8b3905] text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">
                  <Tag size={12} />
                  20% OFF
                </div>

                <Card product={product} />
              </div>
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && dealProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#8d8580]">No deals available right now.</p>
          </div>
        )}
      </section>

      {/* ================= DEAL INFO ================= */}
      <section className="w-full bg-[#f3ece5] py-14">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-white flex items-center justify-center text-[#8b3905]">
                <Tag size={20} />
              </div>

              <h3 className="font-semibold text-[#211f1d] mt-4">
                Special Prices
              </h3>

              <p className="text-sm text-[#8d8580] mt-2">
                Enjoy special prices on selected products.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-white flex items-center justify-center text-[#8b3905]">
                <Clock3 size={20} />
              </div>

              <h3 className="font-semibold text-[#211f1d] mt-4">
                Limited Time
              </h3>

              <p className="text-sm text-[#8d8580] mt-2">
                Our deals are available for a limited time.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-white flex items-center justify-center text-[#8b3905]">
                <Flame size={20} />
              </div>

              <h3 className="font-semibold text-[#211f1d] mt-4">
                Popular Picks
              </h3>

              <p className="text-sm text-[#8d8580] mt-2">
                Discover products worth adding to your cart.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <Newsletter />
    </main>
  );
};

export default Deal;
