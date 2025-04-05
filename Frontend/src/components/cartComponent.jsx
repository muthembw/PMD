import React, { useState } from 'react';
import Products from '../pages/Products';

const CartComponent = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]); 
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== productId)); // Remove product by id
  };

  return (
    <div>
      <h1>Your Cart: {cart.length} items</h1>

      {/* Cart Section */}
      {cart.length > 0 ? (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">🛒 Cart Items</h3>
          <ul>
            {cart.map((product) => (
              <li key={product.id} className="flex justify-between items-center">
                <span>{product.title} - ${product.price}</span>
                <button
                  onClick={() => handleRemoveFromCart(product.id)}
                  className="text-red-600 ml-2"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      {/* Pass handleAddToCart to the Products component */}
      <Products onAddToCart={handleAddToCart} />
    </div>
  );
};

export default CartComponent;
