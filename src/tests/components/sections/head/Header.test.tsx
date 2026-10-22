import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Header from '../../../../components/sections/head/Header'
import { createProvidersWrapper } from '../../../utils/providersWrapper'

function renderHeader() {
    render(<MemoryRouter><Header /></MemoryRouter>, { wrapper: createProvidersWrapper() })
    return userEvent.setup()
}

describe('Header', () => {
    it('closes the open menu with Escape', async () => {
        const user = renderHeader()
        const toggle = screen.getByRole('button', { name: 'Toggle menu' })

        await user.click(toggle)
        await user.keyboard('{Escape}')

        expect(toggle).toHaveAttribute('aria-expanded', 'false')
    })

    it('closes the menu after following a link instead of toggling it', async () => {
        const user = renderHeader()
        const toggle = screen.getByRole('button', { name: 'Toggle menu' })

        await user.click(toggle)
        await user.click(screen.getByRole('link', { name: 'Menu' }))
        expect(toggle).toHaveAttribute('aria-expanded', 'false')

        await user.click(screen.getByRole('link', { name: 'Menu' }))
        expect(toggle).toHaveAttribute('aria-expanded', 'false')
    })
})
