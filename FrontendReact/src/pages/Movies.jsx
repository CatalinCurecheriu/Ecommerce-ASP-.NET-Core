// src/pages/Movies.jsx

// Import di React e dei relativi hook
import { useState, useEffect } from "react";
// styled-components per gli stili
import styled from "styled-components";
// Import delle funzioni che chiamano TMDb
import { discoverMovies, getHighRatedMovies, getGenres } from "../api/tmdb";
// Import del componente MovieCard
import MovieCard from "../components/MovieCard";
// Import del componente FiltersBar
import FiltersBar from "../components/FiltersBar";

// Creiamo uno styled component per la griglia dei film
const MoviesGrid = styled.div`
  display: flex;           /* Disposizione in riga */
  flex-wrap: wrap;         /* Manda a capo gli elementi se serve */
  justify-content: center; /* Centra orizzontalmente */
  gap: 1rem;               /* Distanza tra le card */
`;

function Movies() {
    // Stato per la lista di film
    const [movies, setMovies] = useState([]);
    // Stato per gestire i filtri come "controlled"
    const [filters, setFilters] = useState({
        searchTerm: "",
        genre: "",
        year: "",
        useHighRatedEndpoint: false,
    });
    // Stato per la lista di generi (da TMDb)
    const [genreList, setGenreList] = useState([]);
    // Stato per gestire loading
    const [loading, setLoading] = useState(false);
    // Stato per gestire errori
    const [error, setError] = useState(null);

    // Al primo render, carichiamo la lista dei generi per la FilterBar
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                setGenreList(data);
            } catch (err) {
                console.error("Errore recupero generi:", err);
            }
        };
        fetchGenres();
    }, []);

    // Effetto che scatta quando i filtri cambiano
    useEffect(() => {
        // Funzione asincrona per caricare i film
        const fetchMovies = async () => {
            try {
                setLoading(true);     // Mostriamo "Caricamento..."
                setError(null);       // Reset dell'errore
                let results = [];
                // Se l'utente ha scelto "Most Rated", chiamiamo getHighRatedMovies
                if (filters.useHighRatedEndpoint) {
                    results = await getHighRatedMovies(500);
                } else {
                    // Altrimenti chiamiamo discoverMovies coi filtri
                    results = await discoverMovies({
                        searchTerm: filters.searchTerm,
                        genre: filters.genre,
                        year: filters.year,
                        sortBy: "popularity.desc",
                    });
                }
                setMovies(results); // Salviamo i film nello stato
            } catch (err) {
                // In caso di errore
                setError("Errore durante il caricamento dei film.");
            } finally {
                // Alla fine togliamo il loading
                setLoading(false);
            }
        };

        // Invocazione della funzione
        fetchMovies();
    }, [filters]);

    // Funzione che riceve i nuovi filtri dalla FilterBar e aggiorna lo stato
    const handleFiltersChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    return (
        <div style={{ marginTop: "60px", padding: "2rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Tutti i Film</h2>

            {/* Passiamo i filtri e la callback, insieme alla lista generi */}
            <FiltersBar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                genreList={genreList}
            />

            {/* Se stiamo caricando, mostriamo un messaggio */}
            {loading && <p>Caricamento in corso...</p>}
            {/* Se c'è un errore, lo mostriamo */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Griglia con le card dei film */}
            <MoviesGrid>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={{
                            id: movie.id,
                            title: movie.title,
                            // Creiamo la URL del poster (se esiste poster_path)
                            poster: movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://via.placeholder.com/500x750?text=No+Poster",
                            rating:
                                typeof movie.vote_average === "number" ? movie.vote_average : null,
                        }}
                    />
                ))}
            </MoviesGrid>
        </div>
    );
}

export default Movies;
