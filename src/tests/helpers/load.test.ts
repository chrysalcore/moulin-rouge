import { afterEach, describe, expect, it, vi } from 'vitest'
import axios from 'axios'
import load from '../../helpers/load'
import { MENU_URL, buildDishes } from '../fixtures/menu'
import events from '../../data/events'

vi.mock('axios', () => ({
    default: { get: vi.fn() },
}))

describe('load', () => {
    it('fetches from the api when there is nothing cached', async () => {
        const dishes = buildDishes()
        vi.mocked(axios.get).mockResolvedValue({ data: dishes })

        const action = await load(MENU_URL)

        expect(axios.get).toHaveBeenCalledWith(MENU_URL)
        if (action.type !== 'SUCCESS') throw new Error('expected SUCCESS')
        expect(action.payload).toEqual({ dishes, events })
    })

    it('reads from the cache on a second call instead of calling the api again', async () => {
        const dishes = buildDishes()
        vi.mocked(axios.get).mockResolvedValue({ data: dishes })

        await load(MENU_URL)
        const action = await load(MENU_URL)

        expect(axios.get).toHaveBeenCalledTimes(1)
        if (action.type !== 'SUCCESS') throw new Error('expected SUCCESS')
        expect(action.payload.dishes).toEqual(dishes)
    })

    it('returns an ERROR action when the api call fails', async () => {
        const error = { message: 'Network Error' }
        vi.mocked(axios.get).mockRejectedValue(error)

        const action = await load(MENU_URL)

        expect(action).toEqual({ type: 'ERROR', payload: error })
    })

    it('returns an ERROR action when the api responds with a non-array body', async () => {
        vi.mocked(axios.get).mockResolvedValue({ data: { redirected: true } })

        const action = await load(MENU_URL)

        expect(action.type).toBe('ERROR')
    })

    describe('cache expiry (gap found in the professionalism audit, 2026-08-08)', () => {
        afterEach(() => {
            vi.useRealTimers()
        })

        it('refetches from the api once the cached entry is stale', async () => {
            const stale = buildDishes()
            const fresh = buildDishes().map(dish => ({ ...dish, price: dish.price + 1 }))

            vi.mocked(axios.get).mockResolvedValueOnce({ data: stale })
            await load(MENU_URL)

            vi.useFakeTimers()
            vi.advanceTimersByTime(6 * 60 * 1000)
            vi.mocked(axios.get).mockResolvedValueOnce({ data: fresh })

            const action = await load(MENU_URL)

            expect(axios.get).toHaveBeenCalledTimes(2)
            if (action.type !== 'SUCCESS') throw new Error('expected SUCCESS')
            expect(action.payload.dishes).toEqual(fresh)
        })
    })
})
