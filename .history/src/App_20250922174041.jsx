import Footer from "./components/Footer";
import Book from "./components/Book";
import AppHeader from "./components/AppHeader";
import AddButton from "./components/AddButton";
import


function App () {
  return (
    <div className="app">
      <section className="content">
        <AppHeader />
        <div className="mainContent">
          <Book />
          <AddButton />
        </div>
      </section>
        <Footer />
    </div>
  )
}

export default App;