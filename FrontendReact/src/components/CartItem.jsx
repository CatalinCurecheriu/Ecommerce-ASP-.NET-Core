// src/components/CartItem.jsx
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCart } from '../context/useCart';

const CartItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
`;

const Poster = styled.img`
  width: 100px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
`;

const InfoSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const Title = styled.h4`
  margin: 0;
  font-size: 1.1rem;
`;

const Description = styled.p`
  font-size: 0.85rem;
  color: #ccc;
`;

const FormatSelect = styled.select`
  background-color: #1a1a1a;
  color: #fff;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 0.3rem 0.5rem;
  width: max-content;
  margin-bottom: 0.5rem;
`;

const CheckboxesRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 0.5rem;

  label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.85rem;
  }
`;

const RowBottom = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  button {
    background-color: #333;
    color: #fff;
    border: 1px solid #777;
    width: 24px;
    height: 24px;
    cursor: pointer;

    &:hover {
      background-color: #444;
    }
  }

  span {
    width: 20px;
    text-align: center;
  }
`;

const Price = styled.span`
  font-weight: bold;
`;

const RemoveBtn = styled.button`
  margin-left: auto; 
  background: none;
  border: none;
  color: #f00;
  font-size: 1.2rem;
  cursor: pointer;
`;

function CartItem({ item = {} }) {
    // De-strutturiamo i campi con fallback 
    // per evitare "undefined" e warning su prop non definiti
    const {
        id = 0,
        title = 'No title',
        desc = '',
        price = 0,
        poster = '',
        quantity = 1,
        format = 'DVD',
        isExtended = false,
        isCofanetto = false,
    } = item;

    const { removeFromCart, updateCartItem } = useCart();

    const handleRemove = () => removeFromCart(id);

    const handleFormatChange = (e) => {
        updateCartItem(id, { format: e.target.value });
    };

    const handleExtendedChange = (e) => {
        updateCartItem(id, { isExtended: e.target.checked });
    };

    const handleCofanettoChange = (e) => {
        updateCartItem(id, { isCofanetto: e.target.checked });
    };

    const increaseQuantity = () => {
        updateCartItem(id, { quantity: quantity + 1 });
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            updateCartItem(id, { quantity: quantity - 1 });
        }
    };

    const totalPrice = (price * quantity).toFixed(2);

    return (
        <CartItemWrapper>
            <Poster
                src={poster || 'https://via.placeholder.com/100x150?text=No+Poster'}
                alt={title}
            />

            <InfoSection>
                <Title>{title}</Title>
                {desc && <Description>{desc}</Description>}

                <FormatSelect value={format} onChange={handleFormatChange}>
                    <option value="DVD">DVD</option>
                    <option value="BluRay">Blu-Ray</option>
                    <option value="4K">4K</option>
                    <option value="4KBluRay">4K Blu-Ray</option>
                </FormatSelect>

                <CheckboxesRow>
                    <label>
                        <input
                            type="checkbox"
                            checked={isExtended}
                            onChange={handleExtendedChange}
                        />
                        Extended
                    </label>

                    <label>
                        <input
                            type="checkbox"
                            checked={isCofanetto}
                            onChange={handleCofanettoChange}
                        />
                        Cofanetto
                    </label>
                </CheckboxesRow>

                <RowBottom>
                    <QuantityControls>
                        <button onClick={decreaseQuantity}>-</button>
                        <span>{quantity}</span>
                        <button onClick={increaseQuantity}>+</button>
                    </QuantityControls>

                    <Price>${totalPrice}</Price>

                    <RemoveBtn onClick={handleRemove}>X</RemoveBtn>
                </RowBottom>
            </InfoSection>
        </CartItemWrapper>
    );
}

CartItem.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        desc: PropTypes.string,
        price: PropTypes.number,
        poster: PropTypes.string,
        quantity: PropTypes.number,
        format: PropTypes.string,
        isExtended: PropTypes.bool,
        isCofanetto: PropTypes.bool,
    }),
};

export default CartItem;
