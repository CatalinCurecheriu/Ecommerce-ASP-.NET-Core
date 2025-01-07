// src/pages/Movies.jsx
import { useState, useEffect } from "react";
import styled from "styled-components";
import { discoverMovies, getHighRatedMovies, getGenres } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import FiltersBar from "../components/FiltersBar";

const MoviesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

function Movies() {
    const [movies, setMovies] = useState([]);
    const [filters, setFilters] = useState({
        searchTerm: "",
        genre: "",
        year: "",
        useHighRatedEndpoint: false,
    });
    const [genreList, setGenreList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const data = await getGenres();
                setGenreList(data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchGenres();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setLoading(true);
                setError(null);
                let results = [];

                if (filters.useHighRatedEndpoint) {
                    results = await getHighRatedMovies(500);
                } else {
                    results = await discoverMovies({
                        searchTerm: filters.searchTerm,
                        genre: filters.genre,
                        year: filters.year,
                        sortBy: "popularity.desc",
                    });
                }
                setMovies(results);
            } catch (err) {
                console.error(err);
                setError("Errore durante il caricamento dei film.");
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, [filters]);

    const handleFiltersChange = (updatedFilters) => {
        setFilters(updatedFilters);
    };

    return (
        <div style={{ padding: "2rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>Tutti i Film</h2>
            <FiltersBar
                filters={filters}
                onFiltersChange={handleFiltersChange}
                genreList={genreList}
            />
            {loading && <p>Caricamento in corso...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <MoviesGrid>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={{
                            id: movie.id,
                            title: movie.title,
                            poster: movie.poster_path
                                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                : "https://via.placeholder.com/500x750?text=No+Poster",
                            rating:
                                typeof movie.vote_average === "number"
                                    ? movie.vote_average
                                    : null,
                        }}
                    />
                ))}
            </MoviesGrid>
        </div>
    );
}

export default Movies;
