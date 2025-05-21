import React, { useState, useEffect } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/Dashboard/Metrics";
import RecentOrders from "../components/Dashboard/Orders";
import Modal from "../components/Dashboard/Modal";
import TablesUpdate from "../components/Dashboard/TablesUpdate";
import { motion, AnimatePresence } from "framer-motion";

// Types
type ButtonConfig = {
  label: string;
  icon: React.JSX.Element;
  action: string;
};

type TabConfig = string;

interface ActionButtonProps {
  label: string;
  icon: React.JSX.Element;
  onClick: () => void;
}

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

// Buttons and tabs
const buttons: ButtonConfig[] = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs: TabConfig[] = ["Metrics", "Orders", "Tables"];

// Action button component
const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, onClick }) => (
  <button
    aria-label={label}
    className="bg-[#1a1a1a] hover:bg-[#262626] px-6 py-2 rounded-lg text-[#f5f5f5] font-semibold flex items-center gap-2"
    onClick={onClick}
  >
    {label} {icon}
  </button>
);

// Tab button component
const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
  <button
    aria-pressed={isActive}
    className={`px-6 py-2 rounded-lg font-semibold flex items-center gap-2 text-[#f5f5f5] ${
      isActive ? "bg-[#262626]" : "bg-[#1a1a1a] hover:bg-[#262626]"
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

// Main Dashboard component
const Dashboard: React.FC = () => {
  const [openModal, setOpenModal] = useState<null | string>(null);
  const [activeTab, setActiveTab] = useState<TabConfig>("Metrics");

  useEffect(() => {
    document.title = "POS | Admin Dashboard";
  }, []);

  const handleOpenModal = (action: string) => {
    setOpenModal(action);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <div className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)]">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-4 md:px-6 gap-4">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {buttons.map(({ label, icon, action }, index) => (
            <ActionButton
              key={index}
              label={label}
              icon={icon}
              onClick={() => handleOpenModal(action)}
            />
          ))}
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab, index) => (
            <TabButton
              key={index}
              label={tab}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>
      </div>

      {/* Tab Content with animations */}
      <AnimatePresence mode="wait">
        {activeTab === "Metrics" && (
          <motion.div
            key="metrics"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 md:px-6 mb-8"
          >
            <Metrics />
          </motion.div>
        )}

        {activeTab === "Orders" && (
          <motion.div
            key="orders"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 md:px-6 mb-8"
          >
            <RecentOrders />
          </motion.div>
        )}

        {activeTab === "Tables" && (
          <motion.div
            key="tables"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="px-4 md:px-6 py-4 mb-8"
          >
            <TablesUpdate />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal for "Add Table" */}
      {openModal === "table" && <Modal setIsTableModalOpen={handleCloseModal} />}
    </div>
  );
};

export default Dashboard;
