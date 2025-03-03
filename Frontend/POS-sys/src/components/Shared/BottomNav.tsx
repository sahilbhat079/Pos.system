import React from 'react'
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";

const BottomNav:React.FC = () => {
  return (
    
<div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around">
  <button className="flex items-center justify-center font-bold text-[#ababab] w-[300px] rounded-[20px]">
    <FaHome className="inline mr-2" size={20} /> <p>Home</p>
  </button>
  <button className="flex items-center justify-center font-bold text-[#ababab] w-[300px] rounded-[20px]">
    <MdOutlineReorder className="inline mr-2" size={20} /> <p>Orders</p>
  </button>
  <button className="flex items-center justify-center font-bold text-[#ababab] w-[300px] rounded-[20px]">
    <MdTableBar className="inline mr-2" size={20} /> <p>Tables</p>
  </button>
  <button className="flex items-center justify-center font-bold text-[#ababab] w-[300px]">
    <CiCircleMore className="inline mr-2" size={20} /> <p>More</p>
  </button>

  <button className="absolute bottom-6 bg-[#F6B100] text-[#f5f5f5] rounded-full p-4 items-center">
    <BiSolidDish size={40} />
  </button>
</div>


    
  )
}

export default BottomNav;
