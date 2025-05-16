import React, { useState, useEffect } from "react";
import OrderCard from "../components/Orders/OrderCard";
import BackButton from "../components/Shared/BackButton";
import BottomNav from "../components/Shared/BottomNav";

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

// Dummy Order Data
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
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden flex flex-col">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 gap-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Orders
          </h1>
        </div>

        {/* Status Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          {(["All", "In Progress", "Ready", "Completed"] as StatusType[]).map((type) => (
            <button
              key={type}
              onClick={() => setStatus(type)}
              className={`text-[#ababab] text-sm sm:text-lg font-semibold px-4 py-2 rounded-lg transition-all
                ${status === type ? "bg-[#383838] text-white" : "hover:bg-[#2a2a2a]"}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Order List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 py-4 overflow-y-auto">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => <OrderCard key={order._id} order={order} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No orders available</p>
        )}
      </div>
      <BottomNav/>
    </section>
  );
};

export default Orders;
