import React, { useState, useEffect } from "react";
import { MdTableBar, MdCategory } from "react-icons/md";
import { BiSolidDish } from "react-icons/bi";
import Metrics from "../components/Dashboard/Metrics";

// Define types for buttons and tabs
type ButtonConfig = {
  label: string;
  icon: React.JSX.Element;
  action: string;
};

type TabConfig = string;

// Define props for ActionButton and TabButton components
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

// Mock data for buttons and tabs
const buttons: ButtonConfig[] = [
  { label: "Add Table", icon: <MdTableBar />, action: "table" },
  { label: "Add Category", icon: <MdCategory />, action: "category" },
  { label: "Add Dishes", icon: <BiSolidDish />, action: "dishes" },
];

const tabs: TabConfig[] = ["Metrics", "Orders", "Payments"];

// ActionButton component
const ActionButton: React.FC<ActionButtonProps> = ({ label, icon, onClick }) => (
  <button
    aria-label={label}
    className="bg-[#1a1a1a] hover:bg-[#262626] px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2"
    onClick={onClick}
  >
    {label} {icon}
  </button>
);

// TabButton component
const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => (
  <button
    className={`
      px-8 py-3 rounded-lg text-[#f5f5f5] font-semibold text-md flex items-center gap-2 ${
        isActive ? "bg-[#262626]" : "bg-[#1a1a1a] hover:bg-[#262626]"
      }`}
    onClick={onClick}
  >
    {label}
  </button>
);

// Main Dashboard component
const Dashboard: React.FC = () => {
  // State for modal and active tab
  const [isTableModalOpen, setIsTableModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<TabConfig>("Metrics");

  // Set document title on mount
  useEffect(() => {
    document.title = "POS | Admin Dashboard";
  }, []);

  // Handle opening modal based on action
  const handleOpenModal = (action: string) => {
    if (action === "table") setIsTableModalOpen(true);
    // Add other conditions for different modals if needed
  };

  return (
    <div className="bg-[#1f1f1f] h-[calc(100vh-5rem)]">
  <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-6 px-4 md:px-6">
    {/* Action Buttons */}
    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
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

  {/* Tab Content */}
   {activeTab === "Metrics" && <Metrics />}
  {/* {activeTab === "Orders" && <RecentOrders />}  */}
  {activeTab === "Payments" && (
    <div className="text-white p-4 md:p-6 container mx-auto">
      Payment Component Coming Soon
    </div>
  )}

  {/* Modal */}
  {/* {isTableModalOpen && <Modal setIsTableModalOpen={setIsTableModalOpen} />} */}
</div>
  );
};

export default Dashboard;