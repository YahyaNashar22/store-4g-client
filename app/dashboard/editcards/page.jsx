'use client'

import EditCardDetails from "./EditCardDetails"
import { useLayoutEffect } from "react";
import { redirect } from 'next/navigation';
import { userStore } from "../../../store";

export default function CardsDashboard() {

  const {user} = userStore();

  useLayoutEffect(() => {
    if(!user || user===null){
      redirect("/login")
    }
  }, [user])

  return (
    <main>
        <h1>Cards Dashboard</h1>
        <EditCardDetails />
    </main>
  )
}
