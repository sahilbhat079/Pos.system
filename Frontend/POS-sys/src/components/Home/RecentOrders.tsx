import React, { useState, useEffect } from 'react';
import { FaSearch } from "react-icons/fa";
import OrderList from "./OrderList";
import { Link } from 'react-router-dom';
import { GrFlows } from "react-icons/gr";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders } from "../../https/index";

const RecentOrders: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredOrders = resData?.data?.filter((order: any) =>
    order.customerDetails.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-8 mt-6">
      <div className="bg-[#1a1a1a] w-full h-[450px] rounded-lg">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Recent Orders
          </h1>
          <Link to="/orders" className="text-[#025cca] text-sm font-semibold">
            <GrFlows className="text-white" size={20} />
          </Link>
        </div>

        {/* Search */}
        <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-6 py-4 mx-6">
          <FaSearch className="text-[#f5f5f5]" />
          <input
            type="text"
            placeholder="Search recent orders"
            className="bg-[#1f1f1f] outline-none text-[#f5f5f5] w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Order List */}
        <div className="mt-3 px-4 overflow-y-scroll h-[300px] scrollbar-hide custom-scrollbar">
          {filteredOrders?.length > 0 ? (
            filteredOrders.map((order: any) => (
              <OrderList key={order._id} order={order} />
            ))
          ) : (
            <p className="col-span-3 text-gray-500 mt-4 text-center">
              No orders found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
