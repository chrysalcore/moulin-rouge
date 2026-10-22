import evts from "../data/events"
import type { Event } from "../types"

async function fetchEvents(): Promise<Event[]> {
    return evts
}

export default fetchEvents
