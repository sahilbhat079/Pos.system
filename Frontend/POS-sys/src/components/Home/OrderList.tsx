import React from "react";
import { FaCheckDouble, FaLongArrowAltRight, FaCircle } from "react-icons/fa";
import  {getAvatarName} from "../../utils";

// // Define types for order props
// interface Order {
//   _id: string;
//   customerDetails: {
//     name: string;
//   };
//   items: { name: string; quantity: number }[];
//   table: {
//     tableNo: number;
//   };
//   orderStatus: "Pending" | "Preparing" | "Ready";
// }

// interface OrderListProps {
//   order: Order;
// }

const OrderList: React.FC = () => {
  return (
    <div className="flex items-center gap-3 mb-2">
      {/* Avatar Button */}
      <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
        {getAvatarName("Sahil Gani")}
      </button>

      {/* Order Details */}
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start gap-1">
          <h1 className="text-[#f5f5f5] text-lg font-semibold tracking-wide">
            Sahil Gani
          </h1>
          <p className="text-[#ababab] text-sm">2 Items</p>
        </div>

        {/* Table Number */}
        <h1 className="text-[#f6b100] font-semibold border border-[#f6b100] rounded-lg p-1">
          Table <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" />{" "}
          2
        </h1>

        {/* Order Status */}
        <div className="flex flex-col items-end gap-2">
          {"Ready" === "Ready" ? (
            <p className="text-green-600 bg-[#2e4a40] px-2 py-1 rounded-lg">
              <FaCheckDouble className="inline mr-2" /> {"Ready"}
            </p>
          ) : (
            <p className="text-yellow-600 bg-[#4a452e] px-2 py-1 rounded-lg">
              <FaCircle className="inline mr-2" /> {"Preparing"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderList;
