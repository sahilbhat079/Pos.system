import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import customerReducer from "./slices/customer";
import userReducer from "./slices/userSlice";


export const store = configureStore({
  reducer: {
// Add your reducers here
  cartReducer,
  customerReducer,
  userReducer,

  
  },  
  devTools: import.meta.env.NODE_ENV !== "production",
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


