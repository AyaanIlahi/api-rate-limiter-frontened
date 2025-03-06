"use client";
import { useState, useEffect } from "react";
import { Search ,Loader2} from "lucide-react";

export default function SearchBar({ query, setQuery, fetchResults, loading, suggestions }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // Mobile if width < 640px
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && query) {
      fetchResults(query);
      setShowSuggestions(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Search Bar Container */}
      <div className="flex">
        {/* Search Input*/}
        <input
          type="text" 
          className="w-full p-3 pl-4 pr-14 border border-gray-300 rounded-l-md text-gray-900 shadow-lg bg-white 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Search..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          list={isMobile ? "mobileSuggestions" : undefined}
        />

        {/* Search Button */}
        <button
          onClick={() => {
            fetchResults(query);
            setShowSuggestions(false); // Hide suggestions when clicked
          }}
          disabled={!query || loading}
          className="w-12 flex items-center justify-center 
                    bg-gray-800 hover:bg-gray-900 transition text-white rounded-r-md disabled:opacity-50"
        >
          {loading ? (
            <Loader2 size={22} className="animate-spin" /> // Add a loading spinner
          ) : (
            <Search size={22} />
          )}
        </button>
      </div>

      {/* Mobile Suggestions (Show in Keyboard Panel) */}
      {isMobile && (
        <datalist id="mobileSuggestions">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
      )}

      {/* Desktop Suggestions (Width Limited to Search Input) */}
      {!isMobile && showSuggestions && suggestions.length > 0 && (
        <div className="absolute left-0 w-[calc(100%-3rem)] bg-white border rounded-md shadow-lg mt-1 z-50">
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
