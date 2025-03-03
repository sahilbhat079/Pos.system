import React, { ReactNode, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      dialogRef.current?.showModal();
    } else {
      setTimeout(() => {
        setShouldRender(false);
        dialogRef.current?.close();
      }, 300); // Delay closing to allow exit animation
    }
  }, [isOpen]);

  if (!shouldRender) return null;

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 flex items-center justify-center w-full h-full bg-black/50 backdrop-blur-sm"
      onCancel={onClose} // Handles ESC key
      onClick={(e) => e.target === dialogRef.current && onClose()} // Close on background click
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="bg-[#1a1a1a] rounded-lg shadow-lg w-full max-w-lg p-6"
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#333] pb-4">
              <h2 className="text-xl text-[#f5f5f5] font-semibold">{title}</h2>
              <button className="text-gray-500 text-2xl hover:text-gray-800" onClick={onClose}>
                &times;
              </button>
            </div>

            {/* Modal Content */}
            <div className="mt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </dialog>
  );
};

export default Modal;
