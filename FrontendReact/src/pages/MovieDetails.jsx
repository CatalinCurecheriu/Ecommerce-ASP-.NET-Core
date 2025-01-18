import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getMovieDetails,
    getMovieVideos,
    getMovieCredits,
    getSimilarMovies,
    getMovieReviews
} from '../api/tmdb';

import styled from 'styled-components';
import { Typography, Grid, CircularProgress } from '@mui/material';
import { useCart } from '../context/useCart';

// ====================== STYLED COMPONENTS ======================

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

const AddToCartButton = styled.button`
  margin-top: 20px;
  border: 2px solid #fff;
  color: #fff;
  background: transparent;
  padding: 10px 20px;
  text-transform: none;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: #1e90ff;
    color: #1e90ff;
  }
`;

const TrailerContainer = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 2rem auto;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
  overflow: hidden;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const NoTrailerMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 12px;
  margin: 2rem auto;
  width: 90%;
  max-width: 1200px;
`;

const SectionWrapper = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 2rem auto;
  color: #fff;
`;

// ====================== COMPONENT ======================

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [credits, setCredits] = useState(null);
    const [similarMovies, setSimilarMovies] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addToCart } = useCart();

    // Carichiamo dettagli, trailer, cast, simili, recensioni
    useEffect(() => {
        const fetchAll = async () => {
            try {
                setLoading(true);
                setError(null);

                const [
                    movieData,
                    videosData,
                    creditsData,
                    similarData,
                    reviewsData
                ] = await Promise.all([
                    getMovieDetails(id),
                    getMovieVideos(id),
                    getMovieCredits(id),
                    getSimilarMovies(id),
                    getMovieReviews(id)
                ]);

                // Salviamo i dati principali
                setMovie(movieData);
                setCredits(creditsData);

                // Troviamo il trailer ufficiale o "Trailer" generico
                const trailerVideo = videosData.find(
                    (video) =>
                        video.type === 'Trailer' &&
                        video.site === 'YouTube' &&
                        (video.official || true)
                );
                setTrailer(trailerVideo);

                setSimilarMovies(similarData);
                setReviews(reviewsData);
            } catch (err) {
                console.error(err);
                setError('Unable to load movie details');
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, [id]);

    // Gestione Add to Cart
    const handleAddToCart = () => {
        const randomPrice = Number((5 + Math.random() * 10).toFixed(2));
        if (movie) {
            addToCart({
                id: movie.id,
                title: movie.title,
                price: randomPrice,
                poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                desc: movie.overview || 'N/A'
            });
            alert('Item added to cart!');
        }
    };

    // ====================== RENDERING ======================

    if (loading) {
        return (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                <CircularProgress color="inherit" />
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ textAlign: 'center', marginTop: '60px', color: 'red' }}>
                {error}
            </div>
        );
    }

    if (!movie) {
        return (
            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                Movie not found.
            </div>
        );
    }

    return (
        <>
            {/* ================ DETTAGLI FILM PRINCIPALE ================ */}
            <MovieCardWrapper>
                <Background
                    background={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                />
                <Poster
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                />
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
                                <strong>Duration:</strong> {movie.runtime} min
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="subtitle1">
                                <strong>Genre:</strong>{' '}
                                {movie.genres?.map((genre) => genre.name).join(', ')}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="subtitle1">
                                <strong>Original language:</strong>{' '}
                                {movie.original_language?.toUpperCase()}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="subtitle1">
                                <strong>Budget:</strong> ${movie.budget?.toLocaleString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="subtitle1">
                                <strong>Revenue:</strong> ${movie.revenue?.toLocaleString()}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="subtitle1">
                                <strong>Average vote:</strong> {movie.vote_average}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} sm={4}>
                            <Typography variant="subtitle1">
                                <strong>Vote count:</strong> {movie.vote_count}
                            </Typography>
                        </Grid>
                    </Grid>

                    <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
                </InfoSection>
            </MovieCardWrapper>

            {/* ================ TRAILER ================ */}
            {trailer ? (
                <TrailerContainer>
                    <iframe
                        title={`${movie.title} Trailer`}
                        src={`https://www.youtube.com/embed/${trailer.key}`}
                        allowFullScreen
                    />
                </TrailerContainer>
            ) : (
                <NoTrailerMessage>No trailer available for this movie.</NoTrailerMessage>
            )}

            {/* ================ CAST PRINCIPALE ================ */}
            {credits && credits.cast?.length > 0 && (
                <SectionWrapper>
                    <Typography variant="h5" gutterBottom>
                        Top Billed Cast
                    </Typography>
                    <Grid container spacing={2}>
                        {credits.cast.slice(0, 6).map((actor) => (
                            <Grid item xs={12} sm={6} md={4} key={actor.cast_id}>
                                <div
                                    style={{
                                        background: 'rgba(255,255,255,0.08)',
                                        padding: '1rem',
                                        borderRadius: '8px'
                                    }}
                                >
                                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                                        {actor.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {actor.character ? `as ${actor.character}` : ''}
                                    </Typography>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                </SectionWrapper>
            )}

            {/* ================ FILM SIMILI ================ */}
            {similarMovies.length > 0 && (
                <SectionWrapper>
                    <Typography variant="h5" gutterBottom>
                        Similar Movies
                    </Typography>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                        {similarMovies.map((sim) => (
                            <div
                                key={sim.id}
                                style={{
                                    width: '140px',
                                    textAlign: 'center',
                                    background: 'rgba(255,255,255,0.08)',
                                    borderRadius: '8px',
                                    overflow: 'hidden'
                                }}
                            >
                                <img
                                    src={
                                        sim.poster_path
                                            ? `https://image.tmdb.org/t/p/w200${sim.poster_path}`
                                            : 'https://via.placeholder.com/200x300?text=No+Poster'
                                    }
                                    alt={sim.title}
                                    style={{ width: '100%', display: 'block' }}
                                />
                                <Typography variant="body2" style={{ padding: '0.5rem' }}>
                                    {sim.title}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </SectionWrapper>
            )}

            {/* ================ RECENSIONI ================ */}
            {reviews.length > 0 && (
                <SectionWrapper>
                    <Typography variant="h5" gutterBottom>
                        Reviews
                    </Typography>
                    {reviews.slice(0, 3).map((rev) => (
                        <div
                            key={rev.id}
                            style={{
                                marginBottom: '1.5rem',
                                background: 'rgba(255,255,255,0.08)',
                                padding: '1rem',
                                borderRadius: '8px'
                            }}
                        >
                            <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                                {rev.author}
                            </Typography>
                            <Typography variant="body2" style={{ marginTop: '0.5rem' }}>
                                {rev.content.length > 500
                                    ? rev.content.slice(0, 500) + '...'
                                    : rev.content}
                            </Typography>
                        </div>
                    ))}
                </SectionWrapper>
            )}
        </>
    );
}

export default MovieDetails;
