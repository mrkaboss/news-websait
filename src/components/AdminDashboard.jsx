import { useEffect, useState } from "react";

export default function AdminDashboard(){

const [news,setNews] = useState([]);

useEffect(()=>{

fetch("http://localhost:5000/api/news")
.then(res=>res.json())
.then(data=>setNews(data))

},[])

const deleteNews = async(id)=>{

await fetch(`http://localhost:5000/api/news/${id}`,{
method:"DELETE"
})

setNews(news.filter(n=>n._id !== id))

}

return(

<div className="max-w-6xl mx-auto p-10">

<h1 className="text-3xl font-bold mb-8">
Admin Dashboard
</h1>

<table className="w-full border">

<thead>

<tr className="bg-gray-200">

<th>Title</th>
<th>Actions</th>

</tr>

</thead>

<tbody>

{news.map(item=>(
<tr key={item._id} className="border">

<td className="p-3">{item.title}</td>

<td className="p-3 flex gap-4">

<button className="bg-blue-500 text-white px-3 py-1 rounded">
Edit
</button>

<button
onClick={()=>deleteNews(item._id)}
className="bg-red-600 text-white px-3 py-1 rounded"
>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>

)

}