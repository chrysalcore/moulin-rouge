import { configureStore } from '@reduxjs/toolkit'
import orderSlice from './orderSlice'

function makeStore() {
    return configureStore({
        reducer: {
            [orderSlice.reducerPath]: orderSlice.reducer
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export default makeStore
