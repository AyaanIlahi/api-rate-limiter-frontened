"use client"; // Needed for API interactions

import { useState, useEffect } from "react";

export default function PokemonPage() {
  const [query, setQuery] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [lastApiDetails, setLastApiDetails] = useState(null);
  const [trendingPokemon, setTrendingPokemon] = useState([]);
  const [callsMade, setCallsMade] = useState(0);
  const [remainingCalls, setRemainingCalls] = useState(3); // Example limit
  const [message, setMessage] = useState(""); // ✅ Error message state

  useEffect(() => {
    // Fetch trending Pokémon names from Redis (mocked for now)
    setTrendingPokemon(["Pikachu", "Charizard", "Bulbasaur"]);
  }, []);

  const fetchPokemon = async (name) => {
    if (!name) return;
    
    setMessage(""); // Reset error messages
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
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 bg-gray-100">
      
      {/* Top Cards - Calls Made & Remaining */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="p-4 bg-white shadow-lg rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-900">Requests</h3>
          <p className="text-2xl font-bold text-gray-900">{callsMade}/4</p>
        </div>
        <div className="p-4 bg-white shadow-lg rounded-lg text-center">
          <h3 className="text-xl font-semibold text-gray-900">Remaining Calls</h3>
          <p className="text-2xl font-bold text-gray-900">{remainingCalls}</p>
        </div>
      </div>
      {/* Error Message */}
        {message && (
          <div className="mt-4 p-3 bg-red-500 text-white rounded-md">
            <p>{message}</p>
          </div>
        )}
      {/* API Result Screen */}
      <div className="w-full max-w-2xl p-6 bg-black shadow-xl rounded-lg text-center">
        {/* Search Bar */}
        <input
          type="text"
          className="w-full p-3 border rounded-md text-gray-900"
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
          Search
        </button>

        {/* API Error Message */}
        {message && (
          <p className="mt-4 text-lg font-semibold text-red-600">{message}</p>
        )}

        {/* API Response Data */}
        {pokemonData && (
          <div className="mt-4 p-4 bg-gray-200 rounded-md text-gray-900">
            <h2 className="text-2xl font-bold">{pokemonData.name.toUpperCase()}</h2>
            <img src={pokemonData.image} alt={pokemonData.name} className="mx-auto w-32 h-32" />
            <p className="text-lg">Type: {pokemonData.type.join(", ")}</p>

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
        )}
      </div>

      {/* Bottom Dark Section - Last API Call Details */}
      {lastApiDetails && (
        <div className="w-full max-w-2xl mt-6 p-4 bg-gray-800 text-white rounded-lg">
          <h3 className="text-lg font-bold">Last API Call</h3>
          <p>Status: <span className="font-semibold">{lastApiDetails.status}</span></p>
          <p>Response Time: <span className="font-semibold">{lastApiDetails.responseTime}</span></p>
          <p>URL: <a href={lastApiDetails.url} className="text-blue-400">{lastApiDetails.url}</a></p>
        </div>
      )}
    </div>
  );
}
