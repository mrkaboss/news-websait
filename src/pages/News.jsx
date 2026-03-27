import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function News() {

const [news,setNews] = useState([]);

useEffect(()=>{

fetch("https://gnews.io/api/v4/top-headlines?lang=en&token=API_KEY")

.then(res=>res.json())

.then(data=>{
  if(data.articles){
    setNews(data.articles)
  }
})

.catch(error=>{
  console.log("Error fetching news:", error)
})

},[])

  return (
    <div className="bg-gray-100 min-h-screen">

      <div className="max-w-7xl mx-auto py-10 px-6">

        <div className="bg-white rounded-2xl overflow-hidden shadow-lg grid md:grid-cols-2">

          <img
            src="Logo-photo.jpeg"
            alt="Logo-photo.jpeg"
            className="w-full h-full object-cover"
          />

          <div className="p-8 flex flex-col justify-center">
            <span className="text-sm text-blue-600 font-semibold">
              BREAKING NEWS
            </span>

            <h1 className="text-3xl font-bold mt-4">
              Global Leaders Meet to Discuss Economy
            </h1>

            <p className="text-gray-500 mt-3">
              Leaders from different countries meet to discuss global
              economic challenges and solutions.
            </p>

            <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Read More
            </button>
          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-3 gap-6">

{news.map((item,index)=>(

<div key={index} className="bg-white shadow rounded">

<img src={item.image} className="h-40 w-full object-cover"/>

<div className="p-4">

<h3 className="font-bold">{item.title}</h3>

<a href={item.url} className="text-red-600">Read more</a>

</div>

</div>

))}

</div>

      <div className="max-w-7xl mx-auto px-6 pb-16">

        <h2 className="text-2xl font-bold mb-8">Latest News</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {news.map((item,index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >

              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover"
              />

              <div className="p-4">

                <span className="text-xs text-blue-600 font-semibold">
                  {item.category}
                </span>

                <h3 className="font-bold mt-2">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-sm mt-2">
                  {item.date}
                </p>

                <Link to="/Business" className="text-red-600">
            View all →
          </Link>

              </div>
 
            </div>
            
          ))}

        </div>

 <Link
  to="/"
  className="bg-red-600 text-white px-4 py-2 rounded"
>
  Back Home
</Link>

      </div>

    </div>
  );
}