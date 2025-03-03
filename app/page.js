"use client"
import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [message, setMessage] = useState("");

  const createToken = async () => {
    try {
      const res = await fetch("http://192.168.1.74:8000/createToken", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log("🔹 Server Response:", data);

      if (res.ok) {
        setMessage(data.message);
      } else {
        throw new Error(data.message || "Failed to create token.");
      }
    } catch (error) {
      setMessage(error.message || "Failed to create token. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      {/* Create Token Button */}
      <button
        onClick={createToken}
        className="px-6 py-3 mb-4 text-white bg-blue-700 rounded-lg hover:bg-blue-800 font-semibold"
      >
        Create Token
      </button>

      {/* Show API Response */}
      {message && (
        <p className="mb-6 text-lg font-semibold text-gray-900">{message}</p>
      )}

      {/* API Selection Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Pokémon API Card */}
        <Link href="/pokemon">
          <div className="p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">Pokémon API</h2>
            <p className="text-gray-800">Explore Pokémon Data</p>
          </div>
        </Link>

        {/* Unsplash API Card */}
        <Link href="/unsplash">
          <div className="p-6 bg-white rounded-lg shadow-lg cursor-pointer hover:shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">Unsplash API</h2>
            <p className="text-gray-800">Browse High-Quality Images</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
