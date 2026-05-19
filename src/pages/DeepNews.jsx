import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaRegClock, FaInfoCircle } from "react-icons/fa";
import API_URL from "../config/api.js";

export default function DeepNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDeepNewsData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_URL}/api/v1/news`);
        const data = await response.json();

        const newsArray = Array.isArray(data)
          ? data
          : data.data || data.news || data.articles || [];

      
        const deepNewsFiltered = newsArray.filter((item) => {
          const category = item.category?.toLowerCase();
          return (
            category === "disaster" ||
            category === "obituary" ||
            category === "crisis" ||
            category === "deep news"
          );
        });

        setNews(deepNewsFiltered);
      } catch (err) {
        console.error("Deep News Fetching Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDeepNewsData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you certain you want to permanently delete this report?")) return;

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
    <div className="min-h-screen bg-slate-50 py-16 px-6 font-sans antialiased">
      <div className="max-w-5xl mx-auto">
               <div className="border-b border-slate-300 pb-8 mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-4xl font-serif font-black text-slate-900 tracking-tight">DEEP NEWS</h1>
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 mt-2">
              <FaInfoCircle className="text-slate-400 text-sm" /> Serious & Essential Journalism
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs bg-slate-200 text-slate-700 font-black px-3 py-1 uppercase tracking-wider rounded-md">
              {news.length} Records Found
            </span>
            <Link to="/" className="text-slate-500 hover:text-slate-900 font-bold text-xs uppercase tracking-wider transition-colors">
              ← Home
            </Link>
          </div>
        </div>

        {loading && (
          <div className="space-y-10">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="grid md:grid-cols-3 gap-8 items-center animate-pulse">
                <div className="md:col-span-1 h-44 bg-slate-200 rounded-2xl" />
                <div className="md:col-span-2 space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-1/4" />
                  <div className="h-6 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-slate-500 font-bold text-sm mb-6 uppercase tracking-wide">Could not pull reports from core database arrays</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-slate-900 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-slate-300 shadow-sm">
            <p className="text-4xl mb-3">📰</p>
            <p className="text-slate-400 font-black text-xs uppercase tracking-widest">No investigative entries match this index right now</p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="space-y-12">
            {news.map((item, index) => (
              <div 
                key={item._id || item.id || index} 
                className="grid md:grid-cols-3 gap-8 items-center group relative bg-white md:bg-transparent p-5 md:p-0 rounded-3xl border border-slate-100 md:border-none shadow-sm md:shadow-none"
              >
                
                <div className="md:col-span-1 overflow-hidden rounded-2xl shadow-md bg-slate-200 aspect-video md:aspect-auto md:h-44 relative">
                  
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete(item._id || item.id);
                    }}
                    className="absolute top-3 right-3 z-20 bg-white/95 hover:bg-red-600 p-2 rounded-full text-red-600 hover:text-white transition-colors border border-slate-100 shadow-md backdrop-blur-sm"
                    title="Remove Article"
                  >
                    <span className="text-xs block transform active:scale-90">🗑️</span>
                  </button>

                  <img 
                    src={item.image || `${API_URL}/${item.banner}`} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-103" 
                    onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=800"; }}
                  />
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider border px-2.5 py-1 rounded-md bg-slate-100 border-slate-200">
                      {item.category || "Deep News"}
                    </span>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wide flex items-center gap-1.5">
                      <FaRegClock /> {item.createdAt || item.publishedAt
                        ? new Date(item.createdAt || item.publishedAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric"
                          })
                        : new Date().toDateString()}
                    </span>
                  </div>
                  
                  <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mb-2.5 group-hover:text-blue-900 transition-colors leading-snug">
                    {item.title}
                  </h2>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-2 font-medium">
                    {item.description || item.desc}
                  </p>

                  <Link 
                    to={`/NewsDetails/${item._id || item.id}`}
                    className="text-slate-900 hover:text-blue-900 font-black text-xs uppercase tracking-wider border-b-2 border-slate-900 hover:border-blue-900 pb-1 transition-all inline-block"
                  >
                    Read full brief →
                  </Link>
                </div>

              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-24 py-8 border-t border-slate-200 text-center">
            <p className="text-slate-400 text-xs italic tracking-wide">
              "Information acts as our shared compass to understand, reflect, and assist those navigating global hardships."
            </p>
          </div>
        )}

      </div>
    </div>
  );
}