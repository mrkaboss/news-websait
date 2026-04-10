useEffect(() => {
  const fetchNews = async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/news`);
      const data = await res.json();
      const newsArray = Array.isArray(data) ? data : (data.news || data.data || []);
      setNews(newsArray);
    } catch (err) {
      console.log("Ticker Error:", err);
    }
  };

  fetchNews();
  const interval = setInterval(fetchNews, 60000);
  return () => clearInterval(interval);
}, []);