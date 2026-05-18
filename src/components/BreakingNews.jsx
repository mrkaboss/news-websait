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
        
        const fullUrl = "http://localhost:3000/api/v1/news";
        const res = await fetch(fullUrl); 
        
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
          setStories(extractedStories); 
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
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
            Check if your backend server port matches your config settings.
          </p>
        </div>
      </div>
    );
  }

  if (stories.length === 0) {
    return null; 
  }

  return (
    <div className="min-h-[60vh] bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex items-center gap-3 mb-10 border-b-4 border-red-600 w-fit pb-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
          </span>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-gray-900">Breaking News</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story) => (
            <div key={story._id || story.id} className="group relative overflow-hidden rounded-[2rem] bg-black h-[450px] shadow-xl">
              <img 
                src={story.image || `${API_URL}/${story.banner}`} 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700" 
                alt={story.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              
              <div className="absolute bottom-0 p-8">
                <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">
                  {story.category}
                </span>
                <h3 className="text-white text-2xl md:text-3xl font-black mb-4 leading-tight">
                  {story.title}
                </h3>
                <p className="text-gray-300 text-sm mb-6 line-clamp-2 italic">
                  {story.description || story.desc}
                </p>
                <Link 
                  to={`/NewsDetails/${story._id || story.id}`} 
                  className="inline-block bg-white text-black px-6 py-2 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition-colors"
                >
                  Read Full Story
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;