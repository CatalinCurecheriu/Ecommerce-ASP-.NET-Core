import { Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyle';
import { FavoritesProvider } from './context/FavoritesProvider';

import Header from './components/Header';
import SideMenu from './components/SideMenu';

import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import BehindTheScenes from './pages/BehindTheScenes';
import NotFound from './pages/NotFound';

function App() {
    return (
        <>
            <GlobalStyle />
            <FavoritesProvider>
                <Header />
                <SideMenu />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:id" element={<MovieDetails />} />
                    <Route path="/behind-the-scenes" element={<BehindTheScenes />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </FavoritesProvider>
        </>
    );
}

export default App;
