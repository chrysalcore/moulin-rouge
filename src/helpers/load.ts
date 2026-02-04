import axios from "axios";
import evts from "../data/events"

type LoadResponse = Promise<{
    type: "SUCCESS",
    payload: { dishes: object[], events: object[]}
} | {
    type: "ERROR",
    payload: { error: unknown }
}>

async function load(url: string): LoadResponse {
    try {
        let data : object[] = JSON.parse(localStorage.getItem(url) ?? "[]")

        if(data.length === 0) {
            data = (await axios.get(url)).data
        }

        localStorage.setItem(url, JSON.stringify(data))
        return { type: 'SUCCESS', payload: { dishes: data, events: evts  } }
    } catch(error) {
        return { type: 'ERROR', payload: { error: error } }
    }
}

export default load