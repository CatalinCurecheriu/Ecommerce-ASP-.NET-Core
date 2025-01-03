// src/Utils/Utils.js

/**
 * Aggiunge o rimuove un film dai preferiti:
 * - Se il film (stesso id) è già nei preferiti, lo rimuove
 * - Altrimenti lo aggiunge
 */
export function toggleFavoriteHelper(favorites, movie) {
    const alreadyFav = favorites.some((fav) => fav.id === movie.id);
    if (alreadyFav) {
        // Rimuoviamo il film
        return favorites.filter((fav) => fav.id !== movie.id);
    } else {
        // Aggiungiamo il film
        return [...favorites, movie];
    }
}
