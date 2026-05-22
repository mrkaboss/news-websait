import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api.js";

export default function HeroSlider() {
  const [news, setNews] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/news`)
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        const newsArray = Array.isArray(data) ? data : (data.data || data.news || []);
        
        const latestThree = [...newsArray].reverse().slice(0, 3);
        setNews(latestThree);
      })
      .catch((err) => console.error("Slider fetch error:", err));
  }, []);

  useEffect(() => {
    if (news.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % news.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [news]);

  if (news.length === 0) {
    return (
      <div className="w-full h-[450px] bg-slate-900 flex items-center justify-center rounded-xl animate-pulse">
        <p className="text-slate-500 font-bold text-sm tracking-widest uppercase">
          Loading Slider Updates...
        </p>
      </div>
    );
  }
  const slide = news[current];
  let imgSrc = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200";
  if (slide?.image) {
    if (slide.image.startsWith("http://") || slide.image.startsWith("https://")) {
      imgSrc = slide.image.replace("http://", "https://");
    } else {
      const cleanPath = slide.image.startsWith("/") ? slide.image : `/${slide.image}`;
      imgSrc = `${API_URL}${cleanPath}`;
    }
  }

  return (
    <div className="relative w-full h-[450px] overflow-hidden rounded-xl shadow-xl bg-slate-950 group">
      
      <img
        key={current}
        src={imgSrc}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-70 transition-all duration-1000 ease-in-out"
        onError={(e) => {
          e.currentTarget.src = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200";
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
      <div className="absolute bottom-10 left-6 right-6 md:left-10 text-white max-w-xl z-10">
        {slide?.category && (
          <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded uppercase mb-3 inline-block tracking-wider">
            {slide.category}
          </span>
        )}

        <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight text-white drop-shadow-md">
          {slide?.title}
        </h2>

        <p className="mt-3 text-slate-300 text-xs md:text-sm leading-relaxed line-clamp-2">
          {slide?.content || slide?.description || ""}
        </p>

        <Link
          to={`/NewsDetails/${slide?._id || slide?.id}`}
          className="inline-block mt-5 bg-white text-black hover:bg-red-600 hover:text-white px-6 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95"
        >
          Read More →
        </Link>
      </div>

      <div className="absolute bottom-6 right-6 flex gap-2 z-20">
        {news.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === current ? "bg-red-600 w-6" : "w-3 bg-slate-600 hover:bg-white"
            }`}
          />
        ))}
      </div>

    </div>
  );
}