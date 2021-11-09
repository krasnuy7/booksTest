// import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./AddBooks.css";

const AddBooks = (props) => {
  const [addBooksObj, setAddBooksObj] = useState({});
  const addBooktoObj = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setAddBooksObj((prev) => ({ ...prev, [name]: value }));
  };

  const addBookQuery = async () => {
    try {
      const res = await fetch("/api/books", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(addBooksObj),
      });

      let objRes = await res.json();
      props.setBooksMap((p) => [...p, objRes]);
      if (objRes) {
        const addBookCollectionJSON = await fetch(
          "/api/collections/" + props.propsIdCollection + "/books",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ bookId: objRes._id }),
          }
        );
        let addBookCollection = await addBookCollectionJSON.json();
        if (addBookCollection) props.getCollectionFetch();
        [...document.querySelectorAll(".deleteValue")].forEach(
          (item) => (item.value = "")
        );
      }
    } catch (error) {
      throw new Error("New error message", { cause: error });
    }
  };
  return (
    <ul className={"ulAddBookForm"}>
      <li className={"ulLiAddBookForm"}>
        <input
          name="name"
          className={"deleteValue form-control"}
          width={150}
          placeholder="Название книги"
          type="text"
          onChange={addBooktoObj}
        />
      </li>
      <li className={"ulLiAddBookForm"}>
        <input
          name={"author"}
          className={"deleteValue form-control"}
          placeholder="Автор"
          type="text"
          onChange={addBooktoObj}
        />
      </li>
      <li className={"ulLiAddBookForm"}>
        <input
          name={"price"}
          className={"deleteValue form-control"}
          placeholder="Цена"
          type="number"
          onChange={addBooktoObj}
        />
      </li>
      <li className={"ulLiAddBookForm"}>
        <input
          name={"rating"}
          className={"deleteValue form-control"}
          placeholder="Рейтинг"
          type="number"
          min="0"
          max="5"
          onChange={addBooktoObj}
        />
      </li>
      <li className={"ulLiAddBookForm"}>
        <button
          className={"btn btn-primary"}
          onClick={() => addBookQuery(props.propsIdCollection)}
        >
          Отправить
        </button>
      </li>
    </ul>
  );
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
export default AddBooks;
