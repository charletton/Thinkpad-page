import './Counter.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Counter({ setItemsCount }) {
  const [count, setCount] = useState(() => {
    // Recupera el valor del contador almacenado en localStorage, si existe, o establece el valor inicial en 0
    const storedCount = localStorage.getItem('itemsCount');
    return storedCount ? parseInt(storedCount) : 0;
  });

  useEffect(() => {
    // Guarda el valor actual del contador en localStorage cada vez que cambie
    localStorage.setItem('itemsCount', count.toString());
    // Actualiza el contador en el componente padre
    setItemsCount(count);
  }, [count, setItemsCount]);

  const increment = () => {
    setCount(prevCount => prevCount + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(prevCount => prevCount - 1);
    }
  };

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  );
}

Counter.propTypes = {
  setItemsCount: PropTypes.func.isRequired
};

export default Counter;
