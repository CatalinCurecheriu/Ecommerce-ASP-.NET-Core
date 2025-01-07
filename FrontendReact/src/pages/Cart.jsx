// src/pages/Cart.jsx
import styled from 'styled-components';
import { useCart } from '../context/useCart';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';

const CartPageWrapper = styled.div`
  /* RIMOSSO marginTop: '60px'; */
  padding: 2rem;
  color: #fff;
  display: flex;
  flex-direction: row;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ItemsContainer = styled.div`
  flex: 1;
  width: 100%;
  max-width: 800px;
`;

function Cart() {
    const { cart } = useCart();

    if (cart.length === 0) {
        return (
            <CartPageWrapper>
                <h2>Your Cart is empty.</h2>
            </CartPageWrapper>
        );
    }

    return (
        <CartPageWrapper>
            <ItemsContainer>
                <h2>Shopping Cart</h2>
                {cart.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </ItemsContainer>

            <CartSummary />
        </CartPageWrapper>
    );
}

export default Cart;
