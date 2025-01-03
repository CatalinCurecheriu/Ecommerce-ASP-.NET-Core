// src/context/FavoritesProvider.jsx

// Import di React
import { useState } from 'react';
// PropTypes
import PropTypes from 'prop-types';
// Importiamo il contesto creato
import { FavoritesContext } from './FavoritesContext';
// Importiamo la funzione per toggle preferiti
import { toggleFavoriteHelper } from '../Utils/Utils';

/**
 * Il provider che avvolge la nostra app e gestisce i preferiti in uno stato condiviso
 */
export function FavoritesProvider({ children }) {
    // Stato con la lista di film preferiti
    const [favorites, setFavorites] = useState([]);

    // Funzione per aggiungere/rimuovere un film dai preferiti
    const toggleFavorite = (movie) => {
        setFavorites((prev) => toggleFavoriteHelper(prev, movie));
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
