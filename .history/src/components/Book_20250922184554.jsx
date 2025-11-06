import './Styles.css';

function Book ({image, title, subtitle, isbn13, price, url }) {
    return (
        <div className="Book">
            <img className='Image' src={image} alt={author} />
            <div className='BookContent'>
                
                <span className="By">by</span>
                <span className="title">{author}</span>
                <span className="title">{author}</span>
            </div>
            <a href={url}>Learn more...</a>
        </div>
    )
}

export default Book;