// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./slices/cartSlice";
// import customerReducer from "./slices/customer";
// import userReducer from "./slices/userSlice";


// export const store = configureStore({
//   reducer: {
// // Add your reducers here
//   cartReducer,
//   customerReducer,
//   userReducer,

  
//   },  
//   devTools: import.meta.env.NODE_ENV !== "production",
// });


// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;





import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import customerReducer from "./slices/customer";
import userReducer from "./slices/userSlice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage

// Combine reducers
const rootReducer = combineReducers({
  cartReducer,
  customerReducer,
  userReducer,
});

// Configure persist
const persistConfig = {
  key: "root",
  storage,
};

// Wrap rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
export const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
