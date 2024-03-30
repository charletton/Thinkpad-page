import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();
export const CartProvider = ({ children }) => {

    //Contexto guardado en el storage
    const storedCart = localStorage.getItem("cart");
    const initialCart = storedCart ? JSON.parse(storedCart) : [];
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addCart = (item, quantity) => {
        if (isInCart(item.id)) {
            const updatedCart = cart.map((cartItem) => {
                if (cartItem.item.id === item.id) {
                    return { ...cartItem, quantity: cartItem.quantity + quantity };
                }
                return cartItem;
            });
            setCart(updatedCart);
        } else {
            setCart([...cart, { item, quantity }]);
        }
    };

    const removeItem = (id) => {
        if (isInCart(id)) {
            const updatedCart = cart.map((cartItem) => {
                if (cartItem.item.id === id) {
                    if (cartItem.quantity === 1) {
                        return null;
                    } else {
                        return { ...cartItem, quantity: cartItem.quantity - 1 };
                    }
                }
                return cartItem;
            }).filter(Boolean); 
            setCart(updatedCart);
        } else {
            console.log('El producto no está en el carrito.');
        }
    };

    const clear = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    const isInCart = (id) => {
        return cart.some((cartItem) => cartItem.item.id === id);
    };

    return (
        <CartContext.Provider value={{ cart, addCart, removeItem, clear }}>
            {children}
        </CartContext.Provider>
    );
};
