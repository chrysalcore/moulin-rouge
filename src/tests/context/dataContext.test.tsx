import { renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DataProvider, useData } from '../../context/dataContext'
import { buildDishes, buildEvents } from '../fixtures/menu'

describe('DataProvider / useData', () => {
    it('reflects the value passed to the provider', () => {
        const value = {
            categories: ['pizza', 'hamburguesa'],
            dishes: buildDishes(),
            events: buildEvents(),
        }

        const { result } = renderHook(() => useData(), {
            wrapper: ({ children }) => <DataProvider value={value}>{children}</DataProvider>,
        })

        expect(result.current).toEqual(value)
    })

    it('falls back to empty arrays when there is no provider', () => {
        const { result } = renderHook(() => useData())

        expect(result.current).toEqual({ categories: [], dishes: [], events: [] })
    })
})
