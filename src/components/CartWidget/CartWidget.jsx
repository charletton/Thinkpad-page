import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { CartContext} from '../../contexts/CartContext';

function CartWidget({ itemsCount }) {
  const { cart } = useContext(CartContext); 

  const [cartQuantity, setCartQuantity] = useState(0); // Usa un estado local para la cantidad del carrito

  useEffect(() => {
    if (cart && cart.length > 0) {
      // Calcular la cantidad total de elementos en el carrito sumando las cantidades de todos los elementos
      const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
      setCartQuantity(totalQuantity); // Actualizar el estado local con la cantidad total del carrito
    } else {
      setCartQuantity(0); // Si el carrito está vacío, establecer la cantidad en 0
    }
  }, [cart]); // Escuchar cambios en el estado del carrito

  return (
    <div>
      {cartQuantity}
    </div>
  );
}

export default CartWidget;
