import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowRight,
  Heart,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );

  const shipping = subtotal >= 999 ? 0 : 99;

  const gst = subtotal * 0.1;

  const total = subtotal + shipping + gst;

  // ================= EMPTY CART =================

  if (cartItems.length === 0) {
    return (
      <section className="min-h-screen bg-[#FCFBF3] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="mx-auto w-24 h-24 rounded-full bg-[#f5eee7] flex items-center justify-center mb-6">
            <ShoppingBag size={42} className="text-[#8b3905]" />
          </div>

          <h1 className="text-3xl font-bold text-[#211f1d]">
            Your cart is empty
          </h1>

          <p className="text-[#77716d] mt-3 leading-6">
            Looks like you haven't added anything to your cart yet. Discover
            something you'll love.
          </p>

          <Link
            to="/shop"
            className="inline-flex items-center gap-2 mt-7 bg-[#8b3905] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#722e04] transition"
          >
            Start Shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    );
  }

  // ================= CART =================

  return (
    <section className="min-h-screen bg-[#FCFBF3] px-6 lg:px-10 py-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-[#211f1d]">
            Shopping Cart
          </h1>

          <p className="text-[#77716d] mt-1">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-7">
          {/* CART ITEMS */}

          <div className="space-y-5">
            {cartItems.map((item) => {
              const imageUrl = item.image
                ? `http://localhost:3000${item.image}`
                : null;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-[#eee7e0] p-5 flex flex-col sm:flex-row gap-5"
                >
                  {/* IMAGE */}
                  <div className="w-full sm:w-28 h-28 rounded-xl overflow-hidden bg-[#f7f5f2] shrink-0">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-sm text-gray-400">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* DETAILS */}

                  <div className="flex-1">
                    <p className="text-sm text-[#a14b0b] font-semibold">
                      {item.category_name}
                    </p>

                    <h2 className="text-lg font-semibold text-[#211f1d] mt-1">
                      {item.name}
                    </h2>

                    <p className="text-[#8b3905] font-bold text-lg mt-2">
                      ₹{Number(item.price).toLocaleString("en-IN")}
                    </p>

                    {/* QUANTITY */}

                    <div className="flex items-center mt-4 border border-[#e5ddd5] rounded-xl w-fit overflow-hidden">
                      <button
                        onClick={() => dispatch(decreaseQuantity(item.id))}
                        className="w-10 h-9 flex items-center justify-center hover:bg-[#f8f1eb]"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="w-10 text-center font-semibold">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => dispatch(increaseQuantity(item.id))}
                        className="w-10 h-9 flex items-center justify-center hover:bg-[#f8f1eb]"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="flex sm:flex-col justify-between items-end">
                    <p className="font-bold text-lg text-[#211f1d]">
                      ₹
                      {(Number(item.price) * item.quantity).toLocaleString(
                        "en-IN",
                      )}
                    </p>

                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-[#aaa39e] hover:text-red-500 transition"
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>
                </div>
              );
            })}

            <Link
              to="/shop"
              className="inline-block text-[#8b3905] font-medium hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* SUMMARY */}

          <div className="bg-white border border-[#eee7e0] rounded-2xl p-6 h-fit">
            <h2 className="text-xl font-bold text-[#211f1d]">Order Summary</h2>

            <div className="space-y-4 mt-6 text-sm">
              <div className="flex justify-between">
                <span className="text-[#77716d]">
                  Subtotal ({cartItems.length} items)
                </span>

                <span className="font-medium">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#77716d]">Shipping</span>

                <span className="text-green-600 font-medium">
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-[#77716d]">GST (10%)</span>

                <span>₹{gst.toLocaleString("en-IN")}</span>
              </div>

              <div className="border-t border-[#eee7e0] pt-5 flex justify-between">
                <span className="font-bold text-lg">Total</span>

                <span className="font-bold text-xl">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <button className="w-full mt-6 bg-[#8b3905] text-white py-4 rounded-xl font-semibold hover:bg-[#722e04] transition flex items-center justify-center gap-2">
              Proceed to Checkout
              <ArrowRight size={19} />
            </button>

            <p className="text-center text-xs text-[#aaa39e] mt-4">
              🔒 Secure checkout &nbsp; · &nbsp; 100% genuine
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
