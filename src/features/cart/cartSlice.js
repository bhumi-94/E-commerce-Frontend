import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
  try {
    const saved = localStorage.getItem("NexoraCart");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem("NexoraCart", JSON.stringify(items));
};

const initialState = {
  items: getInitialCart(),
};

const cartSlice = createSlice({
  name: "cart",

  initialState,

  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;

      const existingProduct = state.items.find(
        (item) => Number(item.id) === Number(product.id),
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        state.items.push({
          ...product,
          quantity,
        });
      }

      saveCart(state.items);
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => Number(item.id) !== Number(action.payload),
      );

      saveCart(state.items);
    },

    increaseQuantity: (state, action) => {
      const product = state.items.find(
        (item) => Number(item.id) === Number(action.payload),
      );

      if (product) {
        product.quantity += 1;
      }

      saveCart(state.items);
    },

    decreaseQuantity: (state, action) => {
      const product = state.items.find(
        (item) => Number(item.id) === Number(action.payload),
      );

      if (!product) return;

      if (product.quantity > 1) {
        product.quantity -= 1;
      } else {
        state.items = state.items.filter(
          (item) => Number(item.id) !== Number(action.payload),
        );
      }

      saveCart(state.items);
    },

    clearCart: (state) => {
      state.items = [];
      saveCart(state.items);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
