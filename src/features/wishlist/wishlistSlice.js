import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getWishlist,
  addWishlistItem,
  removeWishlistItem,
  clearWishlistApi,
} from "./wishlist.api";

// ======================================
// FETCH WISHLIST
// ======================================

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getWishlist();

      return response.wishlist || [];
    } catch (error) {
      console.error(
        "FETCH WISHLIST ERROR:",
        error.response?.data || error.message,
      );

      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist",
      );
    }
  },
);

// ======================================
// ADD TO WISHLIST
// ======================================

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",

  async (product, { rejectWithValue }) => {
    try {
      // Product page/card normally has `id`
      // Wishlist item has `product_id`

      const productId = product?.product_id || product?.id;

      if (!productId) {
        throw new Error("Product ID is missing");
      }

      const response = await addWishlistItem(productId);

      return response.wishlist || [];
    } catch (error) {
      console.error(
        "ADD WISHLIST ERROR:",
        error.response?.data || error.message,
      );

      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to add product to wishlist",
      );
    }
  },
);

// ======================================
// REMOVE FROM WISHLIST
// ======================================

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",

  async (productId, { rejectWithValue }) => {
    try {
      const response = await removeWishlistItem(productId);

      return response.wishlist || [];
    } catch (error) {
      console.error(
        "REMOVE WISHLIST ERROR:",
        error.response?.data || error.message,
      );

      return rejectWithValue(
        error.response?.data?.message || "Failed to remove product",
      );
    }
  },
);

// ======================================
// CLEAR WISHLIST
// ======================================

export const clearWishlist = createAsyncThunk(
  "wishlist/clearWishlist",

  async (_, { rejectWithValue }) => {
    try {
      const response = await clearWishlistApi();

      return response.wishlist || [];
    } catch (error) {
      console.error(
        "CLEAR WISHLIST ERROR:",
        error.response?.data || error.message,
      );

      return rejectWithValue(
        error.response?.data?.message || "Failed to clear wishlist",
      );
    }
  },
);

// ======================================
// INITIAL STATE
// ======================================

const initialState = {
  items: [],
  loading: false,
  updating: false,
  error: null,
};

// ======================================
// SLICE
// ======================================

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    clearWishlistState: (state) => {
      state.items = [];
      state.loading = false;
      state.updating = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // ==================================
    // FETCH
    // ==================================

    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ==================================
    // ADD
    // ==================================

    builder
      .addCase(addToWishlist.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.updating = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(addToWishlist.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });

    // ==================================
    // REMOVE
    // ==================================

    builder
      .addCase(removeFromWishlist.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.updating = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(removeFromWishlist.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });

    // ==================================
    // CLEAR
    // ==================================

    builder
      .addCase(clearWishlist.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(clearWishlist.fulfilled, (state, action) => {
        state.updating = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(clearWishlist.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { clearWishlistState } = wishlistSlice.actions;

export default wishlistSlice.reducer;
