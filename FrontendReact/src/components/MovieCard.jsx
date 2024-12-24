
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useFavorites } from '../context/useFavorites';
import { Link } from 'react-router-dom';

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
`;

const Overlay = styled(motion.div)`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.8));
  color: #fff;
  padding: 1rem;
`;

const FavoriteBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: #fff;
  padding: 0.3rem;
  border-radius: 50%;
  cursor: pointer;
`;

function MovieCard({ movie }) {
    const { favorites, toggleFavorite } = useFavorites();
    const isFav = favorites.includes(movie.id);

    return (
        <Link to={`/movies/${movie.id}`}>
            <CardWrapper
                style={{ backgroundImage: `url(${movie.poster})` }}
                whileHover={{ scale: 1.02 }}
            >
                <FavoriteBtn
                    onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(movie.id);
                    }}
                >
                    {isFav ? '?' : '?'}
                </FavoriteBtn>
                <Overlay
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <h4>{movie.title}</h4>
                    <p>${movie.price}</p>
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
        price: PropTypes.number.isRequired,
    }).isRequired, // La prop `movie` deve essere un oggetto con queste proprietà obbligatorie
};

export default MovieCard;
