import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: true, // Esto expone el servidor a tu red local automáticamente (0.0.0.0)
        port: 5173
    }
});
