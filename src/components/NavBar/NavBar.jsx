//css
import './NavBar.css';

//hooks + contexts
import { useTheme } from '../../contexts/ThemeContext'; 
import { Link } from 'react-router-dom';

//components
import CartWidget from '../CartWidget/CartWidget';
import ItemListContainer from '../ItemListContainer/ItemListContainer';

//assets
import logo from '../../assets/logo.png';
import sun from '../../assets/sun.png';
import moon from '../../assets/moon.svg';
import cart from '../../assets/cart-light.png';

const NavBar = ({ }) => {
  const { theme, setTheme } = useTheme(); 
  

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

export default NavBar;


