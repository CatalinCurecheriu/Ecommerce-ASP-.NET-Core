export const SLIDE_TRANSITION_DURATION = 0.7;

export const formatSlideTitle = (title) => title.toUpperCase();

export const toggleFavoriteHelper = (favorites, movieId) => {
    if (favorites.includes(movieId)) {
        return favorites.filter((id) => id !== movieId); // Rimuove il film dai preferiti
    } else {
        return [...favorites, movieId]; // Aggiunge il film ai preferiti
    }
};
