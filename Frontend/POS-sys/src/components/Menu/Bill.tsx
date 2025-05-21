// import React, { useState, useEffect } from "react";
// import Invoice from "../Invoices/Invoice";
// import { useAppSelector } from "../../hooks/reduxhooks";
// import { useMutation } from "@tanstack/react-query";
// import { enqueueSnackbar } from "notistack";
// import {
//   addOrder,
//   createOrderRazorpay,
//   verifyPaymentRazorpay,
//   updateTable,
// } from "../../https/index";

// // Redux actions (if needed after success)
// // import { clearCart } from "../../store/slices/cartSlice";
// // import { removeCustomer } from "../../store/slices/customer";

// // Types
// interface CartItem {
//   id: number;
//   name: string;
//   price: number;
//   quantity: number;
// }

// interface OrderItem {
//   name: string;
//   quantity: number;
//   price: number;
// }

// interface Bills {
//   total: number;
//   tax: number;
//   totalWithTax: number|undefined;
// }

// interface CustomerDetails {
//   name: string;
//   phone: string;
//   guests: number;
// }

// interface PaymentData {
//   razorpay_order_id?: string;
//   razorpay_payment_id?: string;
// }

// interface OrderInfo {
//   orderDate: string;
//   customerDetails: CustomerDetails;
//   items: OrderItem[];
//   bills: Bills;
//   paymentMethod: string;
//   paymentData?: PaymentData;
//   orderStatus?: string;
//   table?: any;
// }

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// function loadScript(src: string): Promise<boolean> {
//   return new Promise((resolve) => {
//     const script = document.createElement("script");
//     script.src = src;
//     script.onload = () => resolve(true);
//     script.onerror = () => resolve(false);
//     document.body.appendChild(script);
//   });
// }

// const Bill: React.FC = () => {
//   const customerDetails = useAppSelector((state) => state.customerReducer);
//   const cartData = useAppSelector((state) => state.cartReducer.items) as CartItem[];

//   const [total, setTotal] = useState<number>(0);
//   const taxRate: number = 5.25;
//   const [tax, setTax] = useState<number>(0);
//   const [totalPriceWithTax, setTotalPriceWithTax] = useState<number>(0);
//   const [paymentMethod, setPaymentMethod] = useState<string | undefined>();
//   const [showInvoice, setShowInvoice] = useState<boolean>(false);
//   const [orderInfo, setOrderInfo] = useState<any | null>(null);

//   useEffect(() => {
//   const cartTotal = cartData.reduce((sum, item) => sum + item.price, 0);
//   const calculatedTax = Number(((cartTotal * taxRate) / 100).toFixed(2));
//   const totalWithTax = Number((cartTotal + calculatedTax).toFixed(2));
//   setTotal(Number(cartTotal.toFixed(2)));
//   setTax(calculatedTax);
//   setTotalPriceWithTax(totalWithTax);
// }, [cartData]);





//   const updateTableStatus = useMutation({
//     mutationFn: updateTable,
//   });




//   const handlePlaceOrder = async () => {
//     if (!paymentMethod) {
//       enqueueSnackbar("Please select a payment method", { variant: "warning" });
//       return;
//     }

//     const baseOrder: OrderInfo = {
//       orderDate: new Date().toISOString(),
//       customerDetails: {
//         name: customerDetails.customerName,
//         phone: customerDetails.customerPhone || "1234567890",
//         guests: customerDetails.guests || 1,
//       },
//        table: customerDetails.table?.tableId,
//       items: cartData.map((item) => ({
//         name: item.name,
//         quantity: item.quantity,
//         price: item.price,
//       })),
//       bills: {
//         total,  
//         tax,
//         totalWithTax: totalPriceWithTax,
//       },
//       paymentMethod,
//       orderStatus: "pending",
//     };

//     if (paymentMethod === "Online") {
//       const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
//       if (!res) {
//         enqueueSnackbar("Razorpay SDK failed to load", { variant: "error" });
//         return;
//       }

//       const  data  = await createOrderRazorpay({ amount: totalPriceWithTax });

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: data.order.amount,
//         currency: data.order.currency,
//         name: "Restaurant POS",
//         description: "Payment",
//         order_id: data.order.id,
//         handler: async function (response: any) {
//           // console.log("Payment response:", response);
//           try {
//             const verify = await verifyPaymentRazorpay({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//             });

