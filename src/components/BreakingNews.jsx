import { useState } from "react";

export default function Login(){

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleLogin = async(e)=>{
e.preventDefault()

const res = await fetch("http://localhost:3000/api/auth/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({email,password})
})

const data = await res.json()

localStorage.setItem("token",data.token)
localStorage.setItem("user",JSON.stringify(data.user))

alert("Logged in!")
}

return(

<form onSubmit={handleLogin}>

<input onChange={(e)=>setEmail(e.target.value)} />
<input type="password" onChange={(e)=>setPassword(e.target.value)} />

<button>Login</button>

</form>

)

}