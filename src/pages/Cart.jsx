import { useEffect, useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { CartEmpty } from "../pages/CartEmpty";
import NavBar from "../components/NavBar/NavBar";
import Footer from "../components/Footer/Footer";
import { useTheme } from "../contexts/ThemeContext";

const Cart = () => {
  const { cart, clear } = useContext(CartContext);
  const [cartQuantity, setCartQuantity] = useState(0);
  const { theme, setTheme } = useTheme();

  // Actualiza cartQuantity cuando cambia el carrito
  useEffect(() => {
    setCartQuantity(cart.length);
  }, [cart]);

  if (cartQuantity === 0) {
    return <CartEmpty />;
  }

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} />
      <h1 className="text-4xl mt-10 font-bold text-center mt-8 mb-12 text-red-600">Carrito</h1>
      <button onClick={clear} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4">Limpiar Carrito</button>
      <hr />
      <div className={`Main-body p-4 w-full h-full ${theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
        {cart.map((item, index) => (
          <div key={index} className={`cart-item ${theme === 'dark' ? 'text-white' : 'text-dark'}`}>
            <h2>{item.item.nombre}</h2>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio unidad: ${item.item.price}</p>
            <p>Precio total: ${item.item.price * item.quantity}</p>
            <br />
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
