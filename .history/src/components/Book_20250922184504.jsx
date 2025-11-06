import './Styles.css';

function Book ({image, title, subtitle, isbn13, price, url }) {
    return (
        <div className="Book">
            <img className='Image' src={image} alt={author} />
            <span className="By">by</span>
            <span className="title">{author}</span>
            <a href={url}>Learn more...</a>
        </div>
    )
}

export default Book;