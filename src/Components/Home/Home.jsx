import { useState } from 'react';
import FoodGrid from './FoodGrid';
import CartSidebar from './CartSidebar';
import './Home.css';

const Home = ({ onLogout }) => {

  const foodItems = [
    { id: 1, name: "Canned Vegetables", price: 2.50, stock: 125 },

  ];


  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isVIP, setIsVIP] = useState(false);
  const [donationAmount, setDonationAmount] = useState(5);
  const [checkoutStep, setCheckoutStep] = useState('cart');


  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartTotal = subtotal - (isVIP ? subtotal * 0.1 : 0) + donationAmount;


  const addToCart = (item) => {

  };

  const removeFromCart = (id) => {

  };

  const updateQuantity = (id, newQuantity) => {

  };

  return (
    <div className="home-container">
      {/* ... header code ... */}
      <main className="home-content">
        <FoodGrid foodItems={foodItems} addToCart={addToCart} />
        <CartSidebar
          cart={cart}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          updateQuantity={updateQuantity}
          removeFromCart={removeFromCart}
          subtotal={subtotal}
          isVIP={isVIP}
          setIsVIP={setIsVIP}
          donationAmount={donationAmount}
          setDonationAmount={setDonationAmount}
          cartTotal={cartTotal}
          checkoutStep={checkoutStep}
          setCheckoutStep={setCheckoutStep}
        />
      </main>
    </div>
  );
};

export default Home;