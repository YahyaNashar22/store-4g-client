"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"

export default function CardOrderForm() {

    const router = useRouter()
    const backendURL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:5000/'

    const [fetchedCards, setFetchedCards] = useState()
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber]= useState('');
    const [card, setCard] =useState();
    const [cardPrice, setCardPrice] =useState();
    const [selectedCard, setSelectedCard] = useState();// display the img of the selected card
    const [carrier, setCarrier] = useState();
    const [loading, setLoading] = useState(false);

    const ownerPhone = 96170596362;
    const message = `name: ${name}\n phone: ${phoneNumber}\n card: ${card}\n price: ${cardPrice && parseFloat(cardPrice).toLocaleString()} LBP`
    const url = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`

    const cardFetcher = () =>{
        axios.post(`${backendURL}rechargeCards/cardsbycarrier`, {carrier:carrier})
                .then(res=>setFetchedCards(res.data.payload))
                .catch(e=>console.log(e.message))
    }
    useEffect(()=>{
        cardFetcher()
    },[carrier])


    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!cardPrice){
          alert("Select Bundle !")
        }
        else{
          setLoading(true);
          window.open(url , "_blank")
          setLoading(false);
          router.push('/');
        }
    }

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
    <label>
        <span>Name:</span>
        <input
          required 
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </label>
      <label>
        <span>Phone:</span>
        <input
          required 
          type="Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber}
        />
      </label>
      <label>
        <span>Carrier:</span>
        <select 
          onChange={(e) => setCarrier(e.target.value)}
          value={carrier}
        >
          <option className="text-center h-1/2" defaultValue={null}>
            Select Carrier
          </option>
          <option className="text-center h-1/2" value="alfa">Alfa</option>
          <option className="text-center h-1/2" value="mtc">Mtc</option>
        </select>
      </label>
      {
        carrier ?
        <div className="flex justify-around align-middle flex-wrap gap-5">
      {
        fetchedCards && fetchedCards.map((card, key)=>{
          return(
            <img 
              key={key}
              src={`${backendURL}${card.picture}`}
              width={150}
              height={150}
              alt={card.name}
              onClick={()=>{setCardPrice(card.price); setCard(card.name); setSelectedCard(card.picture)}}
              className="cursor-pointer py-4"
            />
          )
        })
      }
      </div>
      :
      <></>
      }
      <div className="flex align-middle justify-center my-10">
      {
        selectedCard && <img style={{boxShadow:"0px 0px 20px #00000070"}} src={`${backendURL}${selectedCard}`} height={200} width={250} alt={selectedCard} />
      }
      </div>
      <button 
        className="btn-primary" 
        disabled={loading}
      >
      {loading && <span>Sending...</span>}
      {!loading && <span>Order</span>}
    </button>
    </form>
  )
}
