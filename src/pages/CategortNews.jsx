// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function CategoryNews() {

//   const [category, setCategory] = useState("All");

//   const news = [
//     { id:1, title:"AI is transforming technology", category:"Tech"},
//     { id:2, title:"Global markets rise", category:"Business"},
//     { id:3, title:"Football world cup preparations", category:"Sports"},
//     { id:4, title:"New government policy announced", category:"Politics"},
//   ];

//   const filteredNews =
//     category === "All"
//       ? news
//       : news.filter(item => item.category === category);

//   return (

//     <div className="max-w-7xl mx-auto px-6 py-12">

//       <h1 className="text-3xl font-bold mb-6">
//         News Categories
//       </h1>

//       {/* Category buttons */}

//       <div className="flex gap-4 mb-8 flex-wrap">

//         {["All","Tech","Business","Sports","Politics"].map(cat => (
//           <button
//             key={cat}
//             onClick={()=>setCategory(cat)}
//             className="bg-red-600 text-white px-4 py-2 rounded"
//           >
//             {cat}
//           </button>
//         ))}

//       </div>

//       {/* News */}

//       <div className="grid md:grid-cols-3 gap-8">

//         {filteredNews.map(item => (

//           <div key={item.id} className="bg-white shadow rounded-lg p-4">

//             <h3 className="font-bold">
//               {item.title}
//             </h3>

//             <p className="text-gray-500 text-sm">
//               {item.category}
//             </p>

//             <Link
//               to={`/news/${item.id}`}
//               className="text-red-600 text-sm"
//             >
//               Read more →
//             </Link>

//           </div>

//         ))}

//       </div>

//     </div>

//   );
// }