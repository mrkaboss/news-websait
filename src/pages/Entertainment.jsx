import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api.js";

export default function Entertainment() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEntertainmentData = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_URL}/api/v1/news`);
        const data = await response.json();

        const newsArray = Array.isArray(data)
          ? data
          : data.data || data.news || data.articles || [];

      
        const entertainmentFiltered = newsArray.filter(
          item => item.category?.toLowerCase() === "entertainment"
        );

        setNews(entertainmentFiltered);
      } catch (err) {
        console.error("Entertainment News Fetching Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchEntertainmentData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this entertainment story?")) return;

    try {
      const response = await fetch(`${API_URL}/api/v1/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Target entry metrics could not be purged from api database endpoints.");
      }

      setNews(prevNews => prevNews.filter(item => (item._id || item.id) !== id));
    } catch (err) {
      console.error("Deletion Processing Error:", err);
      alert("Failed to drop article. Please check your system connectivity metrics.");
    }
  };

  return (
    <div className="bg-gray-50/50 min-h-screen pb-12 font-sans antialiased">
    
      <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="bg-white text-pink-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
            Showbiz & Lifestyle
          </span>
          <h1 className="text-5xl md:text-6xl font-black mt-6 tracking-tighter italic">
            ENTERTAINMENT
          </h1>
          <p className="mt-4 text-pink-100 text-sm sm:text-base max-w-xl mx-auto font-medium opacity-95">
            Movies, Music, Celebrity Gossip, and the latest tracking updates across the media landscape.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        
  
        <div className="flex items-center justify-between mb-10 border-b border-gray-200/60 pb-5">
          <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
            Hot Stories 🚀
          </h2>
          <Link to="/" className="text-gray-500 hover:text-pink-600 font-bold text-xs uppercase tracking-wider transition-colors">
            ← Home
          </Link>
        </div>

          {loading && (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="animate-bounce inline-flex p-4 bg-pink-100 rounded-full">
               <div className="w-4 h-4 bg-pink-600 rounded-full animate-ping"></div>
            </div>
            <p className="mt-4 text-pink-600 font-black tracking-widest text-xs uppercase">Loading live tracks...</p>
          </div>
        )}

      
        {error && !loading && (
          <div className="text-center py-24 bg-white rounded-[2rem] shadow-sm border border-gray-100">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-gray-500 font-bold text-sm mb-6 uppercase tracking-wide">Failed to sync entertainment streams from server instances</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-pink-600 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-pink-700 transition shadow-md"
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-gray-200 shadow-sm">
            <p className="text-4xl mb-3">🎬</p>
            <p className="text-gray-400 font-black text-sm uppercase tracking-wider">No trending features listed inside this collection index</p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((item, index) => (
              <div 
                key={item._id || item.id || index} 
                className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col relative"
              >
              
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(item._id || item.id);
                  }}
                  className="absolute top-4 right-4 z-20 bg-white/95 hover:bg-red-600 p-2 rounded-full text-red-600 hover:text-white transition-colors border border-gray-100 shadow-md backdrop-blur-sm"
                  title="Remove Story"
                >
                  <span className="text-xs block transform active:scale-90">🗑️</span>
                </button>

                <div className="relative h-60 overflow-hidden bg-gray-100">
                  <img
                    src={item.image || `${API_URL}/${item.banner}`}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-yellow-400 text-black text-[9px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                      {item.category || "Entertainment"}
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <h3 className="text-lg font-extrabold text-gray-900 leading-snug group-hover:text-pink-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 mt-2 text-xs line-clamp-3 leading-relaxed font-medium">
                    {item.description || item.desc}
                  </p>
                  
                  <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-100/80 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-gray-400 uppercase font-black tracking-wider">Broadcasted</span>
                      <span className="text-xs text-gray-600 font-semibold mt-0.5">
                        {item.createdAt || item.publishedAt
                          ? new Date(item.createdAt || item.publishedAt).toLocaleDateString("en-US", {
                              month: "short", day: "numeric", year: "numeric"
                            })
                          : new Date().toDateString()}
                      </span>
                    </div>

                    <Link 
                      to={`/NewsDetails/${item._id || item.id}`}
                      className="bg-pink-600 text-white p-3 rounded-xl hover:bg-black transition-all shadow-md active:scale-90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-16 py-8 bg-white rounded-[2rem] border border-dashed border-gray-200 text-center shadow-sm">
            <h3 className="text-gray-400 font-black uppercase tracking-widest text-xs mb-4">Trending Feeds</h3>
            <div className="flex flex-wrap justify-center gap-3 px-6">
              {["#Grammys", "#Oscars", "#NewAlbum", "#CelebrityNews", "#Netflix", "#Hollywood"].map(tag => (
                <span key={tag} className="text-pink-600 font-extrabold bg-pink-50/50 hover:bg-pink-100/70 px-4 py-2 rounded-xl text-xs cursor-pointer transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}