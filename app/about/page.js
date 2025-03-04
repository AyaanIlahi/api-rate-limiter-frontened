"use client";
import { motion } from "framer-motion";
import { CheckCircle, Server, BarChart, Globe, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 md:px-16 py-12">
      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-center mb-6"
      >
        About API Rate Limiter 
      </motion.h1>

      <p className="text-lg text-gray-300 text-center max-w-3xl">
        The API Rate Limiter is a personal project designed to control and monitor API usage efficiently. It prevents excessive usage while providing real-time tracking and insights.
      </p>

      {/* Features Section */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Server size={30} />}
          title="Rate-Limiting Strategies"
          description="Implements different strategies using Redis, including Fixed Window Counter."
        />
        <FeatureCard
          icon={<CheckCircle size={30} />}
          title="Supported APIs"
          description="Currently supports Pokémon & Unsplash APIs with predefined request limits."
        />
        <FeatureCard
          icon={<BarChart size={30} />}
          title="Technology Stack"
          description="Built with Node.js, Express.js, Redis, React.js, and Next.js."
        />
        <FeatureCard
          icon={<Globe size={30} />}
          title="Authentication"
          description="Uses JWT tokens for API access control and security."
        />
      </div>

      {/* Future Enhancements */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold mt-12 text-center"
      >
        Future Enhancements 🔥
      </motion.h2>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard title="Sliding Window & Token Bucket" description="New advanced rate-limiting strategies coming soon!" />
        <FeatureCard title="User Authentication System" description="Full user registration & login functionality in development." />
        <FeatureCard title="Analytics Dashboard" description="Visual reports on API usage patterns." />
        <FeatureCard title="Trending Categories" description="Identifies popular API searches dynamically." />
        <FeatureCard title="Usage by Country" description="Tracks API usage based on geographic location." />
      </div>

      {/* Why This Project? */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-6 rounded-lg mt-12 max-w-2xl text-center"
      >
        <h2 className="text-2xl font-bold mb-4">Why This Project? 💡</h2>
        <p className="text-gray-300">
          This project demonstrates efficient API management using Redis-based rate limiting, preventing abuse, ensuring fair API usage, and providing a seamless experience for users.
        </p>
      </motion.div>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 p-4 rounded-lg flex flex-col items-center text-center shadow-lg"
    >
      <div className="text-blue-400 mb-3">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-300 mt-1">{description}</p>
    </motion.div>
  );
}
