import React, { useCallback, useState } from "react";
import { FaHome } from "react-icons/fa";
import { MdOutlineReorder, MdTableBar } from "react-icons/md";
import { CiCircleMore } from "react-icons/ci";
import { BiSolidDish } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxhooks";
import { setCustomer } from "../../store/slices/customer";

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guestCount, setGuestCount] = useState(1);

  // Functions to handle modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Increment & Decrement Guests
  const increment = () => setGuestCount((prev) => prev + 1);
  const decrement = () => setGuestCount((prev) => (prev > 1 ? prev - 1 : 1));

  // Handle Create Order
  const handleCreateOrder = () => {
    // console.log("Order Created:", { name, phone, guestCount });
    // Dispatch action to store order details (if needed)
    dispatch(setCustomer({name,phone,guestCount})); // Assuming you have a setCustomer action in your customer slice

    closeModal();
    navigate("/table");
  };

  // Memoized function to check active route
  const isActive = useCallback(
    (path: string): boolean => location.pathname === path,
    [location.pathname]
  );

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#262626] p-2 h-16 flex justify-around items-center">
      {/* Navigation Buttons */}
      {[
        { path: "/", label: "Home", icon: <FaHome size={20} /> },
        { path: "/orders", label: "Orders", icon: <MdOutlineReorder size={20} /> },
        { path: "/table", label: "Tables", icon: <MdTableBar size={20} /> },
        { path: "/", label: "More", icon: <CiCircleMore size={20} /> },
      ].map(({ path, label, icon }) => (
        <button
          key={`${path}+${label}`}
          onClick={() => navigate(path)}
          className={`flex items-center justify-center font-bold px-4 py-2 rounded-[20px] flex-1 ${
            isActive(path) ? "text-[#f5f5f5] bg-[#343434]" : "text-[#ababab]"
          }`}
          aria-label={label}
        >
          {icon} <p className="ml-2">{label}</p>
        </button>
      ))}

      {/* Floating Action Button */}
      <button
        onClick={openModal}
        disabled={isActive("/table") || isActive("/menu")}
        className={`absolute bottom-6 bg-[#F6B100] text-[#f5f5f5] rounded-full p-4 flex items-center justify-center ${
          isActive("/table") || isActive("/menu") ? "opacity-50 cursor-not-allowed" : ""
        }`}
        aria-label="Create Order"
      >
        <BiSolidDish size={40} />
      </button>

      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title="Create Order">
        <div>
          <label className="block text-[#ababab] mb-2 text-sm font-medium">Customer Name</label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              type="text" 
              placeholder="Enter customer name" 
              className="bg-transparent flex-1 text-white focus:outline-none" 
            />
          </div>
        </div>
        <div>
          <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">Customer Phone</label>
          <div className="flex items-center rounded-lg p-3 px-4 bg-[#1f1f1f]">
            <input 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              type="number" 
              placeholder="+91-9999999999" 
              className="bg-transparent flex-1 text-white focus:outline-none" 
            />
          </div>
        </div>
        <div>
          <label className="block mb-2 mt-3 text-sm font-medium text-[#ababab]">Guest</label>
          <div className="flex items-center justify-between bg-[#1f1f1f] px-4 py-3 rounded-lg">
            <button onClick={decrement} className="text-yellow-500 text-2xl">&minus;</button>
            <span className="text-white">{guestCount} Person</span>
            <button onClick={increment} className="text-yellow-500 text-2xl">&#43;</button>
          </div>
        </div>
        <button 
          onClick={handleCreateOrder} 
          className="w-full bg-[#F6B100] text-[#f5f5f5] rounded-lg py-3 mt-8 hover:bg-yellow-700"
        >
          Create Order
        </button>
      </Modal>
    </div>
  );
};

export default BottomNav;
