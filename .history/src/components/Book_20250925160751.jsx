import './Book.css'

function Book ({image, title, subtitle, isbn13, price, url }) {
    return (
        <div className="Book">
            <img className='Image' src={image} alt={title} />
            <div className='BookContent'>
                <span className="By">by</span>
                <span className="Title">{title}</span>
                <span className="Subtitle">{subtitle}</span>
                <span className="isbn13">{isbn13}</span>
                <span className="price">{price}</span>
            </div>
            <br></br>
            <a className='url' href={url}>Learn more...</a>
        </div>
    )
}

export default Book;