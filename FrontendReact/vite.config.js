import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: true, // Consente l'accesso da rete locale
        port: 5173, // Porta per il server di sviluppo
        strictPort: true, // Se la porta è occupata, il server non tenterà di usarne un'altra
        open: true, // Apre automaticamente il browser all'avvio
        watch: {
            usePolling: true, // Risolve problemi con file system non aggiornati
        },
    },
   
    resolve: {
        alias: {
            '@': '/src', // Alias per percorsi più chiari
        },
    },
});
