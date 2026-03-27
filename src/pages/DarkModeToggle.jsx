import { useState } from "react";

export default function DarkModeToggle(){

const [dark,setDark] = useState(false)

const toggleMode = ()=>{

setDark(!dark)

document.documentElement.classList.toggle("dark")

}

return(

<button
onClick={toggleMode}
className="px-4 py-2 bg-gray-800 text-white rounded"
>

Toggle Dark Mode

</button>

)

}