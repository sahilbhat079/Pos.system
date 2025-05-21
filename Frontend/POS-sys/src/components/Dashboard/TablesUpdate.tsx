import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getTables, updateTable, deleteTable } from "../../https/index";

export interface Table {
  _id: string;
  tableNo: number;
  status?: string;
}

const statusColors: Record<string, string> = {
  Available: "bg-green-600",
  Booked: "bg-red-600",
  Reserved: "bg-yellow-500",
};

const TableManager: React.FC = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<{ data: Table[] }>({
    queryKey: ["tables"],
    queryFn: getTables,
  });

  const tableMutation = useMutation({
    mutationFn: (updateData: { tableId: string } & Partial<Table>) =>
      updateTable(updateData),
    onSuccess: () => {
      enqueueSnackbar("Table updated successfully", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
    onError: () => {
      enqueueSnackbar("Failed to update table", { variant: "error" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (tableId: string) => deleteTable(tableId),
    onSuccess: () => {
      enqueueSnackbar("Table deleted successfully", { variant: "success" });
      queryClient.invalidateQueries({ queryKey: ["tables"] });
    },
    onError: () => {
      enqueueSnackbar("Failed to delete table", { variant: "error" });
    },
  });

  const handleChange = (
    tableId: string,
    field: keyof Table,
    value: string | number
  ) => {
    tableMutation.mutate({
      tableId,
      [field]: value,
    });
  };

  const handleDelete = (tableId: string) => {
    if (confirm("Are you sure you want to delete this table?")) {
      deleteMutation.mutate(tableId);
    }
  };

  if (isLoading) return <p className="text-white p-4">Loading tables...</p>;
  if (isError) return <p className="text-red-500 p-4">Failed to load tables.</p>;

  return (
<div className="bg-[#1f1f1f] p-6 rounded-xl shadow-md">
  <h2 className="text-white text-2xl font-bold mb-6">Table Management</h2>

  {/* SCROLLABLE CONTAINER */}
  <div className="overflow-x-auto">
    <div className="max-h-[400px] overflow-y-auto rounded-lg border border-[#2e2e2e]">
      <table className="w-full min-w-[600px] text-left text-white">
        <thead className="bg-[#2e2e2e] text-gray-300 sticky top-0 z-10">
          <tr>
            <th className="p-3">Table No</th>
            <th className="p-3">Status</th>
            <th className="p-3">Change Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((table) => (
            <tr
              key={table._id}
              className="border-b border-gray-700 hover:bg-[#2a2a2a] transition-colors"
            >
              <td className="p-3 font-medium">{table.tableNo}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-sm font-semibold text-white ${
                    statusColors[table.status || "Available"]
                  }`}
                >
                  {table.status || "Available"}
                </span>
              </td>
              <td className="p-3">
                <select
                  value={table.status || "Available"}
                  onChange={(e) =>
                    handleChange(table._id, "status", e.target.value)
                  }
                  className="px-2 py-1 rounded-md bg-[#121212] text-white border border-gray-600 focus:outline-none"
                >
                  <option value="Available">Available</option>
                  <option value="Booked">Booked</option>
                  <option value="Reserved">Reserved</option>
                </select>
              </td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(table._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
  );
};

export default TableManager;
