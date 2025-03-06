"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Button from "./components/Button";
import Card from "./components/Card";
import { createToken } from "./api/createToken.js";

export default function HomePage() {
const [message, setMessage] = useState("");
const [loading, setLoading] = useState(false);

  return (
    <div
  className="flex flex-col items-center justify-start h-screen sm:min-h-screen p-4 bg-black relative text-white
              sm:justify-center sm:mt-0 relative"
  style={{
    backgroundImage: "url('/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "top", // Keeps content aligned properly
    backgroundAttachment: "fixed", // Prevents background from resizing on scroll
  }}
>
  {/* Overlay for Dark Effect */}
  <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

  <div className="z-10 flex flex-col items-center w-full max-w-2xl">
    <h1 className="text-4xl font-bold mb-4 text-white text-center">API Rate Limiter 🖥️</h1>

    {/* Notice Message */}
    <p className="text-sm text-yellow-400 bg-yellow-900 bg-opacity-60 px-4 py-2 rounded-md mb-4 text-center">
      ⚠️ The **FIRST request** might take **up to 40 seconds** to respond.Due to Render's free tier policy
    </p>

    {/* Using Button Component */}
    <Button onClick={() => createToken(setMessage, setLoading)} loading={loading}>
      Create Token
    </Button>
    {message && <p className="mt-4 text-lg font-semibold text-green-400">{message}</p>}

    {/* API Selection Cards */}
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6 w-full">
      <Card title="Pokémon API" description="5 Requests / Minute" link="/pokemon" />
      <Card title="Unsplash API" description="5 Requests / Day" link="/unsplash" />
    </div>
  </div>
</div>


  );
}
 