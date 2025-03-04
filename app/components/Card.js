"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Card({ title, description, link }) {
  return (
    <Link href={link}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg cursor-pointer hover:bg-opacity-20 transition duration-300 border border-white border-opacity-20"
      >
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <p className="text-gray-300">{description}</p>
      </motion.div>
    </Link>
  );
}
