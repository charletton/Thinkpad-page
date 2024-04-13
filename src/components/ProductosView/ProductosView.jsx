//hooks
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';

//contextos
import { useTheme } from '../../contexts/ThemeContext';
import { CartContext } from '../../contexts/CartContext';
import { ToastContainer } from 'react-toastify';

//firebase
import { getDocs, collection, getFirestore } from 'firebase/firestore';

//componentes
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Loading from '../Loading/Loading';


const ProductosView = () => {
  const { theme, setTheme } = useTheme();
  const { addCart } = useContext(CartContext);
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [loading, setLoading] = useState(true);


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
    addCart(item, 1, theme);
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
    <Loading />
  )

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} />
      <div className="relative">
        <img src='https://i.pinimg.com/originals/82/a2/61/82a26119fbdad694553647323ddefdca.jpg' className="w-full h-60 object-cover object-top" alt="Imagen de productos" />
        <div className={`text-6xl mt-10 
            font-bold text-center
            absolute top-1/2 left-1/2
            transform -translate-x-1/2
            -translate-y-1/2 
            pb-20
            custom_transition
            ${theme == 'dark' ? 'text-custom-white' : 'text-custom-black'}`
        }>
          {/* Filters */}
          <div className="flex justify-center mb-4">
            <div className="flex ml-auto mr-auto">
              <button onClick={() => setFiltro("new")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                Modelos nuevos
              </button>
              <button onClick={() => setFiltro("old")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 mr-2">
                Modelos antiguos
              </button>
              <button onClick={limpiarFiltro} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 mr-5">
                Limpiar
              </button>
              <input
                type="text"
                placeholder="Buscar producto"
                value={filtro}
                onChange={handleFiltroChange}
                className="py-2 px-3 mb-4 md:mb-0 md:mr-4 leading-tight focus:outline-none focus:shadow-outline rounded-md border border-gray-300"
              />
            </div>
          </div>

        </div>
      </div>

      <div className={`Main-body custom_transition p-4 w-full h-full ${theme == 'dark' ? 'bg-dark' : 'bg-white'}`}>
        <>
          <div className="flex mb-4">
          </div>


          {/* Render */}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 
          lg:grid-cols-4 lg:ml-32 lg:mr-32 gap-4 justify-center">
            {productosFiltrados.map(producto => (
              <div className="max-w-md mx-auto" key={producto.id}>
                <div className={`max-w-md mx-auto ${theme === 'dark' ? 'bg-white' : 'bg-black'} rounded-lg overflow-hidden shadow-lg`}>
                  <Link to={`/productos/${producto.id}`} className="block">
                    <img className="w-full object-cover h-auto" src={producto.img} alt={producto.nombre} style={{ height: '350px' }} />
                  </Link>
                  <div className="px-6 py-4">
                    <div className={`font-bold text-xl mb-2 ${theme === 'dark' ? 'text-dark' : 'text-white'}`}>{producto.nombre}</div>
                  </div>
                  <div className="px-6 pt-0 pb-2">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4" onClick={() => onAdd(producto)}>Agregar al carrito</button>
                  </div>
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
            theme={theme}
            transition:Bounce
          />
        </>
        <Footer />
      </div>
    </div>

  )
};

export default ProductosView;