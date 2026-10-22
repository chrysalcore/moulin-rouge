export type About = {
    name: string,
    src: string,
    strong: string,
    text: string
}

export type Contact = {
    name: string,
    href?: string,
    text: string
}

export type NavLink = {
    href: `/${string}`,
    text: string
}