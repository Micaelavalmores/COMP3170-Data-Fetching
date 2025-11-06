import { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Book from "./components/Book";
import AppHeader from "./components/AppHeader";
import AddButton from "./components/AddButton";
import Modal from "./components/Modal";
import BookForm from "./components/BookForm";
import data from "../data/books.json";

const STORAGE_KEY = "books";
const LOANS_STORAGE_KEY = "loans";

function App() {
  // Load books from localStorage or use default data
  const loadBooksFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsedBooks = JSON.parse(stored);
        // Ensure all books have required fields
        return parsedBooks.map(book => ({
          ...book,
          selected: book.selected || false,
          publisher: book.publisher || "Unknown Publisher",
          language: book.language || "English",
          author: book.author || "Unknown Author"
        }));
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
    // Default: add publisher and language to existing books
    return data.map(book => ({ 
      ...book, 
      selected: false,
      publisher: book.publisher || "Unknown Publisher",
      language: book.language || "English",
      author: book.author || "Unknown Author"
    }));
  };

  // Load loans from localStorage
  const loadLoansFromStorage = () => {
    try {
      const stored = localStorage.getItem(LOANS_STORAGE_KEY);
      if (stored) {
        const parsedLoans = JSON.parse(stored);
        // Convert date strings back to Date objects
        return parsedLoans.map(loan => ({
          ...loan,
          dueDate: new Date(loan.dueDate),
          loanDate: new Date(loan.loanDate)
        }));
      }
    } catch (error) {
      console.error("Error loading loans from localStorage:", error);
    }
    return [];
  };

  const [books, setBooks] = useState(loadBooksFromStorage);
  const [loans, setLoans] = useState(loadLoansFromStorage);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [filterPublisher, setFilterPublisher] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [currentView, setCurrentView] = useState("bookListing"); // "bookListing" or "loanManagement"
  
  // Loan form state
  const [loanForm, setLoanForm] = useState({
    borrower: "",
    bookId: "",
    loanPeriod: 1
  });

  // Save books to localStorage whenever books change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [books]);

  // Save loans to localStorage whenever loans change
  useEffect(() => {
    try {
      // Convert Date objects to ISO strings for storage
      const loansToStore = loans.map(loan => ({
        ...loan,
        dueDate: loan.dueDate instanceof Date ? loan.dueDate.toISOString() : loan.dueDate,
        loanDate: loan.loanDate instanceof Date ? loan.loanDate.toISOString() : loan.loanDate
      }));
      localStorage.setItem(LOANS_STORAGE_KEY, JSON.stringify(loansToStore));
    } catch (error) {
      console.error("Error saving loans to localStorage:", error);
    }
  }, [loans]);

  // Add a new book
  const handleAddBook = (newBook) => {
    const bookWithId = {
      ...newBook,
      isbn13: Date.now().toString(), // Generate a simple ID
      price: "$0.00", // Default price
      image: "https://via.placeholder.com/120x170?text=No+Image", // Default image
      selected: false,
      subtitle: newBook.subtitle || "",
      publisher: newBook.publisher || "Unknown Publisher",
      language: newBook.language || "English",
      author: newBook.author || "Unknown Author"
    };
    setBooks(prevBooks => [...prevBooks, bookWithId]);
  };

  // Delete selected book
  const handleDeleteSelected = () => {
    if (selectedBookId) {
      setBooks(prevBooks => prevBooks.filter(book => book.isbn13 !== selectedBookId));
      setSelectedBookId(null);
    }
  };

  // Update button - open edit modal
  const handleUpdate = () => {
    if (selectedBookId) {
      setEditModalOpen(true);
    }
  };

  // Handle edit book submission
  const handleEditBook = (updatedBook) => {
    if (selectedBookId) {
      setBooks(prevBooks =>
        prevBooks.map(book =>
          book.isbn13 === selectedBookId
            ? {
                ...book,
                title: updatedBook.title,
                author: updatedBook.author,
                url: updatedBook.url,
                publisher: updatedBook.publisher,
                language: updatedBook.language,
              }
            : book
        )
      );
      setEditModalOpen(false);
      setSelectedBookId(null);
    }
  };

  // Get selected book for editing
  const selectedBook = books.find(book => book.isbn13 === selectedBookId);

  // Toggle selection - only one book can be selected at a time
  const handleSelect = (isbn13) => {
    setBooks(prevBooks => 
      prevBooks.map(book => ({
        ...book,
        selected: book.isbn13 === isbn13 ? !book.selected : false
      }))
    );
    setSelectedBookId(prev => prev === isbn13 ? null : isbn13);
  };

  // Filter books based on criteria
  const filteredBooks = books.filter(book => {
    const matchesPublisher = !filterPublisher || book.publisher === filterPublisher;
    const matchesLanguage = !filterLanguage || book.language === filterLanguage;
    const matchesTitle = !searchTitle || book.title?.toLowerCase().includes(searchTitle.toLowerCase());
    return matchesPublisher && matchesLanguage && matchesTitle;
  });

  // Get unique publishers and languages for filter dropdowns
  const uniquePublishers = [...new Set(books.map(book => book.publisher).filter(Boolean))].sort();
  const uniqueLanguages = [...new Set(books.map(book => book.language).filter(Boolean))].sort();

  // Get books that are currently on loan (by ISBN)
  const loanedBookIds = new Set(loans.map(loan => loan.bookId));
  
  // Get available books (not on loan)
  const availableBooks = books.filter(book => !loanedBookIds.has(book.isbn13));

  // Calculate due date from loan period
  const calculateDueDate = (loanPeriod) => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + (loanPeriod * 7));
    return dueDate;
  };

  // Format date for display
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Handle loan form submission
  const handleLoanSubmit = (e) => {
    e.preventDefault();
    if (loanForm.borrower && loanForm.bookId && loanForm.loanPeriod) {
      const newLoan = {
        id: Date.now().toString(),
        borrower: loanForm.borrower,
        bookId: loanForm.bookId,
        loanPeriod: parseInt(loanForm.loanPeriod),
        dueDate: calculateDueDate(parseInt(loanForm.loanPeriod)),
        loanDate: new Date()
      };
      setLoans(prevLoans => [...prevLoans, newLoan]);
      setLoanForm({
        borrower: "",
        bookId: "",
        loanPeriod: 1
      });
    }
  };

  // Handle loan form change
  const handleLoanFormChange = (e) => {
    const { name, value } = e.target;
    setLoanForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="app">
      <div className="content">
        <AppHeader />
      </div>
      <div className="contentBody">
        <div className="buttonGroup">
          {/* View Toggle Button */}
          <button
            className="actionButton"
            onClick={() => setCurrentView(currentView === "bookListing" ? "loanManagement" : "bookListing")}
            style={{
              background: 'pink',
              color: 'white',
            }}
          >
            {currentView === "bookListing" ? "Loan Management" : "Book Listing"}
          </button>

          {currentView === "bookListing" && (
            <>
              <AddButton onAddBook={handleAddBook} />
              <button 
                className="actionButton updateButton" 
                onClick={handleUpdate}
                disabled={!selectedBookId}
              >
                Update
              </button>
              <button 
                className="actionButton deleteButton" 
                onClick={handleDeleteSelected}
                disabled={!selectedBookId}
              >
                Delete
              </button>
              
              {/* Filter Section */}
              <div className="filterSection">
            <h3 style={{ marginTop: '20px', marginBottom: '10px', fontSize: '18px', fontWeight: '600' }}>Filters</h3>
            
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              Search by Title:
              <input
                type="text"
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                placeholder="Enter title..."
                className="filterInput"
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '4px',
                  border: '1px solid #ffb6c1',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: '#ffb6c1',
                }}
              />
            </label>

            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              Filter by Publisher:
              <select
                value={filterPublisher}
                onChange={(e) => setFilterPublisher(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '4px',
                  border: '1px solid #ffb6c1',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: '#ffb6c1',
                  color: '#8b008b',
                }}
              >
                <option value="" style={{ backgroundColor: '#ffb6c1', color: '#8b008b' }}>All Publishers</option>
                {uniquePublishers.map(publisher => (
                  <option key={publisher} value={publisher}>{publisher}</option>
                ))}
              </select>
            </label>

            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>
              Filter by Language:
              <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '4px',
                  border: '1px solid #ffb6c1',
                  borderRadius: '4px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                  backgroundColor: '#ffb6c1',
                  color: '#8b008b',
                }}
              >
                <option value="" style={{ backgroundColor: '#ffb6c1', color: '#8b008b' }}>All Languages</option>
                {uniqueLanguages.map(language => (
                  <option key={language} value={language}>{language}</option>
                ))}
              </select>
            </label>

            <button
              onClick={() => {
                setFilterPublisher("");
                setFilterLanguage("");
                setSearchTitle("");
              }}
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '10px',
                background: '#ffb6c1',
                color: '#8b008b',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Clear Filters
            </button>
          </div>
            </>
          )}
        </div>
        
        {currentView === "bookListing" ? (
          <div className="mainContent grid grid-cols-3 gap-4">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <Book
                  key={book.isbn13}
                  image={book.image}
                  title={book.title}
                  subtitle={book.subtitle}
                  isbn13={book.isbn13}
                  price={book.price}
                  url={book.url}
                  onSelect={handleSelect}
                  isSelected={book.selected}
                  isOnLoan={loanedBookIds.has(book.isbn13)}
                />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#666' }}>
                No books match the current filters.
              </div>
            )}
          </div>
        ) : (
          <div className="loanManagementContent" style={{ flex: 1, padding: '20px' }}>
            {/* Loan Form */}
            {availableBooks.length > 0 ? (
              <form onSubmit={handleLoanSubmit} style={{
                background: '#ffb6c1',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '30px',
                maxWidth: '500px'
              }}>
                <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#8b008b', fontSize: '24px' }}>Create New Loan</h2>
                
                <label style={{ display: 'block', marginBottom: '16px' }}>
                  <span style={{ display: 'block', marginBottom: '8px', color: '#8b008b', fontWeight: '600' }}>Borrower Name:</span>
                  <input
                    type="text"
                    name="borrower"
                    value={loanForm.borrower}
                    onChange={handleLoanFormChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ffb6c1',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      backgroundColor: 'white',
                    }}
                  />
                </label>

                <label style={{ display: 'block', marginBottom: '16px' }}>
                  <span style={{ display: 'block', marginBottom: '8px', color: '#8b008b', fontWeight: '600' }}>Select Book:</span>
                  <select
                    name="bookId"
                    value={loanForm.bookId}
                    onChange={handleLoanFormChange}
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ffb6c1',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      backgroundColor: 'white',
                    }}
                  >
                    <option value="">Choose a book...</option>
                    {availableBooks.map(book => (
                      <option key={book.isbn13} value={book.isbn13}>{book.title}</option>
                    ))}
                  </select>
                </label>

                <label style={{ display: 'block', marginBottom: '20px' }}>
                  <span style={{ display: 'block', marginBottom: '8px', color: '#8b008b', fontWeight: '600' }}>Loan Period (weeks):</span>
                  <input
                    type="number"
                    name="loanPeriod"
                    value={loanForm.loanPeriod}
                    onChange={handleLoanFormChange}
                    min="1"
                    max="4"
                    required
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ffb6c1',
                      borderRadius: '6px',
                      fontSize: '14px',
                      boxSizing: 'border-box',
                      backgroundColor: 'white',
                    }}
                  />
                </label>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '12px',
                    background: '#8b008b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                  }}
                >
                  Create Loan
                </button>
              </form>
            ) : (
              <div style={{
                background: '#ffb6c1',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '30px',
                maxWidth: '500px',
                textAlign: 'center'
              }}>
                <h2 style={{ marginTop: 0, color: '#8b008b', fontSize: '24px' }}>All Books Are On Loan</h2>
                <p style={{ color: '#8b008b', margin: '10px 0 0 0' }}>There are no available books to loan at this time.</p>
              </div>
            )}

            {/* Loan List */}
            <div>
              <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#8b008b', fontSize: '24px' }}>Active Loans</h2>
              {loans.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {loans.map(loan => {
                    const book = books.find(b => b.isbn13 === loan.bookId);
                    const dueDate = loan.dueDate instanceof Date ? loan.dueDate : new Date(loan.dueDate);
                    // Skip loans where the book no longer exists
                    if (!book) return null;
                    return (
                      <div
                        key={loan.id}
                        style={{
                          background: '#ffb6c1',
                          padding: '16px',
                          borderRadius: '8px',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: '600', color: '#8b008b', marginBottom: '4px' }}>
                            {loan.borrower}
                          </div>
                          <div style={{ color: '#8b008b', fontSize: '14px' }}>
                            {book ? book.title : 'Unknown Book'}
                          </div>
                        </div>
                        <div style={{ color: '#8b008b', fontWeight: '600' }}>
                          Due: {formatDate(dueDate)}
                        </div>
                      </div>
                    );
                  }).filter(Boolean)}
                </div>
              ) : (
                <div style={{
                  background: '#ffb6c1',
                  padding: '24px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  color: '#8b008b'
                }}>
                  No active loans
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
      
      {/* Edit Modal */}
      <Modal isOpen={isEditModalOpen} onClose={() => {
        setEditModalOpen(false);
        setSelectedBookId(null);
      }}>
        {selectedBook && (
          <BookForm
            onSubmit={handleEditBook}
            initialValues={selectedBook}
            mode="edit"
          />
        )}
      </Modal>
    </div>
  );
}

export default App;
