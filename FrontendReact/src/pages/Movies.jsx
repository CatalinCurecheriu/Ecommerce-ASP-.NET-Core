import { useState } from 'react';
import styled from 'styled-components';
import moviesData from '../data/moviesData';
import MovieCard from '../components/MovieCard';
import FiltersBar from '../components/FiltersBar';

const MoviesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

function Movies() {
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");

    const filteredMovies = moviesData.filter((m) => {
        const matchSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = category ? m.category === category : true;
        return matchSearch && matchCat;
    });

    return (
        <div style={{ marginTop: '60px', padding: '2rem' }}>
            <h2>All Movies</h2>
            <FiltersBar
                onSearch={(val) => setSearchTerm(val)}
                onCategoryChange={(cat) => setCategory(cat)}
            />
            <MoviesGrid>
                {filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </MoviesGrid>
        </div>
    );
}

export default Movies;
