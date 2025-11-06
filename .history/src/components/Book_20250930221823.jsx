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
    return (
      <div
        className={`Book${isSelected ? " selected" : ""}`}
        onClick={onSelect}
        style={{ position: "relative", cursor: "pointer" }}
      >
        <button
          className="removeButton"
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering onSelect
            onRemove();
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
        <a className="url" href={url} target="_blank" rel="noopener noreferrer">
          Learn more
        </a>
      </div>
    );
  }
  
  export default Book;
  