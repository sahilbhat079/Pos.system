import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ Define Type for Cart Items
interface CartItem {
  id: number;
  name: string;
  pricePerQuantity: number;
  quantity: number;
  price: number;  // total price for quantity (pricePerQuantity * quantity)
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

// Selector to get total price of all items in the cart
export const getTotalPrice = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.price, 0);

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
