import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import API_URL from "../config/api.js"; 

const BreakingNews = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBreakingNews = async () => {
      try {
        setLoading(true);
        setError("");
        
        
        const res = await fetch(`${API_URL}/api/v1/news`); 
        
        if (!res.ok) {
          throw new Error(`Server responded with status: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        let extractedStories = null;

        if (Array.isArray(data)) {
          extractedStories = data;
        } else if (data && typeof data === 'object') {
          const arrayKey = Object.keys(data).find(key => Array.isArray(data[key]));
          if (arrayKey) {
            extractedStories = data[arrayKey];
          }
        }

        if (Array.isArray(extractedStories)) {
        
          setStories(extractedStories.slice(0, 4)); 
        } else {
          throw new Error("Data format mismatch: The API object does not contain an array.");
        }

      } catch (err) {
        setError(err.message || "Failed to load stories from server");
      } finally {
        setLoading(false);
      }
    };

    fetchBreakingNews();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center bg-white text-red-500 font-semibold p-4 text-center">
        <div className="max-w-md">
          <p className="text-xl mb-2">⚠️ Connection Error</p>
          <p className="text-sm text-gray-500 font-normal bg-gray-50 p-3 rounded-xl border border-gray-100 break-all">
            {error}
          </p>
          <p className="text-xs text-gray-400 mt-2 font-normal">
            Check if your backend server is running and matches your configuration.
          </p>
        </div>
      </div>
    );
  }

  if (stories.length === 0) {
    return null; 
  }

  return (
    <div className="min-h-[60vh] bg-white py-12 font-sans antialiased">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex items-center gap-3 mb-10 border-b-4 border-red-600 w-fit pb-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Breaking News</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story._id || story.id} className="group relative overflow-hidden rounded-[2rem] bg-black h-[450px] shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src={story.image || `${API_URL}/${story.banner}`} 
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                alt={story.title}
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                <div>
                  <span className="bg-red-600 text-white text-[9px] font-black px-3 py-1 rounded-md uppercase mb-3 inline-block tracking-wider shadow-sm">
                    {story.category || "Hot"}
                  </span>
                  
                  <h3 className="text-white text-xl md:text-2xl font-black mb-3 leading-snug tracking-tight line-clamp-2 group-hover:text-red-400 transition-colors">
                    {story.title}
                  </h3>
                  
                  <p className="text-gray-300 text-xs mb-5 line-clamp-2 italic leading-relaxed">
                    "{story.description || story.desc || "No brief summary logging registered for this event item track."}"
                  </p>
                  
                  <Link 
                    to={`/NewsDetails/${story._id || story.id}`} 
                    className="inline-block bg-white text-black px-5 py-2 rounded-xl font-black text-xs uppercase tracking-wider hover:bg-red-600 hover:text-white transition-all shadow-md transform active:scale-95"
                  >
                    Read Full Story
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default BreakingNews;