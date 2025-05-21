import React from "react";
import { useNavigate } from "react-router-dom";
import { getAvatarName, getBgColor } from "../../utils";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useAppDispatch } from "../../hooks/reduxhooks";
import { updateTable } from "../../store/slices/customer";

interface TableCardProps {
  id: string;
  name: string;
  status: string;
  initials?: string;
  seats: number;
}


const TableCard: React.FC<TableCardProps> = ({ id, name, status , initials, seats }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClick = (name: string) => {
    if (status === "Booked") return;
    const table = { tableId: id, tableNo: name };
    dispatch(updateTable({table}));
    navigate(`/menu`);
  };

  // const cardClasses = `
  //   w-[350px] p-4 rounded-lg 
  //   ${status === "Booked" ? "bg-[#262626] opacity-50 cursor-not-allowed" : "bg-[#262626] hover:bg-[#2c2c2c] cursor-pointer"}
  // `;

  return (
    // <div
    //   onClick={status !== "Booked" ? () => handleClick(name) : undefined}
    //   key={id}
    //   className={cardClasses}
    // >
    //   {/* Table Header */}
    //   <div className="flex items-center justify-between px-1">
    //     <h1 className="text-[#f5f5f5] text-xl font-semibold">
    //       Table <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" /> {name}
    //     </h1>
    //     <p className={`px-2 py-1 rounded-lg text-sm ${status === "Booked" ? "text-green-600 bg-[#2e4a40]" : "bg-[#664a04] text-white"}`}>
    //       {status}
    //     </p>
    //   </div>

    //   {/* Avatar Section */}
    //   <div className="flex items-center justify-center mt-5 mb-8">
    //     <h1 className="text-white text-xl rounded-full p-5 bg-[#1f1f1f]">
    //       {initials ? initials.charAt(0).toUpperCase() : "N/A"}
    //     </h1>
    //   </div>

    //   {/* Seats Info */}
    //   <p className="text-[#ababab] text-xs">
    //     Seats: <span className="text-[#f5f5f5]">{seats}</span>
    //   </p>
    // </div>








  <div onClick={() => handleClick(name)} key={id} className="w-[300px] hover:bg-[#2c2c2c] bg-[#262626] p-4 rounded-lg cursor-pointer m-2">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-[#f5f5f5] text-xl font-semibold">Table <FaLongArrowAltRight className="text-[#ababab] ml-2 inline" /> {name}</h1>
        <p className={`${status === "Booked" ? "text-green-600 bg-[#2e4a40]" : "bg-[#664a04] text-white"} px-2 py-1 rounded-lg`}>
          {status}
        </p>
      </div>
      <div className="flex items-center justify-center mt-5 mb-8">
        <h1 className={`text-white rounded-full p-5 text-xl`} style={{backgroundColor : initials ? getBgColor() : "#1f1f1f"}} >{(initials && getAvatarName(initials)) || "N/A"}</h1>
      </div>
      <p className="text-[#ababab] text-xs">Seats: <span className="text-[#f5f5f5]">{seats}</span></p>
    </div>







  );
};

export default TableCard;
