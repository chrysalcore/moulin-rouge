// Tipos para el contexto de datos
import type { Dish, Event } from './domain'

export type DataContextValue = {
    categories: string[]
    dishes: Dish[]
    events: Event[]
}
