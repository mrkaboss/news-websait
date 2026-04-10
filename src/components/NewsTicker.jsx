import React, { useEffect, useState } from "react";
import API_URL from "../config/api.js";

export default function NewsTicker() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        // Koresha API_URL kugira ngo uhamagare Backend nyayo (http://localhost:3000)
        // Turinda gukoresha '/api/v1/news' gusa kuko Vite ishobora kwibeshya ikaduha HTML
        const response = await fetch(`${API_URL}/api/v1/news`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Genzura neza niba data ije ari array cyangwa niba iri mu kintu cyitwa .news
        const newsArray = Array.isArray(data) ? data : (data.news || data.data || []);
        setNews(newsArray);
      } catch (err) {
        console.log("Ticker Error:", err);
      }
    };

    fetchNews();
    // Ijyane kureba inkuru nshya buri munota umwe
    const interval = setInterval(fetchNews, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white py-2 overflow-hidden flex items-center">
      {/* Akamenyetso ka "LATEST" gatuma birushaho gusa n'urubuga rw'amakuru */}
      <div className="bg-red-600 px-3 py-1 text-[10px] font-black uppercase ml-4 z-10">
        Latest
      </div>
      
      {Array.isArray(news) && news.length > 0 ? (
        <marquee gradient={false} className="flex-1">
          {news.map((item) => (
            <span key={item._id || item.id} className="mx-8 font-medium text-sm tracking-wide">
              <span className="text-red-500 mr-2">●</span>
              {item.title}
            </span>
          ))}
        </marquee>
      ) : (
        <div className="flex-1 text-center text-[10px] text-gray-500 italic">
          Irimo gushaka amakuru mashya...
        </div>
      )}
    </div>
  );
}