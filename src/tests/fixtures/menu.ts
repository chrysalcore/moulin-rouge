import type { Dish, Event } from '../../types'

export const MENU_URL = 'https://devsapihub.com/api-fast-food'

export function buildDish(overrides: Partial<Dish> = {}): Dish {
    return {
        name: 'Margherita',
        price: 12.5,
        image: 'pizza.jpg',
        category: 'pizza',
        ...overrides,
    }
}

export function buildDishes(): Dish[] {
    return [
        buildDish({ name: 'Margherita', category: 'pizza' }),
        buildDish({ name: 'Cheeseburger', category: 'hamburguesa', price: 8.5, image: 'burger.jpg' }),
    ]
}

export function buildEvent(overrides: Partial<Event> = {}): Event {
    return {
        name: 'San Valentin',
        desc: '',
        discount: 15,
        date: '14/2',
        img: 'valentin.png',
        ...overrides,
    }
}

export function buildEvents(): Event[] {
    return [buildEvent()]
}
