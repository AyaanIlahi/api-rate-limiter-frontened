"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SearchBar from "../components/SearchBar";

export default function PokemonPage() {
  const [query, setQuery] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [lastApiDetails, setLastApiDetails] = useState(null);
  const [trendingPokemon, setTrendingPokemon] = useState([]);
  const [callsMade, setCallsMade] = useState(0);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTrendingPokemon(["Pikachu", "Charizard", "Bulbasaur"]);
  }, []);

  const fetchPokemon = async (name) => {
    if (!name) return;

    setMessage("");
    setLoading(true);
    const start = performance.now();

    try {
      const res = await fetch(`http://192.168.1.74:8000/pokemon/${name.toLowerCase()}`, {
        method: "GET",
        credentials: "include",
      });
      const end = performance.now();

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        throw new Error("Unexpected server response.");
      }

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch Pokémon.");
      }

      setCallsMade((prev) => prev + 1);
      setPokemonData(data);
      setLastApiDetails({
        status: res.status,
        responseTime: `${(end - start).toFixed(2)}ms`,
        url: res.url,
      });
    } catch (error) {
      setPokemonData(null);
      setMessage(error.message);
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
    <div
      className="min-h-screen flex flex-col lg:flex-row bg-cover bg-center p-6 relative"
      style={{ backgroundImage: "url('/backgroundPokemon.jpg')" }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>

      {/* Left Section */}
      <div className="flex flex-col items-center w-full lg:w-3/4 relative z-10">
        <SearchBar 
          query={query} 
          setQuery={setQuery} 
          fetchResults={fetchPokemon} 
          loading={loading} 
          suggestions={trendingPokemon} 
        />
        
        {message && <p className="mt-10 text-3xl font-bold text-yellow-400">{message}</p>}

        {pokemonData && (
          <motion.div 
            className="w-full max-w-2xl mt-6 p-6 bg-white bg-opacity-20 backdrop-blur-lg shadow-lg rounded-lg text-white"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold">{pokemonData.name.toUpperCase()}</h2>
            <img src={pokemonData.image} alt={pokemonData.name} className="mx-auto w-48 h-48" />
            <p className="mt-4 text-lg font-semibold">Type: {pokemonData.type.join(", ")}</p>
            <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-md text-white max-h-64 overflow-y-auto">
              <h3 className="text-lg font-bold mt-4">Abilities:</h3>
              <ul className="list-disc ml-5">
                {pokemonData.abilities.map((ability, index) => (
                  <li key={index}><span className="font-bold">{ability.name}:</span> {ability.effect}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </div>

      {/* Right Section - API Info */}
      <motion.div
        className="w-full lg:w-1/4 p-6 mt-6 lg:mt-0 lg:ml-6 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-lg text-white relative z-10"
        whileHover={{ scale: 1.05 }}
      >
        <h3 className="text-lg font-bold">📡 API Info</h3>
        <p className="mt-2 font-semibold">Requests: {callsMade}/4</p>

        {lastApiDetails && (
          <div className="mt-4 p-4 bg-white bg-opacity-20 rounded-md text-white shadow-md">
            <h3 className="text-lg font-bold">Last API Call</h3>
            <p>Status: <span className="font-semibold">{lastApiDetails.status}</span></p>
            <p>Response Time: <span className="font-semibold">{lastApiDetails.responseTime}</span></p>
            <p>URL: <a href={lastApiDetails.url} className="text-blue-400 underline">{lastApiDetails.url}</a></p>
          </div>
        )}
      </motion.div>
    </div>
  );  
}
