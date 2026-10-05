import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAdminUsers, dismissAdminUser, enableAdminUser } from "./admin.api";

export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminUsers();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

export const dismissUser = createAsyncThunk(
  "admin/dismissUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await dismissAdminUser(userId);

      return {
        userId,
        ...response,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to disable user",
      );
    }
  },
);

export const enableUser = createAsyncThunk(
  "admin/enableUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await enableAdminUser(userId);

      return {
        userId,
        ...response,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to enable user",
      );
    }
  },
);

const initialState = {
  users: [],
  loading: false,
  actionLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.users || [];
      })

      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(dismissUser.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(dismissUser.fulfilled, (state, action) => {
        state.actionLoading = false;

        const userId = Number(action.payload.userId);

        const user = state.users.find((item) => Number(item.id) === userId);

        if (user) {
          user.is_active = 0;
        }
      })

      .addCase(dismissUser.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      .addCase(enableUser.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(enableUser.fulfilled, (state, action) => {
        state.actionLoading = false;

        const userId = Number(action.payload.userId);

        const user = state.users.find((item) => Number(item.id) === userId);

        if (user) {
          user.is_active = 1;
        }
      })

      .addCase(enableUser.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
