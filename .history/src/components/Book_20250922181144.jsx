function Book ({image, by ,author, more }) {
    return (
        <div className="book">
            <img src={image} alt={author} />
        </div>
    )
}

export default Book;