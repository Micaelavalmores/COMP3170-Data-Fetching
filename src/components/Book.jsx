import './Book.css';

function Book({ image, title, subtitle, isbn13, price, url, onSelect, isSelected, isOnLoan }) {
  const handleSelect = () => {
    onSelect(isbn13);
  };

  return (
    <div
      className={`Book ${isSelected ? "selected" : ""} ${isOnLoan ? "onLoan" : ""}`}
      onClick={handleSelect}
    >
      <img className="Image" src={image} alt={title} />
      <div className="BookContent">
        <span className="By">by</span>
        <span className="Title">{title}</span>
        <span className="Subtitle">{subtitle}</span>
        <span className="isbn13">{isbn13}</span>
        <span className="price">{price}</span>
        {isOnLoan && (
          <span className="loanBadge">On Loan</span>
        )}
      </div>
      <a className="url" href={url} target="_blank" rel="noreferrer">
        Learn more
      </a>
    </div>
  );
}

export default Book;
