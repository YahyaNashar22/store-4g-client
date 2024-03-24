'use client'

import Link from "next/link";
import { userStore } from "../../store";
import axios from "axios";
import { useEffect } from "react";

export default function Footer() {

  const backendURL = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000/"

  const {user, setUser} = userStore();

  const getUserData = () =>{
    axios.get(`${backendURL}users/getone`,{
      withCredentials:true
    })
        .then((res)=>setUser(res.data))
        .catch(e=>console.log(e.message))
  }

  const handleLogout = (e) => {
    e.preventDefault();
    axios.get(`${backendURL}users/logout`,{
      withCredentials:true
    })
    .then(()=>{
      setUser(null);
    })
    .catch(e=>console.log(e.message))
  }

  useEffect(()=>{
    getUserData()
  },[])

  return (
    <footer className="flex flex-col align-middle text-center w-1/2 mx-auto border-t border-gray-300 py-10 ">
        <p>&copy; 4G Store</p>
        <Link className="text-primary text-center w-24 mx-auto" href={'/dashboard'}>Dashboard</Link>
        {
          user &&
          <button type="button" className="btn-secondary text-center mx-auto my-5" onClick={handleLogout}>logout</button>
        }
    </footer>
  )
}