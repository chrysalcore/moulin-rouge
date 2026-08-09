import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '../../router/AppRouter'
import useConnect from '../../hooks/useConnect'
import { buildDishes, buildEvents } from '../fixtures/menu'

vi.mock('../../hooks/useConnect', () => ({
    default: vi.fn(),
}))

function renderAt(initialEntry: string) {
    const router = createMemoryRouter(routes, { initialEntries: [initialEntry] })
    render(<RouterProvider router={router} />)
    return router
}

describe('AppRouter redirects', () => {
    beforeEach(() => {
        vi.mocked(useConnect).mockReturnValue([
            false,
            buildDishes(),
            buildEvents(),
            ['pizza', 'hamburguesa'],
            null,
            vi.fn(),
        ])
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
