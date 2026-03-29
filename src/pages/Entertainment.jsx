import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Entertainment() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const API_KEY = "YOUR_GNEWS_API_KEY"; 

  useEffect(() => {
   
    fetch(`https://gnews.io/api/v4/search?q=entertainment+OR+movies+OR+celebrity+OR+music&lang=en&token=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) {
          setNews(data.articles);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching entertainment news:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      
      
      <div className="bg-gradient-to-r from-purple-700 via-pink-600 to-red-500 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
            
            <div className="absolute top-0 left-0 w-20 h-20 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <span className="bg-white text-pink-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            Showbiz & Lifestyle
          </span>
          <h1 className="text-5xl md:text-6xl font-black mt-6 tracking-tighter italic">
            ENTERTAINMENT
          </h1>
          <p className="mt-4 text-pink-100 text-lg max-w-xl mx-auto font-medium">
            Movies, Music, Celebrity Gossip, and the latest from Hollywood to the world.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-6">
        
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-gray-900 border-b-4 border-pink-500 pb-2">
            Hot Stories 🚀
          </h2>
          <Link to="/" className="text-pink-600 font-bold hover:underline">← Home</Link>
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="animate-bounce inline-flex p-4 bg-pink-100 rounded-full">
               <div className="w-4 h-4 bg-pink-600 rounded-full animate-ping"></div>
            </div>
            <p className="mt-4 text-pink-600 font-bold italic text-xl">Loading the magic...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((item, index) => (
              <div 
                key={index} 
                className="bg-white rounded-[2rem] shadow-xl border border-gray-100 overflow-hidden hover:-translate-y-2 transition-transform duration-300 group"
              >
        
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image || "https://via.placeholder.com/600x400?text=Entertainment+News"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-yellow-400 text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">
                      {item.source.name}
                    </span>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-800 leading-tight group-hover:text-pink-600 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 mt-4 text-sm line-clamp-3">
                    {item.description}
                  </p>
                  
                  <div className="mt-6 flex items-center justify-between border-t pt-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 uppercase font-bold">Published</span>
                        <span className="text-xs text-gray-600 font-medium">
                            {new Date(item.publishedAt).toDateString()}
                        </span>
                    </div>
                    <a 
                      href={item.url} 
                      target="_blank" 
                      rel="noreferrer"
                      className="bg-pink-600 text-white p-3 rounded-2xl hover:bg-black transition-all shadow-lg active:scale-90"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && (
            <div className="mt-20 py-10 bg-white rounded-[3rem] shadow-inner text-center">
                <h3 className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-6">Trending Tags</h3>
                <div className="flex flex-wrap justify-center gap-4 px-6">
                    {["#Grammys", "#Oscars", "#NewAlbum", "#CelebrityNews", "#Netflix", "#Hollywood", "#Fashion"].map(tag => (
                        <span key={tag} className="text-pink-500 font-bold hover:bg-pink-50 px-4 py-2 rounded-full cursor-pointer transition">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        )}
      </div>
    </div>
  );
}