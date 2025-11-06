import './Styles.css';

function Book ({image, author, more }) {
    return (
        <div className="Book">
            <img class src={image} alt={author} />
            <span className="By">by</span>
            <span className="AuthorName">{author}</span>
            <span className="LearnMore">{more}</span>
        </div>
    )
}

export default Book;