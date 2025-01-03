
// Import di ReactDOM
import ReactDOM from 'react-dom/client';
// Import del BrowserRouter
import { BrowserRouter } from 'react-router-dom';
// Import del nostro componente App
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
    // Rimuoviamo StrictMode per evitare doppi rendering
    <BrowserRouter>
        <App />
    </BrowserRouter>
);