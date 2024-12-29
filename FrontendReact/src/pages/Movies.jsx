import { useState, useEffect } from "react";
import styled from "styled-components";
import { getPopularMovies, searchMovies } from "../api/tmdb";
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
    const [filters, setFilters] = useState({ searchTerm: "", genre: "", year: "", rating: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                if (filters.searchTerm) {
                    const results = await searchMovies(filters.searchTerm);
                    setMovies(results);
                } else {
                    const results = await getPopularMovies(filters);
                    setMovies(results);
                }
            } catch (err) {
                setError("Errore durante il caricamento dei film.");
            }
            setLoading(false);
        };

        fetchMovies();
    }, [filters]);

    const handleFiltersChange = (updatedFilters) => {
        setFilters((prev) => ({ ...prev, ...updatedFilters }));
    };

    return (
        <div style={{ marginTop: "60px", padding: "2rem" }}>
            <h2 style={{ textAlign: "center", marginBottom: "2rem" }}>All Movies</h2>

            <FiltersBar onFiltersChange={handleFiltersChange} />

            {loading && <p>Caricamento in corso...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <MoviesGrid>
                {movies.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={{
                            id: movie.id,
                            title: movie.title,
                            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                            desc: movie.overview,
                            rating: movie.vote_average,
                        }}
                    />
                ))}
            </MoviesGrid>
        </div>
    );
}

export default Movies;
