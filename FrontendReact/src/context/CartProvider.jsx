// src/context/CartProvider.jsx
import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Aggiunge un film al carrello (se non c’è già)
    const addToCart = (movie) => {
        const exists = cart.some((m) => m.id === movie.id);
        if (!exists) {
            setCart((prev) => [...prev, movie]);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export { CartContext };
