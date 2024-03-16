"use client"

import { useState } from "react"
import axios from "axios"

export default function EditCardForm({setForm, card ,setEdited}) {

    const [cardName, setCardName]= useState(card.name);
    const [cardPrice, setCardPrice]= useState(card.price);
    const [cardPicture, setCardPicture]= useState("");

    const submitHandler = (e)=>{
        e.preventDefault();
        if(cardPicture || cardPicture !==""){
            axios.put(`${process.env.NEXT_PUBLIC_BACKEND}rechargeCards/editpicture`, {id:card._id, image: cardPicture},{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        }
        axios.put(`${process.env.NEXT_PUBLIC_BACKEND}rechargeCards/edit`, {slug:card.slug, name:cardName, price:cardPrice})
                .then(()=>setForm(false))
                .then(()=>setEdited(true))
                .catch(e=>console.log(e.message))
    }

  return (
    <div className="max-w-md mx-auto bg-gray rounded-lg overflow-hidden shadow-md">
    <form onSubmit={submitHandler} className="p-6 w-full">
        <label>
            <span>Name:</span>
            <input type="text" value={cardName} onChange={(e)=>setCardName(e.target.value)} placeholder="change card name" />
        </label>
        <label>
            <span>Price:</span>
            <input type="number" value={cardPrice} onChange={(e)=>setCardPrice(e.target.value)} placeholder="change card price" />
        </label>
        <label>
            <span>Picture:</span>
            <input type="file" name="image" onChange={(e)=>setCardPicture(e.target.files[0])} />
        </label>
        <button type="submit" className="btn-primary">submit</button>
    </form>
    </div>
  )
}
