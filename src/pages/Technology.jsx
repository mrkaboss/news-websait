import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Technology() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "YOUR_GNEWS_API_KEY"; 

  useEffect(() => {
    fetch(`https://gnews.io/api/v4/search?q=technology+OR+gadgets+OR+ai+OR+software&lang=en&token=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) setNews(data.articles);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
     
      <div className="py-20 px-6 text-center bg-gradient-to-b from-blue-900 to-[#0f172a]">
        <span className="text-blue-400 font-mono text-sm uppercase tracking-[0.3em]">Future is here</span>
        <h1 className="text-5xl md:text-7xl font-black mt-4 tracking-tighter">TECHNOLOGY</h1>
        <p className="mt-4 text-blue-200 max-w-xl mx-auto opacity-80 font-light">Exploring AI, Quantum Computing, and the next-gen gadgets.</p>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        {loading ? (
          <div className="text-center py-20 text-blue-400 font-mono">System.loading()...</div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div key={index} className="bg-[#1e293b] border border-blue-900/50 rounded-lg overflow-hidden hover:border-blue-500 transition-all group">
                <img src={item.image} className="h-48 w-full object-cover grayscale group-hover:grayscale-0 transition duration-500" alt="" />
                <div className="p-6">
                  <span className="text-blue-500 text-[10px] font-bold uppercase">{item.source.name}</span>
                  <h3 className="text-lg font-bold mt-2 leading-snug group-hover:text-blue-400">{item.title}</h3>
                  <a href={item.url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-white border-b border-blue-500 pb-1 text-xs font-bold hover:text-blue-400 transition">READ_LOG_FILE</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}