import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function World() {
  const { t } = useTranslation();

 
  const worldNews = [
    {
      id: 1,
      title: "New climate policies announced at the global summit",
      date: "Sep 15, 2025",
      category: "Environment",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "Technological breakthrough in renewable energy storage",
      date: "Sep 14, 2025",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "Exploring the hidden gems of the Mediterranean coast",
      date: "Sep 13, 2025",
      category: "Travel",
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 4,
      title: "Economic shifts: How global markets are adapting in 2025",
      date: "Sep 12, 2025",
      category: "Finance",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 5,
      title: "The rise of sustainable architecture in modern cities",
      date: "Sep 11, 2025",
      category: "Design",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 6,
      title: "New archaeological discovery in the heart of Egypt",
      date: "Sep 10, 2025",
      category: "History",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
  
        <div className="flex items-center justify-between mb-10 border-b pb-6">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter">
            {t('nav.world', 'World News')}
          </h1>
          <Link to="/" className="text-red-600 font-bold hover:underline">
            {t('back_home', '← Back Home')}
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {worldNews.map((item) => (
            <Link 
              to={`/news/${item.id}`} 
              key={item.id} 
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              
              <div className="relative overflow-hidden h-56">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <span className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  {item.category}
                </span>
              </div>

              <div className="p-6">
                <p className="text-gray-400 text-xs font-medium mb-2">{item.date}</p>
                <h3 className="font-bold text-xl text-gray-800 group-hover:text-red-600 transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm mt-3 line-clamp-2">
                  Discover the latest insights and detailed reporting on this major world event as it unfolds.
                </p>
                <div className="mt-5 flex items-center text-red-600 font-bold text-sm">
                  Read More <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}