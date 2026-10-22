import { MemoryRouter } from 'react-router-dom'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import Reservations from '../../../components/pages/Reservations'

function renderReservations() {
    render(<MemoryRouter><Reservations /></MemoryRouter>)
    return userEvent.setup()
}

async function fillForm(user: ReturnType<typeof userEvent.setup>, { date = '2099-10-25T20:00' } = {}) {
    await user.type(screen.getByLabelText('Name'), 'Ordnay')
    await user.click(screen.getByLabelText('Date and time'))
    await user.paste(date)
    await user.type(screen.getByLabelText('Guests'), '4')
    await user.type(screen.getByLabelText('Email'), 'ordnay@example.com')
}

describe('Reservations', () => {
    it('shows the field errors instead of confirming when submitted empty', async () => {
        const user = renderReservations()

        await user.click(screen.getByRole('button', { name: 'Book my table' }))

        expect(screen.getByLabelText('Name')).toHaveAccessibleDescription('Please enter your name')
        expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    it('rejects a date in the past', async () => {
        const user = renderReservations()

        await fillForm(user, { date: '2000-01-01T10:00' })
        await user.click(screen.getByRole('button', { name: 'Book my table' }))

        expect(screen.getByLabelText('Date and time')).toHaveAccessibleDescription('Choose a date and time in the future')
        expect(screen.queryByRole('status')).not.toBeInTheDocument()
    })

    it('fills the ticket as the user types', async () => {
        const user = renderReservations()
        const ticket = screen.getByRole('complementary', { name: 'Reservation summary' })

        await user.type(screen.getByLabelText('Name'), 'Ordnay')
        await user.type(screen.getByLabelText('Guests'), '4')

        expect(within(ticket).getByText('Ordnay')).toBeInTheDocument()
        expect(within(ticket).getByText('4 guests')).toBeInTheDocument()
    })

    it('confirms a valid reservation and lets the user start over', async () => {
        const user = renderReservations()

        await fillForm(user)
        await user.click(screen.getByRole('button', { name: 'Book my table' }))

        const confirmation = screen.getByRole('status')
        expect(within(confirmation).getByRole('heading', { name: 'Thank you, Ordnay!' })).toBeInTheDocument()
        expect(confirmation).toHaveTextContent('4 guests')
        expect(confirmation).toHaveTextContent('ordnay@example.com')
        expect(screen.getByText('Confirmed')).toBeInTheDocument()

        await user.click(screen.getByRole('button', { name: 'Make another reservation' }))

        expect(screen.getByLabelText('Name')).toHaveValue('')
        expect(screen.queryByText('Confirmed')).not.toBeInTheDocument()
    })
})
