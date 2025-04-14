import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the User State type
interface UserState {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  isAuth: boolean;
}

// Define the payload type for setting user
interface SetUserPayload {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

// Initial State
const initialState: UserState = {
  _id: "",
  name: "",
  email: "",
  phone: "",
  role: "",
  isAuth: false,
};

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayload>) => {
      const { _id, name, phone, email, role } = action.payload;
      state._id = _id;
      state.name = name;
      state.phone = phone;
      state.email = email;
      state.role = role;
      state.isAuth = true;
    },

    removeUser: (state) => {
      state._id = "";
      state.email = "";
      state.name = "";
      state.phone = "";
      state.role = "";
      state.isAuth = false;
    },
  },
});

// Export actions and reducer
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
