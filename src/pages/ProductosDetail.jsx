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
                            <div className="Main-body text-white" style={{ backgroundImage: `url(${producto.img_presentacion})` }}>
                                <div className={`font-bold text-xl mb-2 `}>
                                <h1>Detalle del Producto</h1>
                                <p>ID: {producto.id}</p>
                                <p>Nombre: {producto.nombre}</p>
                                </div>
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4" 
                                onClick={() => onAdd(producto)}>Agregar al carrito</button>
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
