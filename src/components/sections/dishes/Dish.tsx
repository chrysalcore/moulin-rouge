import React from "react";
import CTA from '../../others/CTA';
import Stars from '../../others/Stars';
import type { Dish as DishType } from '../../../types';

function Dish({ name, price, image, main }: DishType & { main?: boolean }): React.JSX.Element {
    const rating = Number((Math.random() * 2 + 3).toFixed(2));

    const style: React.CSSProperties = {
        backgroundImage: `linear-gradient(to top, #000, #000d 20%, transparent), url(${new URL(image, import.meta.url).href})`,
    };

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
    );
}

export default Dish;
