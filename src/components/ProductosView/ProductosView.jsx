//hooks
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

//contextos
import { useTheme } from '../../contexts/ThemeContext';
import { CartContext } from '../../contexts/CartContext';

//firebase
import { getDocs, collection, getFirestore } from 'firebase/firestore';

//componentes
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';

//toast
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const ProductosView = () => {
  const { theme, setTheme } = useTheme();
  const { addCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);


  const toastTheme = theme === 'dark' ? 'dark' : 'light';
  const notify = () => toast('Agregado al carrito! 🛒', {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: toastTheme,
  })

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const productosCollection = collection(db, 'productos');
      const productosSnapshot = await getDocs(productosCollection);
      const productosData = productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProductos(productosData);
      setLoading(false); 
    };

    fetchData();
  }, []);

  const onAdd = (item) => {
    addCart(item, 1);
    notify();
  };

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const productosFiltrados = productos.filter(producto => {
    const nombreCoincide = producto.nombre.toLowerCase().includes(filtro.toLowerCase());
    const categoriaCoincide = producto.categ === filtro.toLowerCase(); // Filtrar por categoría
    return nombreCoincide || categoriaCoincide;
  });

  const limpiarFiltro = () => {
    setFiltro("");
  };

  if (loading) return (
    <Loading/>
  )

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} />
      <div className="relative">
        <img src='https://i.pinimg.com/originals/82/a2/61/82a26119fbdad694553647323ddefdca.jpg' className="w-full h-60 object-cover object-top" alt="Imagen de productos" />
        <h1 className={`text-6xl mt-10 
            font-bold text-center
            absolute top-1/2 left-1/2
            transform -translate-x-1/2
            -translate-y-1/2 
            pb-20
            ${theme == 'dark' ? 'text-custom-white' : 'text-custom-black'}`
        }>
          Productos!
        </h1>
      </div>

      <div className={`Main-body p-4 w-full h-full ${theme == 'dark' ? 'bg-dark' : 'bg-white'}`}>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {productosFiltrados.map(producto => (
              <div className={`max-w-md mx-auto ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-lg overflow-hidden shadow-lg`} key={producto.id}>
                <Link to={`/productos/${producto.id}`} className="block">
                  <img className="w-full h-auto" src={producto.img} alt={producto.nombre} />
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

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition:Bounce
          />
        </>
        <Footer />
      </div>
    </div>

  )
};

export default ProductosView;