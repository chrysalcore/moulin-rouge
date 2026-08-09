import { act, renderHook } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import useCurrent from '../../hooks/useCurrent'

describe('useCurrent', () => {
    it('starts at 0', () => {
        const { result } = renderHook(() => useCurrent())

        expect(result.current[0]).toBe(0)
    })

    it('advances by one on handleNext', () => {
        const { result } = renderHook(() => useCurrent())

        act(() => result.current[1]())

        expect(result.current[0]).toBe(1)
    })

    it('wraps from the last index back to 0 on handleNext', () => {
        const { result } = renderHook(() => useCurrent())

        act(() => result.current[1]())
        act(() => result.current[1]())
        act(() => result.current[1]())
        act(() => result.current[1]())
        expect(result.current[0]).toBe(4)

        act(() => result.current[1]())
        expect(result.current[0]).toBe(0)
    })

    it('wraps from 0 back to the last index on handlePrev', () => {
        const { result } = renderHook(() => useCurrent())

        act(() => result.current[2]())

        expect(result.current[0]).toBe(4)
    })

    it('goes back by one on handlePrev when not at 0', () => {
        const { result } = renderHook(() => useCurrent())

        act(() => result.current[1]())
        act(() => result.current[1]())
        act(() => result.current[2]())

        expect(result.current[0]).toBe(1)
    })
})
