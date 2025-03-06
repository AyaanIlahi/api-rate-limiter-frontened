"use client";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function Button({ onClick, children, loading }) {
  return (
    <motion.button
    onClick={onClick}
    whileHover={{ scale: !loading ? 1.1 : 1 }}
    whileTap={{ scale: !loading ? 0.95 : 1 }}
    disabled={loading}
    className="px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 
               font-semibold transition duration-300 shadow-lg disabled:opacity-50 flex items-center justify-center"
  >
    {loading ? <Loader2 size={22} className="animate-spin" /> : children}
    </motion.button>
  );
}
