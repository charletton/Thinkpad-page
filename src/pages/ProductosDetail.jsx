import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productos from '../components/Utils/Productos.json';
import NavBar from "../components/NavBar/NavBar";
import { useTheme } from '../contexts/ThemeContext.jsx';
import Footer from '../components/Footer/Footer';
import { CartContext } from "../contexts/CartContext.jsx";

const ProductosDetail = () => {
    const { theme, setTheme } = useTheme();
    const { addCart } = useContext(CartContext)
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

    const onAdd = (item) => {
        addCart(item, 1);
        console.log('Producto agregado al carrito');
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                if (!productos) {
                    throw new Error("Lista de productos no disponible.");
                }

                const foundProducto = productos.productos.find(item => item.id === parseInt(id));
                if (foundProducto) {
                    setProducto(foundProducto);
                } else {
                    throw new Error("Producto no encontrado.");
                }
            } catch (error) {
                console.error("Error fetching details:", error);
            } finally {
                setLoading(false);
            }
        };

        getProduct();
    }, [id]);

    console.log(producto);
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

                                <div className={`flex items-center mb-8 p-8 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
                                    <div className="flex-shrink-0 w-80 h-60 mr-6">
                                        <img src={producto.img} alt={producto.nombre} className="w-full h-full object-cover rounded-lg" />
                                    </div>
                                    <div className={`flex flex-col justify-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                        <h2 className="text-5xl font-semibold mb-4 ">{producto.nombre}</h2>
                                        <p className="text-lg mb-6">{producto.descripcion}</p>
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md"
                                            onClick={() => onAdd(producto)}>Agregar al carrito</button>
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
        </div>
    );

}

export default ProductosDetail;
