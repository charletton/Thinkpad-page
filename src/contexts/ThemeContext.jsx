import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const storedTheme = localStorage.getItem('theme');
  const initialTheme = storedTheme ? JSON.parse(storedTheme) : 'light';
  const [theme, setTheme] = useState(initialTheme); 

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(theme)); // Corregido: usa la variable theme en lugar de la cadena 'theme'
  }, [theme]); // Asegúrate de agregar theme como dependencia para que el efecto se ejecute cuando cambie

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
