import useResource from './useResource'
import fetchEvents from '../helpers/fetchEvents'

function useEvents() {
    return useResource(['events'], fetchEvents)
}

export default useEvents
