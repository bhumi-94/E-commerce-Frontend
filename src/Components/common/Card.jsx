import React from "react";

const Card = ({ product }) => {
  const imageUrl = product.image
    ? `http://localhost:3000${product.image}`
    : null;

  return (
    <div className="flex flex-col bg-white shadow-md w-72 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Product Image */}
      <div className="w-full h-48 bg-[#f7f5f2]">
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
      </div>

      {/* Product Details */}
      <div className="p-4 text-sm">
        {/* Category */}
        <p className="text-xs uppercase tracking-wide text-[#a14b0b] font-semibold">
          {product.category_name}
        </p>

        {/* Product Name */}
        <p className="text-[#211f1d] text-base font-semibold my-1.5 line-clamp-2">
          {product.name}
        </p>

        {/* Description */}
        <p className="text-[#77716d] line-clamp-2">
          {product.description || "Premium quality product."}
        </p>

        {/* Price */}
        <p className="text-[#211f1d] text-lg font-bold mt-3">
          ₹{product.price}
        </p>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          <button
            type="button"
            className="bg-[#f5eee7] text-[#8b3905] py-2 rounded-lg font-medium hover:bg-[#eadbcd] transition"
          >
            Add to cart
          </button>

          <button
            type="button"
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
