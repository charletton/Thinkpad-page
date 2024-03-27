import React, { useState, useContext } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import productos from '../Utils/Productos.json';
import { Link } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';

const ProductosView = () => {
  const { theme } = useTheme();
  const [filtro, setFiltro] = useState(""); 
  const { addCart } = useContext(CartContext);

  const onAdd = (item) => {
    addCart(item, 1);
    console.log('Producto agregado al carrito');
  };

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const productosFiltrados = productos.productos.filter(producto => {
    const nombreCoincide = producto.nombre.toLowerCase().includes(filtro.toLowerCase());
    const categoriaCoincide = producto.categ === filtro.toLowerCase(); // Filtrar por categoría
    return nombreCoincide || categoriaCoincide;
  });

  const limpiarFiltro = () => {
    setFiltro("");
  };

  return (
    <>
      {/* input filter */}
      <input
        type="text"
        placeholder="Buscar producto"
        value={filtro}
        onChange={handleFiltroChange}
        className="w-full py-2 px-3 mb-4 leading-tight focus:outline-none focus:shadow-outline"
      />

      {/* Filters */}
      <div className="flex mb-4">
        <button onClick={() => setFiltro("new")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Nuevos
        </button>
        <button onClick={() => setFiltro("old")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Viejos
        </button>
        <button onClick={limpiarFiltro} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Limpiar
        </button>
      </div>

      {/* Render */} 
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productosFiltrados.map(producto => (
          <div className={`max-w-xs rounded overflow-hidden shadow-lg ${theme === 'dark' ? 'bg-white' : 'bg-black'}`} key={producto.id}>
            <Link to={`/productos/${producto.id}`}>
              <div className="img-container">
                <img className="w-full h-auto" src={producto.img} alt={producto.nombre} />
              </div>
            </Link>
            <div className="px-6 py-4">
              <div className={`font-bold text-xl mb-2 ${theme === 'dark' ? 'text-dark' : 'text-white'}`}>{producto.nombre}</div>
              <p className="text-gray-700 text-base">
                {producto.descripcion}
              </p>
            </div>
            <div className="px-6 pt-0 pb-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => onAdd(producto)}>Agregar al carrito</button>
            </div>
          </div>
        ))}
      </div>


    </>
  );
};

export default ProductosView;

