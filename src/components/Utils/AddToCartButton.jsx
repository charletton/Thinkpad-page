import React from 'react';
import PropTypes from 'prop-types';

const AddToCartButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Agregar al carrito
    </button>
  );
};

AddToCartButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default AddToCartButton;
