"use client";

import Link from "next/link";
import { userStore } from "../../store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const backendURL =
    process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000/";

  const { user, setUser } = userStore();
  const [loading, setLoading] = useState(false);
  const [logging, setLogging] = useState(false);

  const getUser = () => {
    setLoading(true);
    const retrievedUser = localStorage.getItem("user");
    setUser(JSON.parse(retrievedUser));
    setLoading(false);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLogging(true);

    try {
      axios.get(`${backendURL}users/logout`, {
        withCredentials: true,
      });

      localStorage.clear();
      setUser(null);
      router.push("/");
    } catch (e) {
      alert("Something went wrong, please try again");
      console.log(e.message);
    } finally {
      setLoading(false);
      setLogging(false);
    }
  };

  //   axios
  //     .get(`${backendURL}users/logout`, {
  //       withCredentials: true,
  //     })
  //     .then(() => {
  //       localStorage.clear();
  //       setUser(null);
  //       setLoading(false);
  //       router.push("/");
  //     })
  //     .catch((e) => {
  //       alert("Something went wrong, please try again");
  //       console.log(e.message);
  //       setLoading(false);
  //     });

  useEffect(() => {
    getUser();
  }, []);

  return (
    <footer className="flex flex-col align-middle text-center w-1/2 mx-auto border-t border-gray-300 py-10 ">
      <p>&copy; 4G Store</p>
      <Link
        className="text-primary text-center w-24 mx-auto"
        href={"/dashboard"}
      >
        Dashboard
      </Link>
      {user && (
        <>
          <button
            type="button"
            disabled={loading}
            className="btn-secondary text-center mx-auto my-5"
            onClick={handleLogout}
          >
            {logging ? "please wait..." : "logout"}
          </button>
          {logging && (
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
                <p className="mt-4 text-2xl font-bold text-red-500 animate-pulse">
                  Logging out...
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </footer>
  );
}
