import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext.jsx'; 
import "./ItemListContainer.css";

const ItemListContainer = () => {
  const { theme } = useTheme();

  return (
    <div className={`text-center ${theme == 'dark' ? 'text-white' : ''}`}>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/productos">Productos</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default ItemListContainer;
