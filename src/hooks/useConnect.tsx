import { useEffect } from "react"
import useStatus from './useStatus'
import load from '../helpers/load'
import type { Dish, Event, ErrorPayload, StatusAction } from '../types'

type UseConnectReturn = [
    loading: boolean,
    dishes: Dish[] | undefined,
    events: Event[] | undefined,
    categories: string[],
    error: ErrorPayload | null
]

function useConnect(): UseConnectReturn {
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
                    dispatch(result)
                }
            })
        }, 3000)

        return () => { ignore = true }
    }, [dispatch])

    return [
        loading,
        dishes,
        events,
        categories,
        error
    ]
}

export default useConnect