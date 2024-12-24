import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CarouselWrapper = styled.div`
  position: relative;
  width: 90%;
  margin: 2rem auto;
  overflow: hidden;
  height: 400px;
  border-radius: 12px;
`;

const Slide = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  border-radius: 12px;
`;

const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  z-index: 2;
  padding: 0.8rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.2);
  }
`;

const LeftArrow = styled(NavButton)`
  left: 1rem;
`;

const RightArrow = styled(NavButton)`
  right: 1rem;
`;

function Carousel({ slides }) {
    const [index, setIndex] = useState(0);

    const nextSlide = () => {
        setIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    return (
        <CarouselWrapper>
            <LeftArrow onClick={prevSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-left">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                </svg>
            </LeftArrow>
            <RightArrow onClick={nextSlide}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                </svg>
            </RightArrow>

            <AnimatePresence>
                <Slide
                    key={slides[index].id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    style={{ backgroundImage: `url(${slides[index].poster})` }}
                />
            </AnimatePresence>
        </CarouselWrapper>
    );
}

// Validazione delle props con PropTypes
Carousel.propTypes = {
    slides: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            poster: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default Carousel;
