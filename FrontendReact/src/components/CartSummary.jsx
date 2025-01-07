// src/components/CartSummary.jsx
import styled from 'styled-components';
import { useState } from 'react';
import { useCart } from '../context/useCart';

const SummaryWrapper = styled.div`
  width: 100%;
  max-width: 300px;
  background-color: #1a1a1a;
  padding: 1.5rem;
  border-radius: 8px;
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
`;

const PromoInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #555;
  border-radius: 4px;
  background-color: #2b2b2b;
  color: #fff;
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const CheckoutButton = styled.button`
  width: 100%;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.7rem 0;
  text-transform: uppercase;
  font-weight: bold;

  &:hover {
    background-color: #0056b3;
  }
`;

function CartSummary() {
    const [promoCode, setPromoCode] = useState('');
    const { getCartSubtotal, getShipping, getTax, getTotal } = useCart();

    const subtotal = getCartSubtotal();
    const shipping = getShipping();
    const tax = getTax();
    const total = getTotal();

    // (Esempio) se inserisci "Sconto10" applica un 10% sul totale
    // Puoi gestirlo come preferisci
    const applyPromo = () => {
        if (promoCode === 'Sconto10') {
            return total * 0.9;
        }
        return total;
    };

    const finalTotal = applyPromo();

    const handleCheckout = () => {
        alert('Checkout complete! (demo)');
    };

    return (
        <SummaryWrapper>
            <h3>Summary</h3>
            <Row>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
            </Row>
            <Row>
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
            </Row>
            <Row>
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
            </Row>

            <div>
                <span>Promocode</span>
                <PromoInput
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                />
            </div>

            <hr style={{ border: '1px solid rgba(255,255,255,0.2)' }} />

            <Row>
                <strong>Total</strong>
                <strong>${finalTotal.toFixed(2)}</strong>
            </Row>

            <CheckoutButton onClick={handleCheckout}>
                CHECKOUT
            </CheckoutButton>
        </SummaryWrapper>
    );
}

export default CartSummary;
