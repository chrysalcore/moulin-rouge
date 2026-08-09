import axios from "axios"
import evts from "../data/events"
import type { Dish, ErrorPayload, StatusAction } from "../types"

const CACHE_TTL_MS = 5 * 60 * 1000

type CacheEntry = {
    data: Dish[]
    cachedAt: number
}

async function load(url: string): Promise<StatusAction> {
    try {
        let data: Dish[] | null = null

        const cached = localStorage.getItem(url)
        if (cached) {
            const entry: CacheEntry = JSON.parse(cached)
            if (Date.now() - entry.cachedAt < CACHE_TTL_MS) {
                data = entry.data
            }
        }

        if (data === null) {
            data = (await axios.get<Dish[]>(url)).data
            const entry: CacheEntry = { data, cachedAt: Date.now() }
            localStorage.setItem(url, JSON.stringify(entry))
        }

        return { type: 'SUCCESS', payload: { dishes: data, events: evts } }
    } catch(error) {
        return { type: 'ERROR', payload: error as ErrorPayload }
    }
}

export default load
