// src/components/MovieDetails/SimilarMovies.jsx

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import MovieCard from '../MovieCard';  // riusa la stessa card di "Movies" se esiste

const MoviesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

function SimilarMovies({ movies }) {
    // Filtriamo i film senza poster e con popolarità troppo bassa
    // (ad es. popolarità > 30), così da avere risultati decenti
    const filtered = movies.filter(
        (m) => m.poster_path && m.popularity > 30
    );

    if (filtered.length === 0) return null;

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Related Movies
            </Typography>
            <MoviesGrid>
                {filtered.map((movie) => (
                    <MovieCard
                        key={movie.id}
                        movie={{
                            id: movie.id,
                            title: movie.title,
                            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                            rating: movie.vote_average,
                        }}
                    />
                ))}
            </MoviesGrid>
        </>
    );
}

SimilarMovies.propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        poster_path: PropTypes.string,
        title: PropTypes.string,
        popularity: PropTypes.number,
        vote_average: PropTypes.number
    }))
};

export default SimilarMovies;
