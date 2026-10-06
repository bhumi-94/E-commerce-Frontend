import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem,
  clearCartApi,
} from "./cart.api";


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

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",

  async ({ product, quantity = 1 }, { rejectWithValue }) => {
    try {

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


const initialState = {
  items: [],
  loading: false,
  updating: false,
  error: null,
};


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
