// src/pages/MovieDetails.jsx

// Import di React e Hook
import { useState, useEffect } from 'react';
// useParams per leggere l'ID dalla URL
import { useParams } from 'react-router-dom';
// Import della funzione per i dettagli da TMDb
import { getMovieDetails } from '../api/tmdb';
// styled-components
import styled from 'styled-components';
// framer-motion
import { motion, AnimatePresence } from 'framer-motion';

// Wrapper del contenuto
const DetailsWrapper = styled.div`
  margin-top: 60px;  
  padding: 2rem;     
  display: flex;     
  flex-direction: column; 
  align-items: center;    
  color: #fff;       
`;

// Stile per il poster
const Poster = styled.img`
  width: 300px;       
  border-radius: 8px; 
`;

// Modal per il trailer (sfondo scuro)
const TrailerModal = styled(motion.div)`
  position: fixed;  
  top: 0; left: 0;  
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.7); 
  display: flex; 
  align-items: center; 
  justify-content: center;
  z-index: 999; 
`;

function MovieDetails() {
    // Otteniamo l'ID dal param URL
    const { id } = useParams();
    // Stato per i dettagli del film
    const [movie, setMovie] = useState(null);
    // Stato di caricamento
    const [loading, setLoading] = useState(true);
    // Stato di errore
    const [error, setError] = useState(null);
    // Stato per mostrare/nascondere il trailer
    const [showTrailer, setShowTrailer] = useState(false);

    // useEffect per caricare i dettagli del film
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                // Chiamiamo l'API di TMDb
                const data = await getMovieDetails(id);
                setMovie(data);
            } catch (err) {
                setError("Impossibile caricare i dettagli del film");
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id]);

    // Se stiamo ancora caricando
    if (loading) {
        return <div style={{ marginTop: '60px', textAlign: 'center' }}>Caricamento in corso...</div>;
    }

    // Se c'è un errore
    if (error) {
        return <div style={{ marginTop: '60px', textAlign: 'center', color: 'red' }}>{error}</div>;
    }

    // Se il film non esiste
    if (!movie) {
        return <div style={{ marginTop: '60px', textAlign: 'center' }}>Movie not found.</div>;
    }

    // Poster in alta definizione
    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "https://via.placeholder.com/500x750?text=No+Poster";

    // Trailer "fittizio": potresti recuperare un reale YouTube key con l'endpoint /videos
    const trailerUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ";

    return (
        <DetailsWrapper>
            <h2>{movie.title}</h2>
            <Poster src={posterUrl} alt={movie.title} />
            <p style={{ maxWidth: '600px', margin: '1rem 0', textAlign: 'center' }}>{movie.overview}</p>
            <p><b>Release Date:</b> {movie.release_date}</p>
            <p><b>Vote Average:</b> {movie.vote_average}</p>

            <button onClick={() => setShowTrailer(true)}>Watch Trailer</button>

            <AnimatePresence>
                {showTrailer && (
                    <TrailerModal
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.iframe
                            style={{ width: '800px', height: '450px', border: 'none' }}
                            src={trailerUrl}
                            title="Movie Trailer"
                            allowFullScreen
                            initial={{ y: -50 }}
                            animate={{ y: 0 }}
                            exit={{ y: 50 }}
                        />
                        <button
                            style={{
                                position: 'absolute',
                                top: '50px', right: '50px',
                                fontSize: '2rem', background: 'none', color: '#fff', border: 'none'
                            }}
                            onClick={() => setShowTrailer(false)}
                        >
                            X
                        </button>
                    </TrailerModal>
                )}
            </AnimatePresence>
        </DetailsWrapper>
    );
}

export default MovieDetails;
