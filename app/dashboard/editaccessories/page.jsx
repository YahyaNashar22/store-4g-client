"use client"

import { useState } from "react";

import AddAccessoryForm from "./AddAccessoryForm";
import EditAccessory from "./EditAccessory";
import { useLayoutEffect } from "react";
import { redirect } from 'next/navigation';
import { userStore } from "../../../store";


export default function AccessoriesDashboard() {

  const {user} = userStore();

  useLayoutEffect(() => {
    if(!user || user===null){
      redirect("/login")
    }
  }, [user])

  const [createForm, setCreateForm] = useState(false);
  const [editAccessories,  setEditAccessories] = useState(false)

  return (
    <main className="flex flex-col gap-5">
      <h1>Accessories Dashboard</h1>
      <button type="button" className={!createForm?"btn-primary w-32":"btn text-center text-white bg-gray-400 w-32"} onClick={()=>{setCreateForm(!createForm); setEditAccessories(false)}}>{!createForm?"Add Accessory":"Cancel"}</button>
      <button type="button" className={!editAccessories?"btn-primary w-32":"btn text-center text-white bg-gray-400 w-32"} onClick={()=>{setCreateForm(false); setEditAccessories(!editAccessories)}}>{!editAccessories?"Edit Accessory":"Cancel"}</button>

      { createForm && <AddAccessoryForm setCreateForm={setCreateForm} />}

      { editAccessories && <EditAccessory setEditAccessories={setEditAccessories} />}

    </main>
  )
}
