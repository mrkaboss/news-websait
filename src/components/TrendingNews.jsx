import { Link } from "react-router-dom";

export default function TrendingNews() {
  const trending = [
    { id: "t1", title: "Why coffee prices are hitting record highs", views: "25K views", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085" },
    { id: "t2", title: "New travel guidelines for East Africa", views: "18K views", img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60" },
    { id: "t3", title: "Top 10 apps to boost productivity", views: "12K views", img: "https://images.unsplash.com/photo-1484417894907-623942c8ee29" }
  ];

  return (
    <div className="bg-gray-900 text-white p-8 rounded-[2.5rem] shadow-2xl">
      <h2 className="text-xl font-black mb-8 flex items-center gap-2">
        <span className="text-red-500">🔥</span> TRENDING
      </h2>
      <div className="space-y-8">
        {trending.map((item, index) => (
          <div key={item.id} className="flex gap-4 items-center group cursor-pointer">
            <span className="text-4xl font-black text-gray-700 group-hover:text-red-500 transition-colors">0{index + 1}</span>
            <div className="h-16 w-16 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={item.img} className="h-full w-full object-cover" alt="" />
            </div>
            <div>
              <Link to={`/NewsDetails/${item.id}`}>
                <h4 className="font-bold text-sm leading-tight group-hover:underline">{item.title}</h4>
              </Link>
              <p className="text-[10px] text-gray-500 mt-1 uppercase font-bold">{item.views}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}