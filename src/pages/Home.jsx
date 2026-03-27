import { Link } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import BreakingNews from "../components/BreakingNews";
import { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard"
import NewsTicker from "../components/NewsTicker"


export default function Home() {

  const [news, setNews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/news")
      .then((res) => res.json())
      .then((data) => setNews(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    
    <div className="bg-gray-50">
      <div>
        <li><Link to="AddNews">AddNews</Link></li>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <HeroSlider />
      </div>
      <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

        <div className="md:col-span-2">
          
          {news[0] && (
            <>
              <img
                src={news[0].image}
                alt={news[0].title}
                className="w-full h-[420px] object-cover rounded-xl"
              />

              <h1 className="text-3xl font-bold mt-6">
                {news[0].title}
              </h1>

              <p className="text-gray-500 mt-3">
                {news[0].description}
              </p>

              <Link
                to={`/news/${news[0]._id}`}
                className="inline-block mt-4 text-red-600 font-semibold"
              >
                Read full story →
              </Link>
            </>
          )}

        </div>
        <div className="space-y-6">

          
          {news.slice(1, 5).map((item)=>(
            <Link
              to={`/news/${item._id}`}
              key={item._id}
              className="flex gap-4 hover:bg-gray-100 p-2 rounded"
            >

              <img
                src={item.image}
                alt={item.title}
                className="w-28 h-20 object-cover rounded-lg"
              />

              <div>

                <h4 className="font-semibold text-sm">
                  {item.title}
                </h4>

                <p className="text-gray-400 text-xs mt-1">
                  {item.category}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </section>

      <div className="bg-red-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-6 flex gap-4">

          <span className="font-bold">BREAKING:</span>

          <marquee>
            {news.slice(0, 5).map(n => `${n.title} • `)}
          </marquee>

        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-14">

        <div className="flex justify-between mb-8">

          <h2 className="text-2xl font-bold">Latest News</h2>

          <Link to="/news" className="text-red-600">
            View all →
          </Link>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          
          {news.slice(5, 11).map((item)=>(
            <Link
              to={`/news/${item._id}`}
              key={item._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >

              <img
                src={item.image}
                alt={item.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">

                <span className="text-xs text-red-600 font-semibold">
                  {item.category}
                </span>

                <h3 className="font-bold mt-2">
                  {item.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">

        <h2 className="text-2xl font-bold mb-8">
          🔥 Trending News
        </h2>

        <div className="grid md:grid-cols-4 gap-6">

          {news.slice(0, 4).map((item)=>(
            <Link
              to={`/news/${item._id}`}
              key={item._id}
              className="bg-white shadow hover:shadow-lg rounded-lg p-4"
            >

              <h4 className="font-semibold line-clamp-2">
                {item.title}
              </h4>

              <p className="text-gray-500 text-sm mt-2">
                {item.category}
              </p>

            </Link>
          ))}

        </div>
      </section>

      <div className="flex justify-center gap-4 mt-10">

        <button className="px-4 py-2 bg-gray-200 rounded">
          Previous
        </button>

        <button className="px-4 py-2 bg-red-600 text-white rounded">
          1
        </button>

        <button className="px-4 py-2 bg-gray-200 rounded">
          2
        </button>

        <button className="px-4 py-2 bg-gray-200 rounded">
          Next
        </button>

      </div>

      <section className="max-w-7xl mx-auto px-6 py-14 text-center">

        <h2 className="text-2xl font-bold mb-6">
          Join Our Community
        </h2>

        <div className="flex justify-center gap-6 flex-wrap">

          <Link
            to="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Register
          </Link>

          <Link
            to="/admin/login"
            className="bg-red-600 text-white px-6 py-3 rounded-lg"
          >
            Admin
          </Link>

        </div>

      </section>

    
      <section className="bg-gray-900 text-white py-16">

        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-3xl font-bold">
            Subscribe to our newsletter
          </h2>

          <p className="text-gray-400 mt-3">
            Get the latest news delivered directly to your inbox
          </p>

          <div className="mt-6 flex justify-center">

            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-l-lg text-black w-72"
            />

            <button className="bg-red-600 px-6 py-3 rounded-r-lg">
              Subscribe
            </button>

          </div>

        </div>

      </section>

      <div>
        <BreakingNews />
        <NewsCard/>
        <NewsTicker />
      </div>

    </div>
  );
}