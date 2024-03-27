import /*React,*/ { useState } from 'react'
import NavBar from '../components/NavBar/NavBar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import { useTheme } from '../contexts/ThemeContext.jsx'

const Home = () => {
    const { theme, setTheme } = useTheme(); // Usar el contexto de tema en lugar de manejar el estado aquí

    return ( 
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} /> 

      {/* main body */}
      <div className={`Main-body p-4 w-full h-full ${theme == 'dark' ? 'bg-dark' : 'bg-white'}`}>
        <h1>main body</h1>
      </div>

      <Footer theme={theme} setTheme={setTheme}/> 
    </div>

      );
}
 
export default Home ;
''