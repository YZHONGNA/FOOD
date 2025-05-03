import { FiPlus } from 'react-icons/fi';

const FoodGrid = ({ foodItems, addToCart }) => {
  return (
    <section className="food-grid">
      {foodItems.map(item => (
        <div key={item.id} className="food-card">
          <div className="food-info">
            <h3>{item.name}</h3>
            <p className="food-price">${item.price.toFixed(2)}</p>
            <p className="food-stock">{item.stock} in stock</p>
          </div>
          <button
            className="add-to-cart-btn"
            onClick={() => addToCart(item)}
            disabled={item.stock <= 0}
          >
            <FiPlus /> Add to Cart
          </button>
        </div>
      ))}
    </section>
  );
};

export default FoodGrid;