import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
} from "./notification.api";

// Fetch notifications
export const fetchNotifications = createAsyncThunk(
  "notification/fetchNotifications",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getNotifications();

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch notifications",
      );
    }
  },
);

// Mark one notification as read
export const markAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (notificationId, { rejectWithValue }) => {
    try {
      await markNotificationAsRead(notificationId);

      return notificationId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark notification as read",
      );
    }
  },
);

// Mark all as read
export const markAllAsRead = createAsyncThunk(
  "notification/markAllAsRead",
  async (_, { rejectWithValue }) => {
    try {
      await markAllNotificationsAsRead();

      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to mark notifications as read",
      );
    }
  },
);

// Delete notification
export const removeNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (notificationId, { rejectWithValue }) => {
    try {
      await deleteNotification(notificationId);

      return notificationId;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete notification",
      );
    }
  },
);

const initialState = {
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    clearNotificationError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch notifications
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;

        state.notifications = action.payload.notifications || [];

        state.unreadCount = action.payload.unreadCount || 0;
      })

      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Mark one as read
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          (item) => item.id === action.payload,
        );

        if (notification && !notification.is_read) {
          notification.is_read = 1;

          if (state.unreadCount > 0) {
            state.unreadCount -= 1;
          }
        }
      })

      // Mark all as read
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications = state.notifications.map((notification) => ({
          ...notification,
          is_read: 1,
        }));

        state.unreadCount = 0;
      })

      // Delete notification
      .addCase(removeNotification.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          (item) => item.id === action.payload,
        );

        if (notification && !notification.is_read && state.unreadCount > 0) {
          state.unreadCount -= 1;
        }

        state.notifications = state.notifications.filter(
          (item) => item.id !== action.payload,
        );
      });
  },
});

export const { clearNotificationError } = notificationSlice.actions;

export default notificationSlice.reducer;
