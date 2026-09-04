import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
        host: true, // Esto expone el servidor a tu red local automáticamente (0.0.0.0)
        port: 5173
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                landing: resolve(__dirname, 'landing.html')
            }
        }
    }
});