//             // console.log("Payment verification response:", verify);
//             if (verify.success) {
//               const finalOrder = {
//                 ...baseOrder,
//                 paymentMethod: "Online",
//                 orderStatus: "served",
//                 paymentData: {
//                   razorpay_order_id: response.razorpay_order_id,
//                   razorpay_payment_id: response.razorpay_payment_id,
//                 },
//               };
//               console.log("Final order data:", finalOrder);

//               const {data}  = await addOrder(finalOrder); 
//               console.log("Saved order:", data);

//                  // Update Table
//       const tableData = {
//         status: "Booked",
//         orderId: data._id,
//         tableId: data.table,
//       };
//       console.log("Table data:", tableData);



//         await updateTableStatus.mutateAsync(tableData);
          

//               setOrderInfo(data);
//               setShowInvoice(true);
//               enqueueSnackbar("Order placed successfully", { variant: "success" });
//             } else {
//               enqueueSnackbar("Payment verification failed", { variant: "error" });
//             }
//           } catch (err) {
//             enqueueSnackbar("Something went wrong during payment verification", { variant: "error" });
//           }
//         },
//         prefill: {
//           name: customerDetails.customerName,
//           contact: customerDetails.customerPhone,
//         },
//         theme: {
//           color: "#F37254",
//         },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } else {
//       const  {data} = await addOrder(baseOrder);
//       setOrderInfo(data);
//       setShowInvoice(true);
//       enqueueSnackbar("Cash order placed successfully", { variant: "success" });
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between px-5 mt-2">
//         <p className="text-xs text-[#ababab] font-medium mt-2">
//           Items({cartData.length})
//         </p>
//         <h1 className="text-[#f5f5f5] text-md font-bold">₹{total.toFixed(2)}</h1>
//       </div>
//       <div className="flex items-center justify-between px-5 mt-2">
//         <p className="text-xs text-[#ababab] font-medium mt-2">Tax (5.25%)</p>
//         <h1 className="text-[#f5f5f5] text-md font-bold">₹{tax.toFixed(2)}</h1>
//       </div>
//       <div className="flex items-center justify-between px-5 mt-2">
//         <p className="text-xs text-[#ababab] font-medium mt-2">Total With Tax</p>
//         <h1 className="text-[#f5f5f5] text-md font-bold">₹{totalPriceWithTax.toFixed(2)}</h1>
//       </div>

//       <div className="flex items-center gap-3 px-5 mt-4">
//         <button
//           onClick={() => setPaymentMethod("Cash")}
//           className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${
//             paymentMethod === "Cash" ? "bg-[#383737]" : ""
//           }`}
//         >
//           Cash
//         </button>
//         <button
//           onClick={() => setPaymentMethod("Online")}
//           className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab] font-semibold ${
//             paymentMethod === "Online" ? "bg-[#383737]" : ""
//           }`}
//         >
//           Online
//         </button>
//       </div>

//       <div className="flex items-center gap-3 px-5 mt-4">
//         <button
//           className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg"
//           onClick={() => setShowInvoice(true)}
//         >
//           Print Receipt
//         </button>
//         <button
//           onClick={handlePlaceOrder}
//           className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg"
//         >
//           Place Order
//         </button>
//       </div>

//       {showInvoice && orderInfo && ( 
//         <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
//       )} 
//     </>
//   );
// };

// export default Bill;









import React, { useState, useEffect } from "react";
import Invoice from "../Invoices/Invoice";
import { useAppSelector ,useAppDispatch} from "../../hooks/reduxhooks";
import { useMutation } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {
  addOrder,
  createOrderRazorpay,
  verifyPaymentRazorpay,
  updateTable,
} from "../../https/index";
import{clearCart} from "../../store/slices/cartSlice"
import { removeCustomer } from "../../store/slices/customer";


// Types
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Bills {
  total: number;
  tax: number;
  totalWithTax: number | undefined;
}

interface CustomerDetails {
  name: string;
  phone: string;
  guests: number;
}

interface PaymentData {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
}

