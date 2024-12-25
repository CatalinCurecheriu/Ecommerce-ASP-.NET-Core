import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0; left: 0;
  width: 100%;
  height: 60px;
  background: ${({ scrolled }) => scrolled
        ? 'rgba(0, 0, 0, 0.6)'
        : 'transparent'
    };
  backdrop-filter: ${({ scrolled }) => scrolled ? 'blur(10px)' : 'none'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  z-index: 999;
  transition: background 0.3s;
`;

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 2px;
`;

const NavLinks = styled.nav`
  a {
    margin-left: 1rem;
    color: #fff;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        function handleScroll() {
            setScrolled(window.scrollY > 10);
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <HeaderWrapper scrolled={scrolled}>
            <Title>Futuristic Movies</Title>
            <NavLinks>
                <Link to="/">Home</Link>
                <Link to="/movies">Shop</Link>
                <Link to="/behind-the-scenes">Behind the Scenes</Link>
            </NavLinks>
        </HeaderWrapper>
    );
}

export default Header;
