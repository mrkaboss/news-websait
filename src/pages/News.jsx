import React from "react";
import { Link } from "react-router-dom";

const newsData = [
  {
    id: 1,
    title: "Global Leaders Meet to Discuss Economy",
    summary: "World leaders gathered to discuss global economic growth.",
    image: "/news1.jpg",
  },
  {
    id: 2,
    title: "Technology is Changing the World",
    summary: "New innovations are shaping the future of technology.",
    image: "/news2.jpg",
  },
  {
    id: 3,
    title: "Sports Update: Big Match Tonight",
    summary: "Fans are excited ahead of tonight’s big game.",
    image: "/news3.jpg",
  },
];

const News = () => {
  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Latest News</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {newsData.map((news) => (
          <div
            key={news.id}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h2 className="font-semibold text-lg mb-2">
                {news.title}
              </h2>
              <p className="text-gray-600 text-sm mb-3">
                {news.summary}
              </p>

              <Link
                to={`/news/${news.id}`}
                className="text-blue-600 font-medium"
              >
                Read more →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
