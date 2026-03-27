import { useEffect,useState } from "react"

export default function LiveNews(){
const [news,setNews] = useState([]);


useEffect(()=>{

fetch("https://gnews.io/api/v4/top-headlines?lang=en&token=83e48abea3b22adbd93e09705541f80b")

.then(res=>res.json())

.then(data=>setNews(data.articles))

},[])

return(

<div className="grid md:grid-cols-3 gap-6">

{news.map((item,i)=>(

<div key={i} className="bg-white shadow rounded">

<img src={item.image} />

<h3>{item.title}</h3>

</div>

))}

</div>

)

}