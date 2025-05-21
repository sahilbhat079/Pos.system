import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { BsCashCoin } from "react-icons/bs";
import { GrInProgress } from "react-icons/gr";

import Greetings from '../components/Home/Greetings';
import MiniCard from '../components/Home/MiniCard';
import PopularDishes from '../components/Home/PopularDishes';
import RecentOrders from '../components/Home/RecentOrders';
import BottomNav from '../components/Shared/BottomNav';
import { monthlyEarning } from '../https/index';

const Home: React.FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['monthly-earnings'],
    queryFn: monthlyEarning,
  });

  console.log(data);

  const totalEarnings = data?.totalEarnings || 0;

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-y-auto flex flex-col lg:flex-row gap-3 p-4">
      {/* Left Div */}
      <div className="flex-1 lg:flex-[3] flex flex-col gap-2">
        <Greetings />
        <div className="flex flex-col mx-2 md:flex-row gap-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full md:w-1/2"
          >
            <MiniCard
              title="Total Earnings"
              icon={<BsCashCoin />}
              number={isLoading ? 0 : totalEarnings}
              footerNum={1.6}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <MiniCard
              title="In Progress"
              icon={<GrInProgress />}
              number={16}
              footerNum={3.6}
            />
          </motion.div>
        </div>
        <RecentOrders />
      </div>

      {/* Right Div */}
      <div className="flex-1 lg:flex-[2]">
        <PopularDishes />
      </div>

      <BottomNav />
    </section>
  );
};

export default Home;
