import { useState } from "react"
import { z } from 'zod'
import { reservationSchema, type Reservation } from '../schemas/reservationSchema'
import type { ReservationErrors, ReservationValues } from '../types'

const emptyValues: ReservationValues = { name: '', date: '', email: '', capacity: '' }

function validate(values: ReservationValues): ReservationErrors {
    const result = reservationSchema.safeParse(values)
    if (result.success) return {}

    const { fieldErrors } = z.flattenError(result.error)
    return Object.fromEntries(
        Object.entries(fieldErrors).map(([field, messages]) => [field, messages?.[0]])
    )
}

function useReservationForm() {
    const [values, setValues] = useState<ReservationValues>(emptyValues)
    const [errors, setErrors] = useState<ReservationErrors>({})
    const [attempted, setAttempted] = useState<boolean>(false)
    const [reservation, setReservation] = useState<Reservation | null>(null)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const next = { ...values, [event.target.name]: event.target.value }
        setValues(next)
        if (attempted) setErrors(validate(next))
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault()
        const result = reservationSchema.safeParse(values)

        if (result.success) {
            setReservation(result.data)
        } else {
            setAttempted(true)
            setErrors(validate(values))
        }
    }

    const handleReset = (): void => {
        setValues(emptyValues)
        setErrors({})
        setAttempted(false)
        setReservation(null)
    }

    return { values, errors, reservation, handleChange, handleSubmit, handleReset }
}

export default useReservationForm
