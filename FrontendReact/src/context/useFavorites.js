// src/context/useFavorites.js
import { useContext } from 'react';
import { FavoritesContext } from './FavoritesContext';

export function useFavorites() {
    return useContext(FavoritesContext);
}
