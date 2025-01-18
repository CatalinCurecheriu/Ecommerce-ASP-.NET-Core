// src/components/MovieDetails/CastList.jsx

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const CastGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
`;

const CastCard = styled.div`
  width: 150px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  overflow: hidden;
  text-align: center;
`;

const ActorImage = styled.img`
  width: 100%;
  height: 225px;
  object-fit: cover;
`;

const InfoWrapper = styled.div`
  padding: 0.5rem;
`;

function CastList({ cast }) {
    if (!cast || cast.length === 0) return null;

    // Mostriamo i primi 6
    const topBilled = cast.slice(0, 6);

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Top Billed Cast
            </Typography>
            <CastGrid>
                {topBilled.map((actor) => (
                    <CastCard key={actor.cast_id}>
                        {actor.profile_path ? (
                            <ActorImage
                                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                                alt={actor.name}
                            />
                        ) : (
                            <ActorImage
                                src="https://via.placeholder.com/200x300?text=No+Photo"
                                alt={actor.name}
                            />
                        )}
                        <InfoWrapper>
                            <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                                {actor.name}
                            </Typography>
                            {actor.character && (
                                <Typography variant="body2">
                                    as {actor.character}
                                </Typography>
                            )}
                        </InfoWrapper>
                    </CastCard>
                ))}
            </CastGrid>
        </>
    );
}

CastList.propTypes = {
    cast: PropTypes.arrayOf(PropTypes.shape({
        cast_id: PropTypes.number,
        name: PropTypes.string,
        character: PropTypes.string,
        profile_path: PropTypes.string
    }))
};

export default CastList;
