import styled from 'styled-components';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  margin: 1rem auto;
  max-width: 400px;
`;

const Title = styled.h3`
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 700;
`;

function GlassCard({ title, children }) {
    return (
        <Card
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {title && <Title>{title}</Title>}
            {children}
        </Card>
    );
}

// Aggiungi le validazioni delle props
GlassCard.propTypes = {
    title: PropTypes.string, // `title` deve essere una stringa
    children: PropTypes.node, // `children` può essere qualsiasi elemento React
};

export default GlassCard;
