import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api.js";

export default function Finance() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFinanceData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_URL}/api/v1/news`);
        const data = await response.json();

        const newsArray = Array.isArray(data)
          ? data
          : data.data || data.news || data.articles || [];


        const financeFiltered = newsArray.filter((item) => {
          const category = item.category?.toLowerCase();
          return category === "finance" || category === "economy" || category === "business";
        });

        setNews(financeFiltered);
      } catch (err) {
        console.error("Finance News Fetching Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchFinanceData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you certain you want to remove this financial document?")) return;

    try {
      const response = await fetch(`${API_URL}/api/v1/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Target resource could not be wiped from api backend tables.");
      }
      setNews((prevNews) => prevNews.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      console.error("Deletion Error Response Context:", err);
      alert("Failed to complete record deletion. Verify remote service routing endpoints.");
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen font-sans antialiased">
  
      <div className="bg-emerald-900 py-12 md:py-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight uppercase">
            Finance & Markets
          </h1>
          <p className="mt-4 text-emerald-100 text-sm sm:text-base max-w-2xl mx-auto opacity-90 font-medium">
            Stay updated with the latest economic shifts, stock market trends, and global business insights.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-10 md:py-12 px-4 sm:px-6">
    
        <div className="flex items-center justify-between border-b border-gray-200/60 pb-6 mb-8 gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
            <Link to="/" className="hover:text-emerald-700 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-emerald-800">{news.length} stories mapped</span>
          </div>
          <Link to="/" className="text-gray-500 hover:text-emerald-700 font-bold text-xs uppercase tracking-wider transition-colors">
            ← Back Home
          </Link>
        </div>

        {loading && (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-emerald-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-500 font-black text-xs uppercase tracking-wider">Analyzing markets...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-gray-500 font-bold text-sm mb-6 uppercase tracking-wide">Failed to stream database arrays from backend context links</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-emerald-700 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-800 transition shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Null Query Content Map Fallback Block */}
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
            <p className="text-4xl mb-3">📈</p>
            <p className="text-gray-400 font-black text-sm uppercase tracking-wider">No transactional business briefs found on server instance</p>
          </div>
        )}
        {!loading && !error && news.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {news.map((item, index) => (
              <div 
                key={item._id || item.id || index} 
                className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col relative"
              >

                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(item._id || item.id);
                  }}
                  className="absolute top-4 right-4 z-20 bg-white/95 hover:bg-red-600 p-2 rounded-full text-red-600 hover:text-white transition-colors border border-gray-100 shadow-md backdrop-blur-sm"
                  title="Remove Market Brief"
                >
                  <span className="text-xs block transform active:scale-90">🗑️</span>
                </button>

                <div className="relative h-52 overflow-hidden bg-gray-100">
                  <img
                    src={item.image || `${API_URL}/${item.banner}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&q=80"; }}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-600 text-white text-[9px] font-black px-3 py-1.5 rounded-md uppercase shadow-sm tracking-wider">
                      {item.category || "Economy"}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-base sm:text-lg font-extrabold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-2 text-xs line-clamp-3 leading-relaxed font-medium">
                    {item.description || item.desc}
                  </p>
                  
                  <div className="mt-auto pt-5 border-t border-gray-100/80 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">
                      📅 {item.createdAt || item.publishedAt
                        ? new Date(item.createdAt || item.publishedAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric"
                          })
                        : new Date().toDateString()}
                    </span>

                    <Link 
                      to={`/NewsDetails/${item._id || item.id}`}
                      className="text-emerald-700 font-black text-xs uppercase tracking-wider flex items-center gap-1 hover:text-emerald-800"
                    >
                      Read Analysis <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-16 bg-white p-6 sm:p-10 rounded-3xl border border-dashed border-emerald-200 text-center shadow-sm">
            <h2 className="text-lg sm:text-xl font-black text-emerald-900 uppercase tracking-tight">
              Get Daily Financial Insights
            </h2>
            <p className="text-gray-500 mt-1 text-xs sm:text-sm font-medium">
              Subscribe to receive market updates directly in your inbox.
            </p>

            <div className="mt-6 flex flex-col md:flex-row justify-center gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-100 outline-none focus:ring-2 focus:ring-emerald-500 w-full text-xs font-semibold"
              />
              <button className="bg-emerald-700 text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-emerald-800 transition shadow-md w-full md:w-auto shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}