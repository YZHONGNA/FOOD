const OrderComplete = ({ onClose }) => {
    return (
      <div className="complete-step">
        <div className="cart-header">
          <h2>Thank You!</h2>
          <button onClick={onClose}>&times;</button>
        </div>
        <div className="success-message">
          <p>Your order has been placed successfully!</p>
          <p>A confirmation has been sent to your email.</p>
          <button 
            className="continue-shopping-btn"
            onClick={onClose}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  };
  
  export default OrderComplete;