import React, { useState, useEffect } from "react";
import BottomNav from "../components/Shared/BottomNav";
import BackButton from "../components/Shared/BackButton";
import TableCard from "../components/Table/TableCard";

// Table Interface
interface Table {
  id: string;
  name: string;
  status: "Available" | "Booked";
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
  const [status, setStatus] = useState<"all" | "booked">("all");

  useEffect(() => {
    document.title = "POS | Tables";
  }, []);

  // Filter Tables Based on Status
  const filteredTables: Table[] =
    status === "all" ? tables : tables.filter((table) => table.status === "Booked");

  return (
    <section className="bg-[#1f1f1f] h-[calc(100vh-5rem)] overflow-hidden">
      {/* Header Section */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-[#f5f5f5] text-2xl font-bold tracking-wide">
            Tables
          </h1>
        </div>
        {/* Status Filters */}
        <div className="flex gap-4">
          <button
            onClick={() => setStatus("all")}
            className={`text-[#ababab] text-lg px-5 py-2 font-semibold transition-all 
              ${status === "all" ? "bg-[#383838] text-white rounded-lg" : ""}`}
          >
            All
          </button>
          <button
            onClick={() => setStatus("booked")}
            className={`text-[#ababab] text-lg px-5 py-2 font-semibold transition-all 
              ${status === "booked" ? "bg-[#383838] text-white rounded-lg" : ""}`}
          >
            Booked
          </button>
        </div>
      </div>

      {/* Tables Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 px-10 py-6 overflow-y-auto max-h-[70vh] scrollbar-hide">
        {filteredTables.map((table) => (
          <TableCard
            key={table.id}
            id={table.id}
            name={table.name}
            status={table.status}
            initials={table.initials}
            seats={table.seats}
          />
        ))}
      </div>

      <BottomNav />
    </section>
  );
};

export default Tables;
