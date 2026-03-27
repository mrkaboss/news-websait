export default function AdminLogin(){

return(

<div className="max-w-md mx-auto p-6">

<h2 className="text-2xl font-bold mb-4">Admin Login</h2>

<input
type="email"
placeholder="Admin Email"
className="border p-2 w-full mb-3"
/>

<input
type="password"
placeholder="Password"
className="border p-2 w-full mb-3"
/>

<button className="bg-red-600 text-white px-4 py-2 rounded w-full">
Admin Login
</button>

</div>

)

}