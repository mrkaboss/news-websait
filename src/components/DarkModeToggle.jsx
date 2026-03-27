import { useState,useEffect } from "react";

export default function DarkModeToggle(){

const [dark,setDark] = useState(false)

useEffect(()=>{

if(dark){
document.documentElement.classList.add("dark")
}else{
document.documentElement.classList.remove("dark")
}

},[dark])

return(

<button
onClick={()=>setDark(!dark)}
className="bg-gray-800 text-white px-4 py-2 rounded"
>

{dark ? "Light Mode" : "Dark Mode"}

</button>

)

}