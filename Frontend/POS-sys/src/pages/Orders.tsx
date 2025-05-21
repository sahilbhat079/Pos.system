import React, { useState, useEffect } from "react";
import OrderCard from "../components/Orders/OrderCard";
import BackButton from "../components/Shared/BackButton";
import BottomNav from "../components/Shared/BottomNav";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrders } from "../https/index";
import { enqueueSnackbar } from "notistack";

// Define order status types
type StatusType = "All" | "In-Progress" | "Ready" | "Completed";

const Orders: React.FC = () => {
  const [status, setStatus] = useState<StatusType>("All");

  useEffect(() => {
    document.title = "POS | Orders";
  }, []);

  const { data: resData, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (isError) {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  }, [isError]);

  // Apply filter logic to fetched orders
  const filteredOrders =
    status === "All"
      ? resData?.data || []
      : resData?.data?.filter((order: any) => order?.orderStatus === status) || [];

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
          {(["All", "In-Progress", "Ready", "Completed"] as StatusType[]).map((type) => (
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
          filteredOrders.map((order: any) => <OrderCard key={order._id} order={order} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">No orders available</p>
        )}
      </div>

      <BottomNav />
    </section>
  );
};

export default Orders;
