'use client'

import Link from "next/link";
import { userStore } from "../../store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {

  const router = useRouter()

  const backendURL = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000/"

  const {user, setUser} = userStore();
  const [loading, setLoading] = useState(true);

  const getUser = () => {
   const retrievedUser =  localStorage.getItem("user")
   setUser(JSON.parse(retrievedUser));
   setLoading(false)
  }

  const handleLogout = (e) => {
    e.preventDefault();
    setLoading(true)
    axios.get(`${backendURL}users/logout`,{
      withCredentials:true
    })
    .then(()=>{
      localStorage.clear();
      setUser(null);
      setLoading(false)
      router.push('/')
    })
    .catch(e=>console.log(e.message))
  }

  useEffect(()=>{
    getUser()
  },[])


  return (
    <footer className="flex flex-col align-middle text-center w-1/2 mx-auto border-t border-gray-300 py-10 ">
        <p>&copy; 4G Store</p>
        <Link className="text-primary text-center w-24 mx-auto" href={'/dashboard'}>Dashboard</Link>
        {
          user && !loading &&
          <button type="button" disabled={loading} className="btn-secondary text-center mx-auto my-5" onClick={handleLogout}>{loading?"please wait...":"logout"}</button>
        }
    </footer>
  )
}