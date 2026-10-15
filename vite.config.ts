import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    base: '/moulin-rouge',
    test: {
        globals: false,
        environment: 'jsdom',
        setupFiles: './src/tests/vitest.setup.ts',
        restoreMocks: true,
        mockReset: true,
        unstubGlobals: true,
        coverage: {
            include: ['src/**'],
            exclude: ['src/tests/**', 'src/main.tsx'],
            thresholds: {
                statements: 90,
                branches: 76,
                functions: 88,
                lines: 89,
            },
        },
    },
});
