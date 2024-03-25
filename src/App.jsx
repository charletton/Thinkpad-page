import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext'; // Asegúrate de importar el ThemeProvider

import Home from './pages/Home';
import Productos from './pages/Productos';
import ProductosDetail from './pages/ProductosDetail';

function App() {
  return (
    <ThemeProvider> 
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/productos/' element={<Productos />} />
          <Route path='/productos/:id/' element={<ProductosDetail/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
