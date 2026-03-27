import { Link } from "react-router-dom";

export default function Teche() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">Technology News</h1>

      <div className="grid md:grid-cols-3 gap-8">

        {[1,2,3,4,5,6].map((item)=>(
          <div key={item} className="bg-white rounded-xl shadow hover:shadow-lg">

            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475"
              alt="technology"
              className="h-48 w-full object-cover rounded-t-xl"
            />

            <div className="p-4">

              <h3 className="font-bold">
                AI continues to transform the technology industry
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

      <Link to="/" className="text-red-600 mt-6 block">
        ← Back Home
      </Link>

    </div>
  );
}