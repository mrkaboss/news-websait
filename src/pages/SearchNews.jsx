import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaRegClock, FaArrowRight } from "react-icons/fa";

export default function SearchNews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
  
  const allNews = [
    { id: 1, title: "Amavubi yiteguye umukino ukomeye", category: "Sports", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018" },
    { id: 2, title: "Ikoranabuhanga mu mashuri y'u Rwanda", category: "Tech", image: "https://images.unsplash.com/photo-1518770660439-4636190af475" },
    { id: 3, title: "Umutekano mu karere wifashe neza", category: "Politics", image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620" },
    { id: 4, title: "Ibiciro by'ibiribwa ku isoko", category: "Economy", image: "https://images.unsplash.com/photo-1611974714658-058f40da23fb" },
    { id: 5, title: "Ubuzima bwiza mu bihe bya COVID-19", category: "Health", image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528" },
    { id: 6, title: "Inkuru z'umutwe z'ingando", category: "Entertainment", image: "https://images.unsplash.com/photo-1531403009284-six5a7941e77" },
    { id: 7, title: "Iterambere ry'ubuhinzi mu Rwanda", category: "Agriculture", image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" },
    { id: 8, title: "Amateka y'u Rwanda mu magambo make", category: "History", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d" },
  ];

  
  useEffect(() => {
    setSearchTerm("");
    setSearchResults([]);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setSearchResults([]);
    } else {
      const filtered = allNews.filter((item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.category.toLowerCase().includes(value.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        
        
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tighter">EXPLORE NEWS</h1>
          <p className="text-gray-500 font-medium">Shaka amakuru yose wifuza kumenya mu buryo bwihuse.</p>
        </div>

  
        <div className="relative mb-16">
          <div className="absolute inset-y-0 left-6 flex items-center text-gray-400">
            <FaSearch size={20} />
          </div>
          <input 
            type="text" 
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Andika hano ushake inkuru..." 
            className="w-full pl-16 pr-8 py-6 bg-white rounded-[2.5rem] shadow-2xl border-none outline-none focus:ring-4 focus:ring-blue-100 transition-all text-xl font-medium text-gray-800 placeholder-gray-300"
          />
        </div>


        <div className="space-y-8">
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <Link 
                key={item.id} 
                to={`/news/${item.id}`}
                className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="md:w-48 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                
                <div className="flex-1 flex flex-col justify-center">
                  <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-2">{item.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors leading-tight mb-3">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-widest">
                    <FaRegClock /> Today • 2 min read
                  </div>
                </div>

                <div className="hidden md:flex items-center pr-4">
                   <div className="p-4 bg-gray-50 rounded-full text-gray-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <FaArrowRight />
                   </div>
                </div>
              </Link>
            ))
          ) : (
            searchTerm !== "" && (
              <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold italic">Nta nkuru n'imwe ihuye n'ibyo ushatse... 🧐</p>
              </div>
            )
          )}

          {searchTerm === "" && (
            <div className="pt-10">
              <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6 border-b pb-4">Izigezweho cyane</h4>
              <div className="flex flex-wrap gap-3">
                {["Sports", "Technology", "Economy", "Health"].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => handleSearch({ target: { value: cat } })}
                    className="px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all"
                  >
                    #{cat}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}