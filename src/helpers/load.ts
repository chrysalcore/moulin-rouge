import axios from "axios";

type LoadResponse = Promise<{
    type: string,
    payload: { dishes: string[] } | { error: unknown }
}>

async function load(url: string): LoadResponse {
    try {
        let data : string[] = JSON.parse(localStorage.getItem(url) ?? "[]")

        if(data.length === 0) {
            data = (await axios.get(url)).data
        }

        localStorage.setItem(url, JSON.stringify(data))
        return { type: 'SUCCESS', payload: { dishes: data } }
    } catch(error) {
        return { type: 'ERROR', payload: { error: error } }
    }
}

export default load