import React, { useState, useEffect, useContext } from 'react';
import { CartContext} from '../../contexts/CartContext';

function CartWidget({ }) {
  const { cart } = useContext(CartContext); 

  const [cartQuantity, setCartQuantity] = useState(0); 

  useEffect(() => {
    if (cart && cart.length > 0) {
      const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
      setCartQuantity(totalQuantity); 
    } else {
      setCartQuantity(0);
    }
  }, [cart]); 

  return (
    <div>
      {cartQuantity}
    </div>
  );
}

export default CartWidget;
