import /*React,*/ { useState } from 'react'
import NavBar from './NavBar/NavBar.jsx'
import Counter from './Counter/Counter.jsx'
import ComponenteUseEffect from './ComponenteUseEffect/ComponenteUseEffect.jsx'
import ItemsList from './ItemsList/ItemsList.jsx'    

function App() {
  const [theme, setTheme] = useState('light');
  const [itemsCount, setItemsCount] = useState(0); // Inicializa el estado del contador en 0

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} itemsCount={itemsCount} /> 
      <ComponenteUseEffect/>
      <Counter setItemsCount={setItemsCount} />
      <ItemsList/>
    </div>
  )
}

export default App
 
