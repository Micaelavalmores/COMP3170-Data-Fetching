import './Styles.css';

function Book ({image, title, subtitle, isd }) {
    return (
        <div className="Book">
            <img className='Image' src={image} alt={author} />
            <span className="By">by</span>
            <span className="AuthorName">{author}</span>
            <a href={more}>Learn more...</a>
        </div>
    )
}

export default Book;