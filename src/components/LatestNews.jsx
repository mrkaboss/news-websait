import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function LatestNews() {
  const [latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true);
        setError("");
        
        const fullUrl = "http://localhost:3000/api/v1/news";
        const res = await fetch(fullUrl); 
        
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
      
        let extractedLatest = null;

        if (Array.isArray(data)) {
          extractedLatest = data;
        } else if (data && typeof data === 'object') {
        
          const arrayKey = Object.keys(data).find(key => Array.isArray(data[key]));
          if (arrayKey) {
            extractedLatest = data[arrayKey];
          }
        }

        if (Array.isArray(extractedLatest)) {
      
          setLatest(extractedLatest.slice(0, 3)); 
        } else {
          throw new Error("Data format mismatch: The API object does not contain an array.");
        }

      } catch (err) {
        setError(err.message || "Failed to load latest stories");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 text-center min-h-[200px] flex flex-col justify-center items-center">
        <p className="text-red-500 font-bold text-sm">⚠️ Error Loading Latest Feed</p>
        <p className="text-[11px] text-gray-400 mt-1 break-all max-w-xs">{error}</p>
      </div>
    );
  }

  if (latest.length === 0) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-black mb-6 border-l-4 border-blue-600 pl-4 uppercase">Latest News</h2>
      <div className="space-y-6">
        {latest.map((item) => (
          <div key={item._id || item.id} className="group border-b pb-4 last:border-0">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
              {item.category || "General"}
            </span>
            <Link to={`/NewsDetails/${item._id || item.id}`}>
              <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 mt-0.5">
                {item.title}
              </h3>
            </Link>
            <p className="text-xs text-gray-400 mt-1">
              {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : "Just Now"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}