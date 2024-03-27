import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import { useTheme } from '../contexts/ThemeContext';
import { Link } from 'react-router-dom';

export const CartEmpty = () => {
  const { theme, setTheme } = useTheme();

  return ( 
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} /> 

      {/* main body */}
      <div className={` h-screen m-0 p-0 flex flex-col items-center justify-center ${theme === 'dark' ? 'text-dark' : 'text-white'}`}>
        <h1 className={`text-4xl md:text-6xl mt-8 font-bold mb-8 ${theme == 'dark' ? 'text-white' : 'text-dark'}`}>¡Carrito vacío!</h1>
        <img src='https://w7.pngwing.com/pngs/270/822/png-transparent-shopping-cart-purchase-market-trolley-shopping-cart-red.png' alt="Carrito vacío" className="w-64 md:w-96 mt-5" />
        <p className={`text-lg md:text-xl mt-8 ${theme == 'dark' ? 'text-white' : 'text-dark'}`}>Tu carrito de compras está vacío. ¡Ve a explorar nuestros productos y encuentra algo que te guste!</p>
        <Link to="/productos">
          <button className="bg-blue-500 mt-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Explorar productos
          </button>
        </Link>
      </div>
      <Footer theme={theme} setTheme={setTheme}/> 
    </div>
  );
};
