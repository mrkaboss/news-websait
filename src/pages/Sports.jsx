import { Link } from "react-router-dom";

export default function Sports() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">Sports News</h1>

      <div className="grid md:grid-cols-3 gap-8">

        {[1,2,3,4,5,6].map((item)=>(
          <div key={item} className="bg-white rounded-xl shadow">

            <img
              src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211"
              className="h-48 w-full object-cover rounded-t-xl"
            />

            <div className="p-4">

              <h3 className="font-bold">
                Major football clubs prepare for new season
              </h3>

              <p className="text-gray-500 text-sm mt-2">
                September 10, 2025
              </p>

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