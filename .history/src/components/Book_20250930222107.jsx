import './Book.css'


function Book ({image, title, subtitle, isbn13, price, url }) {
    function handleAllClicks(e) {
        const red = random(255);
        const blue = random(255);
        const green = random(255);
        e.currentTarget.style.border = `5px solid rgb( ${red}, ${green}, ${blue})`;
      }
      
      function handleLinkClick(e) {
        e.preventDefault();
        // alert(e.target.href); 
        e.stopPropagation();
      }
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
            <a className='url' href={url} target='_blank' >Learn more</a>
        </div>
    )
    function remove(e) {
        if (e.target === e.currentTarget) {
          return;
          //we dont wanna target the span itself
        }
        if (e.target.tagName !== "SPAN") {
          return;
        }
        //doesnt let u delete the label
        e.currentTarget.remove();
      }
      return (
        <div className='tile' style={{ background }} onClick={remove} >
          <p>{label}</p>
          <span>x</span>
        </div>
      )
}

export default Book;