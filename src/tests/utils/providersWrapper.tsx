import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import makeStore, { type AppStore } from '../../store/store'

export function createProvidersWrapper(store: AppStore = makeStore()) {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
        },
    })

    return function ProvidersWrapper({ children }: { children: React.ReactNode }) {
        return (
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </Provider>
        )
    }
}
