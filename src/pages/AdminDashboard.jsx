import { useState } from "react";

export default function AdminDashboard() {

  const [news, setNews] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const addNews = () => {

    const newNews = {
      id: Date.now(),
      title,
      category,
      image
    };

    setNews([...news, newNews]);

    setTitle("");
    setCategory("");
    setImage("");

  };

  const deleteNews = (id) => {
    setNews(news.filter(item => item.id !== id));
  };

  return (

    <div className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-8">
        Admin Dashboard
      </h1>

      {/* ADD NEWS */}

      <div className="bg-white shadow rounded-xl p-6 mb-10">

        <h2 className="text-xl font-bold mb-4">
          Add News
        </h2>

        <input
          type="text"
          placeholder="News title"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          placeholder="Category (Tech / Business / Sports / World)"
          value={category}
          onChange={(e)=>setCategory(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e)=>setImage(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <button
          onClick={addNews}
          className="bg-red-600 text-white px-6 py-2 rounded"
        >
          Add News
        </button>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

        {news.map(item => (

          <div key={item.id} className="bg-white shadow rounded-lg">

            <img
              src={item.image}
              className="h-40 w-full object-cover rounded-t-lg"
            />

            <div className="p-4">

              <h3 className="font-bold">
                {item.title}
              </h3>

              <p className="text-gray-500 text-sm mt-1">
                {item.category}
              </p>

              <button
                onClick={()=>deleteNews(item.id)}
                className="text-red-600 mt-3"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}