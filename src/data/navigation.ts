type NavLink = {
    href: `/${string}`,
    text: string
}

const data: NavLink[] = [
    {
        href: '/',
        text: 'Home',
    },
    {
        href: '/menu',
        text: 'Menu',
    },
    {
        href: '/reservation',
        text: 'Reservation',
    }
]

export default data