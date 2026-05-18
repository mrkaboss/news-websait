import React, { useState, useEffect } from "react";
import API_URL from "../config/api.js";

export default function HeroSlider() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSliderNews = async () => {
      try {
        setLoading(true);
        setError("");
        
        const fullUrl = "http://localhost:3000/api/v1/news";
        const res = await fetch(fullUrl); 
        
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        
        let extractedSlides = null;

        if (Array.isArray(data)) {
          extractedSlides = data;
        } else if (data && typeof data === 'object') {
          const arrayKey = Object.keys(data).find(key => Array.isArray(data[key]));
          if (arrayKey) {
            extractedSlides = data[arrayKey];
          }
        }

        if (Array.isArray(extractedSlides)) {
    
          setSlides(extractedSlides.slice(0, 3)); 
        } else {
          throw new Error("Data format mismatch: The API object does not contain an array.");
        }

      } catch (err) {
        setError(err.message || "Failed to load slider content");
      } finally {
        setLoading(false);
      }
    };

    fetchSliderNews();
  }, []);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides]);

  if (loading) {
    return (
      <div className="h-[500px] bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || slides.length === 0) {
  
    return null; 
  }

  return (
    <div className="relative h-[500px] overflow-hidden rounded-xl">
      <img
        src={slides[current]?.image || `${API_URL}/${slides[current]?.banner}`}
        className="w-full h-full object-cover transition-all duration-700"
        alt={slides[current]?.title || "Slider Feature"}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

      <div className="absolute bottom-10 left-10 text-white max-w-xl pr-10">
        <h2 className="text-3xl font-black leading-tight drop-shadow-md">
          {slides[current]?.title}
        </h2>
        {slides[current]?.description && (
          <p className="text-sm text-gray-200 mt-2 line-clamp-2 hidden md:block opacity-90 font-medium">
            {slides[current].description}
          </p>
        )}
      </div>

      
      <div className="absolute bottom-4 right-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-6 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}