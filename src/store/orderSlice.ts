import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { OrderItems } from '../schemas/orderSchema'

type OrderState = {
    items: OrderItems
}

const initialState: OrderState = {
    items: {}
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        dishAdded(state, action: PayloadAction<number>) {
            const id = action.payload
            state.items[id] = (state.items[id] ?? 0) + 1
        },
        dishDecremented(state, action: PayloadAction<number>) {
            const id = action.payload
            const quantity = state.items[id]

            if (quantity === undefined) return

            if (quantity > 1) {
                state.items[id] = quantity - 1
            } else {
                delete state.items[id]
            }
        },
        dishRemoved(state, action: PayloadAction<number>) {
            delete state.items[action.payload]
        },
        orderCleared() {
            return initialState
        }
    },
    selectors: {
        selectItems: state => state.items,
        selectItemCount: state => Object.values(state.items).reduce((total, quantity) => total + quantity, 0)
    }
})

export const { dishAdded, dishDecremented, dishRemoved, orderCleared } = orderSlice.actions
export const { selectItems, selectItemCount } = orderSlice.selectors
export default orderSlice
