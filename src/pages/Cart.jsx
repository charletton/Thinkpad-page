import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../contexts/ThemeContext";
import { CartContext } from "../contexts/CartContext";
import { useContext, useState } from "react";

const Cart = () => {
  const { cart, clear } = useContext(CartContext); 
  const [cartQuantity, setCartQuantity] = useState(0); // Usa un estado local para la cantidad del carrito
  console.log(cart)
  
  const { theme ,setTheme } = useTheme();

return (
  <div className={`app ${theme}`}>
    <NavBar theme={theme} setTheme={setTheme} /> 
    <h1 className="text-4xl mt-10 font-bold text-center mt-8 mb-12 text-red-600">Carrito</h1>
    <button onClick={clear} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Limpiar Carrito</button>
    <hr />
    {/* main body */}
    <div className={`Main-body p-4 w-full h-full ${theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
      {cart.map((item, index) => {
        console.log('El item es:');
        console.log(item);
        return (
          <div key={index} className={`cart-item ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
            <h2>{item.item.nombre}</h2> {/* Accede al nombre del artículo correctamente */}
            <p>Cantidad: {item.quantity}</p> 
            <p>Precio unidad: ${item.item.price }</p> {/* Accede al precio del artículo correctamente */}
            <p>Precio total: ${item.item.price * item.quantity}</p> {/* Accede al precio del artículo correctamente */}
            <br />
          </div>
        );
      })}
    </div>
    <Footer/>
  </div>
)};


 
export default Cart;