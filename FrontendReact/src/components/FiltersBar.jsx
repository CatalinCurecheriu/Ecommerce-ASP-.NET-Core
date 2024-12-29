import styled from 'styled-components';
import PropTypes from 'prop-types';

const FiltersContainer = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  background: #222;
  color: #fff;
  border: 1px solid #555;
  padding: 0.5rem;
  border-radius: 4px;
`;

const Select = styled.select`
  background: #222;
  color: #fff;
  border: 1px solid #555;
  padding: 0.5rem;
  border-radius: 4px;
`;

function FiltersBar({ onFiltersChange }) {
    const handleSearch = (e) => onFiltersChange({ searchTerm: e.target.value });
    const handleGenre = (e) => onFiltersChange({ genre: e.target.value });
    const handleYear = (e) => onFiltersChange({ year: e.target.value });
    const handleRating = (e) => onFiltersChange({ rating: e.target.value });

    return (
        <FiltersContainer>
            <Input type="text" placeholder="Search movies..." onChange={handleSearch} />
            <Select onChange={handleGenre}>
                <option value="">All Genres</option>
                {/* Aggiorna con generi dinamici */}
            </Select>
            <Select onChange={handleYear}>
                <option value="">All Years</option>
                {/* Genera dinamicamente gli anni */}
            </Select>
            <Input type="number" placeholder="Min Rating" onChange={handleRating} />
        </FiltersContainer>
    );
}

FiltersBar.propTypes = {
    onFiltersChange: PropTypes.func.isRequired,
};

export default FiltersBar;
