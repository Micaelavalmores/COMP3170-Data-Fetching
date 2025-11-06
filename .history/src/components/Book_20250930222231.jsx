import React from 'react';
import './Book.css';

function random(max) {
  return Math.floor(Math.random() * (max + 1));
}

function Book({
  image,
  title,
  subtitle,
  isbn13,
  price,
  url,
  isSelected,
  onSelect,
  onRemove,
}) {
  // Handle clicks on the whole book container - random border color
  function handleAllClicks(e) {
    if (onSelect) {
      onSelect();
    }
    const red = random(255);
    const blue = random(255);
    const green = random(255);
    e.currentTarget.style.border = `5px solid rgb(${red}, ${green}, ${blue})`;
  }

  // Prevent link click from propagating or navigating by default
  function handleLinkClick(e) {
    e.preventDefault();
    e.stopPropagation();
    // optionally show alert or custom logic
    alert(`Link clicked: ${url}`);
  }

  return (
    <div
      className={`Book ${isSelected ? "selected" : ""}`}
      onClick={handleAllClicks}
      style={{ position: "relative", cursor: "pointer" }}
    >
      <button
        className="removeButton"
        onClick={(e) => {
          e.stopPropagation();
          if (onRemove) {
            onRemove();
          }
        }}
        aria-label={`Remove book ${title}`}
      >
        ×
      </button>

      <img className="Image" src={image} alt={title} />
      <div className="BookContent">
        <span className="By">by</span>
        <span className="Title">{title}</span>
        <span className="Subtitle">{subtitle}</span>
        <span className="isbn13">{isbn13}</span>
        <span className="price">{price}</span>
      </div>
      <a className="url" href={url} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
        Learn more
      </a>
    </div>
  );
}

export default Book;
