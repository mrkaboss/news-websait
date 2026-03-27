import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSlider(){

const [news,setNews] = useState([])
const [current,setCurrent] = useState(0)

useEffect(()=>{

fetch("http://localhost:5000/api/news")
.then(res=>res.json())
.then(data=>setNews(data.slice(0,5))) // top 5

},[])

useEffect(()=>{

if(news.length === 0) return

const interval = setInterval(()=>{

setCurrent((prev)=>(prev+1)%news.length)

},5000)

return ()=>clearInterval(interval)

},[news])

if(news.length === 0){
return <p className="text-center">Loading...</p>
}

return(

<div className="relative w-full h-[450px] overflow-hidden rounded-xl">

{/* IMAGE */}
<img
src={news[current]?.image}
alt={news[current]?.title}
className="w-full h-full object-cover transition-all duration-700"
/>

{/* DARK OVERLAY */}
<div className="absolute inset-0 bg-black/50"></div>

{/* TEXT */}
<div className="absolute bottom-10 left-10 text-white max-w-xl">

<h2 className="text-3xl md:text-4xl font-bold leading-tight">
{news[current]?.title}
</h2>

<p className="mt-3 text-gray-200">
{news[current]?.description?.slice(0,120)}...
</p>

<Link
to={`/news/${news[current]?._id}`}
className="inline-block mt-4 bg-red-600 px-5 py-2 rounded"
>

Read More →

</Link>

</div>

{/* DOTS */}
<div className="absolute bottom-4 right-6 flex gap-2">

{news.map((_,index)=>(
<div
key={index}
onClick={()=>setCurrent(index)}
className={`w-3 h-3 rounded-full cursor-pointer ${
index === current ? "bg-red-600" : "bg-gray-400"
}`}
></div>
))}

</div>

</div>

)

}