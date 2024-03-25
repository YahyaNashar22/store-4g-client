"use client";

import { useState } from "react";
import axios from "axios";
import { userStore } from "@/store";
import { useRouter } from "next/navigation";

export default function page() {
  const backendURL =
    process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000/";

    const router = useRouter()

    const {user,setUser} = userStore()

  const [loading, setLoading] = useState(false);
  const [isPass,setIsPass] = useState(true)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(`${backendURL}users/login`, formData, {
        withCredentials:true
      })
      .then((res) => {
         setUser(res.data.token.data);
         localStorage.setItem("user", JSON.stringify(res.data.token.data))
        setLoading(false);
        router.push('/dashboard')
      })
      .catch((e) => alert("Something wet wrong !"));
      setLoading(false)
  };

  return ( 
  <form className="w-1/2 h-max flex flex-col flex-wrap items-center justify-between gap-5 mx-auto my-10" onSubmit={handleLogin} >
    <label className="w-full flex flex-col flex-wrap items-center justify-between ">
        <span>Email:</span>
        <input className="w-full" type="email" name="email" onChange={handleChange} required />
    </label>
    <label className="w-full flex flex-col flex-wrap items-center justify-between relative ">
        <span>Password:</span>
        <input className="w-full" type={isPass?"password":"text"} name="password" onChange={handleChange} required />
        <span onClick={()=>setIsPass(!isPass)} className="absolute right-4 bottom-5 cursor-pointer">{isPass?"show":"hide"}</span>
    </label>
    <button type="submit" disabled={loading} onClick={handleLogin} className="btn-primary">{loading?"please wait":"Login"}</button>
  </form>
)
}
