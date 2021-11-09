// import React, { Component } from "react";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./GetBooksCollection.css";
import AddBooks from "../AddBooks/AddBooks";
const GetBooksCollection = (props) => {
  const [openModel, setOpenModel] = useState([]);
  const [openModelAddBooks, setOpenModelAddBooks] = useState([]);
  const [editBooksObj, setEditBooksObj] = useState({});
  const [booksMap, setBooksMap] = useState([]);

  useEffect(() => {
    const getCollectionFetchBooks = async () => {
      props.books.map(async (item) => {
        let url = "/api/books/" + item;
        const getResult = await (await fetch(url)).json();
        setBooksMap((prev) => [...prev, getResult]);
      });
    };
    getCollectionFetchBooks();
  }, []);
  const openModelBtn = (e) => {
    let target = e.target;
    let idArr = Number(target.dataset.idbooksarr);
    if (openModel[idArr] === true) {
      setOpenModel((prev) => {
        let newState = [...prev];
        newState[idArr] = false;
        return newState;
      });
    } else {
      setOpenModel((prev) => {
        let newState = [...prev];
        newState[idArr] = true;
        return newState;
      });
    }
  };

  const addBookModal = () => {
    if (openModelAddBooks[props.idx] === true) {
      setOpenModelAddBooks((prev) => {
        let newState = [...prev];
        newState[props.idx] = false;
        return newState;
      });
    } else {
      setOpenModelAddBooks((prev) => {
        let newState = [...prev];
        newState[props.idx] = true;
        return newState;
      });
    }
  };

  const egitBooks = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setEditBooksObj((prev) => ({ ...prev, [name]: value }));
  };
  const egitBooksQuery = async (e) => {
    let booksUrl = e.target.dataset.idbooks;
    try {
      const res = await fetch("/api/books/" + booksUrl, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(editBooksObj),
      });
      let objRes = await res.json();
      let newBooksMap = booksMap.filter((item) => {
        if (item) {
          if (objRes._id !== item._id) return item;
        }
      });
      newBooksMap.push(objRes);
      setBooksMap([...newBooksMap]);
    } catch (error) {
      throw new Error("New error message", { cause: error });
    }
  };

  const deleteBook = async (e) => {
    let idBook = e.target.dataset.bookurl;
    await fetch("/api/books/" + idBook, {
      method: "DELETE",
    });
    let newBooksMap = booksMap.filter((item) => {
      if (item) {
        if (idBook !== item._id) return item;
      }
    });
    setBooksMap([...newBooksMap]);
  };
  return (
    <li>
      {
        <button className={"addBookBtn btn btn-success"} onClick={addBookModal}>
          Добавить книгу
        </button>
      }
      {openModelAddBooks[props.idx] && (
        <AddBooks
          setBooksMap={setBooksMap}
          propsIdCollection={props._id}
          getCollectionFetch={props.getCollectionFetch}
        />
      )}
      <div className={"positionBookLi"}>
        {props.books.map((item, idxModal) => {
          return booksMap.map((i, idx) => {
            if (i) {
              if (item === i._id) {
                return (
                  <div
                    className={"positionBookLi"}
                    key={idx}
                    className={"booksMapLi"}
                  >
                    <ul className={"UlCardBooks"}>
                      <li>
                        <img height="120" src={"./img/books.jpg"} />
                      </li>
                      <li> Название: {i.name}</li>
                      <li>Автор: {i.author}</li>
                      <li>Рейтинг: {i.rating}</li>
                      <li>Цена: {i.price}</li>
                      <li>
                        <button
                          data-idbooksarr={idxModal}
                          onClick={openModelBtn}
                          className={"egitBtn btn btn-warning"}
                        >
                          Редактировать
                        </button>
                        <button
                          data-bookurl={i._id}
                          className={"btn btn-danger"}
                          onClick={deleteBook}
                        >
                          Удалить
                        </button>
                      </li>
                    </ul>
                    {openModel[idxModal] && (
                      <ul>
                        <li className={"ulLiAddBookForm"}>
                          <input
                            name="name"
                            className={"deleteValue form-control"}
                            width={150}
                            placeholder="Название книги"
                            type="text"
                            onChange={egitBooks}
                          />
                        </li>
                        <li className={"ulLiAddBookForm"}>
                          <input
                            name={"author"}
                            className={"deleteValue form-control"}
                            placeholder="Автор"
                            type="text"
                            onChange={egitBooks}
                          />
                        </li>
                        <li className={"ulLiAddBookForm"}>
                          <input
                            name={"price"}
                            className={"deleteValue form-control"}
                            placeholder="Цена"
                            type="number"
                            onChange={egitBooks}
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
                            onChange={egitBooks}
                          />
                        </li>
                        <li className={"ulLiAddBookForm"}>
                          <button
                            className={"btn btn-primary"}
                            data-idbooks={i._id}
                            onClick={egitBooksQuery}
                          >
                            Отправить
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                );
              }
            }
          });
        })}
      </div>
    </li>
  );
};

export default GetBooksCollection;
