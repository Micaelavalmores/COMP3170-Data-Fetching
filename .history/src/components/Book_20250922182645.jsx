import './Styles.css';

function Book ({image, author, more }) {
    return (
        <div className="Book">
            <img src={image} alt={author} />
            <span className="AuthoName">by</span>
            <span className="AuthorName">{author}</span>
            <span className="AuthorName">{more}</span>
        </div>
    )
}

export default Book;