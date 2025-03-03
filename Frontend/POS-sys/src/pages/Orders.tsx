import React, { useState, useEffect } from "react";
import OrderCard from "../components/Orders/OrderCard";
import BackButton from "../components/Shared/BackButton";

// Define order status types
type StatusType = "All" | "In Progress" | "Ready" | "Completed";

interface Order {
  _id: string;
  customerDetails: {
    name: string;
  };
  orderDate: string;
  status: "In Progress" | "Ready" | "Completed";
  table: {
    tableNo: number;
  };
  items: Array<{
    name: string;
    quantity: number;
  }>;
  bills: {
    totalWithTax: number;
  };
}

const orders: Order[] = [
  {
    _id: "1",
    customerDetails: { name: "John Doe" },
    orderDate: "2025-03-03T14:30:00Z",
    status: "In Progress",
    table: { tableNo: 5 },
    items: [
      { name: "Margherita Pizza", quantity: 2 },
      { name: "Pasta Alfredo", quantity: 1 },
    ],
    bills: { totalWithTax: 750.5 },
  },
  {
    _id: "2",
    customerDetails: { name: "Jane Smith" },
    orderDate: "2025-03-03T15:00:00Z",
    status: "Ready",
    table: { tableNo: 8 },
    items: [
      { name: "Veg Burger", quantity: 1 },
      { name: "French Fries", quantity: 1 },
      { name: "Coke", quantity: 2 },
    ],
    bills: { totalWithTax: 450.0 },
  },
  {
    _id: "3",
    customerDetails: { name: "Alex Brown" },
    orderDate: "2025-03-03T13:15:00Z",
    status: "Completed",
    table: { tableNo: 2 },
    items: [
      { name: "Chicken Biryani", quantity: 1 },
      { name: "Mango Lassi", quantity: 1 },
    ],
    bills: { totalWithTax: 599.99 },
  },
];




const Orders: React.FC = () => {
  const [status, setStatus] = useState<StatusType>("All");

  useEffect(() => {
    document.title = "POS | Orders";
  }, []);

  
  // Filter orders based on status
  const filteredOrders =
    status === "All" ? orders : orders.filter((order) => order.status === status);

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Orders
          </h1>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center justify-around gap-4">
          {["All", "In Progress", "Ready", "Completed"].map((type) => (
            <button
              key={type}
              onClick={() => setStatus(type as StatusType)}
              className={`text-[#ababab] text-lg font-semibold px-5 py-2 rounded-lg ${
                status === type ? "bg-[#383838]" : ""
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="grid grid-cols-3 gap-3 px-16 py-4 overflow-y-scroll scrollbar-hide">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order._id} order={order} />)
        ) : (
          <p className="col-span-3 text-gray-500">No orders available</p>
        )}
      </div>
    </section>
  );
};

export default Orders;
