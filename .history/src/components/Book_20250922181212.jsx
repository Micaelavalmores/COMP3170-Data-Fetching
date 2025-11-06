function Book ({image, by ,author, more }) {
    return (
        <div className="Book">
            <img src={image} alt={author} />
            <span className="AuthoName"
        </div>
    )
}

export default Book;