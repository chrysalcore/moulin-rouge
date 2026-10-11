// Tipos de datos del dominio de la aplicación
export type Dish = {
    id: number
    name: string
    price: number
    image: string
    category: string
    rating?: number
    [key: string]: unknown // Para propiedades adicionales que puedan venir de la API
}

export type Event = {
    name: string
    desc: string
    discount: number
    date: string
    img: string
}
