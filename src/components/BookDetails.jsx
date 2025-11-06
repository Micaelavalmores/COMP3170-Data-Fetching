import { useState, useEffect } from 'react';
import './BookDetails.css';

function BookDetails({ book, onClose }) {
  const [similarBooks, setSimilarBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSimilarBooks = async () => {
      if (!book) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Try searching by author first, then publisher, then title
        let searchQuery = '';
        if (book.author && book.author !== 'Unknown Author') {
          searchQuery = book.author.split(' ')[0]; // Use first name/last name
        } else if (book.publisher && book.publisher !== 'Unknown Publisher') {
          searchQuery = book.publisher;
        } else if (book.title) {
          // Extract key words from title (excluding common words)
          const titleWords = book.title.split(' ').filter(word => 
            word.length > 3 && !['the', 'and', 'with', 'for'].includes(word.toLowerCase())
          );
          searchQuery = titleWords[0] || book.title.split(' ')[0];
        }

        if (searchQuery) {
          const response = await fetch(`https://api.itbook.store/1.0/search/${encodeURIComponent(searchQuery)}`);
          if (!response.ok) {
            throw new Error('Failed to fetch similar books');
          }
          const data = await response.json();
          
          // Filter out the current book and limit to 6 similar books
          const filtered = data.books
            .filter(b => b.isbn13 !== book.isbn13)
            .slice(0, 6);
          
          setSimilarBooks(filtered);
        } else {
          setSimilarBooks([]);
        }
      } catch (err) {
        console.error('Error fetching similar books:', err);
        setError('Failed to load similar books');
        setSimilarBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarBooks();
  }, [book]);

  if (!book) return null;

  return (
    <div className="bookDetailsOverlay">
      <div className="bookDetailsContainer">
        <button className="bookDetailsClose" onClick={onClose}>
          ×
        </button>
        
        <div className="bookDetailsContent">
          <div className="bookDetailsMain">
            <img 
              className="bookDetailsImage" 
              src={book.image} 
              alt={book.title} 
            />
            
            <div className="bookDetailsInfo">
              <h1 className="bookDetailsTitle">{book.title}</h1>
              {book.subtitle && (
                <h2 className="bookDetailsSubtitle">{book.subtitle}</h2>
              )}
              
              <div className="bookDetailsMeta">
                {book.author && book.author !== 'Unknown Author' && (
                  <div className="bookDetailsField">
                    <span className="bookDetailsLabel">Author:</span>
                    <span className="bookDetailsValue">{book.author}</span>
                  </div>
                )}
                
                {book.publisher && book.publisher !== 'Unknown Publisher' && (
                  <div className="bookDetailsField">
                    <span className="bookDetailsLabel">Publisher:</span>
                    <span className="bookDetailsValue">{book.publisher}</span>
                  </div>
                )}
                
                {book.language && (
                  <div className="bookDetailsField">
                    <span className="bookDetailsLabel">Language:</span>
                    <span className="bookDetailsValue">{book.language}</span>
                  </div>
                )}
                
                {book.isbn13 && (
                  <div className="bookDetailsField">
                    <span className="bookDetailsLabel">ISBN-13:</span>
                    <span className="bookDetailsValue">{book.isbn13}</span>
                  </div>
                )}
                
                {book.price && (
                  <div className="bookDetailsField">
                    <span className="bookDetailsLabel">Price:</span>
                    <span className="bookDetailsValue">{book.price}</span>
                  </div>
                )}
              </div>
              
              {book.url && (
                <a 
                  href={book.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="bookDetailsLink"
                >
                  View on IT Book Store
                </a>
              )}
            </div>
          </div>
          
          <div className="similarBooksSection">
            <h2 className="similarBooksTitle">Similar Books</h2>
            
            {loading && (
              <div className="similarBooksLoading">Loading similar books...</div>
            )}
            
            {error && (
              <div className="similarBooksError">{error}</div>
            )}
            
            {!loading && !error && similarBooks.length === 0 && (
              <div className="similarBooksEmpty">No similar books found.</div>
            )}
            
            {!loading && similarBooks.length > 0 && (
              <div className="similarBooksGrid">
                {similarBooks.map((similarBook) => (
                  <div key={similarBook.isbn13} className="similarBookCard">
                    <img 
                      src={similarBook.image} 
                      alt={similarBook.title}
                      className="similarBookImage"
                    />
                    <div className="similarBookInfo">
                      <h3 className="similarBookTitle">{similarBook.title}</h3>
                      <p className="similarBookPrice">{similarBook.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;

