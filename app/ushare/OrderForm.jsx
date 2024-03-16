"use client"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import axios from "axios"

export default function OrderForm() {

    const router = useRouter()
    const backendURL = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:5000/'

    const [fetchedBundles, setFetchedBundles] = useState()
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber]= useState('');
    const [bundle, setBundle] =useState();
    const [bundlePrice, setBundlePrice] =useState();
    const [loading, setLoading] = useState(false);

    const ownerPhone = 96170596362;
    const message = `name: ${name}\n phone: ${phoneNumber}\n bundle: ${bundle}\n price: ${bundlePrice && parseFloat(bundlePrice).toLocaleString()} LBP`
    const url = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`

    const bundleFetcher = () =>{
        axios.get(`${backendURL}uShareBundles/get`)
                .then(res=>setFetchedBundles(res.data.payload))
                .catch(e=>console.log(e.message))
    }
    useEffect(()=>{
        bundleFetcher()
    },[])


    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!bundlePrice){
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
        <span>Bundle:</span>
        <select 
          onChange={(e) => {setBundle(e.target.options[e.target.selectedIndex].getAttribute('name'));setBundlePrice(e.target.value)}}
          name={bundle}
          value={bundlePrice}
        >
          <option className="text-center" name="select bundle" defaultValue={null}>Select Bundle</option>
        {
            fetchedBundles && (
                fetchedBundles.map((fetchedBundle, key)=>{
                    return (
                        <option className="text-center" key={key} name={fetchedBundle.name} value={fetchedBundle.price}>{fetchedBundle.name} --{">"} {fetchedBundle.price.toLocaleString()} LBP</option>
                    )
                })
            )
        }
        </select>
      </label>
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
