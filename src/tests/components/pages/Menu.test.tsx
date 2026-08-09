import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { DataProvider } from '../../../context/dataContext'
import Menu from '../../../components/pages/Menu'
import DishesList from '../../../components/sections/dishes/DishesList'
import { buildDish, buildEvents } from '../../fixtures/menu'

function LocationDisplay() {
    const location = useLocation()
    return <span data-testid="location-display">{location.pathname}</span>
}

function renderMenu() {
    const value = {
        categories: ['pizza', 'hamburguesa'],
        dishes: [
            buildDish({ name: 'Margherita', category: 'pizza' }),
            buildDish({ name: 'Cheeseburger', category: 'hamburguesa' }),
        ],
        events: buildEvents(),
    }

    return render(
        <DataProvider value={value}>
            <MemoryRouter initialEntries={['/menu/pizza']}>
                <LocationDisplay />
                <Routes>
                    <Route path="/menu" element={<Menu />}>
                        <Route path=":category" element={<DishesList />} />
                    </Route>
                </Routes>
            </MemoryRouter>
        </DataProvider>
    )
}

describe('Menu + Categories', () => {
    it('shows the dishes list for the URL category on first render', () => {
        renderMenu()

        expect(screen.getByTestId('location-display')).toHaveTextContent('/menu/pizza')
        expect(screen.getByRole('heading', { name: 'Margherita' })).toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: 'Cheeseburger' })).not.toBeInTheDocument()
    })

    it('navigates to the new URL and shows the new category listing when a category link is clicked', async () => {
        const user = userEvent.setup()
        renderMenu()

        await user.click(screen.getByRole('link', { name: 'hamburguesa' }))

        expect(screen.getByTestId('location-display')).toHaveTextContent('/menu/hamburguesa')
        expect(screen.getByRole('heading', { name: 'Cheeseburger' })).toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: 'Margherita' })).not.toBeInTheDocument()
    })
})
