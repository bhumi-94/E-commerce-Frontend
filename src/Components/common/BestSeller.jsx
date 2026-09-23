import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShoppingBag } from "lucide-react";

import { fetchProducts } from "../../features/product/productSlice";
import Card from "./Card";

const BestSeller = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [bestSellerProducts, setBestSellerProducts] = useState([]);

  const { products, loading, error } = useSelector((state) => state.product);

  // Fetch products if not already available
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Select 8 random products
  useEffect(() => {
    if (products?.length > 0) {
      const shuffledProducts = [...products].sort(() => Math.random() - 0.5);

      setBestSellerProducts(shuffledProducts.slice(0, 4));
    }
  }, [products]);

  return (
    <section className="w-full bg-[#faf5ef] py-14 mt-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <ShoppingBag size={17} className="text-[#8b3905]" />

              <p className="text-sm font-semibold uppercase tracking-[2px] text-[#a14b0b]">
                Customer Favorites
              </p>
            </div>

            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-[#211f1d]">
              Best Sellers
            </h2>

            <p className="mt-2 text-[#8d8580]">
              Shop some of our most-loved products
            </p>
          </div>

          {/* Desktop View All */}
          <button
            type="button"
            onClick={() => navigate("/shop")}
            className="hidden sm:flex items-center gap-2 text-[#8b3905] font-semibold hover:gap-3 transition-all duration-300"
          >
            View All
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Error */}
        {error && <div className="text-center py-10 text-red-500">{error}</div>}

        {/* Loading Skeleton */}
        {loading && bestSellerProducts.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[390px] rounded-2xl bg-[#f0ebe6] animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Product Cards */}
        {!loading && !error && bestSellerProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellerProducts.map((product) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Mobile View All */}
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

export default BestSeller;
