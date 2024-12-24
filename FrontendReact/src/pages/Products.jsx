// src/pages/Products.jsx

import { motion } from 'framer-motion';

function Products() {
    const dummyProducts = [
        { id: 1, name: 'Neon T-Shirt', price: 25 },
        { id: 2, name: 'Cyberpunk Jacket', price: 120 },
        { id: 3, name: 'Holographic Sneakers', price: 89 },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Our Products</h2>
            <ul>
                {dummyProducts.map((p) => (
                    <motion.li
                        key={p.id}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '1rem',
                            margin: '1rem 0',
                            borderRadius: '8px',
                            cursor: 'pointer',
                        }}
                    >
                        {p.name} — ${p.price}
                    </motion.li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
