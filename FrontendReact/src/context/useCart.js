// src/context/useCart.js
import { useContext } from 'react';
import { CartContext } from './CartContext'; // <-- IMPORT DAL FILE CartContext.js

export function useCart() {
    return useContext(CartContext);
}
