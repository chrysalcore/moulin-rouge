import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/moulin-rouge',
    test: {
        globals: false,
        environment: 'jsdom',
        setupFiles: './src/tests/vitest.setup.ts',
        restoreMocks: true,
        unstubGlobals: true,
        coverage: {
            include: ['src/**'],
            exclude: ['src/tests/**', 'src/main.tsx'],
            thresholds: {
                statements: 95,
                branches: 90,
                functions: 90,
                lines: 95,
            },
        },
    },
});
