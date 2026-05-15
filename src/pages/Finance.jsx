import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Finance() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_KEY = "YOUR_GNEWS_API_KEY"; 

  useEffect(() => {
    fetch(`https://gnews.io/api/v4/search?q=finance+OR+economy+OR+business&lang=en&token=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          setNews(data.articles);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching finance news:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-emerald-900 py-12 md:py-16 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase">
            Finance & Markets
          </h1>
          <p className="mt-4 text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto">
            Stay updated with the latest economic shifts, stock market trends, and global business insights.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-10 md:py-12 px-4 sm:px-6">
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 md:mb-8 flex-wrap">
          <Link to="/" className="hover:text-emerald-700">Home</Link>
          <span>/</span>
          <span className="font-bold text-emerald-800">Finance</span>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-600 border-r-2 border-transparent"></div>
            <p className="mt-4 text-gray-500 font-medium">Analyzing markets...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {news.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 group"
              >
                
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <img
                    src={item.image || "https://via.placeholder.com/600x400?text=Finance+News"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-600 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase shadow-lg">
                      {item.source.name}
                    </span>
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 mt-3 text-sm line-clamp-3 leading-relaxed">
                    {item.description}
                  </p>
                  
                  <div className="mt-6 pt-5 border-t border-gray-50 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                    <span className="text-[11px] text-gray-400 font-medium">
                      📅 {new Date(item.publishedAt).toLocaleDateString()}
                    </span>

                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-emerald-700 font-bold text-sm flex items-center gap-1 hover:underline"
                    >
                      Read Analysis →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        
        {!loading && (
          <div className="mt-12 md:mt-16 bg-white p-6 sm:p-8 rounded-3xl border border-dashed border-emerald-200 text-center">
            <h2 className="text-lg sm:text-xl font-bold text-emerald-900">
              Get Daily Financial Insights
            </h2>

            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Subscribe to receive market updates directly in your inbox.
            </p>

            <div className="mt-6 flex flex-col md:flex-row justify-center gap-3">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="px-6 py-3 bg-gray-50 rounded-xl border-none outline-none focus:ring-2 focus:ring-emerald-500 w-full md:w-80"
              />

              <button className="bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-800 transition shadow-lg w-full md:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}