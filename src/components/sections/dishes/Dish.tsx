import React from "react";
import CTA from '../../others/CTA';
import Stars from '../../others/Stars';
import { useAppDispatch } from '../../../store/hooks';
import { dishAdded } from '../../../store/orderSlice';
import type { Dish as DishType } from '../../../types';

function Dish({ id, name, price, image, rating, main }: DishType & { main?: boolean }): React.JSX.Element {
    const dispatch = useAppDispatch();

    const style: React.CSSProperties = {
        backgroundImage: `linear-gradient(to top, #000, #000d 20%, transparent), url(${new URL(image, import.meta.url).href})`,
    };

    return (
        <div className='dish' style={style}>
            {
                !!main 
                &&
                <>
                    {rating !== undefined && <Stars rating={rating}/>}
                    <h3 className='dish__title'>{name}</h3>
                    <strong className='dish__price'>${price}</strong>
                    <CTA onClick={() => dispatch(dishAdded(id))}>
                        <img className='dish__icon' src={new URL('../../../assets/icons/order.svg', import.meta.url).href} alt='' />
                        Order Now
                    </CTA>
                </>
            }
        </div>
    );
}

export default Dish;
