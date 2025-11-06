import React, { useState } from 'react';
import './Book.css';

function Book({ image, title, subtitle, isbn13, price, url, onRemove }) {
  // State to track if this book is selected
  const [selected, setSelected] = useState(false);

  // Toggle selected state on container click (exclude clicking remove button)
  const handleClick = (e) => {
    if (e.target.classList.contains('RemoveButton')) {
      return; // don't toggle on button clicks
    }
    setSelected(!selected);
  };

  return (
    <div
      className={`Book ${selected ? 'Book-selected' : ''}`}
      onClick={handleClick}
      style={{ position: 'relative' }}
    >
      {/* Remove button at top right */}
      <button
        className="RemoveButton"
        onClick={() => onRemove && onRemove()}
        aria-label={`Remove ${title}`}
        title={`Remove ${title}`}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: '28px',
          height: '28px',
          cursor: 'pointer',
          fontWeight: 'bold',
          lineHeight: '28px',
          textAlign: 'center',
          padding: 0,
          zIndex: 2,
        }}
      >
        &times;
      </button>

      <img className="Image" src={image} alt={title} />
      <div className="BookContent">
        <span className="By">by</span>
        <span className="Title">{title}</span>
        <span className="Subtitle">{subtitle}</span>
        <span className="isbn13">{isbn13}</span>
        <span className="price">{price}</span>
      </div>
      <a className="url" href={url} target="_blank" rel="noopener noreferrer">
        Learn more
      </a>
    </div>
  );
}

export default Book;
