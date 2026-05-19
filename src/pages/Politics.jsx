import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from "../config/api.js";

export default function Politics() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPoliticsData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_URL}/api/v1/news`);
        const data = await response.json();

        const newsArray = Array.isArray(data)
          ? data
          : data.data || data.news || data.articles || [];

      
        const politicsFiltered = newsArray.filter(
          item => item.category?.toLowerCase() === "politics"
        );

        setNews(politicsFiltered);
      } catch (err) {
        console.error("Politics Fetching Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPoliticsData();
  }, []);

  
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this political report?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to clear resource parameter arrays from target backplane.");
      }

      setNews(prevNews => prevNews.filter(item => (item._id || item.id) !== id));
    } catch (err) {
      console.error("Deletion Processing Error:", err);
      alert("Failed to complete record deletion. Please check server status.");
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="border-b border-gray-200 pb-6 mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase flex items-center gap-2">
              <span className="w-2.5 h-6 bg-red-600 rounded-sm inline-block" /> Politics Hub
            </h1>
            <p className="text-gray-400 text-xs mt-1 font-semibold uppercase tracking-wider">
              {news.length} Broadcast entries found
            </p>
          </div>
          <Link to="/" className="text-gray-500 hover:text-red-600 font-bold text-xs uppercase tracking-wider transition-colors">
            ← Back Home
          </Link>
        </div>

        {loading && (
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-52 bg-gray-200 w-full" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-gray-200 rounded w-1/4" />
                  <div className="h-5 bg-gray-200 rounded w-full" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-gray-500 font-bold text-base mb-6">Could not pull live tracking streams from backend endpoints</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Missing Dataset Element Warning Screen */}
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
            <p className="text-4xl mb-3">⚖️</p>
            <p className="text-gray-400 font-black text-sm uppercase tracking-wider">No active political summaries matched this directory</p>
          </div>
        )}

        {/* Live Fed Data Grid Array */}
        {!loading && !error && news.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div
                key={item._id || item.id || index}
                className="bg-white rounded-3xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col relative group"
              >
            
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(item._id || item.id);
                  }}
                  className="absolute top-4 right-4 z-20 bg-white/95 hover:bg-red-600 p-2 rounded-full text-red-600 hover:text-white transition-colors border border-gray-100 shadow-md backdrop-blur-sm"
                  title="Delete Entry"
                >
                  <span className="text-xs block transform active:scale-90">🗑️</span>
                </button>

                <div className="h-52 w-full overflow-hidden bg-gray-100 relative">
                  <img
                    src={item.image || `${API_URL}/${item.banner}`}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620"; }}
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-[10px] text-red-600 font-black uppercase tracking-widest bg-red-50 px-2.5 py-1 rounded-md self-start">
                    {item.category || "Politics"}
                  </span>

                  <h3 className="font-extrabold text-gray-900 mt-3 text-base leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-[11px] font-bold uppercase tracking-wide mt-2">
                    {item.createdAt || item.publishedAt
                      ? new Date(item.createdAt || item.publishedAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric"
                        })
                      : new Date().toDateString()}
                  </p>

                  <div className="mt-auto pt-5 border-t border-gray-100/80 flex items-center justify-between">
                    <Link
                      to={`/NewsDetails/${item._id || item.id}`}
                      className="text-blue-600 hover:text-blue-700 font-black text-xs uppercase tracking-wider flex items-center gap-1"
                    >
                      Read full brief <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
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