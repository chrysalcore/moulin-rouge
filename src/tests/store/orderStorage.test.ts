import { beforeEach, describe, expect, it } from 'vitest'
import makeStore from '../../store/store'
import { dishAdded, selectItems } from '../../store/orderSlice'
import { ORDER_STORAGE_KEY, loadOrder, persistOrder } from '../../store/orderStorage'

describe('orderStorage', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    describe('loadOrder', () => {
        it('returns an empty order when nothing was stored', () => {
            expect(loadOrder()).toEqual({})
        })

        it('returns the stored order when it is valid', () => {
            localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify({ 1: 2, 7: 1 }))

            expect(loadOrder()).toEqual({ 1: 2, 7: 1 })
        })

        it('discards stored data that is not valid JSON', () => {
            localStorage.setItem(ORDER_STORAGE_KEY, '{not json')

            expect(loadOrder()).toEqual({})
        })

        it.each([
            ['a non-integer quantity', { 1: 1.5 }],
            ['a zero quantity', { 1: 0 }],
            ['a quantity that is not a number', { 1: '2' }],
            ['a key that is not a dish id', { pizza: 1 }],
            ['an array instead of an object', [1, 2]],
        ])('discards an order with %s', (_, stored) => {
            localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(stored))

            expect(loadOrder()).toEqual({})
        })
    })

    describe('persistOrder', () => {
        it('saves the order whenever it changes', () => {
            const store = makeStore()
            persistOrder(store)

            store.dispatch(dishAdded(3))
            store.dispatch(dishAdded(3))

            expect(JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY)!)).toEqual({ 3: 2 })
        })

        it('restores a saved order into a new store', () => {
            const first = makeStore()
            persistOrder(first)
            first.dispatch(dishAdded(5))

            const second = makeStore({ order: { items: loadOrder() } })

            expect(selectItems(second.getState())).toEqual({ 5: 1 })
        })
    })
})
