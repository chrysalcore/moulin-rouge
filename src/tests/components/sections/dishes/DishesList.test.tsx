import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import DishesList from '../../../../components/sections/dishes/DishesList'
import fetchDishes from '../../../../helpers/fetchDishes'
import { buildDish } from '../../../fixtures/menu'
import { createQueryWrapper } from '../../../utils/queryWrapper'

vi.mock('../../../../helpers/fetchDishes', () => ({
    default: vi.fn(),
}))

function renderDishesList(category: string) {
    return render(
        <MemoryRouter initialEntries={[`/menu/${category}`]}>
            <Routes>
                <Route path="/menu/:category" element={<DishesList />} />
            </Routes>
        </MemoryRouter>,
        { wrapper: createQueryWrapper() }
    )
}

describe('DishesList', () => {
    beforeEach(() => {
        vi.mocked(fetchDishes).mockResolvedValue([
            buildDish({ name: 'Margherita', category: 'pizza' }),
            buildDish({ name: 'Marinara', category: 'pizza' }),
            buildDish({ name: 'Cheeseburger', category: 'hamburguesa' }),
        ])
    })

    it('lists only the dishes belonging to the category in the URL', async () => {
        renderDishesList('pizza')

        expect(await screen.findByRole('heading', { name: 'Margherita' })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: 'Marinara' })).toBeInTheDocument()
        expect(screen.queryByRole('heading', { name: 'Cheeseburger' })).not.toBeInTheDocument()
    })

    it('shows no dishes when the category has none', async () => {
        renderDishesList('pastel')

        await screen.findByRole('heading', { name: 'Our Menu' })

        expect(screen.queryAllByRole('heading', { level: 3 })).toHaveLength(0)
    })
})
