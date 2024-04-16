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

//firestore + utils
import { getDocs, query, orderBy, limit } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import Checkout from "../components/Checkout/Checkout";

const Cart = ({ collectionRef }) => {
  //botones del carrito, cantidad en el carrito, theme y estado de input
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addCart, cart, removeItem, clear } = useContext(CartContext);
  const [cartQuantity, setCartQuantity] = useState(0);
  const { theme, setTheme } = useTheme();

  //usestates para pasar como props en checkout!
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [userId, setUserId] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    try {
      setIsSubmitting(true);

      // Obtener los valores del formulario
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const email = document.getElementById('email').value;

      // Obtener la ID de usuario
      let newUserId = 1;
      const q = query(collectionRef, orderBy('userId', 'desc'), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        newUserId = querySnapshot.docs[0].data().userId + 1;
        console.log(newUserId)
      }

      // Cargar usuario a Firestore
      await addDoc(collectionRef, {
        userId: newUserId,
        nombre,
        apellido,
        email,
        cart
      });

      // Actualizar estado y limpiar formulario
      setPedidoConfirmado(true);
      setNombre(nombre);
      setApellido(apellido);
      setEmail(email);
      setUserId(newUserId)
      clear();

    } catch (error) {
      console.error('Error al enviar datos a Firestore:', error);
    } finally {
      setIsSubmitting(false);
    }
  };



  const onAdd = (item) => {
    addCart(item, 1, theme);
  };

  useEffect(() => {
    setCartQuantity(cart.length);
  }, [cart]);

  if (!pedidoConfirmado && cartQuantity > 0) {
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

          <div className={`p-4 relative ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <form>
              <div className="margin-custom">
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input type="text" id="nombre" name="nombre" className="mt-1 p-2 w-full border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="apellido" className="block text-sm font-medium text-gray-700">Apellido</label>
                <input type="text" id="apellido" name="apellido" className="mt-1 p-2 w-full border-gray-300 rounded-md" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
                <input type="email" id="email" name="email" className="mt-1 p-2 w-full border-gray-300 rounded-md" />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                {isSubmitting ? 'Enviando...' : 'Confirmar pedido'}
              </button>

            </form>
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
  }

  if (cartQuantity === 0 && pedidoConfirmado === false) {
    //render condicional
    return <CartEmpty />;
  }


  return (<Checkout userId={userId} nombre={nombre} apellido={apellido} email={email} />)

};

export default Cart;
