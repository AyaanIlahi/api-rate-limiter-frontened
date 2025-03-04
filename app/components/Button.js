"use client";
import { motion } from "framer-motion";

export default function Button({ onClick, children }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 font-semibold transition duration-300 shadow-lg"
    >
      {children}
    </motion.button>
  );
}
