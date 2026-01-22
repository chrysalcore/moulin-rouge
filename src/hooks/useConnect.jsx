import { useEffect } from "react"
import useStatus from './useStatus'
import load from '../helpers/load'
import evts from "../data/events"

function useConnect() {
    const [{ data, error, loading }, dispatch] = useStatus()
    const dishes = data?.dishes
    const events = data?.events
    const categories = [...new Set(dishes?.map(item => item.category))]

    useEffect(() => {
        let ignore = false
        
        setTimeout(() => {
            load(`https://devsapihub.com/api-fast-food`)
            .then( result => {
                if(!ignore) {
                    result.payload = { ...result.payload, events : evts}
                    dispatch(result)
                }
            })
        }, 3000)

        return () => { ignore = true }
    }, [])

    return [
        loading,
        dishes,
        events,
        categories,
        error
    ]
}

export default useConnect