import { useEffect, useState } from "react"
import useStatus from './useStatus'
import load from '../helpers/load'
import type { Dish, Event, ErrorPayload } from '../types'

const MENU_URL = 'https://devsapihub.com/api-fast-food'

type UseConnectReturn = [
    loading: boolean,
    dishes: Dish[],
    events: Event[],
    categories: string[],
    error: ErrorPayload | null,
    handleRetry: () => void
]

function useConnect(): UseConnectReturn {
    const [{ data, error, loading }, dispatch] = useStatus()
    const [reloadKey, setReloadKey] = useState(0)
    const dishes = data.dishes
    const events = data.events
    const categories = [...new Set(dishes.map(item => item.category))]

    useEffect(() => {
        let ignore = false

        const timer = setTimeout(() => {
            load(MENU_URL)
            .then( result => {
                if(!ignore) {
                    dispatch(result)
                }
            })
        }, 3000)

        return () => {
            ignore = true
            clearTimeout(timer)
        }
    }, [dispatch, reloadKey])

    const handleRetry = () => {
        dispatch({ type: 'LOADING', payload: null })
        setReloadKey(key => key + 1)
    }

    return [
        loading,
        dishes,
        events,
        categories,
        error,
        handleRetry
    ]
}

export default useConnect