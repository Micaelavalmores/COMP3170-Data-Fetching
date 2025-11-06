import { useState } from "react";
import Footer from "./components/Footer";
import Book from "./components/Book";
import AppHeader from "./components/AppHeader";
import AddButton from "./components/AddButton";
import data from "../data/books.json";

function App() {
  const [books, setBooks] = useState(data);

  const handleRemove = (isbn13) => {
    setBooks((prev) => prev.filter((book) => book.isbn13 !== isbn13));
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
              onRemove={handleRemove}
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
