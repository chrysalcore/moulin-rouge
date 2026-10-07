import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '../../router/AppRouter'
import fetchDishes from '../../helpers/fetchDishes'
import fetchEvents from '../../helpers/fetchEvents'
import { buildDishes, buildEvents } from '../fixtures/menu'
import { createQueryWrapper } from '../utils/queryWrapper'

vi.mock('../../helpers/fetchDishes', () => ({
    default: vi.fn(),
}))

vi.mock('../../helpers/fetchEvents', () => ({
    default: vi.fn(),
}))

function renderAt(initialEntry: string) {
    const router = createMemoryRouter(routes, { initialEntries: [initialEntry] })
    render(<RouterProvider router={router} />, { wrapper: createQueryWrapper() })
    return router
}

describe('AppRouter redirects', () => {
    beforeEach(() => {
        vi.mocked(fetchDishes).mockResolvedValue(buildDishes())
        vi.mocked(fetchEvents).mockResolvedValue(buildEvents())
    })

    it('redirects an unknown path to home', async () => {
        const router = renderAt('/something-unknown')

        await waitFor(() => expect(router.state.location.pathname).toBe('/'))
    })

    it('redirects the menu index to the pizza category', async () => {
        const router = renderAt('/menu')

        await waitFor(() => expect(router.state.location.pathname).toBe('/menu/pizza'))
    })
})
