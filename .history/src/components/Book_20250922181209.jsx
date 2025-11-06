function Book ({image, by ,author, more }) {
    return (
        <div className="book">
            <img src={image} alt={author} />
            <span className="AuthoName"
        </div>
    )
}

export default Book;