import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productos from '../components/Utils/Productos.json';
import NavBar from "../components/NavBar/NavBar";
import { useTheme } from '../contexts/ThemeContext.jsx';
import Footer from '../components/Footer/Footer'; // Modifica la importación aquí

const ProductosDetail = () => {
    const [itemsCount, setItemsCount] = useState(0); // Inicializa el estado del contador en 0
    const { theme, setTheme } = useTheme();
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);

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
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className={`app ${theme}`}>
                    <NavBar theme={theme} setTheme={setTheme} itemsCount={itemsCount} /> 

                    {producto ? (
                        <div className={`font-bold text-xl mb-2 ${theme == 'dark' ? 'text-white' : ''}`}>
                            <h1>Detalle del Producto</h1>
                            <p>ID: {producto.id}</p>
                            <p>Nombre: {producto.nombre}</p>
                        </div>
                    ) : (
                        <p>Producto no encontrado</p>
                    )}

                    <Footer /> 
                </div>
            )}
        </>
     );
}
 
export default ProductosDetail;
