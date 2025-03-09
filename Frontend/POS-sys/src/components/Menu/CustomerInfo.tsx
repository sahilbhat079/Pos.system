import React, { useState } from "react";
// import { useSelector } from "react-redux";
import { formatDate, getAvatarName } from "../../utils";

const CustomerInfo:React.FC = () => {
  const [dateTime, setDateTime] = useState<Date>(new Date());
//   const customerData = useSelector((state) => state.customer);

  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex flex-col items-start">
        <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
          {false|| "Customer Name"}
        </h1>
        <p className="text-xs text-[#ababab] font-medium mt-1">
          #{false|| "N/A"} / Dine in
        </p>
        <p className="text-xs text-[#ababab] font-medium mt-2">
          {formatDate(dateTime)}
        </p>
      </div>
      <button className="bg-[#f6b100] p-3 text-xl font-bold rounded-lg">
        {getAvatarName("Sahil Gani") || "CN"}
      </button>
    </div>
  );
};

export default CustomerInfo;