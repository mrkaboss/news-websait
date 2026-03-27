import { Link } from "react-router-dom";

export default function Politics() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">
        Politics News
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        {[1,2,3,4,5,6].map((item)=>(
          <div
            key={item}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >

            <img
              src="https://images.unsplash.com/photo-1529107386315-e1a2ed48a620"
              className="h-52 w-full object-cover"
            />

            <div className="p-5">

              <span className="text-xs text-red-600 font-semibold">
                POLITICS
              </span>

              <h3 className="font-bold mt-2">
                Government leaders discuss new national policies
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                September 10, 2025
              </p>

              <Link
                to={`/news/${item}`}
                className="text-red-600 text-sm mt-3 block"
              >
                Read more →
              </Link>

            </div>

          </div>
        ))}

      </div>

      <Link to="/" className="text-red-600 mt-10 block">
        ← Back Home
      </Link>

    </div>
  );
}