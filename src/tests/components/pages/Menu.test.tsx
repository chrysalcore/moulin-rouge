import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Menu from '../../../components/pages/Menu'
import DishesList from '../../../components/sections/dishes/DishesList'
import fetchDishes from '../../../helpers/fetchDishes'
import { MENU_URL, buildDish } from '../../fixtures/menu'
import { createProvidersWrapper } from '../../utils/providersWrapper'

vi.mock('../../../helpers/fetchDishes', () => ({
    default: vi.fn(),
}))

function LocationDisplay() {
    const location = useLocation()
    return <span data-testid="location-display">{location.pathname}</span>
}

function renderMenu() {
    return render(
        <MemoryRouter initialEntries={['/menu/pizza']}>
            <LocationDisplay />
            <Routes>
                <Route path="/menu" element={<Menu />}>
                    <Route path=":category" element={<DishesList />} />
                </Route>
            </Routes>
        </MemoryRouter>,
        { wrapper: createProvidersWrapper() }
    )
}

describe('Menu + Categories', () => {
    beforeEach(() => {
        vi.mocked(fetchDishes).mockResolvedValue([
            buildDish({ name: 'Margherita', category: 'pizza' }),
            buildDish({ name: 'Marinara', category: 'pizza' }),
            buildDish({ name: 'Cheeseburger', category: 'hamburguesa' }),
        ])
    })

    it('shows the dishes list for the URL category on first render', async () => {
        renderMenu()

        expect(await screen.findByRole('heading', { name: 'Margherita' })).toBeInTheDocument()
        expect(screen.getByTestId('location-display')).toHaveTextContent('/menu/pizza')
        expect(screen.queryByRole('heading', { name: 'Cheeseburger' })).not.toBeInTheDocument()
        expect(fetchDishes).toHaveBeenCalledWith(MENU_URL)
    })

    it('builds one category link per distinct category, fetching the dishes only once', async () => {
        renderMenu()

        await screen.findByRole('heading', { name: 'Margherita' })

        const links = screen.getAllByRole('link').map(link => link.textContent)
        expect(links).toEqual(['pizza', 'hamburguesa'])
        expect(fetchDishes).toHaveBeenCalledTimes(1)
    })

    it('navigates to the new URL and shows the new category listing when a category link is clicked', async () => {
        const user = userEvent.setup()
        renderMenu()

        await user.click(await screen.findByRole('link', { name: 'hamburguesa' }))

        expect(screen.getByTestId('location-display')).toHaveTextContent('/menu/hamburguesa')
        expect(screen.getByRole('heading', { name: 'Cheeseburger' })).toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: 'Margherita' })).not.toBeInTheDocument()
    })
})
