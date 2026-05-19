import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import API_URL from "../config/api.js";

export default function Agriculture() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAgriData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_URL}/api/v1/news`);
        const data = await response.json();

        const newsArray = Array.isArray(data)
          ? data
          : data.data || data.news || data.articles || [];

      
        const agriFiltered = newsArray.filter((item) => {
          const category = item.category?.toLowerCase();
          return category === "agriculture" || category === "farming";
        });

        setNews(agriFiltered);
      } catch (err) {
        console.error("Agriculture News Fetching Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAgriData();
  }, []);

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this agriculture report?")) return;

    try {
      const response = await fetch(`${API_URL}/api/v1/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Target file footprint couldn't be dropped on central pipeline arrays.");
      }

      setNews((prevNews) => prevNews.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      console.error("Deletion Processing Error:", err);
      alert("Failed to drop article. Please check your system connectivity metrics.");
    }
  };

  return (
    <div className="min-h-screen bg-green-50/60 py-12 px-6 font-sans antialiased pb-16">
      <div className="max-w-6xl mx-auto">
        
    
        <div className="flex items-center justify-between border-b border-green-200/60 pb-6 mb-10">
          <h1 className="text-3xl font-black text-green-900 flex items-center gap-3 tracking-tight uppercase">
            <FaLeaf className="text-green-600" /> Agriculture & Farming
          </h1>
          <Link to="/" className="text-green-700 hover:text-green-900 font-bold text-xs uppercase tracking-wider transition-colors">
            ← Back Home
          </Link>
        </div>
        {loading && (
          <div className="grid md:grid-cols-2 gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 space-y-4 animate-pulse shadow-sm border border-gray-100">
                <div className="h-56 bg-gray-200 rounded-2xl w-full" />
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        )}

        
        {error && !loading && (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-gray-500 font-bold text-sm mb-6 uppercase tracking-wide">Failed to stream agricultural records from server nodes</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-green-200 shadow-sm">
            <p className="text-4xl mb-3">🌱</p>
            <p className="text-gray-400 font-black text-sm uppercase tracking-wider">No farming briefs or crop updates found on this index</p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {news.map((item, index) => (
              <div 
                key={item._id || item.id || index} 
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-b-4 border-green-600 flex flex-col relative group"
              >
                
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(item._id || item.id);
                  }}
                  className="absolute top-4 right-4 z-20 bg-white/95 hover:bg-red-600 p-2 rounded-full text-red-600 hover:text-white transition-colors border border-green-50 shadow-md backdrop-blur-sm"
                  title="Purge Component entry"
                >
                  <span className="text-xs block transform active:scale-90">🗑️</span>
                </button>

                <div className="w-full h-56 overflow-hidden bg-gray-100 relative">
                  <img 
                    src={item.image || `${API_URL}/${item.banner}`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102" 
                    alt={item.title} 
                    onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800"; }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-600 text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                      {item.category || "Agriculture"}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 group-hover:text-green-700 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h2>
                  
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2 leading-relaxed font-medium mb-6">
                    {item.description || item.desc || "Reviewing sustainable harvest yields, direct logistical market insights, and environmental policy transitions framework metrics."}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      📅 {item.createdAt || item.publishedAt
                        ? new Date(item.createdAt || item.publishedAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric"
                          })
                        : "Harvest Log"}
                    </span>

                    <Link 
                      to={`/NewsDetails/${item._id || item.id}`} 
                      className="text-green-600 font-black text-xs uppercase tracking-wider hover:text-green-800 flex items-center gap-0.5"
                    >
                      Read Briefing <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
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