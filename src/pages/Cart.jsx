//hooks
import { useEffect, useContext, useState } from "react";

//componentes
import { CartEmpty } from "../components/CartEmpty/CartEmpty";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";

//contextos
import { CartContext } from "../contexts/CartContext";
import { useTheme } from "../contexts/ThemeContext";

//toast
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";
import Checkout from "./Checkout";

const Cart = () => {
  const { addCart, cart, removeItem, clear } = useContext(CartContext);
  const [cartQuantity, setCartQuantity] = useState(0);
  const { theme, setTheme } = useTheme();

  const onAdd = (item) => {
    addCart(item, 1, theme);
  };

  useEffect(() => {
    setCartQuantity(cart.length);
  }, [cart]);

  if (cartQuantity === 0) {
    //render condicional
    return <CartEmpty />;
  }

  return (
    <>
      <NavBar theme={theme} setTheme={setTheme} />
      <div className="grid grid-cols-2 ">
        <div className={`relative ${theme === 'dark' ? 'bg-black' : 'bg-white'} overflow-y-auto max-h-screen md:max-h-70vh custom_transition`}>
          <h1 className={`text-6xl mt-10 font-bold text-center ${theme == 'dark' ? 'text-custom-white' : 'text-custom-black'}`}>Carrito</h1>
          <div className="p-4">
            {cart.map((item, index) => (
              <div key={index} className={`cart-item mb-8 p-8 rounded-lg ${theme === 'dark' ? 'bg-black' : 'bg-white shadow-lg'}`}>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-80 h-60 mr-6">
                    <img src={item.item.img} alt={item.item.nombre} className="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div className={`flex flex-col justify-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    <h2 className="text-5xl font-semibold mb-4">{item.item.nombre}</h2>
                    <p>Cantidad: {item.quantity}</p>
                    <p>Precio unidad: ${item.item.price}</p>
                    <p>Precio total: ${item.item.price * item.quantity}</p>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-4" onClick={() => onAdd(item.item)}>Agregar otro</button>
                    <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md mt-2" onClick={() => removeItem(item.item.id)}>Quitar del carrito</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-4 relative ${theme === 'dark' ? 'bg-black' : 'bg-white'} `}>

          <Link to={'/checkout'}>
            <button onClick={() => {
              console.log('nice!')
            }} className="w-full bg-green-500 hover:bg-green-700 
            text-white font-bold py-2 px-4 
            rounded-lg bottom-0">Confirmar compra!</button>
          </Link>

        </div>


      </div >
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
        theme={theme}
        transition:Bounce
      />
    </>
  );
};

export default Cart;
