import React from "react";
import { Link } from 'react-router-dom';
import useDishes from "../../hooks/useDishes";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { dishAdded, dishDecremented, dishRemoved, orderCleared, selectItems } from '../../store/orderSlice';
import AsyncContent from '../others/AsyncContent';
import IconButton from '../others/IconButton';
import Section from '../global/Section';
import Button from '../others/Button';
import header from '../../data/headers';

const lessIcon = new URL('../../assets/icons/less.svg', import.meta.url).href;
const moreIcon = new URL('../../assets/icons/more.svg', import.meta.url).href;
const cancelIcon = new URL('../../assets/icons/cancel.svg', import.meta.url).href;

function Order(): React.JSX.Element {
    const dispatch = useAppDispatch();
    const items = useAppSelector(selectItems);
    const dishes = useDishes();

    const lines = dishes.data
        .filter(dish => items[dish.id] !== undefined)
        .map(dish => ({ dish, quantity: items[dish.id], total: dish.price * items[dish.id] }));

    const subtotal = lines.reduce((sum, line) => sum + line.total, 0);

    return (
        <Section as='main' header={header.order}>
            <AsyncContent status={dishes}>
                {lines.length === 0 ?
                    <p className='text-lgh'>
                        Your order is empty. <Link className='text-com' to={'/menu'}>Browse the menu</Link>
                    </p> :
                    <div className='flex w-full max-w-2xl flex-col gap-8'>
                        <ul className='flex flex-col gap-3'>
                            {lines.map(({ dish, quantity, total }) => (
                                <li className='grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-2 rounded-lg bg-surface p-3' key={dish.id}>
                                    <img className='row-span-2 size-20 rounded-lg object-cover' src={new URL(dish.image, import.meta.url).href} alt='' />
                                    <div className='flex min-w-0 flex-col gap-1'>
                                        <span className='font-bold'>{dish.name}</span>
                                        <span className='text-sm text-lgh/70'>${dish.price.toFixed(2)} each</span>
                                    </div>
                                    <div className='self-start'>
                                        <IconButton icon={cancelIcon} label={`Remove ${dish.name} from order`} onClick={() => dispatch(dishRemoved(dish.id))} />
                                    </div>
                                    <div className='col-span-2 flex items-center justify-between self-end'>
                                        <span className='font-bold'>${total.toFixed(2)}</span>
                                        <div className='flex items-center gap-1'>
                                            <IconButton icon={lessIcon} label={`Remove one ${dish.name}`} onClick={() => dispatch(dishDecremented(dish.id))} />
                                            <span className='w-8 text-center'>{quantity}</span>
                                            <IconButton icon={moreIcon} label={`Add one ${dish.name}`} onClick={() => dispatch(dishAdded(dish.id))} />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className='flex items-center justify-between gap-4'>
                            <strong>Subtotal: ${subtotal.toFixed(2)}</strong>
                            <Button variant='outline' onClick={() => dispatch(orderCleared())}>Clear order</Button>
                        </div>
                    </div>
                }
            </AsyncContent>
        </Section>
    );
}

export default Order;
