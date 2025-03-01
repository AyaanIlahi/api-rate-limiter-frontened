"use client";

import axios from 'axios';
import { useState, useEffect } from "react";

export default function UnsplashPage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [lastApiDetails, setLastApiDetails] = useState(null);
  const [trendingSearches, setTrendingSearches] = useState(["Nature", "Mountains", "Cars"]);
  const [callsMade, setCallsMade] = useState(0);
  const [remainingCalls, setRemainingCalls] = useState(3); // Example limit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setTrendingSearches(["Nature", "Mountains", "Cars", "Technology", "City"]);
  }, []);

  const fetchImages = async (searchTerm) => {
    if (!searchTerm) return;
    setLoading(true);
    setError(null);
    const start = performance.now();
    try {
      const res = await fetch(`http://localhost:8000/imagesearch/${searchTerm}`);
      console.log(res);
      if (!res.ok) throw new Error("Failed to fetch images.");
      const data = await res.json();
      const end = performance.now();

      setImages(data.results);
      setLastApiDetails({
        status: res.status,
        responseTime: `${(end - start).toFixed(2)}ms`,
        url: res.url,
      });

      setCallsMade((prev) => prev + 1);
      setRemainingCalls((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      setImages([]);
      setError("Unable to fetch images. Please try again later.");
      setLastApiDetails({
        status: "Error",
        responseTime: "N/A",
        url: "Invalid request",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen p-6 bg-gray-100">
      {/* Left Section - Main Content */}
      <div className="flex flex-col items-center w-full lg:w-3/4">
        {/* Search Bar */}
        <input
          type="text"
          className="w-full p-3 border rounded-md text-gray-900"
          placeholder="Search Images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          list="unsplash-suggestions"
        />
        <datalist id="unsplash-suggestions">
          {trendingSearches.map((name, index) => (
            <option key={index} value={name} />
          ))}
        </datalist>

        {/* Search Button */}
        <button
          onClick={() => fetchImages(query)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          disabled={!query || loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>

        {/* Error Message */}
        {error && <p className="mt-2 text-red-500">{error}</p>}

        {/* Scrollable Image Grid */}
        <div className="mt-6 w-full max-h-[500px] overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.length > 0 ? (
            images.map((img, index) => (
              <img key={index} src={img.urls.small} alt={img.alt_description} className="w-full rounded-md shadow-md" />
            ))
          ) : (
            !loading && <p className="text-gray-600">No images found.</p>
          )}
        </div>
      </div>

      {/* Right Section (API Info) - Moves Below on Mobile */}
      <div className="w-full lg:w-1/4 p-4 mt-6 lg:mt-0 lg:ml-6 bg-white rounded-lg shadow-lg text-gray-900">
        <h3 className="text-lg font-bold">API Info</h3>
        <p className="mt-2 font-semibold">Calls Made: {callsMade}</p>
        <p className="font-semibold">Remaining Calls: {remainingCalls}</p>

        {/* Last API Call Details */}
        {lastApiDetails && (
          <div className="mt-4 p-4 bg-gray-200 rounded-md text-gray-900">
            <h3 className="text-lg font-bold">Last API Call</h3>
            <p>Status: <span className="font-semibold">{lastApiDetails.status}</span></p>
            <p>Response Time: <span className="font-semibold">{lastApiDetails.responseTime}</span></p>
            <p>URL: <a href={lastApiDetails.url} className="text-blue-600">{lastApiDetails.url}</a></p>
          </div>
        )}
      </div>
    </div>
  );
}
