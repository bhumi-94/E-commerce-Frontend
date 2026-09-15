import { configureStore } from "@reduxjs/toolkit";

import profileReducer from "../features/profile/ProfileSlice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
});

export default store;