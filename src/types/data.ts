export type About = {
    name: string,
    src: string,
    strong: string,
    text: string
}

export type Contact = {
    name: string,
    href: string,
    text: string
}

export type Input = {
    name: string,
    type: string,
    placeholder: string,
    isInput: boolean
}

export type NavLink = {
    href: `/${string}`,
    text: string
}