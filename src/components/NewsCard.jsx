

export default function NewsCard({news}){

if(!news) return null;

return(

<div className="bg-white shadow rounded">

<img
src={news?.image}
alt={news?.title}
className="w-full h-40 object-cover"
/>

<h2 className="font-bold p-3">
{news?.title}
</h2>

</div>

)

}