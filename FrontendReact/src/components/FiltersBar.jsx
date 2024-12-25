
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

function FiltersBar({ onSearch, onCategoryChange }) {
    const handleSearch = (e) => {
        onSearch(e.target.value);
    };

    return (
        <FiltersContainer>
            <Input
                type="text"
                placeholder="Search movies..."
                onChange={handleSearch}
            />
            <Select onChange={(e) => onCategoryChange(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
            </Select>
        </FiltersContainer>
    );
}

// Validazione delle props
FiltersBar.propTypes = {
    onSearch: PropTypes.func.isRequired, // Deve essere una funzione obbligatoria
    onCategoryChange: PropTypes.func.isRequired, // Anche questa è obbligatoria
};

export default FiltersBar;
