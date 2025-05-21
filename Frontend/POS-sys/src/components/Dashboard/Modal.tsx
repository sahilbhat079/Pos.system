import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTable } from "../../https/index";
import { enqueueSnackbar } from "notistack";

interface ModalProps {
  setIsTableModalOpen: (isOpen: boolean) => void;
}

interface TableFormData {
  tableNo: string;
  seats: string;
}

const Modal: React.FC<ModalProps> = ({ setIsTableModalOpen }) => {
  const [tableData, setTableData] = useState<TableFormData>({
    tableNo: "",
    seats: "",
  });

  const queryClient = useQueryClient();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTableData((prev) => ({ ...prev, [name]: value }));
  };

  const tableMutation = useMutation({
    mutationFn: async (reqData: { tableNo: number; seats: number }) => await addTable(reqData),
    onSuccess: (res: any) => {
      enqueueSnackbar(res.message || "Table added successfully!", { variant: "success" });
      setIsTableModalOpen(false);
      queryClient.invalidateQueries({ queryKey: ['tables'] }); // Refresh your tables list
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.error?.message || "Something went wrong. Try again.";
      enqueueSnackbar(message, { variant: "error" });
      console.error(error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tableData.tableNo || !tableData.seats) {
      enqueueSnackbar("All fields are required!", { variant: "warning" });
      return;
    }

    const tableNoNum = Number(tableData.tableNo);
    const seatsNum = Number(tableData.seats);

    if (isNaN(tableNoNum) || isNaN(seatsNum)) {
      enqueueSnackbar("Please enter valid numbers!", { variant: "error" });
      return;
    }

    if (tableNoNum <= 0 || seatsNum <= 0) {
      enqueueSnackbar("Values must be greater than zero!", { variant: "warning" });
      return;
    }

    tableMutation.mutate({ tableNo: tableNoNum, seats: seatsNum });
  };

  const handleCloseModal = () => {
    setIsTableModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-[#262626] p-6 rounded-lg shadow-lg w-96"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#f5f5f5] text-xl font-semibold">Add Table</h2>
          <button
            onClick={handleCloseModal}
            className="text-[#f5f5f5] hover:text-red-500"
            aria-label="Close modal"
          >
            <IoMdClose size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          <div>
            <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
              Table Number
            </label>
            <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
              <input
                type="number"
                name="tableNo"
                value={tableData.tableNo}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[#ababab] mb-2 mt-3 text-sm font-medium">
              Number of Seats
            </label>
            <div className="flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]">
              <input
                type="number"
                name="seats"
                value={tableData.seats}
                onChange={handleInputChange}
                className="bg-transparent flex-1 text-white focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg mt-10 mb-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold disabled:opacity-60"
            disabled={tableMutation.isPending}
          >
            {tableMutation.isPending ? "Adding..." : "Add Table"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Modal;
