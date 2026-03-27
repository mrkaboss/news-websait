useEffect(()=>{

const fetchNews = ()=>{

fetch("https://gnews.io/api/v4/top-headlines?lang=en&token=YOUR_API_KEY")
.then(res=>res.json())
.then(data=>setNews(data.articles || []))

}

fetchNews()

const interval = setInterval(fetchNews,60000)

return ()=>clearInterval(interval)

},[])