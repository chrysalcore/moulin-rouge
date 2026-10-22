const dayFormat = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
const timeFormat = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit' })

function formatReservationDate(value: string): { day: string; time: string } | null {
    const date = new Date(value)
    if (!value || Number.isNaN(date.getTime())) return null

    return { day: dayFormat.format(date), time: timeFormat.format(date) }
}

export default formatReservationDate
