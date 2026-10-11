import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import useResource from '../../hooks/useResource'
import { createProvidersWrapper } from '../utils/providersWrapper'

function renderUseResource(queryFn: () => Promise<string[]>) {
    return renderHook(() => useResource(['items'], queryFn), { wrapper: createProvidersWrapper() })
}

describe('useResource', () => {
    it('starts loading with empty data and no error', () => {
        const { result } = renderUseResource(() => new Promise(() => {}))

        expect(result.current.loading).toBe(true)
        expect(result.current.data).toEqual([])
        expect(result.current.error).toBeNull()
    })

    it('stops loading and exposes the data once the query resolves', async () => {
        const { result } = renderUseResource(() => Promise.resolve(['a', 'b']))

        await waitFor(() => expect(result.current.loading).toBe(false))

        expect(result.current.data).toEqual(['a', 'b'])
        expect(result.current.error).toBeNull()
    })

    it('stops loading and exposes the error when the query fails', async () => {
        const failure = new Error('Network Error')
        const { result } = renderUseResource(() => Promise.reject(failure))

        await waitFor(() => expect(result.current.error).toBe(failure))

        expect(result.current.loading).toBe(false)
        expect(result.current.data).toEqual([])
    })

    it('goes back to loading on retry and recovers after a previous failure', async () => {
        let resolveRetry: (items: string[]) => void = () => {}
        const queryFn = vi.fn<() => Promise<string[]>>()
            .mockRejectedValueOnce(new Error('Network Error'))
            .mockReturnValueOnce(new Promise(resolve => { resolveRetry = resolve }))

        const { result } = renderUseResource(queryFn)

        await waitFor(() => expect(result.current.error).not.toBeNull())

        act(() => {
            result.current.handleRetry()
        })

        await waitFor(() => expect(result.current.loading).toBe(true))
        expect(result.current.error).toBeNull()

        act(() => {
            resolveRetry(['a'])
        })

        await waitFor(() => expect(result.current.data).toEqual(['a']))
        expect(result.current.loading).toBe(false)
        expect(queryFn).toHaveBeenCalledTimes(2)
    })
})
