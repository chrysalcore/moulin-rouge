import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import fetchEvents from '../../helpers/fetchEvents'
import events from '../../data/events'

describe('fetchEvents', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('resolves with the events only after the simulated latency', async () => {
        const onResolve = vi.fn()
        void fetchEvents().then(onResolve)

        await vi.advanceTimersByTimeAsync(2999)
        expect(onResolve).not.toHaveBeenCalled()

        await vi.advanceTimersByTimeAsync(1)
        expect(onResolve).toHaveBeenCalledWith(events)
    })
})
