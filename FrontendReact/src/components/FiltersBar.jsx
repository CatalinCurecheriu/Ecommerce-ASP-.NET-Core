// src/components/FiltersBar.jsx

// Import di styled-components per gli stili
import styled from "styled-components";
// PropTypes per definire le proprietà
import PropTypes from "prop-types";

/* 
  In questo esempio gestiamo i filtri come "controlled component":
  - Riceviamo `filters` (oggetto con searchTerm, genre, year, useHighRatedEndpoint)
  - Riceviamo `onFiltersChange` (funzione callback) per aggiornare i filtri nel parent
*/

// Contenitore principale dei filtri
const FiltersWrapper = styled.div`
  width: 100%;
  background-color: #1a1a1a;
  color: #fff;
  padding: 1rem 2rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, minmax(140px, 1fr));
  gap: 1rem;
  align-items: center;
  justify-items: center;

  @media (max-width: 992px) {
    grid-template-columns: repeat(2, minmax(140px, 1fr));
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
    padding: 0.5rem 1rem;
  }
`;

// Contenitore di ogni gruppo di filtro
const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

// Etichetta
const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.3rem;
  font-size: 0.85rem;
`;

// Input testuale (per la ricerca)
const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #2b2b2b;
  color: #fff;
  font-size: 0.85rem;

  ::placeholder {
    color: #bbb;
  }
`;

// Select (genere, anno)
const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #2b2b2b;
  color: #fff;
  font-size: 0.85rem;
  appearance: none;

  option {
    background-color: #2b2b2b;
    color: #fff;
  }

  &:focus {
    outline: none;
    border-color: #777;
  }
`;

// Bottone per cambiare endpoint (useHighRated)
const SortButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

// Componente principale
function FiltersBar({ filters, onFiltersChange, genreList }) {
    // Funzione d'aiuto per generare l'elenco degli anni
    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let y = currentYear; y >= 1900; y--) {
            years.push(y);
        }
        return years;
    };

    // Quando l'utente digita nella casella di ricerca
    const handleSearchChange = (e) => {
        onFiltersChange({ ...filters, searchTerm: e.target.value });
    };

    // Quando l'utente cambia il genere
    const handleGenreChange = (e) => {
        onFiltersChange({ ...filters, genre: e.target.value });
    };

    // Quando l'utente cambia l'anno
    const handleYearChange = (e) => {
        onFiltersChange({ ...filters, year: e.target.value });
    };

    // Quando l'utente clicca sul bottone "Most Rated" / "Reset"
    const toggleHighRated = () => {
        onFiltersChange({ ...filters, useHighRatedEndpoint: !filters.useHighRatedEndpoint });
    };

    return (
        <FiltersWrapper>
            {/* Ricerca per titolo */}
            <FilterGroup>
                <Label htmlFor="search">Cerca Film:</Label>
                <Input
                    id="search"
                    type="text"
                    placeholder="Digita il titolo..."
                    value={filters.searchTerm}
                    onChange={handleSearchChange}
                />
            </FilterGroup>

            {/* Filtro per genere */}
            <FilterGroup>
                <Label htmlFor="genres">Genere:</Label>
                <Select id="genres" value={filters.genre} onChange={handleGenreChange}>
                    <option value="">Tutti i generi</option>
                    {genreList.map((g) => (
                        <option key={g.id} value={g.id}>
                            {g.name}
                        </option>
                    ))}
                </Select>
            </FilterGroup>

            {/* Filtro per anno */}
            <FilterGroup>
                <Label htmlFor="year">Anno:</Label>
                <Select id="year" value={filters.year} onChange={handleYearChange}>
                    <option value="">Tutti gli anni</option>
                    {generateYearOptions().map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </Select>
            </FilterGroup>

            {/* Bottone per passare da useHighRated a reset */}
            <FilterGroup>
                <Label style={{ visibility: "hidden" }}>Ordina</Label>
                <SortButton onClick={toggleHighRated}>
                    {filters.useHighRatedEndpoint ? "Reset" : "Most Rated"}
                </SortButton>
            </FilterGroup>
        </FiltersWrapper>
    );
}

// Definiamo i propTypes
FiltersBar.propTypes = {
    filters: PropTypes.shape({
        searchTerm: PropTypes.string,
        genre: PropTypes.string,
        year: PropTypes.string,
        useHighRatedEndpoint: PropTypes.bool,
    }).isRequired,
    onFiltersChange: PropTypes.func.isRequired,
    genreList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default FiltersBar;
