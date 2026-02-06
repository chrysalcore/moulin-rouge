// Tipos de datos del dominio
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

export type Category = {
    name: string
    title: string
    img: `${string}.jpg`
}

// Tipos para el contexto y estado
export type DataContextValue = {
    categories: string[]
    dishes: Dish[]
    events: Event[]
}

// Response types
export type LoadingResponse = { type: 'LOADING', payload: null }
export type SuccessResponse = { type: 'SUCCESS', payload: { dishes: Dish[], events: Event[] } }
export type ErrorResponse = { type: 'ERROR', payload: ErrorPayload }

// Tipos para el reducer de estado
export type StatusState = {
    loading: boolean
    data: SuccessResponse['payload']
    error: null | ErrorPayload
}

export type ErrorPayload = {
    message: string
    code?: string | number
    [key: string]: unknown
} 

export type StatusAction = LoadingResponse | SuccessResponse | ErrorResponse

// Tipos para componentes globales
export type BriefInfo = {
    name: string
    title: string
    desc: string
    strong: string
    link: string
    ref: string
}

export type Header = {
    title: string
    desc: string
}

export type SectionType = 'about' | 'dishes' | 'contact' | 'reservation'
