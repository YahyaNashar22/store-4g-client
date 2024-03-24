"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import EditAccessoryForm from "./EditAccessoryForm";

export default function EditAccessory({setEditAccessories}) {

    const backendURL = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000/"

    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState({})

    const productFetcher = () => {
        axios.get(`${backendURL}accessories/get`)
            .then(res=>setProducts(res.data.payload))
            .catch(e=>console.log(e.message))
    }

    useEffect(()=>{
        productFetcher();
    })

  return (
    <section className="flex flex-col justify-around items-center gap-5">
    <select className="w-max" onChange={(e)=>setSelectedProduct(JSON.parse(e.target.value))}>
        <option value={null}>Select Product</option>
        {
            products ? 
            products.map((product, key) => {
                        return (
                            <option key={key} value={JSON.stringify(product)}>{product.name}</option> 
                        )
                    }
            )
            :
            <p className="text-center">getting your products</p>
        }
    </select>
    {
        selectedProduct && Object.keys(selectedProduct).length>0 && (
            <div className="flex flex-col items-center justify-center gap-5" >
                 <img src={`${backendURL}${selectedProduct.picture}`} width={200} height={200} alt={selectedProduct.name} />
                 <EditAccessoryForm id={selectedProduct._id} setEditAccessories={setEditAccessories} selectedProduct={selectedProduct} />
            </div>
        )
    }
    </section>
  )
}
