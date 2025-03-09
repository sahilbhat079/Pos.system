import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";


export const store = configureStore({
  reducer: {
// Add your reducers here
  cartReducer,
  },  
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


