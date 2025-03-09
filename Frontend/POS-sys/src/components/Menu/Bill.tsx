import React, { useState, useEffect } from "react";
import Invoice from "../Invoices/Invoice";

// Order item structure
interface OrderItem {
    name: string;
    quantity: number;
    price: number;
  }
  
  // Billing details
  interface Bills {
    total: number;
    tax: number;
    totalWithTax: number;
  }
  
  // Customer details
  interface CustomerDetails {
    name: string;
    phone: string;
    guests: number;
  }
  
  // Payment information (optional for Razorpay)
  interface PaymentData {
    razorpay_order_id?: string;
    razorpay_payment_id?: string;
  }
  
  // Complete order information
  interface OrderInfo {
    orderDate: string;
    customerDetails: CustomerDetails;
    items: OrderItem[];
    bills: Bills;
    paymentMethod: string;
    paymentData?: PaymentData;
  }
  
 


const orderData: OrderInfo = {
    orderDate: new Date().toISOString(),
    customerDetails: {
      name: "John Doe",
      phone: "1234567890",
      guests: 2,
    },
    items: [
      { name: "Pizza", quantity: 2, price: 499 },
      { name: "Pasta", quantity: 1, price: 299 },
    ],
    bills: {
      total: 798,
      tax: 80,
      totalWithTax: 878,
    },
    paymentMethod: "Razorpay",
    paymentData: {
      razorpay_order_id: "order_12345",
      razorpay_payment_id: "pay_98765",
    },
  };


// Define types
type CartItem = {
  id: number;
  name: string;
  price: number;
};


const Bill: React.FC = () => {

// State for controlling invoice visibility



  // Mock cart data (Replace with real data in actual use)
  const [cartData, setCartData] = useState<CartItem[]>([
    { id: 1, name: "Burger", price: 150 },
    { id: 2, name: "Pizza", price: 300 },
  ]);

  const [total, setTotal] = useState<number>(0);
  const taxRate: number = 5.25;
  const [tax, setTax] = useState<number>(0);
  const [totalPriceWithTax, setTotalPriceWithTax] = useState<number>(0);
  
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>();
  const [showInvoice, setShowInvoice] = useState<boolean>(false);
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  // Calculate total price and tax when cartData changes
  useEffect(() => {
    const cartTotal = cartData.reduce((sum, item) => sum + item.price, 0);
    const calculatedTax = (cartTotal * taxRate) / 100;
    setTotal(cartTotal);
    setTax(calculatedTax);
    setTotalPriceWithTax(cartTotal + calculatedTax);
  }, [cartData]);

  const handlePlaceOrder = () => {
    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }
  
    const mockOrderData: OrderInfo = {
      orderDate: new Date().toISOString(),
      customerDetails: {
        name: "John Doe",
        phone: "1234567890",
        guests: 2,
      },
      items: cartData.map(item => ({
        name: item.name,
        quantity: 1, // Assuming 1 quantity for simplicity
        price: item.price
      })),
      bills: {
        total,
        tax,
        totalWithTax: totalPriceWithTax,
      },
      paymentMethod,
    };
  
    setOrderInfo(mockOrderData);
    setShowInvoice(true);
  };

  return (
    <>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">
          Items({cartData.length})
        </p>
        <h1 className="text-[#f5f5f5] text-md font-bold">₹{total.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Tax (5.25%)</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">₹{tax.toFixed(2)}</h1>
      </div>
      <div className="flex items-center justify-between px-5 mt-2">
        <p className="text-xs text-[#ababab] font-medium mt-2">Total With Tax</p>
        <h1 className="text-[#f5f5f5] text-md font-bold">
          ₹{totalPriceWithTax.toFixed(2)}
        </h1>
      </div>

      <div className="flex items-center gap-3 px-5 mt-4">
        <button
          onClick={() => setPaymentMethod("Cash")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${
            paymentMethod === "Cash" ? "bg-[#383737]" : ""
          }`}
        >
          Cash
        </button>
        <button
          onClick={() => setPaymentMethod("Online")}
          className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${
            paymentMethod === "Online" ? "bg-[#383737]" : ""
          }`}
        >
          Online
        </button>
      </div>

      <div className="flex items-center gap-3 px-5 mt-4">
        <button className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg" onClick={()=>setShowInvoice(true)}>
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg"
        >
          Place Order
        </button>
      </div>

      {showInvoice && orderInfo && <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />}
    </>
  );
};

export default Bill;
