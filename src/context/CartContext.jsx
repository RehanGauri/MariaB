'use client'

import { createContext, useContext, useState } from "react"


const CartContext = createContext();

export const CartProvider = ({children}) =>{
    const [isCartOpen, setIsCartOpen] = useState(false)

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);
    const toggleCart = () => setIsCartOpen((prev) => !prev);

    return (
    <CartContext.Provider value={{ isCartOpen, openCart, closeCart, toggleCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => useContext(CartContext);