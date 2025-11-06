import Footer from "./components/Footer";
import Book from "./components/Book";
import AppHeader from "./components/AppHeader";
import AddButton from "./components/AddButton";


const Book = [
  {
    image: "/",
    author: "/",
    
  }
]


function App () {
  return (
    <div className="app">
      <div className="content">
        <AppHeader />
      </div>
        <div className="mainContent">
          <div className="Book">
            <Book />
          </div>
          <div className="Book">
            <Book />
          </div>
          <div className="AddButton">
            <AddButton />
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default App;