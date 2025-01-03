// src/pages/Favorites.jsx

// Import di styled-components
import styled from "styled-components";
// Importiamo il nostro hook personalizzato
import { useFavorites } from "../context/useFavorites";
// Componente MovieCard per visualizzare i film
import MovieCard from "../components/MovieCard";

// Contenitore principale
const FavoritesWrapper = styled.div`
  margin-top: 60px;   
  padding: 2rem;      
  text-align: center; 
  color: #fff;        

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

// Griglia per i preferiti
const FavoritesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

function Favorites() {
    // Estraggo i preferiti dal context
    const { favorites } = useFavorites();

    // Se non ci sono preferiti, mostriamo un messaggio
    if (favorites.length === 0) {
        return (
            <FavoritesWrapper>
                <h2>Your Favorites</h2>
                <p>You haven&#39;t added any favorites yet.</p>
            </FavoritesWrapper>
        );
    }

    // Altrimenti li mostriamo
    return (
        <FavoritesWrapper>
            <h2>Your Favorites</h2>
            <FavoritesGrid>
                {favorites.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </FavoritesGrid>
        </FavoritesWrapper>
    );
}

export default Favorites;
