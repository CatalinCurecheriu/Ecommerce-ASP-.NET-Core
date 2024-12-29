import { motion, useViewportScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';

const HeroContainer = styled.div`
  position: relative;
  height: 80vh;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const ParallaxBG = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://image.tmdb.org/t/p/original/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg') center/cover no-repeat;
  z-index: -1;
`;

const HeroText = styled.div`
  font-size: 2.5rem;
  text-align: center;
  max-width: 600px;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 12px;
  backdrop-filter: blur(8px);
`;

function HeroParallax() {
    const { scrollY } = useViewportScroll();
    const yPos = useTransform(scrollY, [0, 300], [0, 100], { clamp: false });

    return (
        <HeroContainer>
            <ParallaxBG style={{ y: yPos }} />
            <HeroText>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Welcome to Movieverse</h1>
                <p>Your ultimate destination for cinematic adventures</p>
            </HeroText>
        </HeroContainer>
    );
}

export default HeroParallax;
