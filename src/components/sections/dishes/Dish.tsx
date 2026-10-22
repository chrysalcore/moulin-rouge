import React from "react";
import Button from '../../others/Button';
import Stars from '../../others/Stars';
import formatPrice from '../../../helpers/formatPrice';
import { useAppDispatch } from '../../../store/hooks';
import { dishAdded } from '../../../store/orderSlice';
import type { Dish as DishType } from '../../../types';

const orderIcon = new URL('../../../assets/icons/order.svg', import.meta.url).href;

function Dish({ id, name, price, image, rating, main, className }: DishType & { main: boolean; className: string }): React.JSX.Element {
    const dispatch = useAppDispatch();

    const style: React.CSSProperties = {
        backgroundImage: `linear-gradient(to top, #000, #000d 20%, transparent), url(${new URL(image, import.meta.url).href})`,
    };

    return (
        <div className={`flex flex-col items-center justify-end gap-2 rounded-lg bg-cover bg-center p-8 shadow-card ${className}`} style={style}>
            {main &&
                <>
                    {rating !== undefined && <Stars rating={rating} />}
                    <h3 className='text-center text-lg font-semibold'>{name}</h3>
                    <strong className='absolute top-4 right-4 rounded-lg bg-linear-to-r from-surface to-dom px-4 py-2 text-xl text-com'>{formatPrice(price)}</strong>
                    <div className='my-4'>
                        <Button onClick={() => dispatch(dishAdded(id))}>
                            <img className='size-5' src={orderIcon} alt='' />
                            Order Now
                        </Button>
                    </div>
                </>
            }
        </div>
    );
}

export default Dish;
