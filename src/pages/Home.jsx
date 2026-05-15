import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import BreakingNews from "../components/BreakingNews";
import LatestNews from "../components/LatestNews";
import TrendingNews from "../components/TrendingNews";
import NewsTicker from "../components/NewsTicker";

import API_URL from "../config/api.js";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1400&q=80",
    category: "World",
    title: "Global Leaders Gather for Historic Climate Summit",
  },
  {
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1400&q=80",
    category: "Sports",
    title: "Tour du Rwanda 2026: Imyiteguro igeze kure",
  },
  {
    image: "https://images.unsplash.com/photo-1526378787940-576a539ba69d?w=1400&q=80",
    category: "Technology",
    title: "Africa's Tech Boom: Kigali Leads the Charge",
  },
];

function AnimatedHeroSlider() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const goTo = (idx) => {
    setFading(true);
    setTimeout(() => {
      setCurrent(typeof idx === "function" ? idx(current) : idx);
      setFading(false);
    }, 400);
  };

  useEffect(() => {
    const t = setInterval(() => goTo((prev) => (prev + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const slide = HERO_SLIDES[current];

  return (
    <div className="relative rounded-[24px] overflow-hidden w-full min-h-[320px] md:h-[480px] mb-4">
      <style>{`
        @keyframes heroZoom { from { transform: scale(1.07); } to { transform: scale(1); } }
        @keyframes heroText { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <img
        key={current}
        src={slide.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-400"
        style={{
          animation: "heroZoom 5s ease forwards",
          opacity: fading ? 0 : 1,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10"
           style={{ animation: fading ? "none" : "heroText 0.5s ease 0.1s both" }}>
        <span className="inline-block bg-red-600 text-white text-[10px] font-bold tracking-widest px-3 py-1 rounded mb-3 uppercase">
          {slide.category}
        </span>
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-black leading-tight max-w-2xl mb-6">
          {slide.title}
        </h2>
        <a href="#" className="inline-block bg-white text-black text-[11px] font-extrabold px-6 py-3 rounded-full uppercase tracking-wider hover:bg-red-600 hover:text-white transition-colors">
          Soma byose →
        </a>
      </div>

      <div className="absolute bottom-8 right-6 md:right-10 flex gap-2">
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} 
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-7 bg-white" : "w-2 bg-white/40"}`} 
          />
        ))}
      </div>
    </div>
  );
}

const NewsCard = ({ article }) => (
  <div className="bg-white rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer h-full border border-gray-100">
    <div className="overflow-hidden h-48">
      <img
        src={article.image}
        alt=""
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <div className="p-5">
      <span className="text-red-600 font-bold text-[10px] uppercase tracking-wider">{article.category}</span>
      <h3 className="font-bold text-lg mt-2 line-clamp-2 text-gray-800 group-hover:text-red-600 transition-colors">
        {article.title}
      </h3>
      <Link to={`/NewsDetails/${article._id || article.id}`} className="text-blue-600 text-sm font-bold mt-4 inline-block">
        Soma byose →
      </Link>
    </div>
  </div>
);

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const response = await fetch('/api/v1/news');
        const data = await response.json();
        setNews(Array.isArray(data) ? data : (data.news || []));
      } catch (error) {
        console.error("Home News Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNews();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen font-sans overflow-x-hidden">
      <NewsTicker />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        
        {/* Navigation Buttons - Responsive Wrap */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
          {[
            { to: "/AddAds", icon: "📢", label: "Create Ad", color: "bg-red-600" },
            { to: "/Live", icon: "📰", label: "Go Live", color: "bg-red-600" },
            { to: "/Radio", icon: "📻", label: "Radio Live", color: "bg-white", text: "text-gray-800" },
            { to: "/Television", icon: "📺", label: "Television", color: "bg-white", text: "text-gray-800" },
          ].map((btn, idx) => (
            <Link key={idx} to={btn.to} 
              className={`flex items-center gap-2 ${btn.color} ${btn.text || "text-white"} px-5 md:px-8 py-3 rounded-2xl font-black shadow-md hover:-translate-y-1 transition-all active:scale-95 uppercase text-[10px] md:text-xs tracking-wider border border-transparent ${btn.color === 'bg-white' ? 'border-gray-100' : ''}`}>
              <span>{btn.icon}</span> {btn.label}
            </Link>
          ))}
        </div>

        <AnimatedHeroSlider />
        <HeroSlider />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-3 gap-10 py-10">

        <div className="lg:col-span-2 space-y-12">
          <BreakingNews />

          <div className="space-y-8">
            <h2 className="text-2xl font-black border-l-4 border-red-600 pl-4 uppercase tracking-tighter text-gray-900">
              Editor's Choice
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                <div className="col-span-full py-20 text-center flex flex-col items-center">
                  <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
                  <p className="font-bold text-gray-500">Irimo gushaka inkuru...</p>
                </div>
              ) : news.length > 0 ? (
                news.slice(0, 6).map((item) => <NewsCard key={item._id || item.id} article={item} />)
              ) : (
                <div className="col-span-full py-16 bg-white rounded-3xl text-center shadow-sm border border-dashed border-gray-300">
                  <p className="text-gray-500 font-medium">Nta nkuru ziri kuboneka ubu.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-10">
          <Link to="/AddNews" className="flex justify-center items-center bg-blue-600 text-white w-full py-5 rounded-2xl font-black hover:bg-blue-700 shadow-lg transition-all active:scale-95 text-center uppercase tracking-widest text-sm">
            + Post a Story
          </Link>

          <div className="bg-white p-6 rounded-3xl shadow-sm space-y-10">
            <LatestNews />
            <TrendingNews />
            
            <div className="grid grid-cols-2 gap-3">
              <Link to="/sweet-news" className="bg-yellow-400 p-4 rounded-2xl text-center font-black text-[10px] hover:brightness-105 transition shadow-sm">
                🍭 SWEET NEWS
              </Link>
              <Link to="/deep-news" className="bg-slate-800 p-4 rounded-2xl text-white text-center font-black text-[10px] hover:brightness-125 transition shadow-sm">
                🌑 DEEP NEWS
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Newsletter Section */}
      <section className="bg-[#8B17AD] text-white py-16 md:py-24 mt-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter">Stay in the Loop</h2>
          <p className="text-purple-100 mb-10 font-medium opacity-90">Get the latest news delivered directly to your inbox</p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-4 rounded-2xl text-black w-full sm:max-w-md outline-none focus:ring-4 focus:ring-white/20 transition-all"
            />
            <button className="bg-red-600 px-10 py-4 rounded-2xl font-black hover:bg-red-700 transition-all shadow-xl uppercase text-sm w-full sm:w-auto">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Admin/Auth Links */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-wrap justify-center gap-4 bg-[#6A7B33] p-8 md:p-12 rounded-[2rem]">
          <Link to="/login" className="bg-white/90 backdrop-blur text-gray-800 font-bold px-8 py-3 rounded-xl hover:bg-white transition flex-1 sm:flex-none text-center">
            Login
          </Link>
          <Link to="/register" className="bg-white/90 backdrop-blur text-gray-800 font-bold px-8 py-3 rounded-xl hover:bg-white transition flex-1 sm:flex-none text-center">
            Register
          </Link>
          <Link to="/AdminLogin" className="bg-red-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-red-700 transition flex-1 sm:flex-none text-center">
            Admin Panel
          </Link>
        </div>
      </section>
    </div>
  );
}