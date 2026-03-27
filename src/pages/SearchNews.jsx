import { useState } from "react";
import { Link } from "react-router-dom";

export default function SearchNews() {

  const [search, setSearch] = useState("");

  const news = [
    {
      id: 1,
      title: "AI transforms technology",
      category: "Tech",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475"
    },
    {
      id: 2,
      title: "Global markets rising",
      category: "Business",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf"
    },
    {
      id: 3,
      title: "Football world cup news",
      category: "Sports",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211"
    },
    {
      id: 4,
      title: "Government policy announced",
      category: "Politics",
      image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620"
    }
  ];

  const filtered = news.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="max-w-7xl mx-auto px-6 py-10">


      <input
        type="text"
        placeholder="Search news..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="border p-3 w-full mb-8 rounded-lg"
      />


      {filtered.length === 0 ? (

        <p className="text-gray-500 text-center">
          No news found.
        </p>

      ) : (

        <div className="grid md:grid-cols-3 gap-6">

          {filtered.map(item => (

            <div key={item.id} className="bg-white shadow rounded-lg overflow-hidden">

              <img
                src={item.image}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">

                <span className="text-xs text-red-600 font-semibold">
                  {item.category}
                </span>

                <h3 className="font-bold mt-2">
                  {item.title}
                </h3>

                <Link
                  to={`/news/${item.id}`}
                  className="text-red-600 text-sm mt-3 block"
                >
                  Read more →
                </Link>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}