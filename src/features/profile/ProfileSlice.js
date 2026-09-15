import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";

import {
  getProfile,
  updateProfile,
} from "./profile.api";

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProfile();

      console.log("PROFILE API RESPONSE:", response);

      return response.user;
    } catch (error) {
      console.error(
        "FETCH PROFILE ERROR:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch profile"
      );
    }
  }
);

export const saveProfile = createAsyncThunk(
  "profile/saveProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await updateProfile(data);

      return response.user;
    } catch (error) {
      console.error(
        "UPDATE PROFILE ERROR:",
        error.response?.data || error.message
      );

      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    }
  }
);
const initialState = {
  user: null,
  loading: false,
  updating: false,
  error: null,
  successMessage: "",
};


const profileSlice = createSlice({
  name: "profile",

  initialState,

  reducers: {
    clearProfileMessage: (state) => {
      state.successMessage = "";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH PROFILE
      .addCase(
        fetchProfile.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.error = null;
        }
      )

      .addCase(
        fetchProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // UPDATE PROFILE
      .addCase(
        saveProfile.pending,
        (state) => {
          state.updating = true;
          state.error = null;
          state.successMessage = "";
        }
      )

      .addCase(
        saveProfile.fulfilled,
        (state, action) => {
          state.updating = false;
          state.user = action.payload;
          state.successMessage =
            "Profile updated successfully";
        }
      )

      .addCase(
        saveProfile.rejected,
        (state, action) => {
          state.updating = false;
          state.error = action.payload;
        }
      );
  },
});

export const {
  clearProfileMessage,
} = profileSlice.actions;

export default profileSlice.reducer;