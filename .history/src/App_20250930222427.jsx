import { useState } from "react";
import Footer from "./components/Footer";
import Book from "./components/Book";
import AppHeader from "./components/AppHeader";
import AddButton from "./components/AddButton";
import data from "../data/books.json";

function App() {
  const [books, setBooks] = useState(data);
  const [selectedBook, setSelectedBook] = useState(null);

  // Remove a book by isbn13
  const handleRemove = (isbn13) => {
    setBooks((prevBooks) => prevBooks.filter((b) => b.isbn13 !== isbn13));
    if (selectedBook === isbn13) {
      setSelectedBook(null); // clear selection if removed
    }
  };

  // Toggle selection
  const handleSelect = (isbn13) => {
    setSelectedBook((prev) => (prev === isbn13 ? null : isbn13));
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
        <div className="mainContent grid grid-cols-3 gap-4">
          {books.map((book) => (
            <Book
              key={book.isbn13}
              image={book.image}
              title={book.title}
              subtitle={book.subtitle}
              isbn13={book.isbn13}
              price={book.price}
              url={book.url}
              onRemove={handleRemove}
              onSelect={handleSelect}
              isSelected={selectedBook === book.isbn13}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
