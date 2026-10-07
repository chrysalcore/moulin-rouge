import axios from "axios"
import type { Dish } from "../types"

async function fetchDishes(url: string): Promise<Dish[]> {
    const { data } = await axios.get<Dish[]>(url)

    if (!Array.isArray(data)) {
        throw new Error('Unexpected response shape')
    }

    return data
}

export default fetchDishes
