import { createSlice } from "@reduxjs/toolkit";

const getInitialWishlist = () => {
  try {
    const saved = localStorage.getItem("NexoraWishlist");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveWishlist = (items) => {
  localStorage.setItem("NexoraWishlist", JSON.stringify(items));
};

const initialState = {
  items: getInitialWishlist(),
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.items.some(
        (item) => Number(item.id) === Number(product.id),
      );

      if (!exists) {
        state.items.push(product);
      }

      saveWishlist(state.items);
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => Number(item.id) !== Number(action.payload),
      );

      saveWishlist(state.items);
    },

    toggleWishlist: (state, action) => {
      const product = action.payload;

      const exists = state.items.some(
        (item) => Number(item.id) === Number(product.id),
      );

      if (exists) {
        state.items = state.items.filter(
          (item) => Number(item.id) !== Number(product.id),
        );
      } else {
        state.items.push(product);
      }

      saveWishlist(state.items);
    },

    clearWishlist: (state) => {
      state.items = [];
      saveWishlist(state.items);
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  toggleWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
