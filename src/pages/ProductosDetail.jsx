//hooks
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

//componentes
import NavBar from '../components/NavBar/NavBar.jsx';
import Footer from '../components/Footer/Footer.jsx';
import Loading from "../components/Loading/Loading.jsx";

//firestore
import { collection, getDocs, getFirestore } from 'firebase/firestore';

//contextos
import { CartContext } from '../contexts/CartContext.jsx';
import { useTheme } from '../contexts/ThemeContext.jsx'; // Asegúrate de que useTheme esté importado correctamente

//toas
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const ProductosDetail = () => {
    const { theme, setTheme } = useTheme();
    const { id } = useParams();
    const { addCart } = useContext(CartContext);
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cantidad, setCantidad] = useState(1);


    const onAdd = (item) => {
        addCart(item, cantidad, theme);
    };

    const incrementarCantidad = () => {
        setCantidad(cantidad + 1);
    };

    const decrementarCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const productosCollection = collection(db, 'productos');
            const productosSnapshot = await getDocs(productosCollection);
            const productosData = productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const foundProducto = productosData.find(producto => String(producto.id) === id);

            if (foundProducto) {
                setProducto(foundProducto);
            } else {
                console.error('Producto no encontrado');
            }
            setLoading(false);
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <div className={`app ${theme}`}>
            {/* navbar */}
            <NavBar theme={theme} setTheme={setTheme} />
            {/* main body */}
            <div className={`Main-body ${theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        {producto ? (
                            <div className="Main-body text-white" style={{
                                backgroundImage: `url(${producto.img_presentacion})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                                height: '100vh',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>

                                <div className={`flex items-center mb-8 p-8 rounded-lg shadow-lg  ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
                                    <div className="flex-shrink-0 w-80 h-60 mr-6">
                                        <img src={producto.img} alt={producto.nombre} className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className={`flex flex-col justify-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        <h2 className="text-5xl font-semibold mb-4 ">{producto.nombre}</h2>
                                        <p className="text-lg mb-6">{producto.descripcion}</p>

                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mr-2" onClick={() => onAdd(producto)}>Agregar al carrito</button>
                                        <div className={`input-group mt-5 mb-3 ${theme === 'dark' ? 'input-group-dark' : 'input-group-light'}`}>
                                            <button onClick={incrementarCantidad}>+</button>
                                            <input type="number" value={cantidad} readOnly id="input" />
                                            <button onClick={decrementarCantidad}>-</button>
                                        </div>

                                    </div>
                                </div>

                            </div>
                        ) : (
                            <p>Producto no encontrado</p>
                        )}
                    </>
                )}
            </div>
            <Footer />
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
        </div>
    );
};

export default ProductosDetail;
