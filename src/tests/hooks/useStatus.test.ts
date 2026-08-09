import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import useStatus from '../../hooks/useStatus'
import { buildDishes, buildEvents } from '../fixtures/menu'

describe('useStatus', () => {
    it('starts loading with empty data and no error', () => {
        const { result } = renderHook(() => useStatus())
        const [status] = result.current

        expect(status).toEqual({ loading: true, data: { dishes: [], events: [] }, error: null })
    })

    it('stores the payload and stops loading on SUCCESS', () => {
        const { result } = renderHook(() => useStatus())
        const [, dispatch] = result.current
        const payload = { dishes: buildDishes(), events: buildEvents() }

        act(() => dispatch({ type: 'SUCCESS', payload }))

        const [status] = result.current
        expect(status).toEqual({ loading: false, data: payload, error: null })
    })

    it('stores the error, stops loading and keeps the previous data on ERROR', () => {
        const { result } = renderHook(() => useStatus())
        const [, dispatch] = result.current
        const payload = { dishes: buildDishes(), events: buildEvents() }

        act(() => dispatch({ type: 'SUCCESS', payload }))
        act(() => dispatch({ type: 'ERROR', payload: { message: 'Network Error' } }))

        const [status] = result.current
        expect(status).toEqual({ loading: false, data: payload, error: { message: 'Network Error' } })
    })
})
