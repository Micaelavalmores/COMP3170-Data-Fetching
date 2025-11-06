function Book ({image ,author, more }) {
    return (
        <div className="Book">
            <img src={image} alt={author} />
            <span className="AuthoName">{by}</span>
            <span className="AuthoName">{author}</span>
            <span className="AuthoName">{more}</span>
        </div>
    )
}

export default Book;