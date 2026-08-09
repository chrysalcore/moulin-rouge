// Tipos para componentes
export type Brief = {
    [key: string]: string
}

export type Header = {
    title: string
    desc: string
}

export type SectionType = 'about' | 'dishes' | 'contact' | 'reservation'

export type BriefInfo = {
    name: string
    title: string
    desc: string
    strong: string
    link: string
    ref: string
}
