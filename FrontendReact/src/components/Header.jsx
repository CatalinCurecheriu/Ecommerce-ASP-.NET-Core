import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useNavbarVisibility from '../hooks/useNavbarVisibility';

const HeaderWrapper = styled.header`
  position: fixed;
  top: ${({ $visible }) => ($visible ? '0' : '-60px')};
  left: 0;
  width: 100%;
  height: 60px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(10px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  transition: top 0.3s ease-in-out;
`;

const Title = styled.h1`
  font-family: 'Orbitron', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 2px;
  color: #fff;
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1rem;

  a {
    color: #fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;

  span {
    width: 25px;
    height: 3px;
    background: #fff;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 60px;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  width: 100%;
  max-width: 300px;
  height: calc(100vh - 60px);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 998;

  a {
    color: #fff;
    text-decoration: none;
    margin-bottom: 1rem;
    font-size: 1.2rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function Header() {
    const isNavbarVisible = useNavbarVisibility();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <HeaderWrapper $visible={isNavbarVisible}>
            <Title>Futuristic Movies</Title>

            <NavLinks>
                <Link to="/">Home</Link>
                <Link to="/movies">Movies</Link>
                <Link to="/favorites">Favorites</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/behind-the-scenes">Behind the Scenes</Link>
            </NavLinks>

            <Hamburger onClick={() => setMenuOpen((prev) => !prev)}>
                <span />
                <span />
                <span />
            </Hamburger>

            {menuOpen && (
                <MobileMenu
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.3 }}
                >
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/movies" onClick={() => setMenuOpen(false)}>Movies</Link>
                    <Link to="/favorites" onClick={() => setMenuOpen(false)}>Favorites</Link>
                    <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
                    <Link to="/behind-the-scenes" onClick={() => setMenuOpen(false)}>Behind the Scenes</Link>
                </MobileMenu>
            )}
        </HeaderWrapper>
    );
}

export default Header;
console.log('Navbar visible:', isNavbarVisible);
