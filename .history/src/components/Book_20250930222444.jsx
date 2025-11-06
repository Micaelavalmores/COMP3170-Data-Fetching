// components/Book.jsx
function Book({ image, title, subtitle, price, url, isbn13, onRemove, onSelect, isSelected }) {
    return (
      <div
        onClick={() => onSelect(isbn13)}
        className={`relative p-4 rounded-xl shadow-md cursor-pointer transition 
          ${isSelected ? "border-4 border-blue-500 bg-blue-100" : "border border-gray-200 bg-white"}`}
      >
        {/* Remove Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering select
            onRemove(isbn13);
          }}
          className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
        >
          ✕
        </button>
  
        <img src={image} alt={title} className="w-full h-48 object-contain mb-3" />
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
        <p className="mt-2 font-bold">{price}</p>
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 text-sm underline"
          onClick={(e) => e.stopPropagation()} // prevent selection when clicking link
        >
          More Info
        </a>
      </div>
    );
  }
  
  export default Book;
  