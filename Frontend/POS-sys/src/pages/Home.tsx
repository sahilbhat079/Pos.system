import React from 'react';
import Greetings from '../components/Home/Greetings';
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";
import MiniCard from '../components/Home/MiniCard';
import PopularDishes from '../components/Home/PopularDishes';
import RecentOrders from '../components/Home/RecentOrders';

const Home: React.FC = () => {
  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-y-auto flex flex-col lg:flex-row gap-3 p-4">
      {/* Left Div */}
      <div className="flex-1 lg:flex-[3] flex flex-col gap-3">
        <Greetings />
        <div className="flex flex-col md:flex-row gap-3">
          <MiniCard title="Total Earnings" icon={<BsCashCoin />} number={512} footerNum={1.6} />
          <MiniCard title="In Progress" icon={<GrInProgress />} number={16} footerNum={3.6} />
        </div>
        <RecentOrders />
      </div>

      {/* Right Div */}
      <div className="flex-1 lg:flex-[2] r">
        <PopularDishes />
      </div>
    </section>
  );
};

export default Home;