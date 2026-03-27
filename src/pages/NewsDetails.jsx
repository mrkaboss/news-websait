import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function NewsDetails(){

const { id } = useParams();

const [news,setNews] = useState(null);
const [related,setRelated] = useState([]);

useEffect(()=>{

fetch(`http://localhost:5000/api/news/${id}`)
.then(res=>res.json())
.then(data=>setNews(data))

fetch("http://localhost:5000/api/news")
.then(res=>res.json())
.then(data=>setRelated(data.slice(0,3)))

},[id])

if(!news){
return <p className="text-center py-20">Loading...</p>
}

return(

<div className="bg-gray-50 min-h-screen">

{/* NEWS CONTAINER */}
<div className="max-w-5xl mx-auto px-6 py-10">

{/* IMAGE */}
<img
src={news.image}
alt={news.title}
className="w-full h-[420px] object-cover rounded-xl"
/>

{/* TITLE */}
<h1 className="text-4xl font-bold mt-6">
{news.title}
</h1>

{/* AUTHOR */}
<p className="text-gray-500 mt-2">
By {news.author?.name || "Admin"} • {new Date(news.createdAt).toDateString()}
</p>

{/* SHARE */}
<div className="flex gap-4 mt-4">

<a
href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
target="_blank"
className="bg-blue-600 text-white px-4 py-2 rounded"
>
Facebook
</a>

<a
href={`https://api.whatsapp.com/send?text=${window.location.href}`}
target="_blank"
className="bg-green-600 text-white px-4 py-2 rounded"
>
WhatsApp
</a>

<a
href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
target="_blank"
className="bg-black text-white px-4 py-2 rounded"
>
Twitter
</a>

</div>

{/* DESCRIPTION */}
<p className="text-gray-700 mt-6 text-lg leading-8">
{news.description}
</p>

</div>

{/* RELATED NEWS */}
<div className="max-w-6xl mx-auto px-6 py-12">

<h2 className="text-2xl font-bold mb-6">
Related News
</h2>

<div className="grid md:grid-cols-3 gap-6">

{related.map((item)=>(
<Link
to={`/news/${item._id}`}
key={item._id}
className="bg-white shadow rounded-lg overflow-hidden"
>

<img
src={item.image}
className="h-40 w-full object-cover"
/>

<div className="p-4">

<h3 className="font-semibold">
{item.title}
</h3>

<p className="text-gray-500 text-sm mt-2">
{new Date(item.createdAt).toDateString()}
</p>

</div>

</Link>
))}

</div>

</div>

</div>

)

}