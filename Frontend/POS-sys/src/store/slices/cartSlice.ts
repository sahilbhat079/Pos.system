import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define Type for Cart Items
interface CartItem {
   id: number;
  name: string;
  pricePerQuantity: number;
  quantity: number;
  price: number;
}

// ✅ Define Type for Cart State
interface CartState {
  items: CartItem[];
}

// ✅ Initial State
const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
