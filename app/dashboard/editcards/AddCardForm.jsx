"use client"

import { useState } from "react"
import axios from "axios"

export default function AddCardForm({setAddForm, setAdded}) {

    const backendURL = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000/"

    const [name,setName]=useState('');
    const [price,setPrice]=useState('');
    const [carrier, setCarrier] = useState('')
    const [picture,setPicture]=useState('');

    const submitHandler =(e) =>{
        e.preventDefault();
        axios.post(`${backendURL}rechargeCards/create`, {name:name, price:price,carrier:carrier, image:picture},{
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        }).then(()=>{setAddForm(false); setAdded(true)})
            .catch(e=>console.log(e.message))
    }

  return (
    <div className="max-w-md mx-auto bg-gray rounded-lg overflow-hidden shadow-md">
    <form onSubmit={submitHandler} className="p-6 w-full">
        <label>
            <span>Name:</span>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="card name" />
        </label>
        <label>
            <span>Price:</span>
            <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="card price" />
        </label>
        <label>
            <span>Carrier:</span>
            <select onChange={(e)=>setCarrier(e.target.value)}>
                <option defaultValue={null}>Select Carrier</option>
                <option value={"alfa"}>Alfa</option>
                <option value={"mtc"}>Mtc</option>
            </select>
        </label>
        <label>
            <span>Picture:</span>
            <input type="file" name="image" onChange={(e)=>setPicture(e.target.files[0])} />
        </label>
        <button type="submit" className="btn-primary">submit</button>
    </form>
    </div>
  )
}
