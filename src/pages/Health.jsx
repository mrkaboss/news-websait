import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api.js";

export default function Health() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_URL}/api/v1/news`);
        const data = await response.json();

        const newsArray = Array.isArray(data)
          ? data
          : data.data || data.news || data.articles || [];

        // Filter arrays targeting items matching health properties
        const healthFiltered = newsArray.filter(
          item => item.category?.toLowerCase() === "health"
        );

        setNews(healthFiltered);
      } catch (err) {
        console.error("Health News Fetching Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthData();
  }, []);

  // Handle article delete callbacks
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this health report?")) return;

    try {
      const response = await fetch(`${API_URL}/api/v1/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Target document could not be cleared from the server indices.");
      }

      // Drop filtered item from current state layout map instantly
      setNews(prevNews => prevNews.filter(item => (item._id || item.id) !== id));
    } catch (err) {
      console.error("Deletion Error Response:", err);
      alert("Failed to complete record deletion. Please check system context connectivity.");
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-16 font-sans antialiased">
      
      {/* Title Header Banner Area */}
      <div className="bg-white border-b border-gray-100 py-16 px-6 text-center">
        <div className="flex justify-center mb-4 text-red-500 animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          </svg>
        </div>
        <h1 className="text-4xl font-black text-gray-900 tracking-tight uppercase">HEALTH & WELLNESS</h1>
        <p className="mt-2 text-gray-500 font-medium text-sm">Your daily dose of medical breakthroughs and lifestyle tips.</p>
      </div>

      <div className="max-w-7xl mx-auto py-10 px-6">
        
        {/* Navigation Actions Sub-Bar */}
        <div className="flex items-center justify-between border-b border-gray-200/60 pb-5 mb-8">
          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            {news.length} Live updates active
          </div>
          <Link to="/" className="text-gray-500 hover:text-red-500 font-bold text-xs uppercase tracking-wider transition-colors">
            ← Home
          </Link>
        </div>

        {/* Loading Pulse State view */}
        {loading && (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="text-teal-600 font-black text-xs uppercase tracking-widest animate-pulse">
              Checking vitals...
            </div>
          </div>
        )}

        {/* API Pipeline Connection Error Fallback */}
        {error && !loading && (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-gray-500 font-bold text-sm mb-6 uppercase tracking-wide">Could not pull healthcare summaries from backend server</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-500 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-600 transition shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty Collection Query Map View */}
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
            <p className="text-4xl mb-3">🩺</p>
            <p className="text-gray-400 font-black text-sm uppercase tracking-wider">No diagnostic records listed on the current directory</p>
          </div>
        )}

        {/* Dynamic Multi-Card Stream Render Box */}
        {!loading && !error && news.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((item, index) => (
              <div 
                key={item._id || item.id || index} 
                className="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col relative"
              >
                {/* Administrative Clear Item Action overlay */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(item._id || item.id);
                  }}
                  className="absolute top-3 right-3 z-20 bg-white/95 hover:bg-red-600 p-2 rounded-full text-red-600 hover:text-white transition-colors border border-gray-100 shadow-md backdrop-blur-sm"
                  title="Remove Article"
                >
                  <span className="text-xs block transform active:scale-90">🗑️</span>
                </button>

                <div className="h-40 w-full overflow-hidden bg-gray-100">
                  <img 
                    src={item.image || `${API_URL}/${item.banner}`} 
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-103" 
                    alt={item.title} 
                    onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&q=80"; }}
                  />
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-teal-600 text-[9px] font-black uppercase tracking-widest bg-teal-50 px-2.5 py-1 rounded-md self-start">
                    {item.category || "Health"}
                  </span>

                  <h3 className="font-extrabold text-gray-800 mt-3 text-sm line-clamp-3 leading-snug group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                      {item.createdAt || item.publishedAt
                        ? new Date(item.createdAt || item.publishedAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric"
                          })
                        : new Date().toDateString()}
                    </span>

                    <Link 
                      to={`/NewsDetails/${item._id || item.id}`} 
                      className="text-red-500 font-black text-xs hover:text-red-700 tracking-wide flex items-center gap-0.5"
                    >
                      Read Brief <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
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