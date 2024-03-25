import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddToCartButton = ({ productId, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1); // Estado para almacenar la cantidad de productos a agregar

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value)); // Parsea el valor del input a un entero y actualiza el estado
  };

  const handleClick = () => {
    onAddToCart(productId, quantity); // Llama a la función onAddToCart pasando el productId y la cantidad
    setQuantity(1); // Restaura la cantidad a 1 después de agregar al carrito
  };

  return (
    <div>
      <input type="number" min="1" value={quantity} onChange={handleQuantityChange} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
      onClick={handleClick}>Agregar al carrito</button>
    </div>
  );
};

AddToCartButton.propTypes = {
  productId: PropTypes.number.isRequired, // Id del producto que se está agregando al carrito
  onAddToCart: PropTypes.func.isRequired // Función que se llama cuando se agrega un producto al carrito
};

export default AddToCartButton;
