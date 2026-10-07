import evts from "../data/events"
import type { Event } from "../types"

const SIMULATED_LATENCY_MS = 3000

async function fetchEvents(): Promise<Event[]> {
    await new Promise(resolve => setTimeout(resolve, SIMULATED_LATENCY_MS))
    return evts
}

export default fetchEvents
