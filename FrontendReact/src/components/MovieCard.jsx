// src/components/MovieCard.jsx
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import { useFavorites } from '../context/useFavorites';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
// IMPORT PER IL CART:
import { useCart } from '../context/useCart';

// Card wrapper con animazioni
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
  color: ${(props) => (props.isFav ? '#FFD700' : '#FFFFFF')};
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
  color: #ffd700;
`;

/* NUOVO BOTTONE */
const CartButton = styled.button`
  border: none;
  margin-top: 0.5rem;
  background: #444;
  color: #fff;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;

  &:hover {
    background: #666;
  }
`;

function MovieCard({ movie }) {
    const { favorites, toggleFavorite } = useFavorites();

    // Hook del cart
    const { addToCart } = useCart();

    const isFav = favorites.some((favMovie) => favMovie.id === movie.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        toggleFavorite(movie);
    };

    const hasValidRating = typeof movie.rating === 'number' && !Number.isNaN(movie.rating);

    // Aggiunta al carrello
    const handleAddToCart = (e) => {
        e.preventDefault();
        addToCart(movie);
    };

    return (
        <Link to={`/movies/${movie.id}`}>
            <CardWrapper
                style={{ backgroundImage: `url(${movie.poster})` }}
                whileHover={{ scale: 1.02 }}
            >
                <FavoriteBtn onClick={handleFavoriteClick} isFav={isFav}>
                    <FontAwesomeIcon icon={isFav ? solidStar : emptyStar} />
                </FavoriteBtn>

                <Overlay>
                    <Title>{movie.title}</Title>
                    {hasValidRating ? (
                        <Rating>⭐ {movie.rating.toFixed(1)}</Rating>
                    ) : (
                        <Rating>No rating available</Rating>
                    )}

                    {/* Nuovo bottone Add to Cart */}
                    <CartButton onClick={handleAddToCart}>Add to Cart</CartButton>
                </Overlay>
            </CardWrapper>
        </Link>
    );
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        rating: PropTypes.number,
    }).isRequired,
};

export default MovieCard;
