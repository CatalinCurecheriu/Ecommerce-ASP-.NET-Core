import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { FavoritesProvider } from './context/FavoritesProvider'; // Importa il provider

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <FavoritesProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </FavoritesProvider>
    </React.StrictMode>
);
