"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import EditCardForm from "./EditCardForm";
import AddCardForm from "./AddCardForm";
import Loading from "./loading";

export default function EditCardDetails() {
  const [cards, setCards] = useState();
  const [selectedCard, setSelectedCard] = useState();
  const [form, setForm] = useState(false);
  const [addForm, setAddForm] = useState(false);
  const [edited, setEdited] = useState(false);
  const [added, setAdded] = useState(false);

  const cardsFetcher = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND}rechargeCards/get`)
      .then((res) => setCards(res.data.payload))
      .catch((e) => console.log(e.message));
  };

  const deleteHandler = () => {
    axios
      .delete(`${process.env.NEXT_PUBLIC_BACKEND}rechargeCards/delete`, {
        data: { id: selectedCard._id },
      })
      .then(() => setEdited(true))
      .catch((e) => console.log(e.message));
  };

  useEffect(() => {
    cardsFetcher();
  }, [edited, added]);

  return (
    <main>
      <section className="flex justify-around align-middle flex-wrap gap-5">
        {cards ? (
          cards.map((card, key) => {
            return (
              <img
                key={key}
                width={150}
                height={150}
                src={`${process.env.NEXT_PUBLIC_BACKEND}${card.picture}`}
                alt={card.name}
                className="cursor-pointer py-4"
                onClick={() => {
                  setSelectedCard(card);
                  setForm(false);
                  setEdited(false);
                }}
              />
            );
          })
        ) : (
          <Loading />
        )}
      </section>
      <section className="mx-auto my-10 border-t border-gray-300 py-10">
        {!edited && selectedCard ? (
          <>
            <div className="flex flex-col gap-5">
              <img
                className="mx-auto"
                src={`${process.env.NEXT_PUBLIC_BACKEND}${selectedCard.picture}`}
                height={200}
                width={200}
              />
              <p className="text-center">{selectedCard.name} $</p>
              <p className="text-center">
                {selectedCard.price.toLocaleString()} LBP
              </p>
            </div>
            <div className="flex gap-5 mx-auto justify-center my-10">
              <button
                className="btn-primary"
                type="button"
                onClick={() => setForm(!form)}
              >
                {form ? "cancel" : "edit"}
              </button>
              <button
                className="btn-secondary"
                type="button"
                onClick={deleteHandler}
              >
                delete
              </button>
              <button
                className="btn border bg-gray-400 text-white"
                type="button"
                onClick={() => setSelectedCard()}
              >
                cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-center">Please Select a Card or:</p>
            <button
              type="button"
              className="btn-primary text-center mx-auto my-5"
              onClick={() => setAddForm(!addForm)}
            >
              {addForm ? "cancel" : "Add Card"}
            </button>
          </>
        )}
        {addForm && <AddCardForm setAddForm={setAddForm} setAdded={setAdded} />}
        {form && (
          <EditCardForm
            setForm={setForm}
            setEdited={setEdited}
            card={selectedCard}
          />
        )}
      </section>
    </main>
  );
}
