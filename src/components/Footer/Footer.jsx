import React from 'react';
import { useTheme } from '../../contexts/ThemeContext.jsx';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`p-4 ${theme} custom_transition`}>
      <div className="container mx-auto">
        <p className={`text-center ${theme == 'dark' ? 'text-white' : ''}`}>&copy; 2024 Thinkpad Store. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
