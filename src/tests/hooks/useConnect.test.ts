import { act, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useConnect from '../../hooks/useConnect'
import load from '../../helpers/load'
import { buildDish, buildDishes, buildEvents } from '../fixtures/menu'

vi.mock('../../helpers/load', () => ({
    default: vi.fn(),
}))

describe('useConnect', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('starts loading with empty data and no error', () => {
        vi.mocked(load).mockResolvedValue({ type: 'SUCCESS', payload: { dishes: [], events: [] } })

        const { result } = renderHook(() => useConnect())
        const [loading, dishes, events, categories, error] = result.current

        expect(loading).toBe(true)
        expect(dishes).toEqual([])
        expect(events).toEqual([])
        expect(categories).toEqual([])
        expect(error).toBeNull()
    })

    it('stops loading and exposes the deduped categories once the fetch resolves', async () => {
        const dishes = [...buildDishes(), buildDish({ name: 'Marinara', category: 'pizza' })]
        const events = buildEvents()
        vi.mocked(load).mockResolvedValue({ type: 'SUCCESS', payload: { dishes, events } })

        const { result } = renderHook(() => useConnect())

        await act(async () => {
            await vi.advanceTimersByTimeAsync(3000)
        })

        const [loading, resultDishes, resultEvents, categories, error] = result.current
        expect(load).toHaveBeenCalledWith('https://devsapihub.com/api-fast-food')
        expect(loading).toBe(false)
        expect(resultDishes).toEqual(dishes)
        expect(resultEvents).toEqual(events)
        expect(categories).toEqual(['pizza', 'hamburguesa'])
        expect(error).toBeNull()
    })

    it('stops loading and exposes the error when the fetch fails', async () => {
        vi.mocked(load).mockResolvedValue({ type: 'ERROR', payload: { message: 'Network Error' } })

        const { result } = renderHook(() => useConnect())

        await act(async () => {
            await vi.advanceTimersByTimeAsync(3000)
        })

        const [loading, dishes, events, categories, error] = result.current
        expect(loading).toBe(false)
        expect(dishes).toEqual([])
        expect(events).toEqual([])
        expect(categories).toEqual([])
        expect(error).toEqual({ message: 'Network Error' })
    })

    it('retries the fetch and recovers after a previous failure', async () => {
        vi.mocked(load).mockResolvedValueOnce({ type: 'ERROR', payload: { message: 'Network Error' } })

        const { result } = renderHook(() => useConnect())

        await act(async () => {
            await vi.advanceTimersByTimeAsync(3000)
        })

        expect(result.current[4]).toEqual({ message: 'Network Error' })

        const dishes = buildDishes()
        vi.mocked(load).mockResolvedValueOnce({ type: 'SUCCESS', payload: { dishes, events: [] } })

        act(() => {
            result.current[5]()
        })

        expect(result.current[0]).toBe(true)
        expect(result.current[4]).toBeNull()

        await act(async () => {
            await vi.advanceTimersByTimeAsync(3000)
        })

        expect(load).toHaveBeenCalledTimes(2)
        expect(result.current[0]).toBe(false)
        expect(result.current[1]).toEqual(dishes)
        expect(result.current[4]).toBeNull()
    })
})
