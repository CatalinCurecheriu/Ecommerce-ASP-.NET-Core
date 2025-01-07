// src/pages/Favorites.jsx
import styled from "styled-components";
import { useFavorites } from "../context/useFavorites";
import MovieCard from "../components/MovieCard";

const FavoritesWrapper = styled.div`
  /* Rimosso margin-top: 60px; */
  padding: 2rem;      
  text-align: center; 
  color: #fff;        

  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const FavoritesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

function Favorites() {
    const { favorites } = useFavorites();

    if (favorites.length === 0) {
        return (
            <FavoritesWrapper>
                <h2>Your Favorites</h2>
                <p>You haven&#39;t added any favorites yet.</p>
            </FavoritesWrapper>
        );
    }

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
