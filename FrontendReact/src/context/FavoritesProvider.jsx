import { useState } from 'react';
import PropTypes from 'prop-types';
import { FavoritesContext } from './FavoritesContext';
import { toggleFavoriteHelper } from '../Utils/Utils';

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (movieId) => {
        console.log(`Toggling favorite for movie ID: ${movieId}`);
        setFavorites((prev) => toggleFavoriteHelper(prev, movieId));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

FavoritesProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
