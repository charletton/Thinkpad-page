import './Counter.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

function Counter({ setItemsCount }) {
  const [count, setCount] = useState(0);

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    setItemsCount(newCount); // Llama a la función para actualizar el estado del contador en App.js
  };

  const decrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      setItemsCount(newCount); // Llama a la función para actualizar el estado del contador en App.js
    }
  };

  return (
    <div>
      <h2>Contador: {count}</h2>
      <button onClick={increment}>Incrementar</button>
      <button onClick={decrement}>Decrementar</button>
    </div>
  );
}

Counter.propTypes = {
  setItemsCount: PropTypes.func.isRequired
};

export default Counter;
