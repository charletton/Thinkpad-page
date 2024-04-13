//hooks
import React, { createContext, useState, useEffect } from "react";

//toast
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';

export const CartContext = createContext();
export const CartProvider = ({ children }) => {

    //Contexto guardado en el storage
    const storedCart = localStorage.getItem("cart");
    const initialCart = storedCart ? JSON.parse(storedCart) : [];
    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const isInCart = (id) => {
        return cart.some((cartItem) => cartItem.item.id === id);
    };

    const notify = (text, toastTheme) => toast(text, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: toastTheme,
    })


    const addCart = (item, quantity, theme) => {
        if (isInCart(item.id)) {
            const updatedCart = cart.map((cartItem) => {
                if (cartItem.item.id === item.id && item.stock >= cartItem.quantity + quantity) {
                    notify('Agregado al carrito! 🛒', theme);
                    return { ...cartItem, quantity: cartItem.quantity + quantity };
                } else if (cartItem.item.id === item.id && item.stock < cartItem.quantity + quantity) {
                    notify('No hay suficiente stock! 🛒', theme);
                    return cartItem;
                }
                return cartItem;
            });
            setCart(updatedCart);
        } else {
            notify('Agregado al carrito! 🛒', theme);
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
            notify('Producto eliminado del carrito', 'dark'); // Mensaje de notificación al eliminar un producto
        } else {
            console.log('El producto no está en el carrito.');
        }
    };


    const clear = () => {
        setCart([]);
        localStorage.removeItem("cart");
    };

    return (
        <CartContext.Provider value={{ cart, addCart, removeItem, clear }}>
            {children}
        </CartContext.Provider>
    );
};
