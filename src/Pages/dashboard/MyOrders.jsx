import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  CalendarDays,
} from "lucide-react";

import { getOrders } from "../../features/orders/order.api";
import Loading from "../../Components/common/Loading";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAllOrders, setShowAllOrders] = useState(false);

  const navigate = useNavigate();

  const RECENT_ORDERS_LIMIT = 3;

  // ================= LOAD ORDERS =================
  const loadOrders = async () => {
    try {
      setLoading(true);

      const response = await getOrders();

      if (response.success) {
        setOrders(response.orders || []);
      }
    } catch (error) {
      console.error("GET ORDERS ERROR:", error);

      alert(error.response?.data?.message || "Failed to load your orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // ================= ORDERS TO DISPLAY =================
  const displayedOrders = showAllOrders
    ? orders
    : orders.slice(0, RECENT_ORDERS_LIMIT);

  // ================= IMAGE URL =================
  const getImageUrl = (image) => {
    if (!image) return null;

    if (image.startsWith("http")) {
      return image;
    }

    const cleanImage = image.replace(/^\/?uploads\/?/, "");
    return `${import.meta.env.VITE_BACKEND_URL}/uploads/${cleanImage}`;
  };

  // ================= STATUS DETAILS =================
  const getStatusDetails = (status) => {
    switch (status) {
      case "Delivered":
        return {
          icon: <CheckCircle2 size={15} />,
          className: "bg-green-50 text-green-700 border-green-200",
        };

      case "Shipped":
        return {
          icon: <Truck size={15} />,
          className: "bg-blue-50 text-blue-700 border-blue-200",
        };

      case "Processing":
        return {
          icon: <Package size={15} />,
          className: "bg-orange-50 text-orange-700 border-orange-200",
        };

      case "Confirmed":
        return {
          icon: <CheckCircle2 size={15} />,
          className: "bg-purple-50 text-purple-700 border-purple-200",
        };

      case "Cancelled":
        return {
          icon: <XCircle size={15} />,
          className: "bg-red-50 text-red-700 border-red-200",
        };

      default:
        return {
          icon: <Clock3 size={15} />,
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

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-[500px] bg-[#FCFBF3] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFBF3] px-4 py-6 md:px-8 md:py-8 rounded-3xl">
      <div className="max-w-6xl mx-auto">
        {/* ================= HEADER ================= */}
        <div className="mb-7">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-[#f6e8df] flex items-center justify-center">
              <ShoppingBag size={22} className="text-[#8b3905]" />
            </div>

            <div>
              <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                My Orders
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Track and manage your recent orders
              </p>
            </div>
          </div>
        </div>

        {/* ================= EMPTY STATE ================= */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-[22px] border border-[#eee7df] px-6 py-16 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-[#f8eee8] flex items-center justify-center mb-5">
              <ShoppingBag size={34} className="text-[#8b3905]" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900">
              No Orders Yet
            </h2>

            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
              Once you place an order, your order history will appear here.
            </p>
          </div>
        ) : (
          <>
            {/* ================= ORDER COUNT ================= */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-500">
                {orders.length} {orders.length === 1 ? "order" : "orders"}
              </p>
            </div>

            {/* ================= ORDERS ================= */}
            <div className="space-y-5">
              {displayedOrders.map((order) => {
                const status = getStatusDetails(order.order_status);

                return (
                  <div
                    key={order.id}
                    className="bg-white rounded-[22px] border border-[#eee7df] overflow-hidden cursor-pointer hover:shadow-sm transition"
                    onClick={() => navigate(`/profile/orders/${order.id}`)}
                  >
                    {/* -------- ORDER TOP -------- */}
                    <div className="px-5 py-5 md:px-6 border-b border-[#eee7df]">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-[#f8eee8] flex items-center justify-center">
                            <Package size={19} className="text-[#8b3905]" />
                          </div>

                          <div>
                            <p className="text-xs text-gray-500">Order ID</p>

                            <p className="font-semibold text-gray-900">
                              #{order.id}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <CalendarDays size={16} />
                          {formatDate(order.created_at)}
                        </div>

                        <div
                          className={`inline-flex items-center gap-1.5 w-fit px-3 py-1.5 rounded-full border text-xs font-medium ${status.className}`}
                        >
                          {status.icon}
                          {order.order_status}
                        </div>
                      </div>
                    </div>

                    {/* -------- PRODUCTS -------- */}
                    <div className="px-5 py-5 md:px-6">
                      <div className="space-y-4">
                        {order.items?.map((item) => {
                          const imageUrl = getImageUrl(item.image);

                          return (
                            <div
                              key={item.id}
                              className="flex items-center gap-4"
                            >
                              {/* Product Image */}
                              <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0 rounded-2xl bg-[#f8f6f2] border border-[#eee7df] overflow-hidden flex items-center justify-center">
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
                                  <Package
                                    size={25}
                                    className="text-gray-400"
                                  />
                                )}
                              </div>

                              {/* Product Details */}
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 truncate">
                                  {item.product_name}
                                </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                  Qty: {item.quantity}
                                </p>

                                <p className="text-sm text-gray-500">
                                  ₹{Number(item.price).toFixed(2)} each
                                </p>
                              </div>

                              {/* Product Total */}
                              <div className="text-right">
                                <p className="font-semibold text-gray-900">
                                  ₹{Number(item.total_price).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* -------- ORDER BOTTOM -------- */}
                    <div className="bg-[#FCFBF8] border-t border-[#eee7df] px-5 py-5 md:px-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        {/* Payment */}
                        <div>
                          <p className="text-xs text-gray-500">
                            Payment Status
                          </p>

                          <p
                            className={`text-sm font-medium mt-1 ${
                              order.payment_status === "Paid"
                                ? "text-green-700"
                                : order.payment_status === "Failed"
                                  ? "text-red-600"
                                  : "text-gray-700"
                            }`}
                          >
                            {order.payment_status}
                          </p>
                        </div>

                        {/* Summary */}
                        <div className="w-full md:w-72">
                          <div className="flex justify-between text-sm text-gray-500 mb-2">
                            <span>Subtotal</span>

                            <span>₹{Number(order.subtotal).toFixed(2)}</span>
                          </div>

                          <div className="flex justify-between text-sm text-gray-500 mb-3">
                            <span>Shipping</span>

                            <span>
                              {Number(order.shipping_amount) === 0
                                ? "Free"
                                : `₹${Number(order.shipping_amount).toFixed(
                                    2,
                                  )}`}
                            </span>
                          </div>

                          <div className="border-t border-[#e5ddd4] pt-3 flex justify-between items-center">
                            <span className="font-semibold text-gray-900">
                              Total
                            </span>

                            <span className="text-xl font-bold text-[#8b3905]">
                              ₹{Number(order.total_amount).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================= SEE MORE ORDERS ================= */}
            {!showAllOrders && orders.length > RECENT_ORDERS_LIMIT && (
              <div className="flex justify-center mt-8">
                <button
                  type="button"
                  onClick={() => {
                    setShowAllOrders(true);

                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                  className="
                      px-6
                      py-3
                      rounded-xl
                      border
                      border-[#8b3905]
                      bg-white
                      text-[#8b3905]
                      text-sm
                      font-semibold
                      hover:bg-[#8b3905]
                      hover:text-white
                      transition
                    "
                >
                  See More Orders
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
