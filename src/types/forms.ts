// Tipos de los valores y errores de los formularios
export type ReservationValues = {
    name: string
    date: string
    email: string
    capacity: string
}

export type ReservationErrors = Partial<Record<keyof ReservationValues, string>>
