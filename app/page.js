"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "./components/Button";
import Card from "./components/Card";
import { createToken } from "./api/createToken.js";

export default function HomePage() {
const [message, setMessage] = useState("");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-black relative text-white"
      style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for Dark Effect */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
      
      <div className="z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-white">API Rate Limiter 🚀</h1>

        {/* Using Button Component */}
        <Button onClick={() => createToken(setMessage)}>Create Token</Button>

        {message && <p className="mt-4 text-lg font-semibold text-green-400">{message}</p>}

        {/* API Selection Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
          <Card title="Pokémon API" description="5 Requests / Minute" link="/pokemon" />
          <Card title="Unsplash API" description="5 Requests / Day" link="/unsplash" />
        </div>
      </div>
    </div>
  );
}
 