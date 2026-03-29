import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CategoryNews() {
  const { categoryName } = useParams(); // Ifata izina rya category riri muri URL
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "YOUR_GNEWS_API_KEY"; 

  useEffect(() => {
    setLoading(true);
    // GNews API ikoresha "q" cyangwa "topic" kugira ngo ishake category runaka
    fetch(`https://gnews.io/api/v4/search?q=${categoryName}&lang=en&token=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          setNews(data.articles);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [categoryName]); 
  return (
    <div className="bg-white min-h-screen">
      {/* Header ya Category */}
      <div className="bg-blue-600 py-16 text-center text-white">
        <h1 className="text-4xl font-extrabold uppercase tracking-widest">
          {categoryName} News
        </h1>
        <p className="mt-2 text-blue-100">Latest updates from the world of {categoryName}</p>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <Link to="/" className="text-gray-500 hover:text-blue-600 font-medium">
            ← Back to Home
          </Link>
          <span className="text-sm font-bold text-blue-600 bg-blue-50 px-4 py-1 rounded-full uppercase">
            {news.length} Articles Found
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-2xl">
                  <img 
                    src={item.image || "https://via.placeholder.com/600x400"} 
                    alt="" 
                    className="h-64 w-full object-cover transform group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase">
                      {item.source.name}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 mt-2 text-sm line-clamp-3">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-400">
                      {new Date(item.publishedAt).toDateString()}
                    </span>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="font-bold text-blue-600 text-sm hover:underline"
                    >
                      Read Story
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {news.length === 0 && !loading && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-400">No news found for this category.</h2>
          </div>
        )}
      </div>
    </div>
  );
}