interface OrderInfo {
  orderDate: string;
  customerDetails: CustomerDetails;
  items: OrderItem[];
  bills: Bills;
  paymentMethod: string;
  paymentData?: PaymentData;
  orderStatus?: string;
  table?: any;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

function loadScript(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

const Bill: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const customerDetails = useAppSelector((state) => state.customerReducer);
  const cartData = useAppSelector(
    (state) => state.cartReducer.items
  ) as CartItem[];

  const [total, setTotal] = useState<number>(0);
  const taxRate = 5.25;
  const [tax, setTax] = useState<number>(0);
  const [totalPriceWithTax, setTotalPriceWithTax] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string | undefined>();
  const [showInvoice, setShowInvoice] = useState<boolean>(false);
  const [orderInfo, setOrderInfo] = useState<any | null>(null);

  const updateTableStatus = useMutation({ mutationFn: updateTable });

  useEffect(() => {
    const cartTotal = cartData.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const calculatedTax = Number(((cartTotal * taxRate) / 100).toFixed(2));
    const totalWithTax = Number((cartTotal + calculatedTax).toFixed(2));
    setTotal(Number(cartTotal.toFixed(2)));
    setTax(calculatedTax);
    setTotalPriceWithTax(totalWithTax);
  }, [cartData]);

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      enqueueSnackbar("Please select a payment method", { variant: "warning" });
      return;
    }

    const baseOrder: OrderInfo = {
      orderDate: new Date().toISOString(),
      customerDetails: {
        name: customerDetails.customerName || "Guest",
        phone: customerDetails.customerPhone || "1234567890",
        guests: customerDetails.guests || 1,
      },
      table: customerDetails.table?.tableId,
      items: cartData.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      bills: {
        total,
        tax,
        totalWithTax: totalPriceWithTax,
      },
      paymentMethod,
      orderStatus: "In-Progress",
    };

    if (paymentMethod === "Online") {
      const sdkLoaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!sdkLoaded) {
        enqueueSnackbar("Razorpay SDK failed to load", { variant: "error" });
        return;
      }

      try {
        const data = await createOrderRazorpay({ amount: totalPriceWithTax });

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: data.order.currency,
          name: "Restaurant POS",
          description: "Payment",
          order_id: data.order.id,
          handler: async function (response: any) {
            try {
              const verify = await verifyPaymentRazorpay({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verify.success) {
                const finalOrder = {
                  ...baseOrder,
                  paymentMethod: "Online",
                  orderStatus: "In-Progress",
                  paymentData: {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                  },
                };

                const { data: orderData } = await addOrder(finalOrder);

                const tableData = {
                  status: "Booked",
                  orderId: orderData._id,
                  tableId: orderData.table,
                };

               const tabledata= await updateTableStatus.mutateAsync(tableData);
                console.log("Table data:", tabledata);
                dispatch(clearCart());
                dispatch(removeCustomer());
                console.log("Cleared cart and removed customer data");
                
                setOrderInfo(orderData);
                setShowInvoice(true);
                enqueueSnackbar("Order placed successfully", { variant: "success" });
                navigate("/table");
              } else {
                enqueueSnackbar("Payment verification failed", { variant: "error" });
              }
            } catch (err) {
              enqueueSnackbar("Error verifying payment", { variant: "error" });
            }
          },
          prefill: {
            name: customerDetails.customerName,
            contact: customerDetails.customerPhone,
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        enqueueSnackbar("Error processing payment", { variant: "error" });
      }
    } else {
      const { data } = await addOrder(baseOrder);
      const tableData = {
        status: "Booked",
        orderId: data._id,
        tableId: data.table,
      };
      await updateTableStatus.mutateAsync(tableData);
      dispatch(clearCart());
      dispatch(removeCustomer());
      setOrderInfo(data);
      setShowInvoice(true);
      enqueueSnackbar("Cash order placed successfully", { variant: "success" });
      navigate("/table");
    }
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
        <h1 className="text-[#f5f5f5] text-md font-bold">₹{totalPriceWithTax.toFixed(2)}</h1>
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
        <button
          className="bg-[#025cca] px-4 py-3 w-full rounded-lg text-[#f5f5f5] font-semibold text-lg"
          onClick={() => setShowInvoice(true)}
        >
          Print Receipt
        </button>
        <button
          onClick={handlePlaceOrder}
          className="bg-[#f6b100] px-4 py-3 w-full rounded-lg text-[#1f1f1f] font-semibold text-lg"
        >
          Place Order
        </button>
      </div>

      {showInvoice && orderInfo && (
        <Invoice orderInfo={orderInfo} setShowInvoice={setShowInvoice} />
      )}
    </>
  );
};

export default Bill;
