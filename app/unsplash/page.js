"use client";
import { motion } from "framer-motion";
import axios from 'axios';
import { useState, useEffect,useRef } from "react";
import SearchBar from "../components/SearchBar";

export default function UnsplashPage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [lastApiDetails, setLastApiDetails] = useState({totalRequests:0});
  const [trendingSearches, setTrendingSearches] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    setTrendingSearches(["Spiderman", "Marine Life", "Cars", "Logos", "Parrots",]);
  }, []);
  useEffect(() => {
    const savedApiDetails = localStorage.getItem("unsplApiDetails");
    if (savedApiDetails) {
      setLastApiDetails(JSON.parse(savedApiDetails));
    } 
  }, []);
  // Scroll to top whenever images update
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0; // Reset scroll position to top
    }
  }, [images]);
  const fetchImages = async (searchTerm) => {
    if (!searchTerm) return;
    setLoading(true);
    setError(null);
    const start = performance.now();
    console.log(`searching: ${searchTerm}`)
    try {
      const response = await axios.get(`http://192.168.1.74:8000/imagesearch/${searchTerm}`, {
          withCredentials: true,
      });
      const {data ,totalRequests} = response.data;  
      if (!data.results) throw new Error("Failed to fetch images.");
      const end = performance.now();
      const newApiDetails = {
        status: response.status,
        responseTime: `${(end - start).toFixed(2)}ms`,
        url: response.config.url,
        totalRequests: totalRequests,
      };
      setImages(data.results);
      setLastApiDetails(newApiDetails);
      localStorage.setItem("unsplApiDetails", JSON.stringify(newApiDetails));
    } catch (error) {
    if (error.response) {
        setError(error.response.data.message); 
    } else {
        setError("Unable to fetch images. Please try again later.");
    }

    setLastApiDetails({
        status: error.response?.status || "Error",
        responseTime: "N/A",
        url: "Invalid request",
        totalRequests: lastApiDetails.totalRequests||0,
    });

    setImages([]);
}finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row min-h-screen p-6 relative"
      style={{
        backgroundImage: "url('/backgroundUnsplash.jpg')", // Add your background image here
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay for Better Visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Left Section - Main Content */}
      <div className="flex flex-col items-center w-full lg:w-3/4 relative z-10">
        <SearchBar 
          query={query} 
          setQuery={setQuery} 
          fetchResults={fetchImages} 
          loading={loading} 
          suggestions={trendingSearches} 
        />
        {/* Error Message */}
        {error && <p className="mt-10 text-3xl text-yellow-400">{error}</p>}

        {/* Scrollable Image Grid */}
        <div 
        ref={containerRef} 
        className="mt-6 w-full max-h-[500px] overflow-y-scroll grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-black bg-opacity-30 rounded-lg">
          {images.length > 0 ? (
            images.map((img, index) => (
              <motion.img
                key={index}
                src={img.urls.small}
                alt={img.alt_description}
                className="w-full rounded-md shadow-md transition-transform duration-300 hover:scale-105"
                whileHover={{ scale: 1.1 }}
              />
            ))
          ) : (
            !loading && <p className="text-gray-200 text-lg">No images found.</p>
          )}
        </div>
      </div>

      {/* Right Section - API Info */}
      <motion.div
        className="w-full lg:w-1/4 p-6 mt-6 lg:mt-0 lg:ml-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg text-white relative z-10"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-lg font-bold">📡 API Info</h3>
        <p className="mt-2 font-semibold">Requests: {lastApiDetails.totalRequests} /5</p>

        {/* Last API Call Details */}
        {lastApiDetails && (
          <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-md text-white shadow-md">
            <h3 className="text-lg font-bold">Last API Call</h3>
            <p>Status: <span className="font-semibold">{lastApiDetails.status}</span></p>
            <p>Response Time: <span className="font-semibold">{lastApiDetails.responseTime}</span></p>
            <p>URL: <a href={lastApiDetails.url} className="text-blue-400 underline break-all">{lastApiDetails.url}</a></p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
