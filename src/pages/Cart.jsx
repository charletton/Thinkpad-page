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
import { ToastContainer, toast } from 'react-toastify';

const Cart = () => {
  const { addCart, cart, clear, removeItem } = useContext(CartContext);
  const [cartQuantity, setCartQuantity] = useState(0);
  const { theme, setTheme } = useTheme();

  const toastTheme = theme === 'dark' ? 'dark' : 'light';
  const notify = (text) => toast(text, {
    position: "bottom-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: toastTheme,
  })

  const onAdd = (item) => {
    addCart(item, 1);
    notify('Agregado al carrito! 🛒');
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
      <div className="relative">
        <img src='https://i.pinimg.com/originals/82/a2/61/82a26119fbdad694553647323ddefdca.jpg' className="w-full h-60 object-cover object-top" alt="Imagen de productos" />
        <h1 className={`text-6xl mt-10 font-bold text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 pb-20 -translate-y-1/2 ${theme == 'dark' ? 'text-custom-white' : 'text-custom-black'}`}>Carrito</h1>
      </div>
      <div className={` p-4 w-full h-full ${theme === 'dark' ? 'bg-black ' : 'bg-white'} flex flex-col items-center justify-center`}>
        <button onClick={clear} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Limpiar Carrito</button>
        {cart.map((item, index) => (
          <div key={index} className={`cart-item mb-8 p-8 rounded-lg  ${theme === 'dark' ? 'bg-black' : 'bg-white shadow-lg'}`}>
            <div className="flex items-center">
              <div className="flex-shrink-0 w-80 h-60 mr-6">
                <img src={item.item.img} alt={item.item.nombre} className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className={`flex flex-col justify-center ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                <h2 className="text-5xl font-semibold mb-4">{item.item.nombre}</h2>
                <p>Cantidad: {item.quantity}</p>
                <p>Precio unidad: ${item.item.price}</p>
                <p>Precio total: ${item.item.price * item.quantity}</p>

                {/* Agregar unidad del carrito */}
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md mt-4"
                  onClick={() => onAdd(item.item)}>Agregar otro</button>

                {/* Eliminar unidad del carrito */}
                <button className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md mt-2"
                  onClick={() => {
                    removeItem(item.item.id);
                    toast('Eliminado al carrito! 🛒')
                  }}>Quitar del carrito</button>

              </div>
            </div>
          </div>
        ))}
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
        theme={toastTheme}
        transition:Bounce
      />
    </>
  );
};

export default Cart;
