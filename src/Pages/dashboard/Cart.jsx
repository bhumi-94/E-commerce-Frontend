import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Link } from "react-router-dom";

import {
  fetchCart,
  updateProductQuantity,
  removeProductFromCart,
  clearCartFromDatabase,
} from "../../features/cart/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();

  const {
    items: cartItems = [],
    loading,
    updating,
    error,
  } = useSelector((state) => state.cart || {});

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);


  const handleIncrease = (item) => {
    dispatch(
      updateProductQuantity({
        productId: item.product_id,
        quantity: Number(item.quantity) + 1,
      }),
    );
  };

  const handleDecrease = (item) => {
    if (Number(item.quantity) <= 1) {
      dispatch(removeProductFromCart(item.product_id));

      return;
    }

    dispatch(
      updateProductQuantity({
        productId: item.product_id,
        quantity: Number(item.quantity) - 1,
      }),
    );
  };

  // ==============================
  // REMOVE
  // ==============================

  const handleRemove = (productId) => {
    dispatch(removeProductFromCart(productId));
  };

  // ==============================
  // CLEAR
  // ==============================

  const handleClearCart = () => {
    dispatch(clearCartFromDatabase());
  };

  // ==============================
  // TOTALS
  // ==============================

  const subtotal = cartItems.reduce(
    (total, item) => total + Number(item.price) * Number(item.quantity),

    0,
  );

  const shipping = subtotal >= 999 ? 0 : 99;

  const gst = subtotal * 0.1;

  const total = subtotal + shipping + gst;

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <section className="min-h-screen bg-[#FCFBF3] flex items-center justify-center px-6">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#e5ddd5] border-t-[#8b3905] rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-[#77716d]">Loading your cart...</p>
        </div>
      </section>
    );
  }

  // ==============================
  // EMPTY CART
  // ==============================

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

  // ==============================
  // CART PAGE
  // ==============================

  return (
    <section className="min-h-screen bg-[#FCFBF3] px-6 lg:px-10 py-10">
      <div className="max-w-[1400px] mx-auto">
        {/* HEADER */}

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-[#211f1d]">
                Shopping Cart
              </h1>

              <p className="text-[#77716d] mt-1">
                {cartItems.length} {cartItems.length === 1 ? "item" : "items"}{" "}
                in your cart
              </p>
            </div>

            <button
              type="button"
              onClick={handleClearCart}
              disabled={updating}
              className="text-sm text-red-500 hover:text-red-700 font-medium disabled:opacity-50"
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        {/* CONTENT */}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-7">
          {/* CART ITEMS */}

          <div className="space-y-5">
            {cartItems.map((item) => {
              const imageUrl = item.image
                ? `http://localhost:3000${item.image}`
                : null;

              const quantity = Number(item.quantity);

              const stock = Number(item.stock_quantity);

              return (
                <div
                  key={item.product_id}
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
                        type="button"
                        onClick={() => handleDecrease(item)}
                        disabled={updating}
                        className="w-10 h-9 flex items-center justify-center hover:bg-[#f8f1eb] disabled:opacity-50"
                      >
                        <Minus size={16} />
                      </button>

                      <span className="w-10 text-center font-semibold">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => handleIncrease(item)}
                        disabled={updating || quantity >= stock}
                        className="w-10 h-9 flex items-center justify-center hover:bg-[#f8f1eb] disabled:opacity-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <p className="text-xs text-[#aaa39e] mt-2">
                      {stock} available
                    </p>
                  </div>

                  {/* PRICE + REMOVE */}

                  <div className="flex sm:flex-col justify-between items-end">
                    <p className="font-bold text-lg text-[#211f1d]">
                      ₹{(Number(item.price) * quantity).toLocaleString("en-IN")}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.product_id)}
                      disabled={updating}
                      className="text-[#aaa39e] hover:text-red-500 transition disabled:opacity-50"
                    >
                      <Trash2 size={19} />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* CONTINUE SHOPPING */}

            <Link
              to="/shop"
              className="inline-block text-[#8b3905] font-medium hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* ORDER SUMMARY */}

          <div className="bg-white border border-[#eee7e0] rounded-2xl p-6 h-fit">
            <h2 className="text-xl font-bold text-[#211f1d]">Order Summary</h2>

            <div className="space-y-4 mt-6 text-sm">
              {/* SUBTOTAL */}

              <div className="flex justify-between">
                <span className="text-[#77716d]">
                  Subtotal ({cartItems.length} items)
                </span>

                <span className="font-medium">
                  ₹
                  {subtotal.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* SHIPPING */}

              <div className="flex justify-between">
                <span className="text-[#77716d]">Shipping</span>

                <span className="text-green-600 font-medium">
                  {shipping === 0 ? "FREE" : `₹${shipping}`}
                </span>
              </div>

              {/* GST */}

              <div className="flex justify-between">
                <span className="text-[#77716d]">GST (10%)</span>

                <span>
                  ₹
                  {gst.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              {/* TOTAL */}

              <div className="border-t border-[#eee7e0] pt-5 flex justify-between">
                <span className="font-bold text-lg">Total</span>

                <span className="font-bold text-xl">
                  ₹
                  {total.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {/* CHECKOUT */}

            <button
              type="button"
              className="w-full mt-6 bg-[#8b3905] text-white py-4 rounded-xl font-semibold hover:bg-[#722e04] transition flex items-center justify-center gap-2"
            >
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
