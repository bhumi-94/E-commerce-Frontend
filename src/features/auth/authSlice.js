import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./auth.api";
import { fetchProfile } from "../profile/ProfileSlice";

export const registerUserThunk = createAsyncThunk(
  "auth/registerUser",

  async (data, { rejectWithValue }) => {
    try {
      const response = await registerUser(data);

      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const loginUserThunk = createAsyncThunk(
  "auth/loginUser",

  async (data, { rejectWithValue }) => {
    try {
      const response = await loginUser(data);

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const logoutUserThunk = createAsyncThunk(
  "auth/logoutUser",

  async (_, { rejectWithValue }) => {
    try {
      const response = await logoutUser();

      return response;
    } catch (error) {
      console.error("LOGOUT API ERROR:", error.response?.data || error.message);

      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  },
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  successMessage: "",
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    clearAuthError: (state) => {
      state.error = null;
    },

    clearAuthMessage: (state) => {
      state.successMessage = "";
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      state.successMessage = "";
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })

      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.successMessage =
          action.payload?.message || "Registration successful";

        state.error = null;
      })

      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })

      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;

        // Backend response:
        // data.user
        state.user = action.payload?.data?.user || null;
        state.isAuthenticated = !!action.payload?.data?.user;
        state.successMessage = action.payload?.message || "Login successful";
        state.error = null;
      })

      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      });

    builder
      .addCase(logoutUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.user = null;
        state.isAuthenticated = false;

        state.successMessage = action.payload?.message || "Logout successful";

        state.error = null;
      })

      .addCase(logoutUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearAuthError, clearAuthMessage, logout } = authSlice.actions;

export default authSlice.reducer;
