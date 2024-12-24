import { useState } from 'react';
import { useParams } from 'react-router-dom';
import moviesData from '../data/moviesData';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const DetailsWrapper = styled.div`
  margin-top: 60px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
`;

const Poster = styled.img`
  width: 300px;
  border-radius: 8px;
`;

const TrailerModal = styled(motion.div)`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(0,0,0,0.7);
  display: flex; align-items: center; justify-content: center;
  z-index: 999;
`;

function MovieDetails() {
    const { id } = useParams();
    const [showTrailer, setShowTrailer] = useState(false);

    const movie = moviesData.find((m) => m.id === Number(id));
    if (!movie) {
        return <div style={{ marginTop: '60px', textAlign: 'center' }}>Movie not found.</div>;
    }

    return (
        <DetailsWrapper>
            <h2>{movie.title}</h2>
            <Poster src={movie.poster} alt={movie.title} />
            <p style={{ maxWidth: '600px', margin: '1rem 0' }}>{movie.desc}</p>
            <p><b>Price:</b> ${movie.price}</p>
            <p><b>Availability:</b> {movie.availability}</p>
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
                            src={movie.trailer}
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
                            ?
                        </button>
                    </TrailerModal>
                )}
            </AnimatePresence>
        </DetailsWrapper>
    );
}

export default MovieDetails;
