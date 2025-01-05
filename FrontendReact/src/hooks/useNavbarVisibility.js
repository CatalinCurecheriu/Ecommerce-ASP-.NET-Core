import { useEffect, useState } from 'react';

export default function useNavbarVisibility() {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsNavbarVisible(false); // Nascondi navbar
            } else {
                setIsNavbarVisible(true); // Mostra navbar
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return isNavbarVisible;
}
console.log('ScrollY:', window.scrollY);
