import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import {
  fetchWishlist,
  removeFromWishlist,
  clearWishlist,
} from "../../features/wishlist/wishlistSlice";
import { addProductToCart } from "../../features/cart/cartSlice";

const Wishlist = () => {
  const dispatch = useDispatch();

  const {
    items: wishlistItems = [],
    loading,
    updating,
    error,
  } = useSelector((state) => state.wishlist || {});

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };
  const handleAddToCart = (product) => {
    dispatch(
      addProductToCart({
        product,
        quantity: 1,
      }),
    );
  }
  const handleClearWishlist = () => {
    dispatch(clearWishlist());
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#FCFBF3] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#e5ddd5] border-t-[#8b3905] rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-[#77716d]">Loading your wishlist...</p>
        </div>
      </section>
    );
  }
  if (wishlistItems.length === 0) {
    return (
      <section className="min-h-screen bg-[#FCFBF3] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="w-24 h-24 rounded-full bg-[#f5eee7] flex items-center justify-center mx-auto mb-6">
            <Heart size={42} className="text-[#8b3905]" />
          </div>

          <h1 className="text-3xl font-bold text-[#211f1d]">
            Your wishlist is empty
          </h1>

          <p className="text-[#77716d] mt-3">
            Save your favorite products here and come back to them later.
          </p>

          <Link
            to="/shop"
            className="inline-block mt-7 bg-[#8b3905] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#722e04] transition"
          >
            Explore Products
          </Link>
        </div>
      </section>
    );
  }
  return (
    <section className="min-h-screen bg-[#FCFBF3] px-6 lg:px-10 py-10 rounded-2xl">
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-[#211f1d]">
              My Wishlist
            </h1>

            <p className="text-[#77716d] mt-1">
              {wishlistItems.length}{" "}
              {wishlistItems.length === 1 ? "item" : "items"} saved
            </p>
          </div>

          <button
            type="button"
            onClick={handleClearWishlist}
            disabled={updating}
            className="text-sm text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
          >
            Clear Wishlist
          </button>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* PRODUCTS */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => {
            // IMPORTANT:
            // `id` = wishlist row ID
            // `product_id` = actual product ID

            const productId = product.product_id;

            const imageUrl = product.image
              ? `http://localhost:3000${product.image}`
              : null;

            const outOfStock = Number(product.stock_quantity) <= 0;

            return (
              <div
                key={productId}
                className="bg-white rounded-2xl border border-[#eee7e0] overflow-hidden group"
              >
                {/* IMAGE */}

                <Link to={`/product-details/${productId}`}>
                  <div className="h-64 bg-[#f7f5f2] relative overflow-hidden">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        handleRemove(productId);
                      }}
                      disabled={updating}
                      className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-red-500 hover:bg-red-50 disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </Link>

                {/* DETAILS */}

                <div className="p-5">
                  {product.category_name && (
                    <p className="text-xs text-[#a14b0b] font-semibold uppercase tracking-wide">
                      {product.category_name}
                    </p>
                  )}

                  <Link to={`/product-details/${productId}`}>
                    <h2 className="font-semibold text-lg text-[#211f1d] mt-1 line-clamp-2 hover:text-[#8b3905]">
                      {product.name}
                    </h2>
                  </Link>

                  <p className="text-[#8b3905] font-bold text-xl mt-3">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>

                  {/* STOCK */}

                  <p
                    className={`text-sm mt-2 ${
                      outOfStock ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {outOfStock
                      ? "Out of stock"
                      : `${product.stock_quantity} available`}
                  </p>

                  {/* ADD TO CART */}

                  <button
                    type="button"
                    onClick={() => handleAddToCart(product)}
                    disabled={updating || outOfStock}
                    className="w-full mt-4 py-3 rounded-xl bg-[#8b3905] text-white font-semibold flex items-center justify-center gap-2 hover:bg-[#722e04] transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart size={18} />

                    {outOfStock ? "Out of Stock" : "Add to Cart"}
                  </button>
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
