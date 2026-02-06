import { createRoot } from 'react-dom/client';
import React from 'react';
import './index.css';
import AppRouter from './router/AppRouter';

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root element with id "root" not found');
}

createRoot(rootElement).render(
    <React.StrictMode>
        <AppRouter />
    </React.StrictMode>
);
