function Event({ name, discount, date, img, main }) {
    const style = {
        backgroundImage: `linear-gradient(to top, #000, #000d 20%, transparent), url(${new URL(`../../../assets/img/${img}`, import.meta.url).href})`,
    }

    return (
        <div className='event' style={style}>
            {
                !!main
                &&
                <>
                    <h3 className='event__name'>{name}</h3>
                    <strong className='event__discount'>{discount}% discount</strong>
                    <time className='event__date'>{date}</time>
                </>
            }
        </div>
    )
}

export default Event