import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaBars, FaFilm, FaStar, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MenuContainer = styled(motion.div)`
  position: fixed;
  top: 60px; /* sotto l'header */
  left: 0;
  width: ${({ open }) => (open ? '200px' : '60px')};
  height: calc(100vh - 60px);
  background: rgba(20, 20, 20, 0.8);
  backdrop-filter: blur(10px);
  overflow: hidden;
  z-index: 998;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
`;

const ToggleButton = styled.div`
  width: 100%;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0.8rem;
  color: #fff;
  text-decoration: none;

  &:hover {
    background: rgba(255,255,255,0.1);
  }

  svg {
    margin-right: ${({ open }) => (open ? '0.8rem' : '0')};
    font-size: 1.2rem;
  }

  span {
    display: ${({ open }) => (open ? 'inline' : 'none')};
    transition: display 0.3s;
  }
`;

function SideMenu() {
    const [open, setOpen] = useState(false);

    return (
        <MenuContainer open={open}>
            <ToggleButton onClick={() => setOpen((prev) => !prev)}>
                <FaBars color="#fff" />
            </ToggleButton>

            <MenuItem to="/movies" open={open}>
                <FaFilm />
                <span>All Movies</span>
            </MenuItem>

            <MenuItem to="/movies?category=Sci-Fi" open={open}>
                <FaStar />
                <span>Sci-Fi</span>
            </MenuItem>

            <MenuItem to="/behind-the-scenes" open={open}>
                <FaCog />
                <span>Behind Scenes</span>
            </MenuItem>
        </MenuContainer>
    );
}

export default SideMenu;
