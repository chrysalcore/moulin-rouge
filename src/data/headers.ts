import type { Header } from '../types';

interface Headers {
    [key: string]: Header
}

const data: Headers = {
    about: {
        title: 'About Us',
        desc: ''
    },
    dishes: {
        title: 'Our Menu',
        desc: "From reinvented classics to bold creations, our menu is a tribute to gastronomy. Do you prefer something light or a burst of indulgence?"
    },
    contact: {
        title: 'Contact Us',
        desc: "We have a table waiting for you and us messager ready. Do you prefer a Reservation or a Delivery. Don't spend your time, hurry up!"
    },
    order: {
        title: 'Your Order',
        desc: "Review your dishes before confirming"
    },
    reservation: {
        title: 'Reservation',
        desc: "Pick a date, tell us how many you are and we'll have your table ready."
    }
}

export default data