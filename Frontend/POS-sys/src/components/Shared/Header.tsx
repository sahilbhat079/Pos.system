import React from 'react'


// icons
import { FaSearch } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";

//logo
import logo from "../../assets/images/logo.png";

//routing imports
import { useNavigate } from "react-router-dom";


// type Props = {}

const Header: React.FC= ( ) => {
  const navigate = useNavigate();


  return (
    <header   className="flex justify-between items-center py-4 px-8 bg-blackbg">
    {/* Logo */}
    <div onClick={() => navigate("/")} className="flex items-center gap-2 cursor-pointer">
        <img src={logo} className="h-8 w-8" alt="restro logo" />
        <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
         Amrald
        </h1>
   </div>


  {/* Searchbar */}
  <div className="flex items-center gap-4 bg-[#1f1f1f] rounded-[15px] px-5 py-2 w-[500px]">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-white ml-2 outline-none"
        />
  </div>



  
    {/* Logged User Details */}
    <div className="flex items-center gap-4">
        {"Admin" === "Admin" && (
          <div onClick={() => navigate("/dashboard")} className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
            <MdDashboard className="text-[#f5f5f5] text-2xl" />
          </div>
        )}
        <div className="bg-[#1f1f1f] rounded-[15px] p-3 cursor-pointer">
          <FaBell className="text-[#f5f5f5] text-2xl" />
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <FaUserCircle className="text-[#f5f5f5] text-4xl" />
          <div className="flex flex-col items-start">
            <h1 className="text-md text-[#f5f5f5] font-semibold tracking-wide">
              { false || "TEST USER"}
              
            
            </h1>
            <p className="text-xs text-[#ababab] font-medium">
              {false || "Role"}

            </p>
          </div>
          <IoLogOut
            // onClick={handleLogout}
            className="text-[#f5f5f5] ml-2"
            size={40}
          />
        </div>
     </div>

    </header>
  )
}

export default Header