"use client";

import { useLayoutEffect, useState } from "react";
import axios from "axios";
import { userStore } from "../../store";
import { redirect, useRouter } from "next/navigation";
import Loading from "./loading";

export default function page() {
  const backendURL =
    process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000/";

  const router = useRouter();

  const { user, setUser } = userStore();

  const [loading, setLoading] = useState(false);
  const [isPass, setIsPass] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${backendURL}users/login`, formData, {
        withCredentials: true,
      });

      setUser(res.data.token.data);
      localStorage.setItem("user", JSON.stringify(res.data.token.data));
      setLoading(false);
      router.push("/dashboard");
    } catch (error) {
      setLoading(false);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 401) {
          alert("User not found!");
        } else if (error.response.status === 501) {
          alert("Password is incorrect!");
        } else {
          alert("Something went wrong, please try again");
          console.error(
            `Error: ${error.response.status} - ${error.response.data.message}`
          );
        }
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from server!");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error in setting up the request!", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (user) {
      redirect("/dashboard");
    }
  }, [user]);

  return (
    <form
      className="w-1/2 h-max flex flex-col flex-wrap items-center justify-between gap-5 mx-auto my-10"
      onSubmit={handleLogin}
    >
      <label className="w-full flex flex-col flex-wrap items-center justify-between ">
        <span>Email:</span>
        <input
          className="w-full"
          type="email"
          name="email"
          onChange={handleChange}
          required
        />
      </label>
      <label className="w-full flex flex-col flex-wrap items-center justify-between relative ">
        <span>Password:</span>
        <input
          className="w-full"
          type={isPass ? "password" : "text"}
          name="password"
          onChange={handleChange}
          required
        />
        <span
          onClick={() => setIsPass(!isPass)}
          className="absolute right-4 bottom-5 cursor-pointer"
        >
          {isPass ? "show" : "hide"}
        </span>
      </label>
      <button
        type="submit"
        disabled={loading}
        onClick={handleLogin}
        className="btn-primary"
      >
        {loading ? "please wait" : "Login"}
      </button>
      {loading && <Loading />}
    </form>
  );
}
