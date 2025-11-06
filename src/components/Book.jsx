import './Book.css';

function Book({ image, title, subtitle, isbn13, price, url, onSelect, isSelected, isOnLoan, onViewDetails }) {
  const handleSelect = (e) => {
    // Don't trigger select when clicking buttons or links
    if (e.target.closest('.viewDetailsButton') || e.target.closest('.url') || e.target.closest('.BookActions')) {
      return;
    }
    onSelect(isbn13);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (onViewDetails) {
      onViewDetails(isbn13);
    }
  };

  return (
    <div
      className={`Book ${isSelected ? "selected" : ""} ${isOnLoan ? "onLoan" : ""}`}
      onClick={handleSelect}
    >
      <img className="Image" src={image} alt={title} />
      <div className="BookContent">
        <span className="By">by</span>
        <h5 className="Title">{title}</h5>
        {subtitle && <p className="Subtitle">{subtitle}</p>}
        <span className="isbn13">{isbn13}</span>
        <span className="price">{price}</span>
        {isOnLoan && (
          <span className="loanBadge">On Loan</span>
        )}
      </div>
      <div className="BookActions">
        <button 
          className="viewDetailsButton"
          onClick={handleViewDetails}
        >
          View Details
        </button>
        <a className="url" href={url} target="_blank" rel="noreferrer">
          Learn more
        </a>
      </div>
    </div>
  );
}

export default Book;
