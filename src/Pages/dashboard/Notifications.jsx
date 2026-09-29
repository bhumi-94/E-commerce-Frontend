import React, { useEffect } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  Trash2,
  Package,
  Info,
  ShoppingBag,
  XCircle,
  Truck,
  Clock,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/common/Loading";
import {
  fetchNotifications,
  markAsRead,
  markAllAsRead,
  removeNotification,
} from "../../features/Notifications/notificationSlice";

const Notifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { notifications, unreadCount, loading, error } = useSelector(
    (state) => state.notification,
  );

  useEffect(() => {
    const loadNotifications = async () => {
      const result = await dispatch(fetchNotifications()).unwrap();

      if (result.unreadCount > 0) {
        dispatch(markAllAsRead());
      }
    };

    loadNotifications();
  }, [dispatch]);

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getNotificationIcon = (notification) => {
    switch (notification.type) {
      case "order":
        return <Package size={20} />;

      case "shipping":
        return <Truck size={20} />;

      case "delivered":
        return <Check size={20} />;

      case "cancelled":
        return <XCircle size={20} />;

      case "general":
      default:
        return <Info size={20} />;
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.is_read) {
      dispatch(markAsRead(notification.id));
    }
  };

  const handleDelete = (e, notificationId) => {
    e.stopPropagation();

    dispatch(removeNotification(notificationId));
  };

  const handleMarkAllRead = () => {
    if (unreadCount > 0) {
      dispatch(markAllAsRead());
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-[#FCFBF3] px-4 py-6 md:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f6eafa] text-[#8b5aa8]">
              <Bell size={22} />
            </div>

            <div>
              <h1 className="text-2xl font-semibold text-[#25212a]">
                Notifications
              </h1>

              <p className="text-sm text-gray-500">
                Stay updated with your account activity
              </p>
            </div>
          </div>
        </div>

        {/* Mark all as read */}
        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="flex items-center justify-center gap-2 rounded-xl border border-[#e8d5f5] bg-white px-4 py-2.5 text-sm font-medium text-[#8b5aa8] transition hover:bg-[#f6eafa]"
          >
            <CheckCheck size={18} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Notification count */}
      {notifications.length > 0 && (
        <div className="mb-4 text-sm text-gray-500">
          {notifications.length} notification
          {notifications.length !== 1 ? "s" : ""}
          {unreadCount > 0 && (
            <span className="ml-2 font-medium text-[#8b5aa8]">
              • {unreadCount} unread
            </span>
          )}
        </div>
      )}

      {/* Empty state */}
      {notifications.length === 0 ? (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-[22px] border border-[#eee7df] bg-white px-6 text-center">
          <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#f6eafa] text-[#8b5aa8]">
            <Bell size={34} />
          </div>

          <h2 className="mb-2 text-xl font-semibold text-[#25212a]">
            No notifications yet
          </h2>

          <p className="max-w-md text-sm text-gray-500">
            You're all caught up. New order updates and other important
            notifications will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const isUnread = !notification.is_read;

            return (
              <div
                key={notification.id}
                onClick={() => handleNotificationClick(notification)}
                className={`group relative cursor-pointer rounded-[20px] border p-4 transition-all duration-200 md:p-5 ${
                  isUnread
                    ? "border-[#e8d5f5] bg-[#fdfaff] shadow-sm"
                    : "border-[#eee7df] bg-white"
                } hover:shadow-md`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                      isUnread
                        ? "bg-[#e8d5f5] text-[#8b5aa8]"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {getNotificationIcon(notification)}
                  </div>

                  {/* Content */}
                  <div className="min-w-0 flex-1 pr-10">
                    <div className="mb-1 flex items-center gap-2">
                      <h3
                        className={`text-sm md:text-base ${
                          isUnread
                            ? "font-semibold text-[#25212a]"
                            : "font-medium text-gray-700"
                        }`}
                      >
                        {notification.title}
                      </h3>

                      {isUnread && (
                        <span className="h-2 w-2 rounded-full bg-[#8b5aa8]" />
                      )}
                    </div>

                    <p className="text-sm leading-6 text-gray-600">
                      {notification.message}
                    </p>

                    <div className="mt-2 flex items-center gap-2 text-xs text-gray-400">
                      <Clock size={13} />
                      {formatDate(notification.created_at)}
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={(e) => handleDelete(e, notification.id)}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 opacity-0 transition group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                    title="Delete notification"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;
