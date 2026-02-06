// Tipos de datos del dominio de la aplicación
export type Dish = {
    name: string
    price: number
    image: string
    category: string
    [key: string]: unknown // Para propiedades adicionales que puedan venir de la API
}

export type Event = {
    name: string
    desc: string
    discount: number
    date: string
    img: string
}
