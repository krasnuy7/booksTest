// import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./BooksCollection.css";
import GetBooksCollection from "../getBooksCollection/GetBooksCollection";

const BooksCollection = () => {
  const [collections, setCollections] = useState([]);

  // Обновляем заголовок документа с помощью API браузера
  const getCollectionFetch = async () => {
    const getResult = await (await fetch("api/collections")).json();
    setCollections(getResult);
  };
  useEffect(() => {
    getCollectionFetch();
  }, []);

  return (
    <div>
      <div>
        <h1>Колекция книг</h1>
      </div>
      <div className="collectionsDiv">
        {collections.map((item, idx) => {
          return (
            <ul className="collectionsUl" key={idx}>
              <li className="collectionsUlLi">
                <div>Название: {item.name}</div>
                <div>Описание: {item.description}</div>
                <ul>
                  <li>Книги</li>
                  <li>
                    <ul>
                      <GetBooksCollection
                        getCollectionFetch={getCollectionFetch}
                        books={item.books}
                        _id={item._id}
                        idx={item.idx}
                      />
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default BooksCollection;
