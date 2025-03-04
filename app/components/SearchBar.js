"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react"; // Using Lucide React for icons

export default function SearchBar({ query, setQuery, fetchResults, loading, suggestions }) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query) {
      fetchResults(query);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search Input */}
      <motion.input
        type="text"
        className="w-full p-3 pr-12 border rounded-md text-gray-900 shadow-lg bg-white 
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onKeyDown={handleKeyDown} // 🔥 Trigger on Enter key
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Hide suggestions on blur
        whileFocus={{ scale: 1.05 }}
      />

      {/* Search Button (inside input) */}
      <button
        onClick={() => fetchResults(query)}
        disabled={!query || loading}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 
                   text-gray-500 hover:text-blue-600 transition disabled:opacity-50"
      >
        <Search size={24} />
      </button>

      {/* Suggestions Box (Full Width) */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute w-full bg-white border rounded-md shadow-lg mt-2 z-50">
          {suggestions.map((suggestion, index) => (
            <p
              key={index}
              className="p-3 cursor-pointer hover:bg-gray-100 text-gray-900"
              onClick={() => {
                setQuery(suggestion);
                fetchResults(suggestion);
                setShowSuggestions(false);
              }}
            >
              {suggestion}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
