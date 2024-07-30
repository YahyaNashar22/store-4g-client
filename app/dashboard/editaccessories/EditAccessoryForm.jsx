"use client";

import { useState } from "react";
import axios from "axios";

export default function EditAccessoryForm({
  id,
  setEditAccessories,
  selectedProduct,
}) {
  const backendURL =
    process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000/";

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: id,
    name: selectedProduct.name,
    price: selectedProduct.price,
    category: selectedProduct.category,
    brand: selectedProduct.brand,
    quantity: true,
  });

  const [image, setImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(`${backendURL}accessories/edit`, formData)
      .then(() => setEditAccessories(false))
      .catch((e) => console.log(e.message));
  };

  const handleImageSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .put(
        `${backendURL}accessories/editpicture`,
        { image: image, id: formData.id },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then(() => {
        setLoading(false);
        setEditAccessories(false);
      })
      .catch((e) => console.log(e.message));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .delete(`${backendURL}accessories/delete`, {
        data: {
          id: id,
        },
      })
      .then(() => setLoading(false), setEditAccessories(false))
      .catch((e) => console.log(e.message));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label>
          <span>Name:</span>
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="accessory name"
          />
        </label>
        <label>
          <span>Price:</span>
          <input
            type="number"
            name="price"
            onChange={handleChange}
            placeholder="accessory price"
          />
        </label>
        <label>
          <span>Category:</span>
          <input
            type="text"
            name="category"
            onChange={handleChange}
            placeholder="accessory category"
          />
        </label>
        <label>
          <span>Brand:</span>
          <input
            type="text"
            name="brand"
            onChange={handleChange}
            placeholder="accessory brand"
          />
        </label>
        <label>
          <span>Quantity:</span>
          <select name="quantity" onChange={handleChange} defaultValue={true}>
            <option value={true}>available</option>
            <option value={false}>not available</option>
          </select>
        </label>
        <button className="btn-primary" type="submit" disabled={loading}>
          {loading ? "wait..." : "submit"}
        </button>
        <button type="button" className="btn-secondary" onClick={handleDelete}>
          Delete
        </button>
      </form>
      <form>
        <label>
          <span>Picture:</span>
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
        <button
          className="btn-primary"
          type="button"
          onClick={handleImageSubmit}
        >
          change picture
        </button>
      </form>
    </>
  );
}
