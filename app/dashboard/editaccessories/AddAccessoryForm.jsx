"use client"

import { useState } from "react"
import axios from "axios"

export default function AddAccessoryForm({setCreateForm}) {

    const backendURL = process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000/"

    const [loading, setLoading] =useState(false);

    const [formData, setFormData] = useState({
        name:'',
        price:'',
        category:'',
        brand:'',
        quantity:true,
        image:null
    });

    const handleChange = (e) =>{
       const {name, value} = e.target;
       setFormData ({...formData, [name]:value})
    }

    const handlePictureChange = (e) =>{
        const file = e.target.files[0];
        setFormData(prevState =>({
            ...prevState,
            image:file
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        axios.post(`${backendURL}accessories/create`, formData, {
            headers: {'Content-Type': 'multipart/form-data'}
        }).then(()=>setCreateForm(false))
            .catch(e=>console.log(e.message))
    }

  return (
    <form onSubmit={handleSubmit}>
        <label>
            <span>Name:</span>
            <input type="text" name="name" onChange={handleChange} placeholder="accessory name" />
        </label>
        <label>
            <span>Price:</span>
            <input type="number" name="price" onChange={handleChange} placeholder="accessory price" />
        </label>
        <label>
            <span>Category:</span>
            <input type="text" name="category" onChange={handleChange} placeholder="accessory category" />
        </label>
        <label>
            <span>Brand:</span>
            <input type="text" name="brand" onChange={handleChange} placeholder="accessory brand" />
        </label>
        <label>
            <span>Quantity:</span>
            <select name="quantity" onChange={handleChange} defaultValue={true}>
                <option value={true}>available</option>
                <option value={false}>not available</option>
            </select>
        </label>
        <label>
            <span>Picture:</span>
            <input type="file" name="image" onChange={handlePictureChange} />
        </label>
        <button className="btn-primary" type="submit" disabled={loading}>{loading?"adding...":"Add"}</button>
    </form>
  )
}
