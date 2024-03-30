import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { useTheme } from '../../contexts/ThemeContext';
import red_cart from '../../assets/red-cart.png';
import { Link } from 'react-router-dom';

export const CartEmpty = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} />

      {/* main body */}
      <div className="Main-body " style={{
        backgroundImage: `url('https://i.redd.it/hzc6azykd9971.jpg')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        height: '100vh',
      }}>
        <div className={` h-screen m-0 p-0 flex flex-col items-center justify-center`}>
          <h1 className={`text-4xl md:text-6xl mt-8 font-bold mb-8 ${theme === 'dark' ? 'text-custom-white' : 'text-custom-black'}`}>
            ¡Carrito vacío!
          </h1>
          <img src={red_cart} alt="Carrito vacío" className="w-64 md:w-96 mt-0" />
          <Link to="/productos">
            <button className={`bg-red-500 mt-5 hover:${theme === 'dark' ? 'bg-blue-700' : 'bg-blue-500'} text-white font-bold py-2 px-4 rounded`}>
              Explorar productos
            </button>
          </Link>
        </div>
        <Footer theme={theme} setTheme={setTheme} />
      </div>
    </div>

  );
};
