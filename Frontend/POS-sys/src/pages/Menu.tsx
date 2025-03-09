import React, { Suspense } from "react";
import BackButton from "../components/Shared/BackButton";
import { MdRestaurantMenu } from "react-icons/md";

// Lazy-loaded components
const MenuContainer = React.lazy(() => import("../components/Menu/MenuContainer"));
const CustomerInfo = React.lazy(() => import("../components/Menu/CustomerInfo"));
const CartInfo = React.lazy(() => import("../components/Menu/CartInfo"));
const Bill = React.lazy(() => import("../components/Menu/Bill"));

const Menu: React.FC = () => {
  React.useEffect(() => {
    document.title = "POS | Menu";
  }, []);

  return (
    <section className="bg-[#1f1f1f] min-h-[calc(100vh-5rem)] flex flex-col lg:flex-row gap-3 p-2 sm:p-4">
      {/* Left Side - Menu Section */}
      <div className="flex-1 lg:flex-[3] w-full lg:w-auto">
        <div className="flex items-center justify-between px-4 sm:px-10 py-3 sm:py-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <BackButton />
            <h1 className="text-[#f5f5f5] text-xl sm:text-2xl font-bold tracking-wider">
              Menu
            </h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
              <MdRestaurantMenu className="text-[#f5f5f5] text-3xl sm:text-4xl" />
              <div className="flex flex-col items-start">
                <h1 className="text-sm sm:text-md text-[#f5f5f5] font-semibold tracking-wide">
                  {false || "Customer Name"}
                </h1>
                <p className="text-xs text-[#ababab] font-medium">
                  Table: {false || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
        <Suspense fallback={<div className="text-[#f5f5f5]">Loading Menu...</div>}>
          <MenuContainer />
        </Suspense>
      </div>

      {/* Right Side - Customer Info, Cart, and Bill Section */}
      <div className="flex-1 lg:w-[30%] bg-[#1a1a1a] rounded-lg p-3 sm:pt-4 sm:pr-3 overflow-y-auto custom-scrollbar" 
      style={{ maxHeight: "calc(100vh - 10rem)" }}> 
        <Suspense fallback={<div className="text-[#f5f5f5]">Loading Customer Info...</div>}>
          <CustomerInfo />
        </Suspense>
        <hr className="border-[#2a2a2a] border-t-2 my-2" />
        <Suspense fallback={<div className="text-[#f5f5f5]">Loading Cart...</div>}>
          <CartInfo />
        </Suspense>
        <hr className="border-[#2a2a2a] border-t-2 my-2" />
        <Suspense fallback={<div className="text-[#f5f5f5]">Loading Bill...</div>}>
          <Bill />
        </Suspense>
      </div>
    </section>
  );
};

export default Menu;