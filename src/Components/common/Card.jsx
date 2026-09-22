import React from "react";
import { Heart, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { addProductToCart } from "../../features/cart/cartSlice";

import {
  addToWishlist,
  removeFromWishlist,
} from "../../features/wishlist/wishlistSlice";

const Card = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wishlistItems = useSelector((state) => state.wishlist.items);

  const isWishlisted = wishlistItems.some(
    (item) => Number(item.id) === Number(product.id),
  );

  const imageUrl = product.image
    ? `http://localhost:3000${product.image}`
    : null;

  const handleCardClick = () => {
    navigate(`/product-details/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    dispatch(
      addProductToCart({
        product,
        quantity: 1,
      }),
    );
  };

  const handleWishlist = (e) => {
    e.stopPropagation();

    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  const handleBuyNow = (e) => {
    e.stopPropagation();

    dispatch(
      addToCart({
        product,
        quantity: 1,
      }),
    );

    if (!isWishlisted) {
      dispatch(addToWishlist(product));
    }

    navigate("/cart");
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col bg-white shadow-md w-72 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* IMAGE */}
      <div className="relative w-full h-48 bg-[#f7f5f2]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#aaa39e]">
            No Image
          </div>
        )}

        {/* WISHLIST */}
        <button
          type="button"
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-md hover:scale-105 transition"
        >
          <Heart
            size={18}
            className={
              isWishlisted ? "fill-[#8b3905] text-[#8b3905]" : "text-[#555]"
            }
          />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 text-sm">
        <p className="text-xs uppercase tracking-wide text-[#a14b0b] font-semibold">
          {product.category_name}
        </p>

        <p className="text-[#211f1d] text-base font-semibold my-1.5 line-clamp-2">
          {product.name}
        </p>

        <p className="text-[#77716d] line-clamp-2">
          {product.description || "Premium quality product."}
        </p>

        <p className="text-[#211f1d] text-lg font-bold mt-3">
          ₹{Number(product.price).toLocaleString("en-IN")}
        </p>

        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex items-center justify-center gap-1 bg-[#f5eee7] text-[#8b3905] py-2 rounded-lg font-medium hover:bg-[#eadbcd] transition"
          >
            <ShoppingCart size={16} />
            Add to cart
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="bg-[#8b3905] text-white py-2 rounded-lg font-medium hover:bg-[#722e04] transition"
          >
            Buy now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
