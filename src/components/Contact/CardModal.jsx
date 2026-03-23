import React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import LuxuryBusinessCard from "./LuxuryBusinessCard";

const CardModal = ({ isOpen, onClose }) => {
  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={onClose}
        >
          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-lg w-full"
            onClick={(e) => e.stopPropagation()} // Prevent close on card click
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-4 text-white hover:text-amber-400 transition-colors p-2 rounded-full bg-white/10 border border-white/20"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* 3D Card */}
            <LuxuryBusinessCard />

            {/* Hint text */}
            <p className="text-center text-amber-200/60 text-xs mt-4 tracking-wider">
              Click to Flip • Hover to Tilt
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (typeof window === "undefined") return null;
  return createPortal(modalContent, document.body);
};

export default CardModal;
