"use client";

import { userStore } from "@/store";
export default function Hello() {
  const { user } = userStore();

  return (
    <>
      {user && (
        <>
          <h1>Hello Mr.{user.name} !</h1>
          <p className="text-red-700 font-bold">What do you want to do today ?</p>
        </>
      )}
    </>
  );
}
