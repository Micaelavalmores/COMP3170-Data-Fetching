import { useState } from "react";
import './Book.css';

function Book({ image, title, subtitle, isbn13, price, url, onRemove }) {
  const [selected, setSelected] = useState(false);

  const toggleSelect = () => {
    setSelected((prev) => !prev);
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // Prevent triggering selection toggle
    onRemove(isbn13);
  };

  return (
    <div
      className={`Book ${selected ? "selected" : ""}`}
      onClick={toggleSelect}
    >
      <button className="removeButton" onClick={handleRemove}>
        ✕
      </button>
      <img className="Image" src={image} alt={title} />
      <div className="BookContent">
        <span className="By">by</span>
        <span className="Title">{title}</span>
        <span className="Subtitle">{subtitle}</span>
        <span className="isbn13">{isbn13}</span>
        <span className="price">{price}</span>
      </div>
      <a className="url" href={url} target="_blank" rel="noreferrer">
        Learn more
      </a>
    </div>
  );
}

export default Book;
