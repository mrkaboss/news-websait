import { useEffect,useState } from "react";

export default function NewsTicker(){

const [news,setNews] = useState([])

useEffect(()=>{

fetch("http://localhost:3000/api/news")
.then(res=>res.json())
.then(data=>setNews(data))

},[])

return(

<div className="bg-red-600 text-white py-2 overflow-hidden">

<div className="whitespace-nowrap animate-marquee">

{news.map((item,i)=>(
<span key={i} className="mx-6">
🔥 {item.title}
</span>
))}

</div>

</div>

)

}