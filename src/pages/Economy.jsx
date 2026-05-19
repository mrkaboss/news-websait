import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaChartLine } from "react-icons/fa";
import API_URL from "../config/api.js";

export default function Economy() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEconomyData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_URL}/api/v1/news`);
        const data = await response.json();

        const newsArray = Array.isArray(data)
          ? data
          : data.data || data.news || data.articles || [];

        // Dynamic category assessment parameters targeting economic updates
        const economyFiltered = newsArray.filter((item) => {
          const category = item.category?.toLowerCase();
          return category === "economy" || category === "finance";
        });

        setNews(economyFiltered);
      } catch (err) {
        console.error("Economy News Fetching Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEconomyData();
  }, []);

  // Remove individual article records from data index arrays
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this economy report?")) return;

    try {
      const response = await fetch(`${API_URL}/api/v1/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Target document parameters could not be removed from API backplane tables.");
      }

      // Live mutation pipeline drops the record from layouts instantly
      setNews((prevNews) => prevNews.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      console.error("Deletion Processing Error:", err);
      alert("Failed to drop article. Please check system connectivity metrics.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12 px-6 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        
        {/* Module Header View */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-6 mb-12">
          <h1 className="text-3xl font-black text-blue-400 flex items-center gap-3 tracking-tight uppercase">
            <FaChartLine /> Economy & Finance
          </h1>
          <Link to="/" className="text-slate-400 hover:text-blue-400 font-bold text-xs uppercase tracking-wider transition-colors">
            ← Home
          </Link>
        </div>

        {/* Loading Pulsing Layout state */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-slate-800/50 border border-slate-800 p-6 rounded-2xl animate-pulse space-y-4">
                <div className="w-full h-40 bg-slate-700/60 rounded-xl" />
                <div className="h-5 bg-slate-700/60 rounded w-3/4" />
                <div className="h-4 bg-slate-700/60 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        {/* API Core Connectivity Disruption Fallback */}
        {error && !loading && (
          <div className="text-center py-24 bg-slate-800/30 border border-slate-800 rounded-2xl">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-slate-400 font-bold text-sm mb-6 uppercase tracking-wide">Failed to sync financial logs from server datasets</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty Directory Response View */}
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-24 bg-slate-800/20 border border-dashed border-slate-800 rounded-2xl">
            <p className="text-4xl mb-3">📉</p>
            <p className="text-slate-500 font-black text-sm uppercase tracking-wider">No transactional business briefs found on server instance</p>
          </div>
        )}

        {/* Active Market Feeds Grid Matrix */}
        {!loading && !error && news.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item, index) => (
              <div 
                key={item._id || item.id || index} 
                className="bg-slate-800 border border-slate-700/60 p-6 rounded-2xl hover:bg-slate-700/50 hover:border-slate-600 transition duration-300 flex flex-col relative group"
              >
                {/* Administrative Clear Item Action Control element */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(item._id || item.id);
                  }}
                  className="absolute top-4 right-4 z-20 bg-slate-900/90 hover:bg-red-600 p-2 rounded-full text-red-500 hover:text-white transition-colors border border-slate-700 shadow-lg"
                  title="Remove Summary"
                >
                  <span className="text-xs block transform active:scale-90">🗑️</span>
                </button>

                <div className="w-full h-40 overflow-hidden rounded-xl mb-4 bg-slate-900">
                  <img 
                    src={item.image || `${API_URL}/${item.banner}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" 
                    alt={item.title} 
                    onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80"; }}
                  />
                </div>

                <div className="flex flex-col flex-grow">
                  <span className="text-[9px] text-blue-400 font-black uppercase tracking-widest bg-blue-950/60 border border-blue-900/40 px-2.5 py-1 rounded-md self-start mb-3">
                    {item.category || "Economy"}
                  </span>

                  <h3 className="text-lg font-bold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 mt-2 text-xs line-clamp-2 leading-relaxed font-medium mb-5">
                    {item.description || item.desc}
                  </p>

                  <div className="mt-auto pt-4 border-t border-slate-700/60 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">
                      📅 {item.createdAt || item.publishedAt
                        ? new Date(item.createdAt || item.publishedAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric"
                          })
                        : new Date().toDateString()}
                    </span>

                    <Link 
                      to={`/NewsDetails/${item._id || item.id}`} 
                      className="text-blue-400 group-hover:text-blue-300 font-black text-xs uppercase tracking-wider flex items-center gap-0.5"
                    >
                      Read Story <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}