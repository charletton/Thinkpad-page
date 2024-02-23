import './NavBar.css';
import CartWidget from '../CartWidget/CartWidget.jsx'
import logo_black from '../../assets/logo-black.png';
import logo_white from '../../assets/logo-white.png';
import PropTypes from 'prop-types';
import sun from '../../assets/sun.png'
import moon from '../../assets/moon.svg'
import cart_light from '../../assets/cart-light.png'
import cart_dark from '../../assets/cart-dark.png'

const NavBar = ({ theme, setTheme, itemsCount }) => {
  const toggleMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light'); 
  }

  return (
    <div className={`NavBar ${theme}`}>
      <img alt="Logo" src={theme === 'light' ? logo_white : logo_black} className="logo img-normalizada"/>
      <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Products</a>
        </li>
      </ul>

      <div className='icons-container'>

        <CartWidget itemsCount={itemsCount} /> {/* Pasa el estado del contador como prop al CartWidget */}

        <img alt="cart"
             src={theme === 'light' ? cart_light : cart_dark}
             width='20' />

        <img alt="Night/Light mode"
           onClick ={() => {toggleMode()}}
           src={theme === 'light' ? moon : sun}
           className="mode-icon"/>
      </div>

    </div>
  )
};

NavBar.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
  itemsCount: PropTypes.number.isRequired // Asegúrate de definir el tipo de la prop itemsCount
};

export default NavBar;

