import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API_URL from "../config/api.js";

const CATEGORIES = ["All", "Sports", "Technology", "World", "Politics", "Business", "Culture"];

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl overflow-hidden animate-pulse">
      <div className="h-56 bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="h-5 bg-gray-200 rounded w-full" />
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
  );
}

function NewsCard({ item, index, featured }) {
  return (
    <div
      className={`bg-white rounded-3xl overflow-hidden group flex flex-col transition-all duration-300 hover:-translate-y-1 ${
        featured ? "md:col-span-2" : ""
      }`}
      style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
    >
      <div className={`overflow-hidden relative ${featured ? "h-72" : "h-52"}`}>
        <img
          src={item.image || item.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80"; }}
        />
        
        <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest shadow-md">
          {item.category || item.source?.name || "News"}
        </span>
        {featured && (
          <span className="absolute top-4 right-4 bg-black/70 text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm">
            ★ Featured
          </span>
        )}
       
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className={`p-6 flex flex-col flex-grow ${featured ? "p-8" : ""}`}>
        <h3
          className={`font-black text-gray-900 leading-snug mb-3 line-clamp-2 group-hover:text-red-600 transition-colors ${
            featured ? "text-2xl" : "text-base"
          }`}
        >
          {item.title}
        </h3>

        {item.description && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">
            {item.description}
          </p>
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-gray-400 text-[11px] font-bold uppercase tracking-wide">
            {item.createdAt || item.publishedAt
              ? new Date(item.createdAt || item.publishedAt).toLocaleDateString("en-US", {
                  month: "short", day: "numeric", year: "numeric",
                })
              : new Date().toDateString()}
          </span>
          <Link
            to={`/NewsDetails/${item._id || index}`}
            className="bg-gray-900 text-white text-[10px] font-black px-5 py-2.5 rounded-2xl uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95"
          >
            Soma →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(false);
        const response = await fetch(`${API_URL}/api/v1/news`);
        const data = await response.json();

        const newsArray = Array.isArray(data)
          ? data
          : data.data || data.news || data.articles || [];

        setNews(newsArray);
      } catch (err) {
        console.error("News Error:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filtered = news
    .filter(item =>
      activeCategory === "All" ||
      item.category?.toLowerCase() === activeCategory.toLowerCase()
    )
    .filter(item =>
      search === "" ||
      item.title?.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <div className="max-w-7xl mx-auto py-10 px-6">

        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6 border-b pb-8">
          <div>
            <p className="text-red-600 text-[10px] font-black uppercase tracking-[4px] mb-2">
              {new Date().toDateString()}
            </p>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter leading-none">
              GLOBAL <span className="text-red-600">NEWS</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1 font-medium">
              {news.length} inkuru ziboneka
            </p>
          </div>

          
          <div className="relative w-full md:w-72">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
            <input
              type="text"
              placeholder="Shakisha inkuru..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl border border-gray-200 bg-white text-sm font-medium outline-none focus:ring-2 focus:ring-red-500 transition"
            />
          </div>
        </div>

        
        <div className="flex gap-2 flex-wrap mb-10">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-widest border transition-all ${
                activeCategory === cat
                  ? "bg-red-600 text-white border-red-600"
                  : "bg-white text-gray-500 border-gray-200 hover:border-red-300 hover:text-red-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

       
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        
        {error && !loading && (
          <div className="text-center py-32 bg-white rounded-3xl shadow-sm">
            <p className="text-5xl mb-4">📡</p>
            <p className="text-gray-400 font-bold text-lg mb-6">Backend ntiyunganye — Fungura server yawe</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-red-700 transition"
            >
              Ongera Gerageza
            </button>
          </div>
        )}

       
        {!loading && !error && filtered.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((item, index) => (
              <NewsCard
                key={item._id || index}
                item={item}
                index={index}
                featured={index === 0}
              />
            ))}
          </div>
        )}

        
        {!loading && !error && filtered.length === 0 && (
          <div className="text-center py-32 bg-white rounded-3xl shadow-sm">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-gray-400 font-bold text-lg">Nta nkuru ziboneka muri iki cyiciro</p>
          </div>
        )}
      </div>
    </div>
  );
}