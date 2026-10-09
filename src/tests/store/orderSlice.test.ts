import { beforeEach, describe, expect, it } from 'vitest'
import makeStore, { type AppStore } from '../../store/store'
import { dishAdded, dishDecremented, dishRemoved, orderCleared, selectItemCount, selectItems } from '../../store/orderSlice'

describe('orderSlice', () => {
    let store: AppStore

    beforeEach(() => {
        store = makeStore()
    })

    it('starts empty', () => {
        expect(selectItems(store.getState())).toEqual({})
        expect(selectItemCount(store.getState())).toBe(0)
    })

    it('adds a dish and increments its quantity when added again', () => {
        store.dispatch(dishAdded(1))
        store.dispatch(dishAdded(1))
        store.dispatch(dishAdded(2))

        expect(selectItems(store.getState())).toEqual({ 1: 2, 2: 1 })
        expect(selectItemCount(store.getState())).toBe(3)
    })

    it('decrements a dish and drops it when its quantity reaches 0', () => {
        store.dispatch(dishAdded(1))
        store.dispatch(dishAdded(1))

        store.dispatch(dishDecremented(1))
        expect(selectItems(store.getState())).toEqual({ 1: 1 })

        store.dispatch(dishDecremented(1))
        expect(selectItems(store.getState())).toEqual({})
    })

    it('ignores decrementing a dish that is not in the order', () => {
        store.dispatch(dishDecremented(1))

        expect(selectItems(store.getState())).toEqual({})
    })

    it('removes a dish regardless of its quantity', () => {
        store.dispatch(dishAdded(1))
        store.dispatch(dishAdded(1))
        store.dispatch(dishAdded(2))

        store.dispatch(dishRemoved(1))

        expect(selectItems(store.getState())).toEqual({ 2: 1 })
    })

    it('clears the whole order', () => {
        store.dispatch(dishAdded(1))
        store.dispatch(dishAdded(2))

        store.dispatch(orderCleared())

        expect(selectItems(store.getState())).toEqual({})
    })
})
