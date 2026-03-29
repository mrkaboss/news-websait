import { Link } from "react-router-dom";

export default function LatestNews() {
  const latest = [
    { id: "l1", title: "Kigali's new green spaces project", date: "Today", category: "City" },
    { id: "l2", title: "Rwandan startup wins global prize", date: "Yesterday", category: "Innovation" },
    { id: "l3", title: "Weather update: Heavy rains expected", date: "2 hours ago", category: "Alert" }
  ];

  return (
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-black mb-6 border-l-4 border-blue-600 pl-4 uppercase">Latest News</h2>
      <div className="space-y-6">
        {latest.map(item => (
          <div key={item.id} className="group border-b pb-4 last:border-0">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{item.category}</span>
            <Link to={`/NewsDetails/${item.id}`}>
              <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors cursor-pointer">
                {item.title}
              </h3>
            </Link>
            <p className="text-xs text-gray-400 mt-1">{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}