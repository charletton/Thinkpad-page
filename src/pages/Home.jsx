import /*React,*/ { useState } from 'react'
import NavBar from '../components/NavBar/NavBar.jsx'
import Counter from '../components/Counter/Counter.jsx'
import Footer from '../components/Footer/Footer.jsx'
import { useTheme } from '../contexts/ThemeContext.jsx'

const Home = () => {
    const { theme, setTheme } = useTheme(); // Usar el contexto de tema en lugar de manejar el estado aquí
    const [itemsCount, setItemsCount] = useState(0); // Inicializa el estado del contador en 0

    return ( 
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} itemsCount={itemsCount} /> 

      {/* main body */}
      <div className={`Main-body p-4 w-full h-full ${theme == 'dark' ? 'bg-dark' : 'bg-white'}`}>
        <Counter setItemsCount={setItemsCount} />
      </div>

      <Footer theme={theme} setTheme={setTheme}/> 
    </div>

      );
}
 
export default Home ;
''