import { z } from 'zod'

export const reservationSchema = z.object({
    name: z.string().trim().min(2, 'Please enter your name'),
    date: z.string()
        .min(1, 'Choose a date and time')
        .refine(value => new Date(value) > new Date(), 'Choose a date and time in the future'),
    email: z.email('Please enter a valid email'),
    capacity: z.coerce.number()
        .int('Guests must be a whole number')
        .min(1, 'At least 1 guest')
        .max(20, 'For more than 20 guests, please call us'),
})

export type Reservation = z.infer<typeof reservationSchema>
