import './NavBar.css';
import CartWidget from '../CartWidget/CartWidget.jsx'
import logo from '../../assets/logo.png';
import PropTypes from 'prop-types';
import sun from '../../assets/sun.png'
import moon from '../../assets/moon.svg'
import cart from '../../assets/cart-light.png'

const NavBar = ({ theme, setTheme, itemsCount }) => {
  const toggleMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light'); 
  }

  return (
    <div className={`NavBar ${theme}`}>
      <img alt="Logo"
           src={logo}
           className={theme === 'light' ? 'logo ' : 'logo invertir-color'}/>
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

        <div className={theme === 'light' ? '' : 'invertir-color'} >
          <CartWidget
            itemsCount={itemsCount}/>
        </div>

        <img alt="cart"
             src={cart}
             className={theme === 'light' ? '' : 'invertir-color'}
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

