import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api.js";

export default function Teche() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTechData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_URL}/api/v1/news`);
        const data = await response.json();

        const newsArray = Array.isArray(data)
          ? data
          : data.data || data.news || data.articles || [];

        
        const techFiltered = newsArray.filter((item) => {
          const category = item.category?.toLowerCase();
          return category === "technology" || category === "tech";
        });

        setNews(techFiltered);
      } catch (err) {
        console.error("Technology News Fetching Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTechData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this technology briefing?")) return;

    try {
      const response = await fetch(`${API_URL}/api/v1/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Resource could not be removed from server memory tables.");
      }
      setNews((prevNews) => prevNews.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      console.error("Deletion Processing Error Stack:", err);
      alert("Failed to discard article record. Check remote endpoint configurations.");
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen py-12 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6">
        
      
        <div className="flex items-center justify-between border-b border-gray-200/60 pb-6 mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight uppercase">Technology News</h1>
            <p className="text-xs text-gray-400 font-bold tracking-wider mt-1 uppercase">Updates from the digital frontier</p>
          </div>
          <span className="text-xs font-black bg-gray-200/80 text-gray-700 px-3 py-1.5 rounded-md uppercase tracking-wider">
            {news.length} Live Feeds
          </span>
        </div>

        
        {loading && (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent" />
            <p className="mt-4 text-gray-500 font-black text-xs uppercase tracking-widest">Compiling tech arrays...</p>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-gray-100">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-gray-500 font-bold text-sm mb-6 uppercase tracking-wide">Failed to synchronize software insights from backend nodes</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-gray-200 shadow-sm">
            <p className="text-4xl mb-3">💻</p>
            <p className="text-gray-400 font-black text-xs uppercase tracking-wider">No modern technology releases compiled on this cluster index</p>
          </div>
        )}

      
        {!loading && !error && news.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div 
                key={item._id || item.id || index} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col relative group"
              >
          
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(item._id || item.id);
                  }}
                  className="absolute top-4 right-4 z-20 bg-white/95 hover:bg-red-600 p-2 rounded-full text-red-600 hover:text-white transition-colors border border-gray-100 shadow-md backdrop-blur-sm"
                  title="Purge Component Entry"
                >
                  <span className="text-xs block transform active:scale-90">🗑️</span>
                </button>

                <div className="h-48 w-full overflow-hidden bg-gray-100 relative">
                  <img
                    src={item.image || `${API_URL}/${item.banner}`}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-102"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"; }}
                  />
                  <div className="absolute bottom-3 left-4">
                    <span className="bg-red-600 text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-sm">
                      {item.category || "Tech"}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-extrabold text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 mt-2 text-xs line-clamp-2 leading-relaxed font-medium">
                    {item.description || item.desc || "No comprehensive data brief provided for this core industry transition log."}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between gap-2">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      📅 {item.createdAt || item.publishedAt
                        ? new Date(item.createdAt || item.publishedAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric"
                          })
                        : "Recent Feed"}
                    </p>

                    <Link
                      to={`/NewsDetails/${item._id || item.id}`}
                      className="text-red-600 font-black text-xs uppercase tracking-wider flex items-center gap-0.5 hover:text-red-700"
                    >
                      Read more <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        <div className="mt-12 border-t border-gray-200/60 pt-6">
          <Link to="/" className="text-gray-500 hover:text-red-600 text-xs font-black uppercase tracking-widest inline-block transition-colors">
            ← Back Home
          </Link>
        </div>

      </div>
    </div>
  );
}