import Footer from "./components/Footer";
import Book from "./components/Book";
import AppHeader from "./components/AppHeader";
import AddButton from "./components/AddButton";
import data from "../data/books.json";


function App() {
  return (
    <div className="app">
      <div className="content">
        <AppHeader />
      </div>
      <div className="mainContent">
        {data.map((book) => (
          <Book
            image={book.image}
            title={book.title}
            subtitle={book.subtitle}
            // isbn13={book.isbn13}
            price={book.price}
            url={book.url}
          />
        ))}
        <AddButton />
      </div>
      <Footer />
    </div>
  );
}


export default App;