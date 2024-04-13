import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Contexts
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';

//pages
import Cart from './pages/Cart';
import Home from './pages/Home';
import Productos from './pages/Productos';
import ProductosDetail from './pages/ProductosDetail';
import NotFound from './pages/NotFound.jsx';
import Checkout from './pages/Checkout.jsx';

function App() {
  return (
    <CartProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/productos/:id" element={<ProductosDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<NotFound />} /> {/* Ruta para páginas no encontradas */}
          </Routes>
        </Router>
      </ThemeProvider>
    </CartProvider>
  );
}

export default App;
