import { z } from 'zod'

export const orderItemsSchema = z.record(
    z.string().regex(/^\d+$/),
    z.number().int().positive()
)

export type OrderItems = z.infer<typeof orderItemsSchema>
