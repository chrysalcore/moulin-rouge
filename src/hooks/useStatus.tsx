import { ActionDispatch, useReducer } from "react";

type Action = {
    type: 'LOADING',
    payload: null
} | {
    type: 'SUCCESS',
    payload: {
        dishes: object[],
        events: object[]
    }
} | {
    type: 'ERROR',
    payload: object
}

type Status = {
    loading: boolean,
    data: {
        dishes: object[],
        events: object[]
    },
    error: null | object
}

type Dispatch = (action: Action) => void

const initialState: Status = {
    loading: true,
    data: {
        dishes: [],
        events: []
    },
    error: null
}

function useStatus(): [Status, Dispatch] {
    const [status, dispatch] = useReducer(reducer, initialState)

    return [status, dispatch]
}

function reducer(state: Status, action: Action): Status {
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