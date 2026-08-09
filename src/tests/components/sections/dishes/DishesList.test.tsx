import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { DataProvider } from '../../../../context/dataContext'
import DishesList from '../../../../components/sections/dishes/DishesList'
import { buildDish, buildEvents } from '../../../fixtures/menu'

function renderDishesList(category: string) {
    const value = {
        categories: ['pizza', 'hamburguesa'],
        dishes: [
            buildDish({ name: 'Margherita', category: 'pizza' }),
            buildDish({ name: 'Marinara', category: 'pizza' }),
            buildDish({ name: 'Cheeseburger', category: 'hamburguesa' }),
        ],
        events: buildEvents(),
    }

    return render(
        <DataProvider value={value}>
            <MemoryRouter initialEntries={[`/menu/${category}`]}>
                <Routes>
                    <Route path="/menu/:category" element={<DishesList />} />
                </Routes>
            </MemoryRouter>
        </DataProvider>
    )
}

describe('DishesList', () => {
    it('lists only the dishes belonging to the category in the URL', () => {
        renderDishesList('pizza')

        expect(screen.getByRole('heading', { name: 'Margherita' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Marinara' })).toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: 'Cheeseburger' })).not.toBeInTheDocument()
    })

    it('shows no dishes when the category has none', () => {
        renderDishesList('pastel')

        expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0)
    })
})
