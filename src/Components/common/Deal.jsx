import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../../features/product/productSlice";

const Deal = ({ fullPage = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products, loading } = useSelector((state) => state.product);

  const [dealProducts, setDealProducts] = useState([]);

  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 50,
    seconds: 50,
  });

  // Fetch products
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  // Select 4 random products
  useEffect(() => {
    if (products?.length > 0) {
      const shuffled = [...products].sort(() => Math.random() - 0.5);

      setDealProducts(shuffled.slice(0, 4));
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

  if (loading && dealProducts.length === 0) {
    return (
      <section className="bg-[#211612] py-12">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <p className="text-white text-center">Loading deals...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#211612] py-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              <span className="text-[#ff9d38] mr-2">⚡</span>
              Flash Sale
            </h2>

            <p className="text-white mt-4 text-lg">Ends in:</p>
          </div>

          {/* COUNTDOWN */}
          <div className="flex items-start gap-3">
            <div className="text-center">
              <div className="bg-[#171717] text-white text-2xl font-bold rounded-xl px-4 py-3">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>

              <p className="text-gray-300 text-sm mt-1">Hrs</p>
            </div>

            <span className="text-white text-2xl mt-3">:</span>

            <div className="text-center">
              <div className="bg-[#171771] text-white text-2xl font-bold rounded-xl px-4 py-3">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>

              <p className="text-gray-300 text-sm mt-1">Min</p>
            </div>

            <span className="text-white text-2xl mt-3">:</span>

            <div className="text-center">
              <div className="bg-[#171717] text-white text-2xl font-bold rounded-xl px-4 py-3">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>

              <p className="text-gray-300 text-sm mt-1">Sec</p>
            </div>
          </div>
        </div>

        {/* DEAL CARDS */}
        {dealProducts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {dealProducts.map((product) => {
              const imageUrl = product.image
                ? `http://localhost:3000${product.image}`
                : null;

              const discount = 20;

              const originalPrice =
                Number(product.price) / (1 - discount / 100);

              return (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product-details/${product.id}`)}
                  className="bg-white rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
                >
                  {/* IMAGE */}
                  <div className="relative h-72 bg-[#f4f4f4]">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}

                    {/* DISCOUNT */}
                    <span className="absolute top-4 left-4 bg-[#ff3045] text-white px-3 py-2 rounded-lg text-sm font-bold">
                      {discount}% OFF
                    </span>
                  </div>

                  {/* CONTENT */}
                  <div className="p-4">
                    <p className="text-sm text-[#9b918b] mb-1">
                      {product.category_name || "Nexora"}
                    </p>

                    <h3 className="text-lg font-semibold text-[#211f1d] line-clamp-2 min-h-[56px]">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xl font-bold text-[#211f1d]">
                        ₹{Number(product.price).toLocaleString("en-IN")}
                      </span>

                      <span className="text-sm text-gray-400 line-through">
                        ₹{Math.round(originalPrice).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* SEE MORE */}
        {!fullPage && (
          <div className="flex justify-center mt-10">
            <button
              type="button"
              onClick={() => navigate("/deals")}
              className="px-8 py-3 bg-white text-[#8b3905] rounded-xl font-semibold hover:bg-[#f5eee7] transition"
            >
              See More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Deal;
