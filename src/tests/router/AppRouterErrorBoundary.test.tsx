import { RouterProvider, createMemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { routes } from '../../router/AppRouter'

vi.mock('../../components/pages/Home', () => ({
    default: () => {
        throw new Error('boom')
    },
}))

describe('AppRouter error boundary', () => {
    it('keeps the layout and shows a fallback with a link home when a routed page throws', () => {
        const router = createMemoryRouter(routes, { initialEntries: ['/'] })
        render(<RouterProvider router={router} />)

        expect(screen.getByRole('button', { name: 'Reserv' })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: 'Go to Home' })).toBeInTheDocument()
    })
})
