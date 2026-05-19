import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api.js";

export default function Technology() {
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
    if (!window.confirm("Are you sure you want to permanently delete this technology log?")) return;

    try {
      const response = await fetch(`${API_URL}/api/v1/news/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Target entry metrics could not be purged from api database endpoints.");
      }

    
      setNews((prevNews) => prevNews.filter((item) => (item._id || item.id) !== id));
    } catch (err) {
      console.error("Deletion Processing Error:", err);
      alert("Failed to drop article. Please check your system connectivity metrics.");
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white font-sans antialiased pb-12">
      
      <div className="py-20 px-6 text-center bg-gradient-to-b from-blue-950 to-[#0f172a] border-b border-blue-900/30">
        <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.3em] bg-blue-950/80 border border-blue-800/50 px-4 py-1.5 rounded-full">
          Future is here
        </span>
        <h1 className="text-5xl md:text-7xl font-black mt-6 tracking-tighter">
          TECHNOLOGY
        </h1>
        <p className="mt-4 text-blue-200/80 max-w-xl mx-auto text-sm sm:text-base font-light leading-relaxed">
          Exploring AI, Quantum Computing, software architectures, and next-gen hardware logs.
        </p>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex items-center justify-between border-b border-blue-900/40 pb-5 mb-10">
          <div className="text-xs font-mono text-blue-400 uppercase tracking-wider">
            [system_status]: {news.length} logs_loaded
          </div>
          <Link to="/" className="text-slate-400 hover:text-blue-400 font-mono text-xs uppercase tracking-widest transition-colors">
            // back_home
          </Link>
        </div>
        {loading && (
          <div className="text-center py-24 bg-[#141f32] rounded-2xl border border-blue-900/30 shadow-inner">
            <div className="text-blue-400 font-mono text-sm tracking-widest animate-pulse">
              System.loading_data_streams()...
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-24 bg-[#141f32] rounded-2xl border border-blue-900/40">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-slate-400 font-mono text-xs mb-6 uppercase tracking-wider">ERR_CONNECTION_REFUSED: failed to sync nodes</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 hover:bg-blue-500 text-white font-mono px-8 py-3 rounded-lg text-xs uppercase tracking-widest transition-all shadow-md active:scale-95"
            >
              retry_handshake
            </button>
          </div>
        )}
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-24 bg-[#141f32] rounded-2xl border border-dashed border-blue-900/40">
            <p className="text-4xl mb-3">💾</p>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-wider">Index empty: no configuration logs matching category</p>
          </div>
        )}
        {!loading && !error && news.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div 
                key={item._id || item.id || index} 
                className="bg-[#1e293b] border border-blue-900/40 rounded-2xl overflow-hidden hover:border-blue-500 transition-all duration-300 group flex flex-col relative shadow-xl"
              >
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDelete(item._id || item.id);
                  }}
                  className="absolute top-4 right-4 z-20 bg-slate-900/90 hover:bg-red-600 p-2 rounded-full text-red-500 hover:text-white transition-colors border border-blue-900/50 shadow-lg backdrop-blur-sm"
                  title="Purge Log"
                >
                  <span className="text-xs block transform active:scale-90">🗑️</span>
                </button>

                <div className="h-48 w-full overflow-hidden bg-slate-950 relative">
                  <img 
                    src={item.image || `${API_URL}/${item.banner}`} 
                    className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-102" 
                    alt={item.title} 
                    onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b]/80 to-transparent"></div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-blue-400 font-mono text-[10px] uppercase tracking-widest bg-blue-950/80 border border-blue-900/60 px-2.5 py-1 rounded-md self-start">
                    {item.category || "Tech_Log"}
                  </span>

                  <h3 className="text-lg font-bold mt-4 leading-snug text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 mt-2 text-xs line-clamp-2 leading-relaxed font-light mb-6">
                    {item.description || item.desc || "No nested index breakdown logs submitted within this standard infrastructure cluster frame."}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-blue-900/30 flex items-center justify-between gap-2">
                    <span className="text-[10px] text-slate-500 font-mono tracking-wider uppercase">
                      TIMESTAMP // {item.createdAt || item.publishedAt
                        ? new Date(item.createdAt || item.publishedAt).toLocaleDateString("en-US", {
                            month: "short", day: "numeric"
                          })
                        : "LIVE"}
                    </span>

                    <Link 
                      to={`/NewsDetails/${item._id || item.id}`} 
                      className="text-white border-b border-blue-500 pb-0.5 text-xs font-mono tracking-wide hover:text-blue-400 hover:border-blue-400 transition-colors flex items-center gap-1"
                    >
                      READ_LOG_FILE <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
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