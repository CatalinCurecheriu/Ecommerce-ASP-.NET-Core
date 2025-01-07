// src/pages/MovieDetails.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieDetails } from '../api/tmdb';
import styled from 'styled-components';
import { Button, Typography, Grid } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MovieCardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  max-width: 1200px;
  margin: 80px auto;
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  transition: all 0.4s ease-in-out;

  &:hover {
    transform: scale(1.02);
  }

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  color: #fff;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Poster = styled.img`
  width: auto;
  max-width: 300px;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  margin-right: 20px;
  object-fit: cover;
  filter: none;
  position: relative;
  z-index: 3;

  @media (max-width: 768px) {
    max-width: 200px;
    margin: 0 auto 20px;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: center;
  filter: blur(20px);
  opacity: 0.5;
  z-index: 1;
`;

const TrailerButton = styled(Button)`
  margin-top: 20px;
  border: 2px solid #fff;
  color: #fff;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  text-transform: none;
  font-weight: bold;
  font-size: 16px;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #1e90ff;
    color: #1e90ff;
  }

  svg {
    margin-right: 8px;
  }
`;

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                console.error(err); // Logghiamo l'errore per evitare warnings
                setError('Impossibile caricare i dettagli del film');
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    if (loading) {
        return <div style={{ textAlign: 'center', marginTop: '60px' }}>Caricamento in corso...</div>;
    }

    if (error) {
        return <div style={{ textAlign: 'center', marginTop: '60px', color: 'red' }}>{error}</div>;
    }

    if (!movie) {
        return <div style={{ textAlign: 'center', marginTop: '60px' }}>Movie not found.</div>;
    }

    return (
        <MovieCardWrapper>
            <Background background={`https://image.tmdb.org/t/p/original${movie.poster_path}`} />
            <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <InfoSection>
                <Typography variant="h4" component="h1" style={{ color: '#fff', marginBottom: '10px' }}>
                    {movie.title}
                </Typography>
                <Typography variant="subtitle1" style={{ color: '#9ac7fa' }}>
                    {movie.release_date?.split('-')[0]}, {movie.director || 'Unknown Director'}
                </Typography>
                <Typography variant="body2" style={{ color: '#fff', margin: '10px 0' }}>
                    {movie.overview}
                </Typography>

                <Grid container spacing={2} style={{ marginTop: '20px' }}>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="subtitle1">
                            <strong>Durata:</strong> {movie.runtime} min
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="subtitle1">
                            <strong>Genere:</strong> {movie.genres?.map((genre) => genre.name).join(', ')}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="subtitle1">
                            <strong>Lingua originale:</strong> {movie.original_language?.toUpperCase()}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="subtitle1">
                            <strong>Budget:</strong> ${movie.budget?.toLocaleString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="subtitle1">
                            <strong>Incasso totale:</strong> ${movie.revenue?.toLocaleString()}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="subtitle1">
                            <strong>Voto medio:</strong> {movie.vote_average}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <Typography variant="subtitle1">
                            <strong>Numero di voti:</strong> {movie.vote_count}
                        </Typography>
                    </Grid>
                </Grid>

                <TrailerButton
                    variant="outlined"
                    href={`https://www.youtube.com/results?search_query=${movie.title} trailer`}
                    target="_blank"
                >
                    <PlayArrowIcon /> Guarda il Trailer
                </TrailerButton>
            </InfoSection>
        </MovieCardWrapper>
    );
}

export default MovieDetails;
