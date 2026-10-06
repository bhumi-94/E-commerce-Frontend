import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAdminProducts,
  addAdminProduct as addAdminProductApi,
} from "./adminProduct.api";

// Fetch all products
export const fetchAdminProducts = createAsyncThunk(
  "adminProduct/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await getAdminProducts();
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

// Add product
export const addAdminProduct = createAsyncThunk(
  "adminProduct/addProduct",
  async (formData, { rejectWithValue }) => {
    try {
      return await addAdminProductApi(formData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add product",
      );
    }
  },
);

const initialState = {
  products: [],
  loading: false,
  actionLoading: false,
  error: null,
};

const adminProductSlice = createSlice({
  name: "adminProduct",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products || [];
      })

      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addAdminProduct.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })

      .addCase(addAdminProduct.fulfilled, (state, action) => {
        state.actionLoading = false;

        const newProduct = action.payload.product;

        if (newProduct) {
          state.products.unshift(newProduct);
        }
      })

      .addCase(addAdminProduct.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export default adminProductSlice.reducer;
