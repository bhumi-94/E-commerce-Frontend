import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCartApi,
} from "./cart.api";

// ==============================
// FETCH CART
// ==============================

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",

  async (_, { rejectWithValue }) => {
    try {
      const response = await getCart();

      return response.cart || [];
    } catch (error) {
      console.error("FETCH CART ERROR:", error.response?.data || error.message);

      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart",
      );
    }
  },
);

// ==============================
// ADD PRODUCT TO CART
// ==============================

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",

  async ({ product, quantity = 1 }, { rejectWithValue }) => {
    try {
      // Important:
      // Shop products have `id`
      // Wishlist products may have `product_id`

      const productId = product?.product_id || product?.id;

      if (!productId) {
        throw new Error("Product ID is missing");
      }

      const response = await addCartItem(productId, quantity);

      return response.cart || [];
    } catch (error) {
      console.error(
        "ADD TO CART ERROR:",
        error.response?.data || error.message,
      );

      return rejectWithValue(
        error.response?.data?.message ||
          error.message ||
          "Failed to add product to cart",
      );
    }
  },
);

// ==============================
// UPDATE QUANTITY
// ==============================

export const updateProductQuantity = createAsyncThunk(
  "cart/updateProductQuantity",

  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await updateCartItem(productId, quantity);

      return response.cart || [];
    } catch (error) {
      console.error(
        "UPDATE CART ERROR:",
        error.response?.data || error.message,
      );

      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart",
      );
    }
  },
);

// ==============================
// REMOVE PRODUCT
// ==============================

export const removeProductFromCart = createAsyncThunk(
  "cart/removeProductFromCart",

  async (productId, { rejectWithValue }) => {
    try {
      const response = await removeCartItem(productId);

      return response.cart || [];
    } catch (error) {
      console.error(
        "REMOVE CART ERROR:",
        error.response?.data || error.message,
      );

      return rejectWithValue(
        error.response?.data?.message || "Failed to remove product",
      );
    }
  },
);

// ==============================
// CLEAR CART
// ==============================

export const clearCartFromDatabase = createAsyncThunk(
  "cart/clearCartFromDatabase",

  async (_, { rejectWithValue }) => {
    try {
      const response = await clearCartApi();

      return response.cart || [];
    } catch (error) {
      console.error("CLEAR CART ERROR:", error.response?.data || error.message);

      return rejectWithValue(
        error.response?.data?.message || "Failed to clear cart",
      );
    }
  },
);

// ==============================
// INITIAL STATE
// ==============================

const initialState = {
  items: [],
  loading: false,
  updating: false,
  error: null,
};

// ==============================
// CART SLICE
// ==============================

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    clearCartState: (state) => {
      state.items = [];
      state.loading = false;
      state.updating = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    // ==========================
    // FETCH
    // ==========================

    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // ==========================
    // ADD
    // ==========================

    builder
      .addCase(addProductToCart.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.updating = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(addProductToCart.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });

    // ==========================
    // UPDATE
    // ==========================

    builder
      .addCase(updateProductQuantity.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(updateProductQuantity.fulfilled, (state, action) => {
        state.updating = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(updateProductQuantity.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });

    // ==========================
    // REMOVE
    // ==========================

    builder
      .addCase(removeProductFromCart.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.updating = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });

    // ==========================
    // CLEAR
    // ==========================

    builder
      .addCase(clearCartFromDatabase.pending, (state) => {
        state.updating = true;
        state.error = null;
      })

      .addCase(clearCartFromDatabase.fulfilled, (state, action) => {
        state.updating = false;
        state.items = action.payload;
        state.error = null;
      })

      .addCase(clearCartFromDatabase.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { clearCartState } = cartSlice.actions;

export default cartSlice.reducer;
