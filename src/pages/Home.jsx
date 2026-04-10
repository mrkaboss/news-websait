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
    <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", height: "480px", marginBottom: "8px" }}>
      <style>{`
        @keyframes heroZoom { from { transform: scale(1.07); } to { transform: scale(1); } }
        @keyframes heroText { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
 
      <img
        key={current}
        src={slide.image}
        alt=""
        style={{
          width: "100%", height: "100%", objectFit: "cover",
          animation: "heroZoom 5s ease forwards",
          opacity: fading ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      />
 
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
      }} />
 
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        padding: "40px 40px 32px",
        animation: fading ? "none" : "heroText 0.5s ease 0.1s both",
      }}>
        <span style={{
          display: "inline-block", background: "#DC2626", color: "#fff",
          fontSize: "10px", fontWeight: 700, letterSpacing: "2px",
          padding: "4px 12px", borderRadius: "4px", marginBottom: "12px",
          textTransform: "uppercase",
        }}>{slide.category}</span>
        <h2 style={{
          color: "#fff", fontSize: "clamp(20px, 3vw, 34px)", fontWeight: 800,
          lineHeight: 1.2, maxWidth: "660px", margin: "0 0 20px",
        }}>{slide.title}</h2>
        <a href="#" style={{
          background: "#fff", color: "#111", fontSize: "12px", fontWeight: 800,
          padding: "10px 24px", borderRadius: "50px", textDecoration: "none",
          letterSpacing: "1px", textTransform: "uppercase",
        }}>Soma byose →</a>
      </div>
 
    
      <div style={{ position: "absolute", bottom: "32px", right: "40px", display: "flex", gap: "8px" }}>
        {HERO_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === current ? "28px" : "8px", height: "8px",
            borderRadius: "4px", border: "none", cursor: "pointer", padding: 0,
            background: i === current ? "#fff" : "rgba(255,255,255,0.35)",
            transition: "all 0.3s ease",
          }} />
        ))}
      </div>
 
     
      <button
        onClick={() => goTo((current - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
        style={{
          position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
          width: "40px", height: "40px", borderRadius: "50%",
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff", fontSize: "22px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>‹</button>
      <button
        onClick={() => goTo((current + 1) % HERO_SLIDES.length)}
        style={{
          position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
          width: "40px", height: "40px", borderRadius: "50%",
          background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff", fontSize: "22px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>›</button>
    </div>
  );
}
 
 
const NewsCard = ({ article }) => (
  <div
    style={{
      background: "#fff", borderRadius: "24px", overflow: "hidden",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      transition: "transform 0.25s ease, box-shadow 0.25s ease",
      cursor: "pointer",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = "translateY(-5px)";
      e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.1)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
    }}
  >
    <div style={{ overflow: "hidden", height: "192px" }}>
      <img
        src={article.image}
        alt=""
        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      />
    </div>
    <div className="p-6">
      <span className="text-red-600 font-bold text-[10px] uppercase">{article.category}</span>
      <h3 className="font-bold text-lg mt-2 line-clamp-2 text-gray-800">{article.title}</h3>
      <Link to={`/NewsDetails/${article._id || article.id}`} className="text-blue-600 text-sm font-bold mt-4 inline-block hover:underline">
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
        if (Array.isArray(data)) {
          setNews(data);
        } else if (data.news && Array.isArray(data.news)) {
          setNews(data.news);
        }
      } catch (error) {
        console.error("Home News Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllNews();
  }, []);
 
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .card-anim { animation: fadeUp 0.5s ease both; }
        .card-anim:nth-child(1) { animation-delay: 0.05s; }
        .card-anim:nth-child(2) { animation-delay: 0.15s; }
        .card-anim:nth-child(3) { animation-delay: 0.25s; }
        .card-anim:nth-child(4) { animation-delay: 0.35s; }
        .card-anim:nth-child(5) { animation-delay: 0.45s; }
        .card-anim:nth-child(6) { animation-delay: 0.55s; }
      `}</style>
 
      <NewsTicker />
 
      <div className="max-w-7xl mx-auto px-6 py-6">
        
       
        <div className="flex justify-center gap-4 mb-8">
           <Link 
            to="/AddAds" 
            className="flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-red-700 transition-all active:scale-95 uppercase text-xs tracking-wider"
          >
            <span>📢</span> AMAMAZA
          </Link>
          <Link 
            to="/News" 
            className="flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg hover:bg-red-700 transition-all active:scale-95 uppercase text-xs tracking-wider"
          >
            <span>📰</span> NEWS
          </Link>
          <Link 
            to="/Radio" 
            className="flex items-center gap-2 bg-white text-gray-800 px-8 py-3 rounded-2xl font-black shadow-md border border-gray-100 hover:bg-gray-50 transition-all active:scale-95 uppercase text-xs tracking-wider"
          >
            <span>📻</span> RADIO LIVE
          </Link>
          <Link 
            to="/Television" 
            className="flex items-center gap-2 bg-white text-gray-800 px-8 py-3 rounded-2xl font-black shadow-md border border-gray-100 hover:bg-gray-50 transition-all active:scale-95 uppercase text-xs tracking-wider"
          >
            <span>📺</span> TELEVISION
          </Link>
        </div>

        <AnimatedHeroSlider />
       
        <HeroSlider />
      </div>
 
      <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10 py-10">
 
        <div className="lg:col-span-2 space-y-12">
          <BreakingNews />
 
          <div className="space-y-8">
            <h2 className="text-2xl font-black border-l-4 border-red-600 pl-4 uppercase tracking-tighter">
              Editor's Choice
            </h2>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                <p className="text-center col-span-full py-10">Irimo gushaka inkuru...</p>
              ) : Array.isArray(news) && news.length > 0 ? (
                news.slice(0, 6).map((item) => (
                  <div key={item._id || item.id} className="card-anim">
                    <NewsCard article={item} />
                  </div>
                ))
              ) : (
                <p className="text-center col-span-full py-10 bg-white rounded-2xl shadow-sm">
                  Nta nkuru ziri kuboneka ubu. Banza ufungure Backend Server yawe.
                </p>
              )}
            </div>
          </div>
        </div>
 
        <div className="flex flex-col gap-10">
          <Link
            to="/AddNews"
            className="flex justify-center items-center bg-blue-600 text-white w-full py-5 rounded-2xl font-black hover:bg-blue-700 shadow-lg transition-all active:scale-95 text-center uppercase tracking-widest text-sm"
          >
            + Post a Story
          </Link>
 
          <div className="space-y-10">
            <LatestNews />
            <TrendingNews />
 
            <div className="grid grid-cols-2 gap-4">
              <Link to="/sweet-news" className="bg-yellow-400 p-4 rounded-2xl text-center font-black text-xs hover:scale-105 transition shadow-sm">
                🍭 SWEET NEWS
              </Link>
              <Link to="/deep-news" className="bg-slate-800 p-4 rounded-2xl text-white text-center font-black text-xs hover:scale-105 transition shadow-sm">
                🌑 DEEP NEWS
              </Link>
            </div>
          </div>
        </div>
      </main>
 
     
      <section className="bg-gray-900 text-white py-20 mt-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-black mb-4 tracking-tighter">Stay in the Loop</h2>
          <p className="text-gray-400 mb-8 font-medium">Get the latest news delivered directly to your inbox</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-4 rounded-2xl text-black w-full md:w-96 outline-none focus:ring-2 focus:ring-red-600"
            />
            <button className="bg-red-600 px-10 py-4 rounded-2xl font-black hover:bg-red-700 transition shadow-xl uppercase text-sm">
              Subscribe
            </button>
          </div>
        </div>
      </section>
 
      
      <section className="max-w-7xl mx-auto px-6 py-14 text-center">
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/login" className="bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-300 transition">Login</Link>
          <Link to="/register" className="bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-300 transition">Register</Link>
          <Link to="/AdminLogin" className="bg-red-50 text-red-600 font-bold px-8 py-3 rounded-xl hover:bg-red-100 transition">Admin Panel</Link>
        </div>
      </section>
    </div>
  );
}