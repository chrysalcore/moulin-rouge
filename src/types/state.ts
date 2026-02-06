// Tipos para el estado y reducer
import type { Dish, Event } from './domain'

export type ErrorPayload = {
    message: string
    code?: string | number
    [key: string]: unknown
}

export type LoadingResponse = { 
    type: 'LOADING'
    payload: null 
}

export type SuccessResponse = { 
    type: 'SUCCESS'
    payload: { 
        dishes: Dish[]
        events: Event[] 
    } 
}

export type ErrorResponse = { 
    type: 'ERROR'
    payload: ErrorPayload 
}

export type StatusAction = LoadingResponse | SuccessResponse | ErrorResponse

export type StatusState = {
    loading: boolean
    data: SuccessResponse['payload']
    error: null | ErrorPayload
}
