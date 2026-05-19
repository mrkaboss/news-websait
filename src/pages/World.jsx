import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import API_URL from "../config/api.js";

export default function World() {
  const { t } = useTranslation();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWorldData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_URL}/api/v1/news`);
        const data = await response.json();

        const newsArray = Array.isArray(data)
          ? data
          : data.data || data.news || data.articles || [];

      
        const worldFiltered = newsArray.filter(
          (item) => item.category?.toLowerCase() === "world"
        );

        setNews(worldFiltered);
      } catch (err) {
        console.error("World News Fetching Error Context:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchWorldData();
  }, []);

  
  const handleDelete = async (e, id) => {
    e.preventDefault(); 
    e.stopPropagation();

    if (!window.confirm(t("confirm_delete", "Are you sure you want to permanently delete this world news document?"))) return;

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
    <div className="bg-gray-50 min-h-screen font-sans antialiased pb-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        
        <div className="flex items-center justify-between mb-10 border-b border-gray-200 pb-6 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
              {t("nav.world", "World News")}
            </h1>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
              Global events, diplomatic logs, and foreign policy summaries
            </p>
          </div>
          <Link to="/" className="text-red-600 font-black text-xs uppercase tracking-widest hover:text-red-800 transition-colors shrink-0">
            {t("back_home", "← Back Home")}
          </Link>
        </div>
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4 animate-pulse shadow-sm">
                <div className="h-56 bg-gray-200 rounded-xl w-full" />
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-6 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
              </div>
            ))}
          </div>
        )}

      
        {error && !loading && (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-gray-500 font-bold text-sm mb-6 uppercase tracking-wide">Failed to stream localized geopolitical feeds from server nodes</p>
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
            <p className="text-4xl mb-3">🌍</p>
            <p className="text-gray-400 font-black text-xs uppercase tracking-widest">No active international bulletins matched on this context node</p>
          </div>
        )}

      
        {!loading && !error && news.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((item, index) => (
              <Link
                to={`/NewsDetails/${item._id || item.id}`}
                key={item._id || item.id || index}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col relative"
              >
                
                <button
                  onClick={(e) => handleDelete(e, item._id || item.id)}
                  className="absolute top-4 right-4 z-20 bg-white/95 hover:bg-red-600 p-2 rounded-full text-red-600 hover:text-white transition-colors border border-gray-100 shadow-md backdrop-blur-sm"
                  title="Purge Component entry"
                >
                  <span className="text-xs block transform active:scale-90">🗑️</span>
                </button>

                <div className="relative overflow-hidden h-56 bg-gray-100">
                  <img
                    src={item.image || `${API_URL}/${item.banner}`}
                    alt={item.title}
                    className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-700"
                    onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800"; }}
                  />
                  <span className="absolute bottom-4 left-4 bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-md uppercase tracking-wider shadow-md">
                    {item.category || "World"}
                  </span>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wide mb-2">
                    📅 {item.createdAt || item.publishedAt
                      ? new Date(item.createdAt || item.publishedAt).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric"
                        })
                      : "Global Dispatch"}
                  </p>

                  <h3 className="font-extrabold text-xl text-gray-900 group-hover:text-red-600 transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 text-xs mt-3 line-clamp-2 leading-relaxed font-medium mb-6">
                    {item.description || item.desc || "Discover the latest analytical insights and comprehensive reporting on this major global milestone event as it continues unfolding."}
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center text-red-600 font-black text-xs uppercase tracking-wider">
                    {t("read_more", "Read More")}{" "}
                    <span className="ml-1 transform group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>

              </Link>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}