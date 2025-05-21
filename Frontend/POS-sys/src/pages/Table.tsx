import React, { useState, useEffect } from "react";
import BottomNav from "../components/Shared/BottomNav";
import BackButton from "../components/Shared/BackButton";
import TableCard from "../components/Table/TableCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getTables } from "../https/index";
import { enqueueSnackbar } from "notistack";

// Table Interface
interface Table {
  id: string;
  name: string;
  status: "Available" | "Booked" |String;
  initials: string;
  seats: number;
}

// Dummy Table Data
const tables: Table[] = [
  { id: "1", name: "A1", status: "Available", initials: "Sahil", seats: 4 },
  { id: "2", name: "A2", status: "Booked", initials: "Mehak", seats: 2 },
  { id: "3", name: "B1", status: "Available", initials: "Ali", seats: 6 },
  { id: "4", name: "B2", status: "Booked", initials: "Zoya", seats: 4 },
  { id: "5", name: "C1", status: "Available", initials: "Sadiya", seats: 2 },
];

const Tables: React.FC = () => {
    const [status, setStatus] = useState("all");

    useEffect(() => {
      document.title = "POS | Tables"
    }, [])

  const { data: resData, isError } = useQuery({
    queryKey: ["tables"],
    queryFn: async () => {
      return await getTables();
    },
    placeholderData: keepPreviousData,
  });

  if(isError) {
    enqueueSnackbar("Something went wrong!", { variant: "error" })
  }
  // Filter tables based on status
  const filteredTables =
    status === "all"
      ? resData?.data || []
      : resData?.data?.filter((table: any) => table.status === status) || [];


  return (
    
   <section className="bg-[#1f1f1f]  h-[calc(100vh-5rem)] overflow-hidden ">
      <div className="flex items-center justify-between px-10 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wider">
            Tables
          </h1>
        </div>
        <div className="flex items-center justify-around gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg ${
              status === "all" && "bg-[#383838] rounded-lg px-5 py-2"
            }  rounded-lg px-5 py-2 font-semibold`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("Booked")}
            className={`text-[#ababab] text-lg ${
              status === "booked" && "bg-[#383838] rounded-lg px-5 py-2"
            }  rounded-lg px-5 py-2 font-semibold`}
          >
            Booked
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 px-16 py-4 h-[650px]  scrollbar-hide  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  overflow-y-auto max-h-[70vh] scrollbar-hide ">
        {filteredTables.map((table:any) => {
          return (
            <TableCard
              id={table._id}
              key={table._id}
              name={table.tableNo}
              status={table.status}
              initials={table?.currentOrder?.customerDetails.name}
              seats={table.seats}
            />
          );
        })}
      </div>

      <BottomNav />
    </section>
















  );
};

export default Tables;
