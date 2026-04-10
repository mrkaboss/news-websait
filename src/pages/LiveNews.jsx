import { useEffect, useState } from "react";

const GNEWS_TOKEN = "83e48abea3b22adbd93e09705541f80b";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}

function NewsCard({ item, index }) {
  const isFeature = index === 0;

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isFeature ? "md:col-span-2 md:row-span-2" : ""
      }`}
      style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
    >
     
      <div className={`overflow-hidden ${isFeature ? "h-72" : "h-44"} relative`}>
        <img
          src={item.image || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"; }}
        />
        
        <span className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
          Live
        </span>
        
        <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[10px] font-bold px-3 py-1 rounded-full backdrop-blur-sm">
          {item.source?.name || "Global News"}
        </span>
      </div>

      
      <div className={`p-5 ${isFeature ? "p-7" : ""}`}>
        <h3
          className={`font-black text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-red-600 transition-colors ${
            isFeature ? "text-2xl" : "text-sm"
          }`}
        >
          {item.title}
        </h3>

        {isFeature && item.description && (
          <p className="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">
            {item.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xs text-gray-400">
            {item.publishedAt
              ? new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
              : "Just now"}
          </span>
          <a
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-black text-red-600 hover:underline"
          >
            Soma →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function LiveNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchNews = async () => {
    try {
      setError(false);
      const res = await fetch(
        `https://gnews.io/api/v4/top-headlines?lang=en&max=9&token=${GNEWS_TOKEN}`
      );
      const data = await res.json();
      if (data.articles) {
        setNews(data.articles);
        setLastUpdated(new Date());
      }
    } catch (err) {
      console.error("LiveNews Error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 5 * 60 * 1000); // Refresh buri miunota 5
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4 font-sans">
      <div className="max-w-7xl mx-auto">

        
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="w-1 h-8 bg-red-600 rounded-full" />
            <div>
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Live News</h1>
              {lastUpdated && (
                <p className="text-xs text-gray-400 mt-0.5">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>

          <button
            onClick={fetchNews}
            className="flex items-center gap-2 text-xs font-black text-red-600 border border-red-200 px-4 py-2 rounded-full hover:bg-red-50 transition"
          >
            ↻ Refresh
          </button>
        </div>

        
        {error && (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <p className="text-gray-400 font-bold text-lg mb-4">Habaye ikibazo mu gushaka inkuru</p>
            <button
              onClick={fetchNews}
              className="bg-red-600 text-white px-8 py-3 rounded-xl font-black hover:bg-red-700 transition text-sm"
            >
              Ongera Gerageza
            </button>
          </div>
        )}

       
        {loading && !error && (
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

       
        {!loading && !error && news.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 auto-rows-auto">
            {news.map((item, i) => (
              <NewsCard key={i} item={item} index={i} />
            ))}
          </div>
        )}

       
        {!loading && !error && news.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl">
            <p className="text-gray-400 font-bold">Nta nkuru ziboneka ubu.</p>
          </div>
        )}
      </div>
    </div>
  );
}