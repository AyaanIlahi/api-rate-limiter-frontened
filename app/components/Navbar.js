"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Github } from "lucide-react";
import { Linkedin } from 'lucide-react';


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Check screen size on mount & resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Mobile = screen < 768px
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-black bg-opacity-100 backdrop-blur-lg shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Sidebar Toggle Button (Left) */}
          <button
            className="p-2 bg-gray-800 text-white rounded-md focus:outline-none"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>

          {/* Logo (Right in Mobile, Center in Desktop) */}
          <Link href="/">
            <motion.h1
              whileHover={{ scale: 1.1 }}
              className="text-1xl font-bold text-white cursor-pointer"
            >
              <Image src="/logo.webp" alt="Logo" width={44} height={40} />
            </motion.h1>
          </Link>

          {/* Desktop Navigation Links (Hidden on Mobile) */}
          {!isMobile && (
            <div className="flex space-x-6">
              <Link href="/about" className="text-gray-100 hover:text-white transition"> About  </Link>
              <a href="https://github.com/AyaanIlahi" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6 text-gray-100 hover:text-white transition" />
              </a>
              <a href="https://linkedin.com/in/ayaan-elahi-777abc" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 text-blue-500 hover:text-white transition" />
              </a>
            </div>
          )}
        </div>
      </nav>

      {/* Sidebar (Full Screen) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isOpen ? "0%" : "-100%" }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 h-full w-64 bg-gray-900 shadow-lg text-white flex flex-col p-4 pt-16 z-50"
      >
        {/* Close Button */}
        <button className="absolute top-4 right-4 text-white" onClick={closeSidebar}>
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4">Navigation</h2>
        <nav className="flex flex-col space-y-3">
          <Link href="/" className="hover:text-blue-400" onClick={closeSidebar}>Home</Link>
          <Link href="/pokemon" className="hover:text-blue-400" onClick={closeSidebar}>Pokémon API</Link>
          <Link href="/unsplash" className="hover:text-blue-400" onClick={closeSidebar}>Unsplash API</Link>
          <Link href="/analytics" className="hover:text-blue-400" onClick={closeSidebar}>Analytics</Link>
          <Link href="/documentation" className="hover:text-blue-400" onClick={closeSidebar}>Documentation</Link>
          <Link href="/about" className="hover:text-blue-400" onClick={closeSidebar}>About</Link>
          <Link href="https://github.com/AyaanIlahi/api-rate-limiter-backened" target="_blank" className="hover:text-blue-400" onClick={closeSidebar}>Source Code Backened</Link>
          <Link href="https://github.com/AyaanIlahi/api-rate-limiter-frontened" target="_blank" className="hover:text-blue-400" onClick={closeSidebar}>Source Code Frontened</Link>
          <div className="flex space-x-6">
              <a href="https://github.com/AyaanIlahi" target="_blank" rel="noopener noreferrer">
              <Github className="w-6 h-6 text-gray-100 hover:text-white transition" />
              </a>
              <a href="https://linkedin.com/in/ayaan-elahi-777abc" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 text-blue-500 hover:text-white transition" />
              </a>
            </div>
        </nav>
      </motion.div>
    </>
  );
}
