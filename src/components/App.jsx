import /*React,*/ { useState } from 'react'
import NavBar from './NavBar/NavBar.jsx'
import Counter from './Counter/Counter.jsx'
import ItemList from './ItemList/ItemList.jsx'

function App() {
  const [theme, setTheme] = useState('light');
  const [itemsCount, setItemsCount] = useState(0); // Inicializa el estado del contador en 0

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} itemsCount={itemsCount} /> {/* Pasa el estado del contador como prop al NavBar */}
      <ItemList/>
      <Counter setItemsCount={setItemsCount} /> {/* Pasa la función para actualizar el contador como prop al Counter */}
    </div>
  )
}

export default App
