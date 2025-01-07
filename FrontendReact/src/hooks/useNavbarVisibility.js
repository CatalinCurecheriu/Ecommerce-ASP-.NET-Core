// src/hooks/useNavbarVisibility.js
import { useEffect, useState, useRef } from 'react';

export default function useNavbarVisibility() {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);
    const scrollTimeoutRef = useRef(null);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            scrollTimeoutRef.current = setTimeout(() => {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    setIsNavbarVisible(false); // Nascondi navbar
                } else {
                    setIsNavbarVisible(true);  // Mostra navbar
                }
                lastScrollY = currentScrollY;
            }, 100); // debounce di 100ms
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        };
    }, []);

    return isNavbarVisible;
}
