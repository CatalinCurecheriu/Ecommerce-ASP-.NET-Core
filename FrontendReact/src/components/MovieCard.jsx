import styled from 'styled-components';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useFavorites } from '../context/useFavorites';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

const CardWrapper = styled(motion.div)`
  position: relative;
  width: 200px;
  height: 300px;
  margin: 1rem;
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  &:hover {
    box-shadow: rgba(255, 255, 255, 0.2) 0px 15px 30px -10px;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.8));
  color: #fff;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const FavoriteBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  border: none;
  color: ${props => (props.isFav ? '#FFD700' : '#FFFFFF')};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 2;

  &:hover {
    color: #ffcc00;
  }
`;

const Title = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
`;

const Rating = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #ffd700; /* Colore oro per il rating */
`;

function MovieCard({ movie }) {
    const { favorites, toggleFavorite } = useFavorites();
    const isFav = favorites.includes(movie.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault(); // Evita il redirect del link
        toggleFavorite(movie.id);
    };

    return (
        <Link to={`/movies/${movie.id}`}>
            <CardWrapper
                style={{ backgroundImage: `url(${movie.poster})` }}
                whileHover={{ scale: 1.02 }}
            >
                {/* Pulsante Preferiti */}
                <FavoriteBtn
                    onClick={handleFavoriteClick}
                    isFav={isFav}
                >
                    <FontAwesomeIcon icon={isFav ? solidStar : emptyStar} />
                </FavoriteBtn>

                {/* Overlay con Dettagli */}
                <Overlay>
                    <Title>{movie.title}</Title>
                    {movie.rating ? (
                        <Rating>? {movie.rating.toFixed(1)}</Rating>
                    ) : (
                        <Rating>No rating available</Rating>
                    )}
                </Overlay>
            </CardWrapper>
        </Link>
    );
}

// Validazione delle props
MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        rating: PropTypes.number, // Il rating può essere opzionale
    }).isRequired,
};

export default MovieCard;
