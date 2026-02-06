import { useReducer, Dispatch } from "react";
import type { StatusState, StatusAction } from "../types";

type StatusDispatch = Dispatch<StatusAction>

const initialState: StatusState = {
    loading: true,
    data: {
        dishes: [],
        events: []
    },
    error: null
}

function useStatus(): [StatusState, StatusDispatch] {
    const [status, dispatch] = useReducer(reducer, initialState)
    return [status, dispatch]
}

function reducer(state: StatusState, action: StatusAction): StatusState {
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