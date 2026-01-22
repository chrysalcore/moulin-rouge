import axios from "axios";

async function load(url) {
    try {
        let data;

        if(localStorage.getItem(url)) {
            data = JSON.parse(localStorage.getItem(url))
        } else {
            const response = await axios.get(url)
            data = response.data
        }

        localStorage.setItem(url, JSON.stringify(data))
        return { type: 'SUCCESS', payload: { dishes: data } }
    } catch(error) {
        return { type: 'ERROR', payload: { error: error } }
    }
}

export default load