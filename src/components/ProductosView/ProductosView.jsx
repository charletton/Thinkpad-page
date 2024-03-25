import React, { useState } from 'react';
import { useTheme } from '../../contexts/ThemeContext'; 
import productos from '../Utils/Productos.json';
import { Link } from 'react-router-dom';
import AddToCartButton from '../Utils/AddToCartButton';

const ProductosView = () => {
  const { theme, setTheme } = useTheme();
  const [filtro, setFiltro] = useState("");

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const productosFiltrados = productos.productos.filter(producto => {
    const nombreCoincide = producto.nombre.toLowerCase().includes(filtro.toLowerCase());
    const categoriaCoincide = producto.categ === filtro.toLowerCase(); // Filtrar por categoría
    return nombreCoincide || categoriaCoincide;
  });

  // Limpiar el filtro de búsqueda
  const limpiarFiltro = () => {
    setFiltro("");
  };

  return (
    <>

      {/* filters */}
      <input
        type="text"
        placeholder="Buscar producto"
        value={filtro}
        onChange={handleFiltroChange}
        className="w-full py-2 px-3 mb-4 leading-tight focus:outline-none focus:shadow-outline"
      />
      <div className="flex mb-4">
        <button onClick={() => setFiltro("new")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Nuevos
        </button>
        <button onClick={() => setFiltro("old")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          Usados
        </button>
        <button onClick={limpiarFiltro} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Limpiar filtro
        </button>
      </div>

      {/* render */}
      {productosFiltrados.map(producto => (
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
