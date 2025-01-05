// src/context/useCart.js
import { useContext } from 'react';
import { CartContext } from './CartProvider';

export function useCart() {
    return useContext(CartContext);
}
