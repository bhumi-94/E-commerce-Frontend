import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "../features/profile/ProfileSlice";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import productReducer from "../features/product/productSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export default store;
