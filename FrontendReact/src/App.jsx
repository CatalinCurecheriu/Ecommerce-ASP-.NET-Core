// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import { FavoritesProvider } from './context/FavoritesProvider';
// NUOVO IMPORT PER IL CART PROVIDER:
import { CartProvider } from './context/CartProvider';

import Header from './components/Header';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import BehindTheScenes from './pages/BehindTheScenes';
import Favorites from './pages/Favorites';
// NUOVO IMPORT PAGINA CART:
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';

function App() {
    return (
        <>
            <GlobalStyle />
            {/* Avvolgiamo l'app in entrambi i Provider */}
            <FavoritesProvider>
                <CartProvider>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/movies" element={<Movies />} />
                        <Route path="/movies/:id" element={<MovieDetails />} />
                        <Route path="/favorites" element={<Favorites />} />
                        {/* Nuova rotta CART */}
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/behind-the-scenes" element={<BehindTheScenes />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </CartProvider>
            </FavoritesProvider>
        </>
    );
}

export default App;
