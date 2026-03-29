import React from 'react';
import { Link } from "react-router-dom";

const BreakingNews = () => {
  const stories = [
    {
      id: "b1",
      title: "Ikoranabuhanga rishya rya 5G rigeze mu bice by'icyaro mu Rwanda",
      desc: "Nyuma y'igihe bitegerejwe, ubu abaturage batuye mu turere twa kure batangiye guhabwa interineti yihuta cyane.",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "b2",
      title: "Amavubi yatsinze umukino wa gicuti ku ntsinzi ikomeye",
      desc: "Mu mukino wabereye i Kigali, ikipe y'igihugu yerekanye ko iri mu bihe byiza imbere y'abafana bayo.",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2093&auto=format&fit=crop"
    }
  ];

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
            <div key={story.id} className="group relative overflow-hidden rounded-[2rem] bg-black h-[450px] shadow-xl">
              <img 
                src={story.image} 
                className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-700" 
                alt="" 
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
                  {story.desc}
                </p>
                <Link 
                  to={`/NewsDetails/${story.id}`} 
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