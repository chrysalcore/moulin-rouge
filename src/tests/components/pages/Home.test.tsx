import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Home from '../../../components/pages/Home'
import fetchDishes from '../../../helpers/fetchDishes'
import fetchEvents from '../../../helpers/fetchEvents'
import { buildDishes, buildEvents } from '../../fixtures/menu'
import { createQueryWrapper } from '../../utils/queryWrapper'

vi.mock('../../../helpers/fetchDishes', () => ({
    default: vi.fn(),
}))

vi.mock('../../../helpers/fetchEvents', () => ({
    default: vi.fn(),
}))

function renderHome() {
    return render(
        <MemoryRouter>
            <Home />
        </MemoryRouter>,
        { wrapper: createQueryWrapper() }
    )
}

describe('Home', () => {
    it('shows the dishes while the events are still loading', async () => {
        vi.mocked(fetchDishes).mockResolvedValue(buildDishes())
        vi.mocked(fetchEvents).mockReturnValue(new Promise(() => {}))

        renderHome()

        expect(await screen.findByRole('heading', { name: 'Margherita' })).toBeInTheDocument()
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('keeps the dishes visible when only the events fail', async () => {
        vi.mocked(fetchDishes).mockResolvedValue(buildDishes())
        vi.mocked(fetchEvents).mockRejectedValue(new Error('Network Error'))

        renderHome()

        expect(await screen.findByRole('button', { name: 'Reload' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Margherita' })).toBeInTheDocument()
    })

    it('refetches only the failed events when Reload is clicked', async () => {
        const user = userEvent.setup()
        vi.mocked(fetchDishes).mockResolvedValue(buildDishes())
        vi.mocked(fetchEvents)
            .mockRejectedValueOnce(new Error('Network Error'))
            .mockResolvedValueOnce(buildEvents())

        renderHome()

        await user.click(await screen.findByRole('button', { name: 'Reload' }))

        expect(await screen.findByRole('heading', { name: 'San Valentin' })).toBeInTheDocument()
        expect(screen.queryByRole('button', { name: 'Reload' })).not.toBeInTheDocument()
        expect(fetchEvents).toHaveBeenCalledTimes(2)
        expect(fetchDishes).toHaveBeenCalledTimes(1)
    })
})
