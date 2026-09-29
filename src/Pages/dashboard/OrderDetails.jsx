import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  ShoppingBag,
  CalendarDays,
  CheckCircle2,
  Truck,
  Clock3,
  XCircle,
  MapPin,
  CreditCard,
  ChevronRight,
} from "lucide-react";

import { getOrders } from "../../features/orders/order.api";
import Loading from "../../Components/common/Loading";

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= IMAGE URL =================
  const getImageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith("http")) {
      return image;
    }

    const cleanImage = image.replace(/^\/?uploads\/?/, "");

    return `http://localhost:3000/uploads/${cleanImage}`;
  };

  // ================= STATUS DETAILS =================
  const getStatusDetails = (status) => {
    switch (status) {
      case "Delivered":
        return {
          icon: <CheckCircle2 size={18} />,
          className: "bg-green-50 text-green-700 border-green-200",
        };

      case "Shipped":
        return {
          icon: <Truck size={18} />,
          className: "bg-blue-50 text-blue-700 border-blue-200",
        };

      case "Processing":
        return {
          icon: <Package size={18} />,
          className: "bg-orange-50 text-orange-700 border-orange-200",
        };

      case "Confirmed":
        return {
          icon: <CheckCircle2 size={18} />,
          className: "bg-purple-50 text-purple-700 border-purple-200",
        };

      case "Cancelled":
        return {
          icon: <XCircle size={18} />,
          className: "bg-red-50 text-red-700 border-red-200",
        };

      default:
        return {
          icon: <Clock3 size={18} />,
          className: "bg-gray-50 text-gray-700 border-gray-200",
        };
    }
  };

  // ================= DATE FORMAT =================
  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ================= GET ORDER =================
  useEffect(() => {
    const loadOrder = async () => {
      try {
        setLoading(true);

        const response = await getOrders();

        if (response?.success) {
          const allOrders = response.orders || [];

          const selectedOrder = allOrders.find(
            (item) => String(item.id) === String(id),
          );

          setOrder(selectedOrder || null);
        }
      } catch (error) {
        console.error("GET ORDER DETAILS ERROR:", error);

        alert(error.response?.data?.message || "Failed to load order details");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [id]);

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-[500px] bg-[#FCFBF3] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // ================= ORDER NOT FOUND =================
  if (!order) {
    return (
      <div className="min-h-[500px] bg-[#FCFBF3] px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <button
            type="button"
            onClick={() => navigate("/profile/orders")}
            className="flex items-center gap-2 text-sm font-medium text-[#8b3905] hover:underline mb-6"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </button>

          <div className="bg-white rounded-[22px] border border-[#eee7df] px-6 py-16 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#f8eee8] flex items-center justify-center mb-5">
              <ShoppingBag size={34} className="text-[#8b3905]" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              Order Not Found
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              We couldn't find the order you're looking for.
            </p>

            <button
              type="button"
              onClick={() => navigate("/profile/orders")}
              className="mt-6 px-5 py-3 rounded-xl bg-[#8b3905] text-white text-sm font-medium hover:bg-[#733004] transition"
            >
              View My Orders
            </button>
          </div>
        </div>
      </div>
    );
  }

  const status = getStatusDetails(order.order_status);

  return (
    <div className="min-h-screen bg-[#FCFBF3] px-4 py-6 md:px-8 md:py-8 rounded-3xl">
      <div className="max-w-6xl mx-auto">
        {/* ================= BACK BUTTON ================= */}
        <button
          type="button"
          onClick={() => navigate("/profile/orders")}
          className="flex items-center gap-2 text-sm font-medium text-[#8b3905] hover:underline mb-6"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </button>

        {/* ================= HEADER ================= */}
        <div className="bg-white rounded-[22px] border border-[#eee7df] overflow-hidden">
          <div className="px-5 py-6 md:px-7 border-b border-[#eee7df]">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              {/* Order ID */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#f8eee8] flex items-center justify-center">
                  <Package size={22} className="text-[#8b3905]" />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Order ID</p>

                  <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
                    #{order.id}
                  </h1>
                </div>
              </div>

              {/* Status */}
              <div
                className={`inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border text-sm font-medium ${status.className}`}
              >
                {status.icon}
                {order.order_status}
              </div>
            </div>

            {/* Date */}
            <div className="flex flex-wrap items-center gap-2 mt-5 text-sm text-gray-500">
              <CalendarDays size={16} />

              <span>Ordered on {formatDateTime(order.created_at)}</span>
            </div>
          </div>

          {/* ================= ORDER STATUS ================= */}
          <div className="px-5 py-6 md:px-7 border-b border-[#eee7df]">
            <h2 className="text-lg font-semibold text-gray-900 mb-5">
              Order Status
            </h2>

            <div className="flex items-center overflow-x-auto pb-2">
              {/* Pending */}
              <div className="flex items-center min-w-max">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    [
                      "Pending",
                      "Confirmed",
                      "Processing",
                      "Shipped",
                      "Delivered",
                    ].includes(order.order_status)
                      ? "bg-[#8b3905] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Clock3 size={16} />
                </div>

                <span className="ml-2 text-xs md:text-sm font-medium text-gray-700">
                  Pending
                </span>
              </div>

              <ChevronRight
                size={18}
                className="mx-3 text-gray-300 flex-shrink-0"
              />

              {/* Confirmed */}
              <div className="flex items-center min-w-max">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    [
                      "Confirmed",
                      "Processing",
                      "Shipped",
                      "Delivered",
                    ].includes(order.order_status)
                      ? "bg-[#8b3905] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <CheckCircle2 size={16} />
                </div>

                <span className="ml-2 text-xs md:text-sm font-medium text-gray-700">
                  Confirmed
                </span>
              </div>

              <ChevronRight
                size={18}
                className="mx-3 text-gray-300 flex-shrink-0"
              />

              {/* Processing */}
              <div className="flex items-center min-w-max">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    ["Processing", "Shipped", "Delivered"].includes(
                      order.order_status,
                    )
                      ? "bg-[#8b3905] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Package size={16} />
                </div>

                <span className="ml-2 text-xs md:text-sm font-medium text-gray-700">
                  Processing
                </span>
              </div>

              <ChevronRight
                size={18}
                className="mx-3 text-gray-300 flex-shrink-0"
              />

              {/* Shipped */}
              <div className="flex items-center min-w-max">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    ["Shipped", "Delivered"].includes(order.order_status)
                      ? "bg-[#8b3905] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <Truck size={16} />
                </div>

                <span className="ml-2 text-xs md:text-sm font-medium text-gray-700">
                  Shipped
                </span>
              </div>

              <ChevronRight
                size={18}
                className="mx-3 text-gray-300 flex-shrink-0"
              />

              {/* Delivered */}
              <div className="flex items-center min-w-max">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    order.order_status === "Delivered"
                      ? "bg-[#8b3905] text-white"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  <CheckCircle2 size={16} />
                </div>

                <span className="ml-2 text-xs md:text-sm font-medium text-gray-700">
                  Delivered
                </span>
              </div>
            </div>
          </div>

          {/* ================= PRODUCTS ================= */}
          <div className="px-5 py-6 md:px-7 border-b border-[#eee7df]">
            <div className="flex items-center gap-2 mb-5">
              <ShoppingBag size={19} className="text-[#8b3905]" />

              <h2 className="text-lg font-semibold text-gray-900">
                Ordered Items
              </h2>
            </div>

            <div className="space-y-4">
              {order.items?.map((item) => {
                const imageUrl = getImageUrl(item.image);

                return (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-3 md:p-4 rounded-2xl bg-[#FCFBF8] border border-[#eee7df]"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-xl bg-white border border-[#eee7df] overflow-hidden flex items-center justify-center">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={item.product_name}
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      ) : (
                        <Package size={28} className="text-gray-400" />
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900">
                        {item.product_name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm text-gray-500">
                        ₹{Number(item.price).toFixed(2)} each
                      </p>
                    </div>

                    {/* Total */}
                    <div className="text-right">
                      <p className="text-xs text-gray-500 mb-1">Total</p>

                      <p className="font-semibold text-gray-900">
                        ₹{Number(item.total_price).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ================= BOTTOM INFORMATION ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-5 py-6 md:px-7">
            {/* Payment */}
            <div className="bg-[#FCFBF8] rounded-2xl border border-[#eee7df] p-5">
              <div className="flex items-center gap-2 mb-4">
                <CreditCard size={19} className="text-[#8b3905]" />

                <h2 className="font-semibold text-gray-900">
                  Payment Information
                </h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Payment Status</span>

                  <span
                    className={`font-medium ${
                      order.payment_status === "Paid"
                        ? "text-green-700"
                        : order.payment_status === "Failed"
                          ? "text-red-600"
                          : "text-gray-700"
                    }`}
                  >
                    {order.payment_status}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">Payment Method</span>

                  <span className="font-medium text-gray-800">
                    {order.payment_method_id
                      ? `Payment #${order.payment_method_id}`
                      : "Not available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Delivery */}
            <div className="bg-[#FCFBF8] rounded-2xl border border-[#eee7df] p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={19} className="text-[#8b3905]" />

                <h2 className="font-semibold text-gray-900">
                  Delivery Information
                </h2>
              </div>

              <div className="text-sm">
                <p className="text-gray-500">Delivery Address</p>

                <p className="font-medium text-gray-800 mt-1">
                  Address #{order.address_id}
                </p>
              </div>
            </div>
          </div>

          {/* ================= PRICE SUMMARY ================= */}
          <div className="bg-[#FCFBF8] border-t border-[#eee7df] px-5 py-6 md:px-7">
            <div className="max-w-md ml-auto">
              <h2 className="font-semibold text-gray-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>

                  <span>₹{Number(order.subtotal).toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-500">
                  <span>Shipping</span>

                  <span>
                    {Number(order.shipping_amount) === 0
                      ? "Free"
                      : `₹${Number(order.shipping_amount).toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-[#e5ddd4] pt-4 flex items-center justify-between">
                  <span className="font-semibold text-gray-900">Total</span>

                  <span className="text-2xl font-bold text-[#8b3905]">
                    ₹{Number(order.total_amount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
