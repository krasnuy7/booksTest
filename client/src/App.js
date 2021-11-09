import React, { Component } from "react";
import BooksCollection from "./component/BooksCollection/BooksCollection";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className={"container"}>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Книги</h1>
          </header>
        </div>
        <BooksCollection />
      </div>
    );
  }
}

export default App;
