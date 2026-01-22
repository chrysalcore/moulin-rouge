import { useReducer } from "react";

function useStatus() {
    const [status, dispatch] = useReducer(reducer, {
        loading: true,
        data: {
            dishes: [],
            events: []
        },
        error: null
    })

    return [status, dispatch]
}

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING':
            return {
                data : {
                    dishes: [],
                    events: []
                },
                error: null,
                loading: true
            }
        case 'SUCCESS':
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case 'ERROR':
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export default useStatus