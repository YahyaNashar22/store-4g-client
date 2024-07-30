"use client";

import { useEffect, useState } from "react";

export default function OrderForm({
  setOrderForm,
  selectedProduct,
  orderForm,
}) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    street: "",
    building: "",
    floor: "",
    near: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const ownerPhone = 96170596362;
  const message = `name: ${formData.name}\n phone: ${formData.phone}\n city: ${
    formData.city
  }\n street: ${formData.street}\n building: ${formData.building}\n floor: ${
    formData.floor
  }\n near: ${formData.near}\n product: ${
    selectedProduct.name
  }\n price: ${selectedProduct.price.toLocaleString()} $\n ${
    process.env.NEXT_PUBLIC_BACKEND
  }${selectedProduct.picture}`;
  const url = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    window.open(url, "_blank");
    setOrderForm(false);
  };

  useEffect(() => {
    if (orderForm) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [orderForm]);

  return (
    <section className="w-full h-full fixed top-0 left-0 z-10 flex justify-center items-center bg-black bg-opacity-90 gap-5">
      <form onSubmit={handleSubmit} className="h-max w-1/4 bg-transparent">
        <label className="text-white">
          <span>Full Name:</span>
          <input
            name="name"
            onChange={handleChange}
            className="text-black"
            type="text"
            placeholder="Full Name"
          />
        </label>
        <label className="text-white">
          <span>Phone:</span>
          <input
            name="phone"
            onChange={handleChange}
            className="text-black"
            type="number"
            placeholder="Phone Number"
          />
        </label>
        <label className="text-white">
          <span>City:</span>
          <input
            name="city"
            onChange={handleChange}
            className="text-black"
            type="text"
            placeholder="Tripoli, Beirut, etc..."
          />
        </label>
        <label className="text-white">
          <span>Street:</span>
          <input
            name="street"
            onChange={handleChange}
            className="text-black"
            type="text"
            placeholder="Street"
          />
        </label>
        <label className="text-white">
          <span>Building:</span>
          <input
            name="building"
            onChange={handleChange}
            className="text-black"
            type="text"
            placeholder="Building"
          />
        </label>
        <label className="text-white">
          <span>Floor:</span>
          <input
            name="floor"
            onChange={handleChange}
            className="text-black"
            type="number"
            placeholder="1, 2, 3 etc..."
          />
        </label>
        <label className="text-white">
          <span>Near:</span>
          <input
            name="near"
            onChange={handleChange}
            className="text-black"
            type="text"
            placeholder="ex: Facing store"
          />
        </label>
        <section className="flex justify-around">
          <button type="submit" className="btn-primary">
            Order
          </button>
          <button
            type="button"
            className="btn bg-gray-400 text-white"
            onClick={() => {
              setOrderForm(false);
            }}
          >
            Cancel
          </button>
        </section>
      </form>
    </section>
  );
}
