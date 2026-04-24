"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLogin(){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

async function handleLogin(e:any){

e.preventDefault()

const res = await fetch("/api/admin/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
email,
password
})
})

const data = await res.json()

if(data.success){
router.push("/admin")
}else{
alert(data.message)
}

}

return(

<div className="max-w-md mx-auto mt-20">

<h1 className="text-2xl font-bold mb-6">
Admin Login
</h1>

<form onSubmit={handleLogin} className="space-y-4">

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
className="border p-2 w-full"
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
className="border p-2 w-full"
/>

<button
type="submit"
className="bg-black text-white px-4 py-2"
>
Login
</button>

</form>

</div>

)

}
