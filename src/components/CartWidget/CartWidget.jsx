import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function CartWidget({ itemsCount }) {
  const [count, setCount] = useState(itemsCount);

  useEffect(() => {
    setCount(itemsCount); // Actualizar el estado local cuando cambia itemsCount
  }, [itemsCount]);

  return (
    <div>
      {count}
    </div>
  );
}

CartWidget.propTypes = {
  itemsCount: PropTypes.number.isRequired
};

export default CartWidget;
