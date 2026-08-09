import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from '../../router/AppRouter'
import useConnect from '../../hooks/useConnect'
import { buildDishes, buildEvents } from '../fixtures/menu'

vi.mock('../../hooks/useConnect', () => ({
    default: vi.fn(),
}))

vi.mock('../../components/pages/Home', () => ({
    default: () => {
        throw new Error('boom')
    },
}))

describe('AppRouter error boundary', () => {
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

    it('keeps the layout and shows a fallback with a link home when a routed page throws', () => {
        const router = createMemoryRouter(routes, { initialEntries: ['/'] })
        render(<RouterProvider router={router} />)

        expect(screen.getByRole('button', { name: 'Reserv' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Go to Home' })).toBeInTheDocument()
    })
})
