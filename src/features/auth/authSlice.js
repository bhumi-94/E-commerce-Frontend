import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registerUser, loginUser } from "./auth.api";

// =========================
// REGISTER USER
// =========================
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

// =========================
// LOGIN USER
// =========================
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

// =========================
// INITIAL STATE
// =========================
const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  successMessage: "",
};

// =========================
// AUTH SLICE
// =========================
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
      state.error = null;
      state.successMessage = "";
    },
  },

  extraReducers: (builder) => {
    // =========================
    // REGISTER
    // =========================
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

    // =========================
    // LOGIN
    // =========================
    builder
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = "";
      })

      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;

        // IMPORTANT:
        // Backend response:
        // {
        //   success: true,
        //   message: "Login successful",
        //   data: {
        //     user: {...}
        //   }
        // }

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
  },
});

// =========================
// EXPORT ACTIONS
// =========================
export const { clearAuthError, clearAuthMessage, logout } = authSlice.actions;

export default authSlice.reducer;
