import axios from "axios";
import evts from "../data/events"
import type { Dish, ErrorPayload, StatusAction } from "../types";

async function load(url: string): Promise<StatusAction> {
    try {
        let data : Dish[] = JSON.parse(localStorage.getItem(url) ?? "[]")

        if(data.length === 0) {
            data = (await axios.get(url)).data
        }

        localStorage.setItem(url, JSON.stringify(data))
        return { type: 'SUCCESS', payload: { dishes: data, events: evts  } }
    } catch(error) {
        return { type: 'ERROR', payload: error as ErrorPayload }
    }
}

export default load