import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import API_URL from "../config/api.js"; 

export default function TrendingNews() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrendingNews = async () => {
      try {
        setLoading(true);
        setError("");
        
        // Connects to your functional backend server context
        const fullUrl = "http://localhost:3000/api/v1/news";
        const res = await fetch(fullUrl); 
        
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        
        // Automatic array structure detector
        let extractedTrending = null;

        if (Array.isArray(data)) {
          extractedTrending = data;
        } else if (data && typeof data === 'object') {
          // Finds the payload array key dynamically if nested
          const arrayKey = Object.keys(data).find(key => Array.isArray(data[key]));
          if (arrayKey) {
            extractedTrending = data[arrayKey];
          }
        }

        if (Array.isArray(extractedTrending)) {
          // Sort or slice the top items to represent trending status if needed
          setTrending(extractedTrending.slice(0, 4)); 
        } else {
          throw new Error("Data format mismatch: The API object does not contain an array.");
        }

      } catch (err) {
        setError(err.message || "Failed to load trending stories");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl text-center min-h-[200px] flex flex-col justify-center items-center">
        <p className="text-red-400 font-bold text-sm">⚠️ Error Loading Trending</p>
        <p className="text-[11px] text-gray-500 mt-1 break-all max-w-xs">{error}</p>
      </div>
    );
  }

  if (trending.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
      <h2 className="text-xl font-black mb-8 flex items-center gap-2">
        <span className="text-red-500">🔥</span> TRENDING
      </h2>
      <div className="space-y-8">
        {trending.map((item, index) => (
          <div key={item._id || item.id} className="flex gap-4 items-center group cursor-pointer">
            <span className="text-4xl font-black text-gray-700 group-hover:text-red-500 transition-colors">
              0{index + 1}
            </span>
            <div className="h-16 w-16 rounded-2xl overflow-hidden flex-shrink-0">
              <img 
                src={item.image || `${API_URL}/${item.banner}`} 
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" 
                alt={item.title} 
              />
            </div>
            <div>
              <Link to={`/NewsDetails/${item._id || item.id}`}>
                <h4 className="font-bold text-sm leading-tight group-hover:underline line-clamp-2">
                  {item.title}
                </h4>
              </Link>
              <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">
                {item.views || `${Math.floor(Math.random() * 20) + 5}K`} views
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}