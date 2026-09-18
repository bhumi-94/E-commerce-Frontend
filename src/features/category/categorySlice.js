import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getCategories, getCategoryById } from "./category.api";

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getCategories();

      return response.categories;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

export const fetchCategoryById = createAsyncThunk(
  "category/fetchCategoryById",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await getCategoryById(categoryId);

      return response.category;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch category",
      );
    }
  },
);
const initialState = {
  categories: [],
  selectedCategory: null,
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,

  reducers: {
    clearCategoryError: (state) => {
      state.error = null;
    },

    clearSelectedCategory: (state) => {
      state.selectedCategory = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch all categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch one category
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCategoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCategory = action.payload;
      })

      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCategoryError, clearSelectedCategory } =
  categorySlice.actions;

export default categorySlice.reducer;
