"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import OrderForm from "./OrderForm";

export default function Store() {
  const backendURL =
    process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000/";

  const [fetchedProducts, setFetchedProducts] = useState();
  const [totalNB, setTotalNB] = useState();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [orderForm, setOrderForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  const fetchProducts = () => {
    if (!search || search === "") {
      axios
        .get(`${backendURL}accessories/get?page=${page}`)
        .then((res) => {
          setFetchedProducts(res.data.payload);
          setTotalNB(res.data.count);
        })
        .catch((e) => console.log(e.message));
    } else if (search) {
      axios
        .post(`${backendURL}accessories/search?page=${page}`, {
          search: search,
        })
        .then((res) => {
          setFetchedProducts(res.data.payload);
          setTotalNB(res.data.count);
        })
        .catch((e) => console.log(e.message));
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [search]);

  return (
    <main className="flex flex-col flex-wrap gap-5">
      <input
        type="text"
        placeholder="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="appearance-none block w-full px-4 py-2 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
      <section className="flex flex-wrap gap-5">
        {fetchedProducts ? (
          fetchedProducts.map((product, key) => {
            return (
              <div
                key={key}
                className="max-w-xs min-w-3.5 rounded overflow-hidden shadow-lg z-1"
              >
                <img
                  className="transition-transform duration-300 transform hover:scale-105 sm:h-64 sm:w-64 h-55 w-64"
                  loading="lazy"
                  src={`${backendURL}${product.picture}`}
                  alt={product.name}
                />
                <div className="px-6 py-4">
                  <h2 className="text-gray-700 font-bold text-xl mb-2">
                    {product.name}
                  </h2>
                  <p className="text-gray-700 text-base mb-2">
                    <span className="text-primary font-bold">Brand:</span>{" "}
                    {product.brand}
                  </p>
                  <p className="text-gray-700 text-base mb-2">
                    <span className="text-primary font-bold">Category:</span>{" "}
                    {product.category}
                  </p>
                  <p className="text-gray-700 text-base mb-2">
                    <span className="text-primary font-bold">Price:</span>{" "}
                    {product.price} $
                  </p>
                  <button
                    type="button"
                    disabled={!product.quantity}
                    className={
                      product.quantity
                        ? "btn-primary w-max text-center my-3"
                        : "btn bg-red-400 text-white w-max text-center my-3"
                    }
                    onClick={() => {
                      setOrderForm(!orderForm);
                      setSelectedProduct(product);
                    }}
                  >
                    {product.quantity ? "Order Now" : "Out Of Stock"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="w-full text-center">
            Getting your products, please wait. . .
          </p>
        )}
      </section>
      <div className="flex flex-col w-20">
        {page === 1 && totalNB > 10 && (
          <button
            type="button"
            className="btn-primary"
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        )}
        {page > 1 && page < Math.ceil(totalNB / 10) && (
          <div className="flex justify-center align-middle gap-5">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
            <button
              type="button"
              className="btn-primary"
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
          </div>
        )}
        {page != 1 && page === Math.ceil(totalNB / 10) && (
          <button
            type="button"
            className="btn-primary"
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
        )}
        <p>
          {page} / {Math.ceil(totalNB / 10)}
        </p>
      </div>
      {orderForm && (
        <OrderForm
          setOrderForm={setOrderForm}
          selectedProduct={selectedProduct}
          orderForm={orderForm}
        />
      )}
    </main>
  );
}
