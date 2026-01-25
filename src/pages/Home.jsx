import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="px-6 py-6 space-y-10">

      {/* HERO SECTION */}
      <section className="grid md:grid-cols-2 gap-6 items-center">
        <img
          src="/hero.jpg"
          alt="Breaking News"
          className="w-full h-64 object-cover rounded-lg"
        />

        <div>
          <span className="text-red-500 font-semibold">BREAKING NEWS</span>
          <h1 className="text-3xl font-bold mt-2">
            Global Leaders Meet to Discuss Economic Growth
          </h1>
          <p className="text-gray-600 mt-3">
            World leaders gathered today to discuss strategies for boosting
            global economic stability and growth.
          </p>

          <Link
            to="/news/1"
            className="inline-block mt-4 text-blue-600 font-medium"
          >
            Read more →
          </Link>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Latest News</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((id) => (
            <div
              key={id}
              className="border rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src="/news.jpg"
                alt="News"
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">
                  Technology is Changing the World Rapidly
                </h3>
                <Link
                  to={`/news/${id}`}
                  className="text-blue-600 text-sm mt-2 inline-block"
                >
                  Read more →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Categories</h2>

        <div className="flex gap-4 flex-wrap">
          {["Politics", "Business", "Sports", "Technology"].map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat.toLowerCase()}`}
              className="px-4 py-2 bg-gray-200 rounded-full hover:bg-gray-300"
            >
              {cat}
            </Link>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;

