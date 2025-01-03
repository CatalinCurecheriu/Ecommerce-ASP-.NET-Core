// src/api/tmdb.js

// Importiamo axios per fare richieste HTTP
import axios from "axios";

// Chiave API di TMDb (fai attenzione a non committarla in repo pubblici)
const API_KEY = "c29ac4903dd99ca7adc48288b55cb35f";

// Base URL di TMDb
const BASE_URL = "https://api.themoviedb.org/3";

// Creiamo un'istanza axios con parametri di base
const tmdb = axios.create({
    baseURL: BASE_URL,  // Tutte le chiamate iniziano con questa baseURL
    params: {
        api_key: API_KEY,  // La chiave API per autenticarsi
        language: "en-US", // Lingua dei dati che vogliamo
    },
});

/**
 * Ottiene fino a 60 film (3 pagine * 20 = 60) in base a:
 * - searchTerm (se presente chiamiamo /search/movie, altrimenti /discover/movie)
 * - genere
 * - anno
 * - sortBy
 */
export const discoverMovies = async ({
    searchTerm = "",
    genre = "",
    year = "",
    sortBy = "popularity.desc",
}) => {
    // Array in cui accumuleremo i risultati
    let allResults = [];

    // Se c'è un termine di ricerca, usiamo /search/movie
    if (searchTerm) {
        for (let page = 1; page <= 3; page++) {
            const response = await tmdb.get("/search/movie", {
                params: {
                    query: searchTerm,
                    page, // Richiesta pagina per ottenere più risultati
                },
            });
            allResults = [...allResults, ...response.data.results];
        }
        return allResults;
    } else {
        // Altrimenti usiamo /discover/movie
        // Prepara i parametri base
        const params = {
            sort_by: sortBy,
        };
        // Se c'è un genere, lo aggiungiamo
        if (genre) {
            params.with_genres = genre;
        }
        // Se c'è un anno, lo aggiungiamo
        if (year) {
            params.primary_release_year = year;
        }
        // Facciamo 3 chiamate per totalizzare ~60 film
        for (let page = 1; page <= 3; page++) {
            const response = await tmdb.get("/discover/movie", {
                params: {
                    ...params,
                    page,
                },
            });
            allResults = [...allResults, ...response.data.results];
        }
        return allResults;
    }
};

/**
 * Restituisce fino a 60 film con voto alto (ma < 10) e almeno minVotes.
 */
export const getHighRatedMovies = async (minVotes = 500) => {
    let allResults = [];
    for (let page = 1; page <= 3; page++) {
        const response = await tmdb.get("/discover/movie", {
            params: {
                sort_by: "vote_average.desc",
                "vote_average.lte": 9.9,
                "vote_count.gte": minVotes,
                page,
            },
        });
        allResults = [...allResults, ...response.data.results];
    }
    return allResults;
};

/**
 * Restituisce la lista dei generi disponibili su TMDb.
 */
export const getGenres = async () => {
    const response = await tmdb.get("/genre/movie/list");
    return response.data.genres;
};

/**
 * Recupera i dettagli di un film specifico tramite il suo ID.
 */
export const getMovieDetails = async (movieId) => {
    const response = await tmdb.get(`/movie/${movieId}`);
    return response.data;
};
