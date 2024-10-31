import React, { createContext, useState, useEffect } from "react";

// Create CartContext to hold cart information
export const CartContext = createContext();

// CartProvider component to wrap and provide cart context to children
export function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);

  // Initialize cart count from localStorage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const initialCount = storedCart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setCartCount(initialCount);
  }, []);

  // Update cart count and localStorage when cart changes
  const updateCartCount = (newCart) => {
    const newCount = newCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(newCount);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Provide cartCount and updateCartCount function to child components
  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
}
