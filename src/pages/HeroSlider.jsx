import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSlider() {
  const [news, setNews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/api/news")
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        
        const newsArray = Array.isArray(data) ? data : data.data || data.news || [];
    
        const latestThree = [...newsArray].reverse().slice(0, 3);
        setNews(latestThree);
      })
      .catch((err) => console.error("Slider fetch error:", err));
  }, []);

  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % news.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [news]);

  if (news.length === 0) {
    return (
      <div className="w-full h-[450px] bg-gray-100 flex items-center justify-center rounded-xl animate-pulse">
        <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">Loading Slider Updates...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[450px] overflow-hidden rounded-xl shadow-lg bg-black">
      <img
        src={news[current]?.image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200"}
        alt={news[current]?.title}
        className="w-full h-full object-cover transition-all duration-700 opacity-60"
        onError={(e) => {
          e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200";
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      <div className="absolute bottom-10 left-6 right-6 md:left-10 text-white max-w-xl z-10 animate-fadeIn">
        <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded uppercase mb-3 inline-block tracking-wider">
          {news[current]?.category || "Breaking"}
        </span>

        <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight text-white drop-shadow-md">
          {news[current]?.title}
        </h2>

        <p className="mt-3 text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-2">
          {news[current]?.description || news[current]?.desc || "No comprehensive content summary available for this featured brief log entry."}
        </p>

        <Link
          to={`/NewsDetails/${news[current]?._id || news[current]?.id}`}
          className="inline-block mt-5 bg-white text-black hover:bg-red-600 hover:text-white px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md transform active:scale-95"
        >
          Read More →
        </Link>
      </div>
      <div className="absolute bottom-6 right-6 flex gap-2 z-20">
        {news.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === current ? "bg-red-600 w-6" : "bg-gray-400 hover:bg-white"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}