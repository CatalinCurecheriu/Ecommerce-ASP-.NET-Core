// src/components/MovieCard.jsx

// Import di styled-components per gli stili
import styled from 'styled-components';
// Import di framer-motion
import { motion } from 'framer-motion';
// Import di PropTypes
import PropTypes from 'prop-types';
// Importiamo il nostro hook per i preferiti
import { useFavorites } from '../context/useFavorites';
// Link per navigare alla pagina di dettaglio
import { Link } from 'react-router-dom';
// FontAwesomeIcon per le icone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Icona stella piena
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
// Icona stella vuota
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';

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

// Overlay trasparente in basso
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

// Bottone per il preferito
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

// Titolo del film
const Title = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: bold;
`;

// Rating
const Rating = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.9rem;
  color: #ffd700;
`;

function MovieCard({ movie }) {
    // Otteniamo dal contesto i preferiti e la funzione toggle
    const { favorites, toggleFavorite } = useFavorites();

    // Controlliamo se questo film è già nei preferiti
    const isFav = favorites.some((favMovie) => favMovie.id === movie.id);

    // Funzione per aggiungere/rimuovere il film dai preferiti
    const handleFavoriteClick = (e) => {
        e.preventDefault();  // Non vogliamo seguire il link
        toggleFavorite(movie); // Passiamo l'intero oggetto film
    };

    // Verifichiamo se c'è un rating numerico
    const hasValidRating = typeof movie.rating === 'number' && !Number.isNaN(movie.rating);

    return (
        // Link per andare alla pagina /movies/:id
        <Link to={`/movies/${movie.id}`}>
            <CardWrapper
                style={{ backgroundImage: `url(${movie.poster})` }}
                whileHover={{ scale: 1.02 }}
            >
                {/* Bottone preferito */}
                <FavoriteBtn onClick={handleFavoriteClick} isFav={isFav}>
                    <FontAwesomeIcon icon={isFav ? solidStar : emptyStar} />
                </FavoriteBtn>

                {/* Overlay con titolo e rating */}
                <Overlay>
                    <Title>{movie.title}</Title>
                    {hasValidRating ? (
                        <Rating>⭐ {movie.rating.toFixed(1)}</Rating>
                    ) : (
                        <Rating>No rating available</Rating>
                    )}
                </Overlay>
            </CardWrapper>
        </Link>
    );
}

// Definiamo i propTypes
MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster: PropTypes.string.isRequired,
        rating: PropTypes.number,
    }).isRequired,
};

export default MovieCard;
