import { Link } from "react-router-dom";
import { FaLeaf, FaSeedling } from "react-icons/fa";

export default function Agriculture() {
  const agriNews = [
    { id: "ag1", title: "Gahunda nshya yo gufasha abahinzi b'ikawa", category: "Agriculture", image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2" },
    { id: "ag2", title: "Umusaruro w'ibigori wiyongereye muri uyu mwaka", category: "Farming", image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2" }
  ];

  return (
    <div className="min-h-screen bg-green-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-green-900 mb-8 flex items-center gap-3">
          <FaLeaf className="text-green-500" /> UBUHINZI
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          {agriNews.map(item => (
            <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-md border-b-4 border-green-600">
              <img src={item.image} className="w-full h-56 object-cover" alt="" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h2>
                <Link to={`/news/${item.id}`} className="text-green-600 font-bold hover:underline">Soma ibikubiyemo →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}