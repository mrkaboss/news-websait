import { Link } from "react-router-dom";
import { FaHistory, FaLandmark } from "react-icons/fa";

export default function History() {
  const historyStories = [
    { id: "h1", title: "Amateka y'ingoma ya Cyami mu Rwanda", category: "History", image: "https://images.unsplash.com/photo-1461360370896-922624d12aa1" },
    { id: "h2", title: "Uko umujyi wa Kigali wari umeze mu 1960", category: "Archive", image: "https://images.unsplash.com/photo-1544669146-620247656792" }
  ];

  return (
    <div className="min-h-screen bg-[#fdf6e3] py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-serif font-black text-amber-900 mb-10 border-b-2 border-amber-900 pb-4 flex items-center gap-3">
          <FaLandmark /> AMATEKA
        </h1>
        <div className="space-y-12">
          {historyStories.map(item => (
            <div key={item.id} className="flex flex-col md:flex-row gap-8 items-center bg-white p-4 rounded-xl shadow-sm">
              <img src={item.image} className="w-full md:w-64 h-48 object-cover rounded-lg sepia shadow-lg" alt="" />
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">{item.title}</h2>
                <Link to={`/news/${item.id}`} className="bg-amber-900 text-white px-6 py-2 rounded-md font-bold uppercase text-xs">Soma Amateka</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}