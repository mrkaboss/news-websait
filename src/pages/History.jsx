import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaLandmark } from "react-icons/fa";
import API_URL from "../config/api.js";

export default function History() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHistoryData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_URL}/api/v1/news`);
        const data = await response.json();

        const newsArray = Array.isArray(data)
          ? data
          : data.data || data.news || data.articles || [];

        const historyFiltered = newsArray.filter(
          item => 
            item.category?.toLowerCase() === "history" || 
            item.category?.toLowerCase() === "archive"
        );

        setNews(historyFiltered);
      } catch (err) {
        console.error("History Fetching Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHistoryData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this historical story?")) return;

    try {
      const response = await fetch(`http://localhost:3000/api/v1/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete the resource from server execution handles.");
      }

      setNews(prevNews => prevNews.filter(item => (item._id || item.id) !== id));
    } catch (err) {
      console.error("Deletion Error:", err);
      alert("Failed to delete. Please check your backend connection properties.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fdf6e3] py-12 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        
        <h1 className="text-4xl font-serif font-black text-amber-900 mb-10 border-b-2 border-amber-900 pb-4 flex items-center gap-3 tracking-tight">
          <FaLandmark /> HISTORY
        </h1>

        {loading && (
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="animate-pulse flex flex-col md:flex-row gap-8 bg-white p-6 rounded-3xl shadow-sm">
                <div className="w-full md:w-64 h-48 bg-gray-200 rounded-2xl" />
                <div className="flex-1 space-y-4 py-2">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-10 bg-gray-200 rounded w-32 mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-amber-200/50">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-amber-900 font-bold text-lg mb-4">Unable to stream archival datasets</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-amber-900 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-amber-800 transition"
            >
              Try Again
            </button>
          </div>
        )}

    
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl shadow-sm border border-dashed border-amber-900/20">
            <p className="text-4xl mb-3">📜</p>
            <p className="text-amber-800 font-bold text-sm uppercase tracking-wider">No historical chronicles found on server</p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="space-y-8">
            {news.map((item, index) => (
              <div 
                key={item._id || item.id || index} 
                className="flex flex-col md:flex-row gap-8 items-center bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition-all relative group border border-amber-900/5"
              >
  
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item._id || item.id);
                  }}
                  className="absolute top-4 right-4 z-20 bg-red-50 hover:bg-red-600 p-2 rounded-full text-red-600 hover:text-white transition-colors border border-red-100 shadow-sm"
                  title="Delete Story"
                >
                  <span className="text-xs block transform active:scale-90">🗑️</span>
                </button>

                <div className="w-full md:w-64 h-48 overflow-hidden rounded-2xl flex-shrink-0 bg-gray-100">
                  <img 
                    src={item.image || `${API_URL}/${item.banner}`} 
                    className="w-full h-full object-cover sepia-[0.3] hover:sepia-0 transition-all duration-500 group-hover:scale-102" 
                    alt={item.title} 
                    onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1461360370896-922624d12aa1"; }}
                  />
                </div>

                <div className="flex-1 pr-8">
                  <span className="text-[10px] font-black tracking-widest text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md uppercase">
                    {item.category || "History"}
                  </span>
                  <h2 className="text-2xl font-serif font-bold text-gray-900 mt-2 mb-3 leading-snug group-hover:text-amber-900 transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-5 leading-relaxed font-medium">
                    {item.description || item.desc}
                  </p>
                  
                  <Link 
                    to={`/NewsDetails/${item._id || item.id}`} 
                    className="inline-block bg-amber-900 hover:bg-amber-950 text-white px-6 py-3 rounded-xl font-bold uppercase text-[10px] tracking-widest transition-transform active:scale-95 shadow-sm"
                  >
                    Read History →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}