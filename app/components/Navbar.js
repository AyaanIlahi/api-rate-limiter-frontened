"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full bg-black bg-opacity-100 backdrop-blur-lg shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <motion.h1
            whileHover={{ scale: 1.1 }}
            className="text-1xl font-bold text-white cursor-pointer"
          >
            <Image src="/logo.png" alt="Logo" width={30} height={30} />
          </motion.h1>
        </Link>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link href="/pokemon" className="text-gray-300 hover:text-white transition">Pokémon API</Link>
          <Link href="/unsplash" className="text-gray-300 hover:text-white transition">Unsplash API</Link>
        </div>
      </div>
    </nav>
  );
}