import React, { useEffect, useMemo, useState } from "react";

import {
  MapPin,
  CreditCard,
  Smartphone,
  Wallet,
  Check,
  Plus,
  ChevronRight,
  ShoppingBag,
  Truck,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { getCart } from "../../features/cart/cart.api";
import { getAddresses } from "../../features/addresses/address.api";
import { getPaymentMethods } from "../../features/payment/payment.api";
import { createOrder } from "../../features/orders/order.api";

import Loading from "../../Components/common/Loading";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  useEffect(() => {
    const loadCheckoutData = async () => {
      try {
        setLoading(true);

        const [cartResponse, addressResponse, paymentResponse] =
          await Promise.all([getCart(), getAddresses(), getPaymentMethods()]);

        const cart = Array.isArray(cartResponse)
          ? cartResponse
          : cartResponse?.cart || [];

        const addressList = addressResponse?.addresses || [];

        const paymentList = paymentResponse?.paymentMethods || [];

        setCartItems(cart);
        setAddresses(addressList);
        setPaymentMethods(paymentList);

        const defaultAddress = addressList.find((address) =>
          Boolean(address.is_default),
        );

        if (defaultAddress) {
          setSelectedAddress(defaultAddress.id);
        } else if (addressList.length > 0) {
          setSelectedAddress(addressList[0].id);
        }

        const defaultPayment = paymentList.find((method) =>
          Boolean(method.is_default),
        );

        if (defaultPayment) {
          setSelectedPayment(defaultPayment.id);
        } else if (paymentList.length > 0) {
          setSelectedPayment(paymentList[0].id);
        }
      } catch (error) {
        console.error("Checkout loading error:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCheckoutData();
  }, []);

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = Number(
        item.price ?? item.product_price ?? item.product?.price ?? 0,
      );

      const quantity = Number(item.quantity || 1);

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  const shippingFee = subtotal > 0 && subtotal < 1000 ? 50 : 0;

  const total = subtotal + shippingFee;

  const getPaymentIcon = (type) => {
    if (type === "upi") {
      return <Smartphone size={22} />;
    }

    if (type === "cod") {
      return <Wallet size={22} />;
    }

    return <CreditCard size={22} />;
  };
  const getPaymentTitle = (method) => {
    if (method.method_type === "upi") {
      return method.upi_id || "UPI Payment";
    }

    if (method.method_type === "cod") {
      return "Cash on Delivery";
    }

    if (method.last_four) {
      return `${method.provider || "Card"} •••• ${method.last_four}`;
    }

    return method.display_name || "Credit / Debit Card";
  };

  const getImageUrl = (image) => {
    if (!image) {
      return null;
    }

    if (image.startsWith("http")) {
      return image;
    }

    const cleanImage = image.replace(/^\/?uploads\/?/, "");

    return `${import.meta.env.VITE_BACKEND_URL}/uploads/${cleanImage}`;
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      alert("Please select a delivery address");
      return;
    }

    if (!selectedPayment) {
      alert("Please select a payment method");
      return;
    }

    try {
      setPlacingOrder(true);

      const response = await createOrder({
        addressId: selectedAddress,
        paymentMethodId: selectedPayment,
        shippingAmount: shippingFee,
      });

      if (response.success) {
        alert(`Order placed successfully! Order ID: ${response.order.orderId}`);

        // Your My Orders page is nested inside /profile
        navigate("/profile/orders");
      } else {
        alert(response.message || "Failed to place order");
      }
    } catch (error) {
      console.error("PLACE ORDER ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Something went wrong while placing your order",
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FCFBF3] px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-[24px] border border-[#eee8e3] bg-white px-6 py-16 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#f8eee8] text-[#8b3905]">
            <ShoppingBag size={30} />
          </div>

          <h2 className="text-xl font-semibold text-[#292524]">
            Your cart is empty
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Add some products to your cart before checking out.
          </p>

          <button
            onClick={() => navigate("/shop")}
            className="mt-6 rounded-[14px] bg-[#8b3905] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#742f04]"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBF3] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#292524] sm:text-3xl">
            Checkout
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review your order and complete your purchase
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
          {/* LEFT SIDE */}
          <div className="space-y-6">
            <div className="rounded-[22px] border border-[#eee8e3] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#f8eee8] text-[#8b3905]">
                    <MapPin size={21} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-[#292524]">
                      Delivery Address
                    </h2>

                    <p className="text-xs text-gray-500">
                      Where should we deliver your order?
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/profile/addresses")}
                  className="hidden items-center gap-1 text-sm font-medium text-[#8b3905] sm:flex"
                >
                  Manage
                  <ChevronRight size={16} />
                </button>
              </div>

              {addresses.length === 0 ? (
                <div className="rounded-[16px] border border-dashed border-[#ddd5cf] p-6 text-center">
                  <MapPin size={28} className="mx-auto text-gray-400" />

                  <p className="mt-3 text-sm font-medium text-gray-700">
                    No delivery address found
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Add an address to continue with checkout.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/profile/addresses")}
                    className="mt-4 inline-flex items-center gap-2 rounded-[12px] bg-[#8b3905] px-4 py-2.5 text-sm font-medium text-white"
                  >
                    <Plus size={16} />
                    Add Address
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {addresses.map((address) => {
                    const isSelected = selectedAddress === address.id;

                    return (
                      <button
                        key={address.id}
                        type="button"
                        onClick={() => setSelectedAddress(address.id)}
                        className={`w-full rounded-[17px] border p-4 text-left transition ${
                          isSelected
                            ? "border-[#8b3905] bg-[#fffaf7]"
                            : "border-[#eee8e3] hover:border-[#d9c4b7]"
                        }`}
                      >
                        <div className="flex gap-3">
                          {/* RADIO */}
                          <div
                            className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              isSelected
                                ? "border-[#8b3905] bg-[#8b3905]"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <Check size={13} className="text-white" />
                            )}
                          </div>

                          {/* DETAILS */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm font-semibold text-gray-800">
                                {address.first_name} {address.last_name}
                              </h3>

                              <span className="rounded-full bg-[#f5e9e1] px-2.5 py-1 text-[10px] font-medium text-[#8b3905]">
                                {address.address_type}
                              </span>

                              {Boolean(address.is_default) && (
                                <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-medium text-green-600">
                                  Default
                                </span>
                              )}
                            </div>

                            <p className="mt-2 text-sm text-gray-600">
                              {address.phone}
                            </p>

                            <p className="mt-1 text-sm leading-5 text-gray-500">
                              {address.address_line1}
                              {address.address_line2 &&
                                `, ${address.address_line2}`}
                              , {address.city}, {address.state} -{" "}
                              {address.pincode}
                            </p>

                            <p className="mt-1 text-xs text-gray-400">
                              {address.country}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="rounded-[22px] border border-[#eee8e3] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#f8eee8] text-[#8b3905]">
                    <CreditCard size={21} />
                  </div>

                  <div>
                    <h2 className="font-semibold text-[#292524]">
                      Payment Method
                    </h2>

                    <p className="text-xs text-gray-500">
                      Select how you want to pay
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => navigate("/profile/payment-methods")}
                  className="hidden items-center gap-1 text-sm font-medium text-[#8b3905] sm:flex"
                >
                  Manage
                  <ChevronRight size={16} />
                </button>
              </div>

              {paymentMethods.length === 0 ? (
                <div className="rounded-[16px] border border-dashed border-[#ddd5cf] p-6 text-center">
                  <CreditCard size={28} className="mx-auto text-gray-400" />

                  <p className="mt-3 text-sm font-medium text-gray-700">
                    No payment method found
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    Add a payment method to continue.
                  </p>

                  <button
                    type="button"
                    onClick={() => navigate("/profile/payment-methods")}
                    className="mt-4 inline-flex items-center gap-2 rounded-[12px] bg-[#8b3905] px-4 py-2.5 text-sm font-medium text-white"
                  >
                    <Plus size={16} />
                    Add Payment Method
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {paymentMethods.map((method) => {
                    const isSelected = selectedPayment === method.id;

                    return (
                      <button
                        key={method.id}
                        type="button"
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full rounded-[17px] border p-4 text-left transition ${
                          isSelected
                            ? "border-[#8b3905] bg-[#fffaf7]"
                            : "border-[#eee8e3] hover:border-[#d9c4b7]"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* RADIO */}
                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              isSelected
                                ? "border-[#8b3905] bg-[#8b3905]"
                                : "border-gray-300"
                            }`}
                          >
                            {isSelected && (
                              <Check size={13} className="text-white" />
                            )}
                          </div>

                          {/* ICON */}
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px] bg-[#f8eee8] text-[#8b3905]">
                            {getPaymentIcon(method.method_type)}
                          </div>

                          {/* DETAILS */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-sm font-semibold text-gray-800">
                                {getPaymentTitle(method)}
                              </h3>

                              {Boolean(method.is_default) && (
                                <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-medium text-green-600">
                                  Default
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-xs text-gray-500">
                              {method.method_type === "upi" && "UPI Payment"}

                              {method.method_type === "card" &&
                                "Credit / Debit Card"}

                              {method.method_type === "cod" &&
                                "Cash on Delivery"}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="rounded-[22px] border border-[#eee8e3] bg-white p-5 shadow-sm sm:p-6">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#f8eee8] text-[#8b3905]">
                  <Truck size={21} />
                </div>

                <div>
                  <h2 className="font-semibold text-[#292524]">
                    Delivery Information
                  </h2>

                  <p className="mt-1 text-sm leading-6 text-gray-500">
                    Your order will be delivered to the selected address.
                    Delivery charges are calculated based on your order value.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="h-fit lg:sticky lg:top-6">
            <div className="rounded-[22px] border border-[#eee8e3] bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-[13px] bg-[#f8eee8] text-[#8b3905]">
                  <ShoppingBag size={21} />
                </div>

                <div>
                  <h2 className="font-semibold text-[#292524]">
                    Order Summary
                  </h2>

                  <p className="text-xs text-gray-500">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"}
                  </p>
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="max-h-[330px] space-y-4 overflow-y-auto pr-1">
                {cartItems.map((item) => {
                  const price = Number(
                    item.price ??
                      item.product_price ??
                      item.product?.price ??
                      0,
                  );

                  const quantity = Number(item.quantity || 1);

                  const productName =
                    item.product_name ||
                    item.name ||
                    item.product?.name ||
                    "Product";

                  const image = getImageUrl(
                    item.image || item.product_image || item.product?.image,
                  );

                  return (
                    <div key={item.id} className="flex gap-3">
                      {/* IMAGE */}
                      <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[#faf7f4]">
                        {image ? (
                          <img
                            src={image}
                            alt={productName}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              console.error("Product image failed:", image);

                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <ShoppingBag size={22} className="text-gray-300" />
                        )}
                      </div>

                      {/* PRODUCT */}
                      <div className="min-w-0 flex-1">
                        <p className="line-clamp-2 text-sm font-medium text-gray-700">
                          {productName}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          Qty: {quantity}
                        </p>
                      </div>

                      {/* PRICE */}
                      <p className="whitespace-nowrap text-sm font-semibold text-gray-800">
                        ₹{(price * quantity).toFixed(2)}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* PRICE DETAILS */}
              <div className="mt-6 space-y-3 border-t border-[#eee8e3] pt-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>

                  <span className="font-medium text-gray-700">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>

                  <span className="font-medium text-gray-700">
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex items-center justify-between border-t border-[#eee8e3] pt-4">
                  <span className="text-base font-semibold text-[#292524]">
                    Total
                  </span>

                  <span className="text-xl font-bold text-[#8b3905]">
                    ₹{total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* PLACE ORDER */}
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={placingOrder || !selectedAddress || !selectedPayment}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#8b3905] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#742f04] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {placingOrder ? "Placing Order..." : "Place Order"}

                {!placingOrder && <ChevronRight size={18} />}
              </button>

              <p className="mt-3 text-center text-[11px] leading-5 text-gray-400">
                By placing your order, you agree to Nexora's terms and
                conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
