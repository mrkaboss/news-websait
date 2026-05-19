import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaLaughSquint, FaRegHeart, FaShare } from "react-icons/fa";
import API_URL from "../config/api.js";

export default function SweetNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSweetNewsData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_URL}/api/v1/news`);
        const data = await response.json();

        const newsArray = Array.isArray(data)
          ? data
          : data.data || data.news || data.articles || [];

        // Dynamic category assessment parameters targeting humorous entries
        const sweetFiltered = newsArray.filter((item) => {
          const category = item.category?.toLowerCase();
          return (
            category === "comedy" ||
            category === "sweet news" ||
            category === "jokes" ||
            category === "wild & funny"
          );
        });

        setNews(sweetFiltered);
      } catch (err) {
        console.error("Sweet News Fetching Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSweetNewsData();
  }, []);

  // Remove individual article elements from your database collection indexes
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this funny story?")) return;

    try {
      const response = await fetch(`${API_URL}/api/v1/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Target entry metrics could not be purged from api database endpoints.");
      }

      // Live mutation pipeline drops the record from tracking layouts instantly
      setNews((prevNews) => prevNews.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      console.error("Deletion Processing Error:", err);
      alert("Failed to drop article. Please check your system connectivity metrics.");
    }
  };

  return (
    <div className="min-h-screen bg-yellow-50/60 py-12 px-6 font-sans antialiased">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Action Row */}
        <div className="flex justify-end mb-4">
          <Link to="/" className="text-gray-500 hover:text-yellow-600 font-bold text-xs uppercase tracking-wider transition-colors">
            ← Back Home
          </Link>
        </div>

        {/* Dynamic Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block p-4 bg-yellow-400 rounded-full mb-4 animate-bounce shadow-md">
            <FaLaughSquint size={40} className="text-white" />
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">SWEET NEWS 🍭</h1>
          <p className="text-sm sm:text-base text-gray-500 font-bold uppercase tracking-wider">
            Lighthearted stories and funny updates to brighten your day! ({news.length} feeds)
          </p>
        </div>

        {/* Loading Visual Placeholder Grid */}
        {loading && (
          <div className="grid md:grid-cols-3 gap-10">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-[3rem] overflow-hidden border-4 border-yellow-100 p-6 space-y-4 animate-pulse">
                <div className="h-48 bg-gray-100 rounded-2xl w-full" />
                <div className="h-6 bg-gray-100 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {/* Server Disruption Fallback Panel */}
        {error && !loading && (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-yellow-100">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-gray-500 font-bold text-sm mb-6 uppercase tracking-wide">Failed to stream fun feeds from database routing links</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-yellow-400 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-yellow-500 transition shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Empty Collection Query Response Fallback Screen */}
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-yellow-300 shadow-sm">
            <p className="text-4xl mb-3">🎈</p>
            <p className="text-gray-400 font-black text-sm uppercase tracking-wider">No funny clips matched inside this directory framework</p>
          </div>
        )}

        {/* Dynamic Card Stream Rendering Matrix */}
        {!loading && !error && news.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((item, index) => (
              <div 
                key={item._id || item.id || index} 
                className="bg-white rounded-[3rem] overflow-hidden shadow-md hover:shadow-xl hover:rotate-1 transition-all duration-300 border-4 border-yellow-200 flex flex-col relative group"
              >
                
                {/* Administrative Content Wiping Hook overlay */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(item._id || item.id);
                  }}
                  className="absolute top-4 left-4 z-20 bg-white/95 hover:bg-red-600 p-2 rounded-full text-red-600 hover:text-white transition-colors border border-yellow-100 shadow-md backdrop-blur-sm"
                  title="Remove Story"
                >
                  <span className="text-xs block transform active:scale-90">🗑️</span>
                </button>

                <div className="relative h-60 overflow-hidden bg-gray-50">
                  <img 
                    src={item.image || `${API_URL}/${item.banner}`} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103" 
                    onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1516624683217-bf24785752ed?w=800"; }}
                  />
                  <div className="absolute top-4 right-4 bg-pink-500 text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm">
                    {item.category || "Comedy"}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-gray-800 leading-snug mb-3 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-xs mb-6 line-clamp-3 italic leading-relaxed font-medium">
                    "{item.description || item.desc}"
                  </p>

                  <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-5 gap-2">
                    <div className="flex items-center gap-1.5 text-pink-500">
                      <FaRegHeart className="text-sm" />
                      <span className="font-extrabold text-xs tracking-tight">{item.likes || "Pure Vibe"}</span>
                    </div>
                    
                    <Link 
                      to={`/NewsDetails/${item._id || item.id}`}
                      className="bg-yellow-400 text-white px-5 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-wider hover:bg-black transition-colors shadow-sm"
                    >
                      READ & LAUGH →
                    </Link>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

        {/* Global Action Footer Assembly */}
        {!loading && !error && (
          <div className="mt-20 text-center">
            <button className="bg-black text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest flex items-center gap-3 mx-auto hover:bg-gray-900 active:scale-98 transition shadow-lg">
              <FaShare /> Share The Smile
            </button>
          </div>
        )}

      </div>
    </div>
  );
}