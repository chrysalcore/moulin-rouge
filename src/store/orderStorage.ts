import { orderItemsSchema, type OrderItems } from '../schemas/orderSchema'
import type { AppStore } from './store'

export const ORDER_STORAGE_KEY = 'moulin-rouge:order'

export function loadOrder(): OrderItems {
    try {
        const stored = localStorage.getItem(ORDER_STORAGE_KEY)
        if (stored === null) return {}

        const result = orderItemsSchema.safeParse(JSON.parse(stored))
        return result.success ? result.data : {}
    } catch {
        return {}
    }
}

export function persistOrder(store: AppStore): () => void {
    let previous = store.getState().order.items

    return store.subscribe(() => {
        const items = store.getState().order.items
        if (items === previous) return

        previous = items
        try {
            localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(items))
        } catch {
            return
        }
    })
}
