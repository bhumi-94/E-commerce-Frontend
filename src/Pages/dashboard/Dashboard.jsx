import React from "react";
import {
  ArrowRight,
  Check,
  Star,
  Monitor,
  Shirt,
  Sparkles,
  Home as HomeIcon,
  Dumbbell,
  BookOpen,
  Watch,
  Footprints,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import Nexora from "../../assets/Nexora.png";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../features/category/categorySlice";
import Loading from "../../Components/common/Loading";
import { fetchProducts } from "../../features/product/productSlice";
import Card from "../../Components/common/Card";
import Deal from "../../Components/common/Deal";
import CallToAction from "../../Components/common/CallToAction";
import Newsletter from "../../Components/common/Newsletter";
import TrendingNow from "../../Components/common/TrendingNow";
import BestSeller from "../../Components/common/BestSeller";
import FeedbackSection from "../../Components/common/FeedbackSection";
import Testimonials from "../../Components/common/Testimonials";

const Home = () => {
  const dispatch = useDispatch();

  const { categories, loading, error } = useSelector((state) => state.category);
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const getCategoryIcon = (categoryName) => {
    const name = categoryName.toLowerCase();

    if (name.includes("electronic")) {
      return Monitor;
    }

    if (name.includes("fashion")) {
      return Shirt;
    }

    if (name.includes("beauty")) {
      return Sparkles;
    }

    if (name.includes("home")) {
      return HomeIcon;
    }

    if (name.includes("sport")) {
      return Dumbbell;
    }

    if (name.includes("book")) {
      return BookOpen;
    }

    if (name.includes("accessor")) {
      return Watch;
    }

    if (name.includes("footwear")) {
      return Footprints;
    }

    return ShoppingBag;
  };

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
                  <p className="text-sm font-semibold text-[#211f1d]">
                    Free Delivery
                  </p>

                  <p className="text-xs text-[#aaa39e]">On orders ₹999+</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div></div> */}

      {/* CATEGORY SECTION */}
      <section className="w-full bg-[#f7f1eb] mt-20 pb-20">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 pt-16">
          {/* Section Header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[2px] text-[#a14b0b] mb-2">
                Explore
              </p>

              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#211f1d]">
                Shop by Category
              </h2>

              <p className="mt-2 text-[#8d8580] text-base lg:text-lg">
                Explore our wide range of categories
              </p>
            </div>

            <Link
              to="/shop"
              className="hidden sm:flex items-center gap-2 text-[#8b3905] font-semibold hover:gap-3 transition-all duration-300"
            >
              View All
              <ArrowRight size={19} />
            </Link>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-10">
              <Loading />
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-600">
              {error}
            </div>
          )}

          {/* Category Cards */}
          {!loading && !error && categories.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {categories.map((category) => {
                const Icon = getCategoryIcon(category.name);

                const imageUrl = category.image
                  ? `http://localhost:3000${category.image}`
                  : null;

                return (
                  <Link
                    key={category.id}
                    to={`/shop?category=${category.id}`}
                    className="group"
                  >
                    <div
                      className="
                relative
                h-[190px]
                rounded-[22px]
                bg-white
                border border-[#eee8e2]
                overflow-hidden
                transition-all
                duration-300
                hover:-translate-y-2
                hover:shadow-[0_15px_35px_rgba(70,45,30,0.12)]
                hover:border-[#e8c99e]
              "
                    >
                      {/* Image / Icon Area */}
                      <div className="relative h-[125px] overflow-hidden bg-[#f5eee7]">
                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt={category.name}
                            className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-110
                    "
                          />
                        ) : (
                          <div
                            className="
                    w-full
                    h-full
                    flex
                    items-center
                    justify-center
                    bg-gradient-to-br
                    from-[#fff8ef]
                    to-[#f2e3d4]
                  "
                          >
                            <div
                              className="
                      w-16
                      h-16
                      rounded-2xl
                      bg-white
                      shadow-sm
                      flex
                      items-center
                      justify-center
                      text-[#8b3905]
                      transition-all
                      duration-300
                      group-hover:scale-110
                    "
                            >
                              <Icon size={30} strokeWidth={1.7} />
                            </div>
                          </div>
                        )}

                        {/* Soft overlay */}
                        <div
                          className="
                  absolute
                  inset-0
                  bg-gradient-to-t
                  from-black/10
                  to-transparent
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-300
                "
                        />
                      </div>

                      {/* Category Name */}
                      <div className="px-3 py-4 text-center">
                        <h3
                          className="
                  text-sm
                  lg:text-[15px]
                  font-semibold
                  text-[#211f1d]
                  truncate
                  group-hover:text-[#8b3905]
                  transition-colors
                  duration-300
                "
                        >
                          {category.name}
                        </h3>

                        <div
                          className="
                  flex
                  items-center
                  justify-center
                  gap-1
                  mt-1
                  text-xs
                  text-[#a49b94]
                "
                        >
                          <span>Explore</span>
                          <ArrowRight
                            size={12}
                            className="
                      transition-transform
                      duration-300
                      group-hover:translate-x-1
                    "
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

          {/* No categories */}
          {!loading && !error && categories.length === 0 && (
            <div
              className="
      text-center
      py-12
      rounded-2xl
      border
      border-dashed
      border-[#ddd3ca]
      text-[#8d8580]
    "
            >
              No categories available.
            </div>
          )}
        </div>
      </section>

      {/*--------------------- Deal, trendingNow , Call to action, best seller , newsletter  ---------------------------- */}
      <div className="">
        <Deal />
        <TrendingNow />
        <CallToAction />
        <BestSeller />
        <Testimonials />
        <Newsletter />
        <FeedbackSection />
      </div>
</section>
  );
};

export default Home;
