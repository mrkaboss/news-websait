import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../config/api.js";

export default function HeroSlider() {
  const [news, setNews]       = useState([]);
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded]   = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/v1/news`) 
      .then((res) => {
        if (!res.ok) throw new Error("Server error");
        return res.json();
      })
      .then((data) => {
        const newsArray  = Array.isArray(data) ? data : (data.data || data.news || []);
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
        <p className="text-gray-400 font-bold text-sm tracking-widest uppercase">
          Loading Slider...
        </p>
      </div>
    );
  }

  const slide = news[current];

  
  const imgSrc = slide?.image
    ? slide.image.startsWith("http")
      ? slide.image
      : `${API_URL}${slide.image}`
    : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200";

  return (
    <div className="relative w-full h-[450px] overflow-hidden rounded-xl shadow-lg bg-black">

      <img
        key={current} 
        src={imgSrc}
        alt={slide?.title}
        className={`w-full h-full object-cover transition-opacity duration-700 ${
          loaded ? "opacity-60" : "opacity-0" 
        }`}
        onLoad={() => setLoaded(true)}   
        onError={(e) => {
          e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200";
          setLoaded(true);
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      <div className="absolute bottom-10 left-6 right-6 md:left-10 text-white max-w-xl z-10">
        <span className="bg-red-600 text-white text-[10px] font-black px-2.5 py-1 rounded uppercase mb-3 inline-block tracking-wider">
          {slide?.category || "Breaking"}
        </span>

        <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight text-white drop-shadow-md">
          {slide?.title}
        </h2>

        <p className="mt-3 text-gray-300 text-xs md:text-sm leading-relaxed line-clamp-2">
          {slide?.description || slide?.content?.substring(0, 120) || ""}
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
            onClick={() => { setCurrent(index); setLoaded(false); }}
            className={`h-3 rounded-full cursor-pointer transition-all duration-300 ${
              index === current ? "bg-red-600 w-6" : "w-3 bg-gray-400 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </div>
  );
}