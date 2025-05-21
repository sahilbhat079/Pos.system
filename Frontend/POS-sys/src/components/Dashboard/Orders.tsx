import React from "react";
import { useMutation, useQuery, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getOrders, updateOrderStatus } from "../../https";
import { formatDateAndTime } from "../../utils";

export type OrderStatus = "pending" | "served"; // updated to match actual API

export interface CustomerDetails {
  name: string;
  phone?: string; // renamed from contact
  guests?: number;
}

export interface Table {
  tableNo: number;
}

export interface Item {
  name: string;
  price: number;
  quantity: number;
}

export interface Bills {
  total: number;
  tax: number;
  totalWithTax: number;
}

export interface Order {
  _id: string;
  customerDetails: CustomerDetails;
  orderStatus: OrderStatus;
  orderDate: string;
  items: Item[];
  table: Table;
  bills: Bills;
  paymentMethod: string;
}

const RecentOrders: React.FC = () => {
  const queryClient = useQueryClient();

  const orderStatusUpdateMutation = useMutation({
    mutationFn: ({
      orderId,
      orderStatus,
    }: {
      orderId: string;
      orderStatus: OrderStatus;
    }) => updateOrderStatus({ orderId, orderStatus }),
    onSuccess: () => {
      enqueueSnackbar("Order status updated successfully!", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => {
      enqueueSnackbar("Failed to update order status!", { variant: "error" });
    },
  });

  const handleStatusChange = ({
    orderId,
    orderStatus,
  }: {
    orderId: string;
    orderStatus: OrderStatus;
  }) => {
    orderStatusUpdateMutation.mutate({ orderId, orderStatus });
  };

  const { data: resData, isError } = useQuery<{ data: Order[] }>({
    queryKey: ["orders"],
    queryFn: getOrders,
    placeholderData: keepPreviousData,
  });

  if (isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" });
  }

  return (
    <div className="container mx-auto bg-[#262626] p-4 rounded-lg">
      <h2 className="text-[#f5f5f5] text-xl font-semibold mb-4">Recent Orders</h2>
      <div className="w-full overflow-x-auto  max-h-[70vh] overflow-y-auto">
        <table className="min-w-[900px] w-full  text-left text-[#f5f5f5]">
          <thead className="sticky top-0 z-10 bg-[#333] text-[#ababab]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Customer</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Items</th>
              <th className="p-3">Table No</th>
              <th className="p-3">Total</th>
              <th className="p-3 text-center">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            {resData?.data?.map((order: Order, index: number) => (
              <tr key={index} className="border-b border-gray-600 hover:bg-[#333]">
                <td className="p-4">
                  #{Math.floor(new Date(order.orderDate).getTime())}
                </td>
                <td className="p-4">{order.customerDetails.name}</td>
                <td className="p-4">
                  <select
                    className={`bg-[#1a1a1a] text-[#f5f5f5] border border-gray-500 p-2 rounded-lg focus:outline-none ${
                      order.orderStatus === "served"
                        ? "text-green-500"
                        : "text-yellow-500"
                    }`}
                    value={order.orderStatus}
                    onChange={(e) =>
                      handleStatusChange({
                        orderId: order._id,
                        orderStatus: e.target.value as OrderStatus,
                      })
                    }
                  >
                    <option className="text-yellow-500" value="In-Progress">
                      In Progress
                    </option>
                    <option className="text-green-500" value="Ready">
                      Ready
                    </option>
                    <option className="text-green-500" value="Completed">
                      Completed   
                    </option>
                    <option className="text-red-500" value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </td>
                <td className="p-4">{formatDateAndTime(order.orderDate)}</td>
                <td className="p-4">{order.items.length} Items</td>
                <td className="p-4">Table - {order.table?.tableNo}</td>
                <td className="p-4">₹{order.bills.totalWithTax}</td>
                <td className="p-4 text-center">{order.paymentMethod}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
    };

    export default RecentOrders;
