import React from "react";
import { Link } from 'react-router-dom';
import '../../assets/styles/Order.css';
import useDishes from "../../hooks/useDishes";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { dishAdded, dishDecremented, dishRemoved, orderCleared, selectItems } from '../../store/orderSlice';
import AsyncContent from '../others/AsyncContent';
import SectionHeader from '../global/SectionHeader';
import header from '../../data/headers';

function Order(): React.JSX.Element {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);
    const dishes = useDishes();

    const lines = dishes.data
        .filter(dish => items[dish.id] !== undefined)
        .map(dish => ({ dish, quantity: items[dish.id], total: dish.price * items[dish.id] }));

    const subtotal = lines.reduce((sum, line) => sum + line.total, 0);

    return (
        <main className='order section'>
            <SectionHeader {...header.order} />
            <AsyncContent status={dishes}>
                {lines.length === 0 ?
                    <p className='order__empty'>
                        Your order is empty. <Link className='order__link' to={'/menu'}>Browse the menu</Link>
                    </p> :
                    <>
                        <ul className='order-list'>
                            {lines.map(({ dish, quantity, total }) => (
                                <li className='order-item' key={dish.id}>
                                    <span className='order-item__name'>{dish.name}</span>
                                    <div className="order-item__control">
                                        <div className='order-item__count'>
                                            <button className='order-item__btn btn' aria-label={`Remove one ${dish.name}`} onClick={() => dispatch(dishDecremented(dish.id))}><img className='order-item__icon' src={new URL('../../assets/icons/less.svg', import.meta.url).href} alt='' /></button>
                                            <span className='order-item__quantity'>{quantity}</span>
                                            <button className='order-item__btn btn' aria-label={`Add one ${dish.name}`} onClick={() => dispatch(dishAdded(dish.id))}><img className='order-item__icon' src={new URL('../../assets/icons/more.svg', import.meta.url).href} alt='' /></button>
                                        </div>
                                        <span className='order-item__total'>${total.toFixed(2)}</span>
                                        <button className='order-item__remove btn' aria-label={`Remove ${dish.name} from order`} onClick={() => dispatch(dishRemoved(dish.id))}><img className='order-item__icon' src={new URL('../../assets/icons/cancel.svg', import.meta.url).href} alt='' /></button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className='order-summary'>
                            <strong className='order-summary__subtotal'>Subtotal: ${subtotal.toFixed(2)}</strong>
                            <button className='order-summary__clear btn' onClick={() => dispatch(orderCleared())}>Clear order</button>
                        </div>
                    </>
                }
            </AsyncContent>
        </main>
    );
}

export default Order;
