import { Link } from "react-router-dom";
import { FaChartLine, FaWallet } from "react-icons/fa";

export default function Economy() {
  const economyNews = [
    { id: "e1", title: "Ubucuruzi bw'u Rwanda n'amahanga bwazamutse", category: "Economy", image: "https://images.unsplash.com/photo-1611974714658-058f40da23fb" },
    { id: "e2", title: "Isoko ry'imigane ryiteguye gufungura", category: "Finance", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f" }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-400 mb-12 border-l-4 border-blue-400 pl-4 flex items-center gap-3">
          <FaChartLine /> UBUKUNGU
        </h1>
        <div className="grid lg:grid-cols-3 gap-6">
          {economyNews.map(item => (
            <div key={item.id} className="bg-slate-800 border border-slate-700 p-6 rounded-2xl hover:bg-slate-700 transition">
              <img src={item.image} className="w-full h-40 object-cover rounded-xl mb-4" alt="" />
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <Link to={`/news/${item.id}`} className="text-blue-400 font-black text-sm uppercase">Soma Byose →</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}