import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Customer {
    orderId: string;
    customerName: string;
    customerPhone?: string;
    guests: number;
    table: table | null;
}

interface table{
    tableId: string;
    tableNo: string;
}


// Define payload types for actions
interface SetCustomerPayload {
    name: string;
    phone: string;
    guestCount: number;
  }
  
  interface UpdateTablePayload {
    table: {
      tableId: string;
      tableNo: string;
    };
  }



const initialState : Customer = {
    orderId: "",
    customerName: "",
    customerPhone: "",
    guests: 0,
    table: null
}








export const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomer: (state, action: PayloadAction<SetCustomerPayload>) => {
            const { name, phone, guestCount} = action.payload;
            state.orderId = `${Date.now()}`;
            state.customerName = name;
            state.customerPhone = phone;
            state.guests = guestCount;
          },

          removeCustomer: (state) => {
            state.customerName = "";
            state.customerPhone = "";
            state.guests = 0;
            state.table = null;
          },

          updateTable: (state, action: PayloadAction<UpdateTablePayload>) => {
            state.table = action.payload.table;
          },
    },
});


// Export actions and reducer
export const { setCustomer, removeCustomer, updateTable } = customerSlice.actions;
export default customerSlice.reducer;
