function Book ({image, by ,author, more }) {
    return (
        <div className="Book">
            <img src={image} alt={author} />
            <span className="AuthoName"></span>
        </div>
    )
}

export default Book;