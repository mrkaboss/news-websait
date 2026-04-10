import { useEffect, useState } from "react";
import { getMyNews, deleteNews } from "../services/newsServices.jsx";

export default function Dashboard() {
  const [news, setNews] = useState([]);

  const fetchNews = () => {
    getMyNews().then((res) => {
      console.log("Amakuru avuye muri Backend:", res); 
      
     
      const fetchedNews = res.data?.data || res.data || [];
      setNews(fetchedNews);
    }).catch(err => {
      console.error("Dashboard Error:", err);
    });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("Delete this news?")) {
      await deleteNews(id);
      fetchNews(); // refresh
    }
  };

  return (
    <div>
      <h1>My News</h1>

      {news.length === 0 && <p>No news yet</p>}

      {news.map((n) => (
        <div key={n._id} style={{ border: "1px solid gray", margin: 10 }}>
          <h3>{n.title}</h3>
          <p>{n.content}</p>

          <button onClick={() => handleDelete(n._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}