import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts, getProductById } from "./product.api";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getProducts();
    //   console.log("PRODUCT API RESPONSE:", response);

      return response.products;
    } catch (error) {
      console.error(
        "FETCH PRODUCTS ERROR:",
        error.response?.data || error.message,
      );

      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

// Fetch single product
export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await getProductById(productId);

      return response.product;
    } catch (error) {
      console.error(
        "FETCH PRODUCT ERROR:",
        error.response?.data || error.message,
      );

      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch product",
      );
    }
  },
);

const initialState = {
  products: [],
  selectedProduct: null,

  loading: false,
  productLoading: false,

  error: null,
  productError: null,
};

const productSlice = createSlice({
  name: "product",

  initialState,

  reducers: {
    clearProductError: (state) => {
      state.error = null;
    },

    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
      state.productError = null;
    },
  },

  extraReducers: (builder) => {
    builder


      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.productLoading = true;
        state.productError = null;
      })

      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.productLoading = false;
        state.selectedProduct = action.payload;
      })

      .addCase(fetchProductById.rejected, (state, action) => {
        state.productLoading = false;
        state.productError = action.payload;
      });
  },
});

export const { clearProductError, clearSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
