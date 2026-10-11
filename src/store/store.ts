import { combineSlices, configureStore } from '@reduxjs/toolkit'
import orderSlice from './orderSlice'

const rootReducer = combineSlices(orderSlice)

export type RootState = ReturnType<typeof rootReducer>

function makeStore(preloadedState?: Partial<RootState>) {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']

export default makeStore
