import { createRoot } from 'react-dom/client';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import './index.css';
import AppRouter from './router/AppRouter';
import makeStore from './store/store';
import { loadOrder, persistOrder } from './store/orderStorage';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element with id "root" not found');
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
        },
    },
});

const store = makeStore({ order: { items: loadOrder() } });
persistOrder(store);

createRoot(rootElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <AppRouter />
            </QueryClientProvider>
        </Provider>
    </React.StrictMode>
);
