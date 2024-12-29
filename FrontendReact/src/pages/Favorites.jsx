import styled from "styled-components";
import { useFavorites } from "../context/useFavorites";
import MovieCard from "../components/MovieCard";
import moviesData from "../data/moviesData"; // Assicurati di importare moviesData

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

const FavoritesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

function Favorites() {
    const { favorites } = useFavorites();
    const favoriteMovies = moviesData.filter((movie) => favorites.includes(movie.id));

    if (favoriteMovies.length === 0) {
        return (
            <FavoritesWrapper>
                <h2>Your Favorites</h2>
                <p>You haven&apos;t added any favorites yet.</p>
            </FavoritesWrapper>
        );
    }

    return (
        <FavoritesWrapper>
            <h2>Your Favorites</h2>
            <FavoritesGrid>
                {favoriteMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </FavoritesGrid>
        </FavoritesWrapper>
    );
}

export default Favorites;
