import React from "react";
import { useNavigate } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";

// Define Type for Table Props
interface TableCardProps {
  id: string;
  name: string;
  status: string;
  initials?: string;
  seats: number;
}

const TableCard: React.FC<TableCardProps> = ({ id, name, status, initials, seats }) => {
  const navigate = useNavigate();

  // Handle Table Click (Only if Available)
  const handleClick = () => {
    if (status === "Booked") return;
    navigate(`/menu`);
  };

  return (
    <div
      onClick={handleClick}
      key={id}
      className={`w-[300px] hover:bg-[#2c2c2c] bg-[#262626] p-4 rounded-lg cursor-pointer
        ${status === "Booked" ? "bg-[#262626] opacity-50 cursor-not-allowed" : "hover:bg-[#2c2c2c] bg-[#262626]"}`}
    >
      {/* Table Header */}
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">
          Table <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" /> {name}
        </h1>
        <p className={`px-2 py-1 rounded-lg text-sm ${status === "Booked" ? "text-green-600 bg-[#2e4a40]" : "bg-[#664a04] text-white"}`}>
          {status}
        </p>
      </div>

      {/* Avatar Section */}
      <div className="flex items-center justify-center mt-5 mb-8">
        <h1 className="text-white text-xl rounded-full p-5 bg-[#1f1f1f]">
          {initials ? initials.charAt(0).toUpperCase() : "N/A"}
        </h1>
      </div>

      {/* Seats Info */}
      <p className="text-[#ababab] text-xs">
        Seats: <span className="text-[#f5f5f5]">{seats}</span>
      </p>
    </div>
  );
};

export default TableCard;
