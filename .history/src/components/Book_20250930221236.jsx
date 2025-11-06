import React, { useState } from 'react';
import './Book.css';

function Book({ image, title, subtitle, isbn13, price, url, onRemove }) {
  const [selected, setSelected] = useState(false);

  const toggleSelected = () => {
    setSelected(!selected);
  };

  const handleRemove = (e) => {
    e.stopPropagation(); // prevent toggling selection on remove
    if (onRemove) onRemove();
  };

  return (
    <div
      className={`Book${selected ? " selected" : ""}`}
      onClick={toggleSelected}
      tabIndex={0} // for accessibility keyboard focus
      role="button"
      aria-pressed={selected}
    >
      <img className='Image' src={image} alt={title} />
      <div className='BookContent'>
        <span className="By">by</span>
        <span className="Title">{title}</span>
        <span className="Subtitle">{subtitle}</span>
        <span className="isbn13">{isbn13}</span>
        <span className="price">{price}</span>
      </div>
      <a className='url' href={url} target='_blank' rel="noopener noreferrer">Learn more</a>
      <button className='removeButton' onClick={handleRemove}>Remove</button>
    </div>
  );
}

export default Book;
