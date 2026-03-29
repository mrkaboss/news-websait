import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import BreakingNews from "../components/BreakingNews";
import LatestNews from "../components/LatestNews";
import TrendingNews from "../components/TrendingNews";
import NewsTicker from "../components/NewsTicker";

export default function Home() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.log("Error fetching news:", err));
    
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      <NewsTicker />
      <div className="max-w-7xl mx-auto px-6 py-6">
        <HeroSlider />
      </div>
      <main className="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10 py-10">

        <div className="lg:col-span-2 space-y-12">
          <BreakingNews /> 
          {news.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-2xl font-black border-l-4 border-red-600 pl-4 uppercase">Editor's Choice</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {news.slice(0, 4).map((item) => (
                  <div key={item._id || item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition">
                    <img src={item.image} alt="" className="w-full h-48 object-cover" />
                    <div className="p-6">
                      <span className="text-red-600 font-bold text-[10px] uppercase">{item.category}</span>
                      <h3 className="font-bold text-lg mt-2 line-clamp-2">{item.title}</h3>
                      <Link to={`/NewsDetails/${item._id || item.id}`} className="text-blue-600 text-sm font-bold mt-4 inline-block">
                        Read More →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-10">
           <div className="w-full">
            <Link 
              to="/AddNews" 
              className="flex justify-center items-center bg-blue-600 text-white w-full py-4 rounded-2xl font-black hover:bg-blue-700 shadow-lg transition-all active:scale-95"
            >
              + POST A STORY
            </Link>
          </div>

          <LatestNews />   
          <TrendingNews /> 
        </div>
      </main>
      <section className="bg-gray-900 text-white py-20 mt-20">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-black mb-4">Stay in the Loop</h2>
          <p className="text-gray-400 mb-8 font-medium">Get the latest news delivered directly to your inbox</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email address"
              className="px-6 py-4 rounded-2xl text-black w-full md:w-96 outline-none focus:ring-2 focus:ring-red-600"
            />
            <button className="bg-red-600 px-10 py-4 rounded-2xl font-black hover:bg-red-700 transition shadow-xl">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-14 text-center">
        <div className="flex justify-center gap-4 flex-wrap">
          <Link to="/login" className="bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-300">Login</Link>
          <Link to="/register" className="bg-gray-200 text-gray-700 font-bold px-8 py-3 rounded-xl hover:bg-gray-300">Register</Link>
          <Link to="/admin/login" className="bg-red-50 text-red-600 font-bold px-8 py-3 rounded-xl hover:bg-red-100">Admin Panel</Link>
        </div>
      </section>
      <li><Link to="/NewsDetails/1">View News</Link></li>
    </div>
  );
}