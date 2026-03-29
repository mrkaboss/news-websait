import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Health() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "YOUR_GNEWS_API_KEY"; 

  useEffect(() => {
    fetch(`https://gnews.io/api/v4/search?q=health+OR+medical+OR+wellness+OR+fitness&lang=en&token=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) setNews(data.articles);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
     
      <div className="bg-white border-b py-16 px-6 text-center">
        <div className="flex justify-center mb-4 text-red-500 animate-pulse">
           <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight">HEALTH & WELLNESS</h1>
        <p className="mt-2 text-gray-500">Your daily dose of medical breakthroughs and lifestyle tips.</p>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        {loading ? (
          <div className="text-center py-20 text-teal-600 font-medium italic underline">Checking vitals...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {news.map((item, index) => (
              <div key={index} className="bg-white shadow-sm border border-gray-100 rounded-3xl overflow-hidden hover:shadow-xl transition-shadow">
                <img src={item.image} className="h-40 w-full object-cover" alt="" />
                <div className="p-5">
                  <span className="text-teal-600 text-[10px] font-black uppercase tracking-widest">{item.source.name}</span>
                  <h3 className="font-bold text-gray-800 mt-2 text-sm line-clamp-3">{item.title}</h3>
                  <a href={item.url} target="_blank" rel="noreferrer" className="mt-4 block text-red-500 font-bold text-xs hover:text-red-700">Learn More →</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}