import CTA from '../../others/CTA'
import Stars from '../../others/Stars'

function Dish({ name, price, image, main }) {
    const rating = Number((Math.random() * 2 + 3).toFixed(2))

    const style = {
        backgroundImage: `linear-gradient(to top, #000, #000d 20%, transparent), url(${new URL(image, import.meta.url).href})`,
    }

    return (
        <div className='dish' style={style}>
            {
                !!main 
                &&
                <>
                    <Stars rating={rating}/>
                    <h3 className='dish__title'>{name}</h3>
                    <strong className='dish__price'>${price}</strong>
                    <CTA>Order Now</CTA>
                </>
            }
        </div>
    )
}

export default Dish