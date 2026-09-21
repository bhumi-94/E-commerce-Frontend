import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { removeFromWishlist } from "../../features/wishlist/wishlistSlice";

import { addToCart } from "../../features/cart/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);

  // ================= EMPTY =================

  if (wishlistItems.length === 0) {
    return (
      <section className="min-h-screen bg-[#FCFBF3] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="mx-auto w-24 h-24 rounded-full bg-[#f5eee7] flex items-center justify-center mb-6">
            <Heart size={42} className="text-[#8b3905]" />
          </div>

          <h1 className="text-3xl font-bold text-[#211f1d]">
            Your wishlist is empty
          </h1>

          <p className="text-[#77716d] mt-3 leading-6">
            Save the products you love and come back to them whenever you're
            ready.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 mt-7 bg-[#8b3905] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#722e04] transition"
          >
            Explore Products
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    );
  }

  // ================= WISHLIST =================

  return (
    <section className="min-h-screen bg-[#FCFBF3] px-6 lg:px-10 py-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#211f1d]">
            My Wishlist
          </h1>

          <p className="text-[#77716d] mt-1">
            {wishlistItems.length}{" "}
            {wishlistItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistItems.map((product) => {
            const imageUrl = product.image
              ? `http://localhost:3000${product.image}`
              : null;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden border border-[#eee7e0] shadow-sm hover:shadow-lg transition"
              >
                {/* IMAGE */}

                <div className="relative h-64 bg-[#f7f5f2]">
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

                  <button
                    onClick={() => dispatch(removeFromWishlist(product.id))}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center hover:text-red-500"
                  >
                    <Heart
                      size={18}
                      className="fill-[#8b3905] text-[#8b3905]"
                    />
                  </button>
                </div>

                {/* DETAILS */}

                <div className="p-5">
                  <p className="text-xs uppercase tracking-wide text-[#a14b0b] font-semibold">
                    {product.category_name}
                  </p>

                  <h2 className="font-semibold text-[#211f1d] mt-1 line-clamp-2">
                    {product.name}
                  </h2>

                  <p className="text-lg font-bold mt-3">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            product,
                            quantity: 1,
                          }),
                        )
                      }
                      className="flex items-center justify-center gap-1 bg-[#f5eee7] text-[#8b3905] py-2 rounded-lg font-medium hover:bg-[#eadbcd]"
                    >
                      <ShoppingCart size={15} />
                      Cart
                    </button>

                    <Link
                      to={`/product-details/${product.id}`}
                      className="bg-[#8b3905] text-white py-2 rounded-lg font-medium text-center hover:bg-[#722e04]"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Wishlist;
