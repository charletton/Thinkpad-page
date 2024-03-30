//hooks
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//contextos
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext'; // Importa el CartProvider

//pages
import Cart from './pages/Cart';
import Home from './pages/Home';
import Productos from './pages/Productos';
import ProductosDetail from './pages/ProductosDetail';

function App() {
  return (
    <CartProvider> 
      <ThemeProvider> 
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/cart/' element={<Cart />} />
            <Route path='/productos/' element={<Productos />} />
            <Route path='/productos/:id/' element={<ProductosDetail/>} />
          </Routes>
        </Router>
      </ThemeProvider>
    </CartProvider> 
  );
}

export default App;
