"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useLayoutEffect } from "react";
import { redirect } from "next/navigation";
import { userStore } from "../../../store";

export default function BundlesDashboard() {
  const { user } = userStore();

  useLayoutEffect(() => {
    if (!user || user === null) {
      redirect("/login");
    }
  }, [user]);

  const backendURL =
    process.env.NEXT_PUBLIC_BACKEND || "http://localhost:5000/";

  const [bundles, setBundles] = useState("");
  const [selectedBundle, setSelectedBundle] = useState("");
  const [editForm, setEditForm] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const bundleFetcher = () => {
    axios
      .get(`${backendURL}uShareBundles/get`)
      .then((res) => setBundles(res.data.payload))
      .catch((e) => console.log(e.message));
  };
  useEffect(() => {
    bundleFetcher();
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${backendURL}uShareBundles/delete`, {
        data: {
          id: selectedBundle,
        },
      })
      .then(() => {
        setEditForm(false);
        window.location.reload();
      })
      .catch((e) => console.log(e));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post(`${backendURL}uShareBundles/create`, { name: name, price: price })
      .then(() => {
        window.location.reload();
      })
      .catch((e) => console.log(e.message));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || name === "") {
      axios
        .put(`${backendURL}uShareBundles/edit`, {
          id: selectedBundle,
          price: price,
        })
        .then(() => {
          setEditForm(false);
          window.location.reload();
        })
        .catch((e) => console.log(e));
    } else if (!price || price === "") {
      axios
        .put(`${backendURL}uShareBundles/edit`, {
          id: selectedBundle,
          name: name,
        })
        .then(() => {
          setEditForm(false);
          window.location.reload();
        })
        .catch((e) => console.log(e));
    } else {
      axios
        .put(`${backendURL}uShareBundles/edit`, {
          id: selectedBundle,
          name: name,
          price: price,
        })
        .then(() => {
          setEditForm(false);
          window.location.reload();
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <main className="flex flex-col justify-around gap-5">
      <h1>U Share Bundles Dashboard</h1>
      <select
        className="w-max"
        onChange={(e) => setSelectedBundle(e.target.value)}
      >
        <option className="text-center" value={null}>
          Select Bundle
        </option>
        {bundles &&
          bundles.map((bundle, key) => {
            return (
              <option className="text-center" key={key} value={bundle._id}>
                {bundle.name} --{">"} {bundle.price.toLocaleString()} LBP
              </option>
            );
          })}
      </select>
      {!addForm && !editForm && (
        <button
          className="btn-primary w-max text-center"
          onClick={() => setAddForm(true)}
        >
          Add
        </button>
      )}
      {!addForm &&
        !editForm &&
        selectedBundle &&
        selectedBundle !== "Select Bundle" && (
          <>
            <button
              className="btn-primary w-max text-center"
              onClick={() => setEditForm(true)}
            >
              edit
            </button>
          </>
        )}
      {/* EDIT FORM */}
      {editForm && (
        <>
          <form>
            <label>
              <span>Name:</span>
              <input
                type="text"
                placeholder="Bundle Name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <span>Price:</span>
              <input
                type="number"
                placeholder="Bundle Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </form>
          <button
            type="submit"
            className="btn-primary w-max text-center self-center"
            onClick={handleSubmit}
          >
            Change
          </button>
          <button
            type="button"
            className="btn-secondary w-max text-center self-center"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn text-white bg-gray-400 w-max text-center self-center"
            onClick={() => setEditForm(false)}
          >
            cancel
          </button>
        </>
      )}
      {/* CREATE FORM */}
      {addForm && (
        <>
          <form>
            <label>
              <span>Name:</span>
              <input
                type="text"
                placeholder="Bundle Name"
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              <span>Price:</span>
              <input
                type="number"
                placeholder="Bundle Price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
          </form>
          <button
            type="submit"
            className="btn-primary w-max text-center self-center"
            onClick={handleCreate}
          >
            Add
          </button>
          <button
            type="button"
            className="btn text-white bg-gray-400 w-max text-center self-center"
            onClick={() => setAddForm(false)}
          >
            cancel
          </button>
        </>
      )}
    </main>
  );
}
