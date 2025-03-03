"use client";

import { useState, useEffect } from "react";

export default function PokemonPage() {
  const [query, setQuery] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [lastApiDetails, setLastApiDetails] = useState(null);
  const [trendingPokemon, setTrendingPokemon] = useState([]);
  const [callsMade, setCallsMade] = useState(0);
  const [remainingCalls, setRemainingCalls] = useState(3); // Example limit
  const [message, setMessage] = useState(""); // ✅ Error message state
  const [loading, setLoading] = useState(false); // ✅ Added loading state


  useEffect(() => {
    // Fetch trending Pokémon names from Redis (mocked for now)
    setTrendingPokemon(["Pikachu", "Charizard", "Bulbasaur"]);
  }, []);

  const fetchPokemon = async (name) => {
    if (!name) return;
    
    setMessage(""); // Reset error messages
    setLoading(true); // ✅ Start loading
    const start = performance.now();

    try {
      const res = await fetch(`http://192.168.1.74:8000/pokemon/${name.toLowerCase()}`, {
        method: "GET",
        credentials: "include", // ✅ Includes cookies for authentication
      });
  
      const end = performance.now();
      
      // Handle non-JSON errors (like 403 Forbidden)
      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        throw new Error("Unexpected server response.");
      }
  
      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch Pokémon.");
      }
  
      setPokemonData(data);
      setLastApiDetails({
        status: res.status,
        responseTime: `${(end - start).toFixed(2)}ms`,
        url: res.url,
      });
  
      setCallsMade((prev) => prev + 1);
      setRemainingCalls((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error("❌ Fetch Error:", error.message);
      setPokemonData(null);
      setMessage(error.message); // ✅ Display error messages correctly
      setLastApiDetails({
        status: "Error",
        responseTime: "N/A",
        url: "Invalid request",
      });
    }
    finally {
      setLoading(false); // ✅ Stop loading after fetching
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-start min-h-screen p-6 bg-gray-100">
      
      {/* Left Section (Search + Pokémon Info) */}
      <div className="flex-1 flex flex-col items-center w-full lg:w-3/4">
        {/* Search Bar */}
        <input
          type="text"
          className="w-full max-w-md p-3 border rounded-md text-gray-900"
          placeholder="Search Pokémon..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          list="pokemon-suggestions"
        />
        <datalist id="pokemon-suggestions">
          {trendingPokemon.map((name, index) => (
            <option key={index} value={name} />
          ))}
        </datalist>
  
        {/* Search Button */}
        <button
          onClick={() => fetchPokemon(query)}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Loading..." : "Search"}
        </button>
  
        {/* API Error Message */}
        {message && <p className="mt-4 text-lg font-semibold text-red-600">{message}</p>}
  
        {/* Pokémon Data Display */}
        {pokemonData && (
          <div className="w-full max-w-2xl mt-6 p-6 bg-white shadow-lg rounded-lg text-gray-900">
            {/* Pokémon Image */}
            <img
              src={pokemonData.image}
              alt={pokemonData.name}
              className="mx-auto w-48 h-48"
            />
  
            {/* Pokémon Type */}
            <p className="mt-4 text-lg font-semibold">Type: {pokemonData.type.join(", ")}</p>
  
            {/* Scrollable Details Section */}
            <div className="mt-4 p-4 bg-gray-200 rounded-md text-gray-900 max-h-64 overflow-y-auto">
              <h2 className="text-2xl font-bold">{pokemonData.name.toUpperCase()}</h2>
  
              {/* Abilities Section */}
              <div className="mt-4 text-left">
                <h3 className="text-lg font-bold">Abilities:</h3>
                <ul className="list-disc ml-5">
                  {pokemonData.abilities.map((ability, index) => (
                    <li key={index}>
                      <span className="font-semibold">{ability.name}:</span> {ability.effect}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
  
      {/* Right Section (API Info) - Moves Below on Mobile */}
      <div className="w-full lg:w-1/4 p-4 mt-6 lg:mt-0 lg:ml-6 bg-white rounded-lg shadow-lg text-gray-900">
        <h3 className="text-lg font-bold">API Info</h3>
        <p className="mt-2 font-semibold">Requests: {callsMade}/4</p>
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
