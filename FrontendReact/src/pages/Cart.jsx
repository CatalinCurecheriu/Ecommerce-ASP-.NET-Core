// src/pages/Cart.jsx
import styled from 'styled-components';
import { useCart } from '../context/useCart'; // ✅ Import corretto

const CartWrapper = styled.div`
  margin-top: 60px;
  padding: 2rem;
  text-align: center;
  color: #fff;
`;

const CartGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
`;

function Cart() {
    const { cart } = useCart(); // estraiamo lo stato del carrello

    if (cart.length === 0) {
        return (
            <CartWrapper>
                <h2>Cart</h2>
                <p>Your cart is empty.</p>
            </CartWrapper>
        );
    }

    return (
        <CartWrapper>
            <h2>Cart</h2>
            <CartGrid>
                {cart.map((movie) => (
                    <div
                        key={movie.id}
                        style={{
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '1rem',
                            borderRadius: '8px',
                            minWidth: '150px',
                        }}
                    >
                        <img
                            src={movie.poster}
                            alt={movie.title}
                            style={{ width: '100%', borderRadius: '8px' }}
                        />
                        <h4>{movie.title}</h4>
                    </div>
                ))}
            </CartGrid>
        </CartWrapper>
    );
}

export default Cart;
