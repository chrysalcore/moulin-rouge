import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '../../../router/AppRouter'
import fetchDishes from '../../../helpers/fetchDishes'
import fetchEvents from '../../../helpers/fetchEvents'
import { buildDishes, buildEvents } from '../../fixtures/menu'
import { createProvidersWrapper } from '../../utils/providersWrapper'

vi.mock('../../../helpers/fetchDishes', () => ({
    default: vi.fn(),
}))

vi.mock('../../../helpers/fetchEvents', () => ({
    default: vi.fn(),
}))

function renderAt(initialEntry: string) {
    const router = createMemoryRouter(routes, { initialEntries: [initialEntry] })
    render(<RouterProvider router={router} />, { wrapper: createProvidersWrapper() })
}

describe('Order', () => {
    beforeEach(() => {
        vi.mocked(fetchDishes).mockResolvedValue(buildDishes())
        vi.mocked(fetchEvents).mockResolvedValue(buildEvents())
    })

    it('shows an empty state with a link to the menu when nothing was ordered', async () => {
        renderAt('/order')

        expect(await screen.findByText(/your order is empty/i)).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Browse the menu' })).toBeInTheDocument()
    })

    it('adds dishes from the menu, reflects them in the header and lets the order be edited', async () => {
        const user = userEvent.setup()
        renderAt('/menu/pizza')

        const orderNow = await screen.findByRole('button', { name: 'Order Now' })
        await user.click(orderNow)
        await user.click(orderNow)

        await user.click(screen.getByRole('link', { name: 'Order, 2 items' }))

        const item = (await screen.findByText('Margherita')).closest('li')!
        expect(within(item).getByText('2')).toBeInTheDocument()
        expect(within(item).getByText('$25.00')).toBeInTheDocument()
        expect(screen.getByText('Subtotal: $25.00')).toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: 'Add one Margherita' }))
        expect(screen.getByText('Subtotal: $37.50')).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Order, 3 items' })).toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: 'Remove one Margherita' }))
        expect(screen.getByText('Subtotal: $25.00')).toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: 'Remove Margherita from order' }))
        expect(screen.getByText(/your order is empty/i)).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Order, 0 items' })).toBeInTheDocument()
    })
})
