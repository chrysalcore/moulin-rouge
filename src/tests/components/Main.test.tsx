import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Main from '../../components/Main'
import load from '../../helpers/load'
import { buildDishes, buildEvents } from '../fixtures/menu'

vi.mock('../../helpers/load', () => ({
    default: vi.fn(),
}))

function renderMain() {
    return render(
        <MemoryRouter initialEntries={['/']}>
            <Routes>
                <Route path="/" element={<Main />}>
                    <Route index element={<div>child content</div>} />
                </Route>
            </Routes>
        </MemoryRouter>
    )
}

describe('Main', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('shows the loading state and no child content while the fetch is pending', () => {
        vi.mocked(load).mockResolvedValue({ type: 'SUCCESS', payload: { dishes: [], events: [] } })

        renderMain()

        expect(screen.getByText('Loading...')).toBeInTheDocument()
        expect(screen.queryByText('child content')).not.toBeInTheDocument()
    })

    it('renders the routed content once the fetch succeeds', async () => {
        vi.mocked(load).mockResolvedValue({ type: 'SUCCESS', payload: { dishes: buildDishes(), events: buildEvents() } })

        renderMain()

        await act(async () => {
            await vi.advanceTimersByTimeAsync(3000)
        })

        expect(screen.getByText('child content')).toBeInTheDocument()
        expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
    })

    it('shows the error state with a Reload button when the fetch fails', async () => {
        vi.mocked(load).mockResolvedValue({ type: 'ERROR', payload: { message: 'Network Error' } })

        renderMain()

        await act(async () => {
            await vi.advanceTimersByTimeAsync(3000)
        })

        expect(screen.getByRole('button', { name: 'Reload' })).toBeInTheDocument()
        expect(screen.queryByText('child content')).not.toBeInTheDocument()
    })

    it('recovers and renders the routed content after clicking Reload', async () => {
        vi.mocked(load).mockResolvedValueOnce({ type: 'ERROR', payload: { message: 'Network Error' } })

        renderMain()

        await act(async () => {
            await vi.advanceTimersByTimeAsync(3000)
        })

        vi.mocked(load).mockResolvedValueOnce({ type: 'SUCCESS', payload: { dishes: buildDishes(), events: buildEvents() } })

        // fireEvent, not userEvent: userEvent.click() hangs indefinitely with vi.useFakeTimers()
        // active here (its internal pointer-event delay simulation never resolves against a frozen
        // clock, even with advanceTimers/delay:null configured). See CLAUDE.md.
        fireEvent.click(screen.getByRole('button', { name: 'Reload' }))

        expect(screen.getByText('Loading...')).toBeInTheDocument()

        await act(async () => {
            await vi.advanceTimersByTimeAsync(3000)
        })

        expect(screen.getByText('child content')).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Reload' })).not.toBeInTheDocument()
    })
})
