import { useState } from "react";
import { Route } from "react-router";
import AdminDashboard from "../components/AdminDashboard";

export default function AddNews(){
<div>
    <Route path="AdminDashboard"element={<AdminDashboard/>}/>
</div>
const [title,setTitle] = useState("");
const [image,setImage] = useState("");
const [description,setDescription] = useState("");

const submit = async(e)=>{

e.preventDefault()

await fetch("http://localhost:5000/api/news",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({title,image,description})

})

alert("News Added")

}

return(

<form
onSubmit={submit}
className="max-w-xl mx-auto p-10 space-y-4"
>

<input
placeholder="Title"
onChange={(e)=>setTitle(e.target.value)}
className="border p-3 w-full"
/>

<input
placeholder="Image URL"
onChange={(e)=>setImage(e.target.value)}
className="border p-3 w-full"
/>

<textarea
placeholder="Description"
onChange={(e)=>setDescription(e.target.value)}
className="border p-3 w-full"
/>

<button className="bg-green-600 text-white px-6 py-2 rounded">
Add News
</button>

</form>


)

}