import React, { useState } from "react";
import Footer from "./components/Footer";
import Book from "./components/Book";
import AppHeader from "./components/AppHeader";
import AddButton from "./components/AddButton";
import data from "../data/books.json";

function App() {
  const [books, setBooks] = useState(data);
  const [selectedBookIsbn, setSelectedBookIsbn] = useState(null);

  // Remove book by ISBN
  const handleRemove = (isbn13) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.isbn13 !== isbn13));
    if (selectedBookIsbn === isbn13) {
      setSelectedBookIsbn(null);
    }
  };

  // Toggle selection
  const handleSelect = (isbn13) => {
    setSelectedBookIsbn((prevSelected) =>
      prevSelected === isbn13 ? null : isbn13
    );
  };

  return (
    <div className="app">
      <div className="content">
        <AppHeader />
      </div>
      <div className="contentBody">
        <div className="addButton">
          <AddButton />
        </div>
        <div className="mainContent">
          {books.map((book) => (
            <Book
              key={book.isbn13}
              image={book.image}
              title={book.title}
              subtitle={book.subtitle}
              isbn13={book.isbn13}
              price={book.price}
              url={book.url}
              isSelected={selectedBookIsbn === book.isbn13}
              onSelect={() => handleSelect(book.isbn13)}
              onRemove={() => handleRemove(book.isbn13)}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
