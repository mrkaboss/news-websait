import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "YOUR_GNEWS_API_KEY"; 

  useEffect(() => {
    fetch(`https://gnews.io/api/v4/top-headlines?lang=en&token=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          setNews(data.articles);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {news.map((item, index) => (
  <div key={index} className="news-card">
    <img src={item.image} alt={item.title} />
    <h3>{item.title}</h3>
    <Link 
      to={`/NewsDetails/${index}`} 
      className="text-blue-600 font-bold"
    >
      Read More →
    </Link>
  </div>
))}
      <div className="max-w-7xl mx-auto py-10 px-6">
        
{news.map((item) => (
  <div key={item.id} className="bg-white p-4 rounded-xl shadow">
    <img src={item.image} alt="" className="w-full h-40 object-cover rounded-lg" />
    <h3 className="font-bold mt-2">{item.title}</h3>
    
   
    <Link 
      to={`/NewsDetails/${item.id}`} 
      className="mt-4 inline-block text-blue-600 font-bold text-sm hover:underline"
    >
      Read More →
    </Link>
  </div>
))}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg grid md:grid-cols-2 mb-12 border-l-4 border-blue-600">
          <img src="Logo-photo.jpeg" alt="Logo" className="w-full h-full object-cover" />
          <div className="p-8 flex flex-col justify-center">
            <span className="text-sm text-blue-600 font-bold uppercase tracking-widest italic">Breaking News</span>
            <h1 className="text-3xl font-bold mt-4 text-gray-900">Global Leaders Meet to Discuss Economy</h1>
            <p className="text-gray-500 mt-3 leading-relaxed">Leaders from different countries meet to discuss global economic challenges and solutions for the future.</p>
            <button className="mt-6 bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 w-fit transition-all shadow-md">Read More</button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {news.slice(0, 3).map((item, index) => (
            <div key={index} className="bg-white shadow-sm rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition">
              <img src={item.image} alt="" className="h-44 w-full object-cover" />
              <div className="p-5">
                <h3 className="font-bold text-gray-800 line-clamp-2 leading-tight">{item.title}</h3>
                <a href={item.url} target="_blank" rel="noreferrer" className="text-red-600 font-bold text-xs mt-4 block uppercase tracking-tighter">Read full story →</a>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-600 rounded-full"></span> Trending Categories
          </h2>
          <div className="flex flex-wrap gap-4">
            {["Technology", "Politics", "Sports", "Health", "Entertainment", "Finance" ,"World" , ""].map((cat) => (
              <Link key={cat} to={`/${cat}`} className="bg-white px-6 py-3 rounded-xl shadow-sm border border-gray-200 font-semibold text-gray-700 hover:bg-blue-600 hover:text-white transition-all">
                {cat}
              </Link>
            ))}
          </div>
        </div>

        <div className="pb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Latest News</h2>
            <Link to="/Business" className="text-blue-600 font-semibold hover:underline">View all Business →</Link>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400 italic">Fetching the latest headlines...</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {news.map((item, index) => (
                <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col border border-gray-100">
                  <img src={item.image || "https://via.placeholder.com/300"} alt={item.title} className="h-40 w-full object-cover" />
                  <div className="p-4 flex-grow flex flex-col">
                    <span className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{item.source.name}</span>
                    <h3 className="font-bold mt-2 text-sm text-gray-800 line-clamp-2 leading-snug">{item.title}</h3>
                    <div className="mt-auto pt-4 flex justify-between items-center border-t border-gray-50">
                      <span className="text-gray-400 text-[10px]">{new Date(item.publishedAt).toLocaleDateString()}</span>
                      <Link to="/Business" className="text-red-600 text-[10px] font-bold uppercase hover:underline">View</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-gray-900 rounded-3xl p-10 text-white flex flex-col md:flex-row items-center justify-between mb-16 shadow-2xl">
          <div className="md:max-w-md mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-2">Subscribe to our Newsletter</h2>
            <p className="text-gray-400">Get the most important stories delivered to your inbox every morning.</p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input type="email" placeholder="Enter your email" className="bg-gray-800 border border-gray-700 px-6 py-3 rounded-full outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64 text-sm" />
            <button className="bg-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition shadow-lg">Join</button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 border-t pt-12">
          <p className="text-gray-400 text-sm">© 2026 MyNews Platform. All rights reserved.</p>
          <Link to="/" className="bg-red-600 text-white px-10 py-3 rounded-full font-bold hover:bg-red-700 transition shadow-lg transform active:scale-95">
            Back Home
          </Link>
        </div>

      </div>
    </div>
  );
}