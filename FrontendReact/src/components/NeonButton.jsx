import styled from 'styled-components';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Button = styled(motion.button)`
  background: none;
  color: #fff;
  padding: 0.7rem 1.2rem;
  border: 2px solid transparent;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;

  /* gradient border */
  background-image: linear-gradient(#0b0b0b, #0b0b0b),
    linear-gradient(90deg, #ff4be3, #7b2cbf);
  background-origin: border-box;
  background-clip: content-box, border-box;

  transition: all 0.3s ease;
  &:hover {
    filter: brightness(1.2);
  }
`;

function NeonButton({ label }) {
    return (
        <Button
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
        >
            {label}
        </Button>
    );
}

// Aggiungi la validazione delle props
NeonButton.propTypes = {
    label: PropTypes.string.isRequired, // La prop `label` deve essere una stringa obbligatoria
};

export default NeonButton;
