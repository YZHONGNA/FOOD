import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

const CartItems = ({ cart, updateQuantity, removeFromCart }) => {
  return (
    <div className="cart-items">
      {cart.map(item => (
        <div key={item.id} className="cart-item">
          <div className="item-info">
            <h4>{item.name}</h4>
            <p>${item.price.toFixed(2)} each</p>
          </div>
          <div className="item-quantity">
            <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
              <FiMinus />
            </button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
              <FiPlus />
            </button>
          </div>
          <p className="item-total">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
          <button
            className="remove-item"
            onClick={() => removeFromCart(item.id)}
          >
            <FiTrash2 />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItems;