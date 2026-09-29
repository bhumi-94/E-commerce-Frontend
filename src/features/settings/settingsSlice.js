import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getSettings, updateSettings } from "./settings.api";

// ==========================================
// FETCH SETTINGS
// ==========================================
export const fetchSettings = createAsyncThunk(
  "settings/fetchSettings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getSettings();

      return response.settings;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch settings",
      );
    }
  },
);

// ==========================================
// UPDATE SETTINGS
// ==========================================
export const saveSettings = createAsyncThunk(
  "settings/saveSettings",
  async (settingsData, { rejectWithValue }) => {
    try {
      const response = await updateSettings(settingsData);

      return response.settings;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update settings",
      );
    }
  },
);

// ==========================================
// INITIAL STATE
// ==========================================
const initialState = {
  settings: {
    email_notifications: true,
    order_notifications: true,
    promotional_notifications: true,
    theme: "light",
  },

  loading: false,
  saving: false,
  error: null,
};

// ==========================================
// SLICE
// ==========================================
const settingsSlice = createSlice({
  name: "settings",

  initialState,

  reducers: {
    clearSettingsError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ======================================
      // FETCH SETTINGS
      // ======================================
      .addCase(fetchSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.loading = false;

        state.settings = {
          ...state.settings,
          ...action.payload,
        };
      })

      .addCase(fetchSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ======================================
      // SAVE SETTINGS
      // ======================================
      .addCase(saveSettings.pending, (state) => {
        state.saving = true;
        state.error = null;
      })

      .addCase(saveSettings.fulfilled, (state, action) => {
        state.saving = false;

        state.settings = {
          ...state.settings,
          ...action.payload,
        };
      })

      .addCase(saveSettings.rejected, (state, action) => {
        state.saving = false;
        state.error = action.payload;
      });
  },
});

export const { clearSettingsError } = settingsSlice.actions;

export default settingsSlice.reducer;
