import {React, useState} from 'react';
import { useTheme } from '../../contexts/ThemeContext'; // Importa el hook useTheme
import productos from '../Utils/Productos.json';
import { Link } from 'react-router-dom';
import AddToCartButton from '../Utils/AddToCartButton';

const ProductosView = () => {
  const [itemsCount, setItemsCount] = useState(0); // Inicializa el estado del contador en 0
  const { theme, setTheme } = useTheme(); // Obtén el tema y la función setTheme del contexto

  return (
    <>
      {productos.productos.map(producto => (
        <div className={`max-w-sm rounded overflow-hidden shadow-lg ${theme == 'dark' ? 'bg-white' : 'bg-black'}`} key={producto.id}>
          <Link to={`/productos/${producto.id}`}>
            <img className="w-full" src={producto.img} alt={producto.nombre}/>
          </Link>
          <div className="px-6 py-4">
            <div className={`font-bold text-xl mb-2 ${theme == 'dark' ? 'text-dark' : 'text-white'}`}>{producto.nombre}</div>
            <p className="text-gray-700 text-base">
              {producto.descripcion}
            </p>
          </div>
          <div className="px-6 pt-0 pb-2">
            <AddToCartButton/>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductosView;