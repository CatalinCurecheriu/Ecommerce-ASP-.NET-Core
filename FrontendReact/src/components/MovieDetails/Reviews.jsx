// src/components/MovieDetails/Reviews.jsx

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

const ReviewCard = styled.div`
  width: 100%;
  max-width: 800px;
  background: rgba(255, 255, 255, 0.08);
  padding: 1rem;
  border-radius: 8px;
`;

function Reviews({ reviews }) {
    if (!reviews || reviews.length === 0) return null;

    // Mostriamo le prime 3 recensioni
    const sliced = reviews.slice(0, 3);

    return (
        <>
            <Typography variant="h5" gutterBottom>
                Reviews
            </Typography>
            <ReviewList>
                {sliced.map((rev) => (
                    <ReviewCard key={rev.id}>
                        <Typography variant="subtitle2" style={{ fontWeight: 'bold' }}>
                            {rev.author}
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: '0.5rem' }}>
                            {rev.content.length > 500
                                ? rev.content.slice(0, 500) + '...'
                                : rev.content}
                        </Typography>
                    </ReviewCard>
                ))}
            </ReviewList>
        </>
    );
}

Reviews.propTypes = {
    reviews: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string,
        author: PropTypes.string,
        content: PropTypes.string
    }))
};

export default Reviews;
