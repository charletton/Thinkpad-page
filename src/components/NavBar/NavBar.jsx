import './NavBar.css';
import { useTheme } from '../../contexts/ThemeContext'; // Importa el hook useTheme
import { Link } from 'react-router-dom';
import ItemListContainer from '../ItemListContainer/ItemListContainer';
import CartWidget from '../CartWidget/CartWidget';
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';
import sun from '../../assets/sun.png';
import moon from '../../assets/moon.svg';
import cart from '../../assets/cart-light.png';

const NavBar = ({ itemsCount }) => {
  const { theme, setTheme } = useTheme(); // Obtén el tema y la función setTheme del contexto

  const toggleMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light'); 
  };

  return (
    <div className={`NavBar ${theme}`}>
      <Link to="/">
      <img alt="Logo"
           src={logo}
           className={theme === 'light' ? 'logo' : 'logo invertir-color'}/>
      </Link>

      <ItemListContainer/>

      <div className='icons-container'>
        <div className={theme === 'light' ? '' : 'invertir-color'}>
          <CartWidget/>
        </div>

        <Link to="/cart">
        <img alt="cart"
             src={cart}
             className={theme === 'light' ? '' : 'invertir-color'}
             width='20' />
        </Link>

        <img alt="Night/Light mode"
             onClick={() => {toggleMode()}}
             src={theme === 'light' ? moon : sun}
             className="mode-icon"/>
      </div>
    </div>
  );
};
NavBar.propTypes = {
  theme: PropTypes.string.isRequired,
  setTheme: PropTypes.func.isRequired,
};

export default NavBar;


