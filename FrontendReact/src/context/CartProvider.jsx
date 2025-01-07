// src/context/CartProvider.jsx
import PropTypes from 'prop-types';
import { useState } from 'react';
import { CartContext } from './CartContext';

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);

    // Aggiunge un film al carrello (se non c’è già) con alcuni default
    const addToCart = (movie) => {
        const exists = cart.some((m) => m.id === movie.id);
        if (!exists) {
            setCart((prev) => [
                ...prev,
                {
                    ...movie,
                    format: 'DVD',       // default
                    isExtended: false,   // default
                    isCofanetto: false,  // default
                    quantity: 1,         // default
                }
            ]);
        }
    };

    // Rimuove un film dal carrello in base all'ID
    const removeFromCart = (movieId) => {
        setCart((prev) => prev.filter((m) => m.id !== movieId));
    };

    // Aggiorna i campi di un film nel carrello
    const updateCartItem = (movieId, newData) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === movieId ? { ...item, ...newData } : item
            )
        );
    };

    // Calcolo Subtotal (somma di tutti i (prezzo * quantità))
    const getCartSubtotal = () => {
        return cart.reduce((sum, item) => {
            const basePrice = item.price || 0;
            return sum + basePrice * (item.quantity || 1);
        }, 0);
    };

    // Spedizione: ipotesi -> gratis sopra 50$, altrimenti 5$
    const getShipping = () => {
        const subtotal = getCartSubtotal();
        return subtotal > 50 ? 0 : 5;
    };

    // Tax (ipotizziamo 10% sul subtotal)
    const getTax = () => {
        const subtotal = getCartSubtotal();
        return subtotal * 0.1;
    };

    // Totale finale
    const getTotal = () => {
        const subtotal = getCartSubtotal();
        const shipping = getShipping();
        const tax = getTax();
        return subtotal + shipping + tax;
    };

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateCartItem,
                getCartSubtotal,
                getShipping,
                getTax,
                getTotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
