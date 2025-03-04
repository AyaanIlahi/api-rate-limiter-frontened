export default function Footer() {
    return (
      <footer className="w-full bg-black bg-opacity-80 backdrop-blur-lg text-gray-300 text-center py-4 mt-1">
        <p className="text-sm">&copy; {new Date().getFullYear()} API Rate Limiter. Built by Ayaan Elahi.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="https://github.com/AyaanIlahi/api-rate-limiter" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">GitHub</a>
          <a href="/docs" className="hover:text-white transition">Documentation</a>
        </div>
      </footer>
    );
  }
  