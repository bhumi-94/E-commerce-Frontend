import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";

import { fetchProducts } from "../../features/product/productSlice";
import Card from "./Card";

const TrendingNow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [trendingProducts, setTrendingProducts] = useState([]);

  const { products, loading, error } = useSelector((state) => state.product);

  // Fetch products
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Select 8 random products
  useEffect(() => {
    if (products?.length > 0) {
      const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

      setTrendingProducts(shuffledProducts.slice(0, 8));
    }
  }, [products]);

  return (
    <section className="w-full py-14">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* HEADER */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={17} className="text-[#8b3905]" />

              <p className="text-sm font-semibold uppercase tracking-[2px] text-[#a14b0b]">
                Popular Picks
              </p>
            </div>

            <h2 className="font-serif text-3xl lg:text-5xl font-bold text-[#211f1d]">
              Trending Now
            </h2>

            <p className="mt-2 text-[#8d8580]">
              Discover products everyone is loving right now
            </p>
          </div>

          {/* VIEW ALL */}
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="hidden sm:flex items-center gap-2 text-[#8b3905] font-semibold hover:gap-3 transition-all duration-300"
          >
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        {/* ERROR */}
        {error && <div className="text-center py-10 text-red-500">{error}</div>}

        {/* LOADING */}
        {loading && trendingProducts.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[390px] rounded-2xl bg-[#f0ebe6] animate-pulse"
              />
            ))}
          </div>
        )}

        {/* PRODUCTS */}
        {!loading && !error && trendingProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* MOBILE VIEW ALL */}
        <div className="flex justify-center mt-8 sm:hidden">
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8b3905] text-white font-semibold hover:bg-[#722e04] transition"
          >
            View All
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingNow;
