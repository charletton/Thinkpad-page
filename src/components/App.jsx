import /*React,*/ { useState } from 'react'
import NavBar from './NavBar/NavBar.jsx'
import Counter from './Counter/Counter.jsx'
import ComponenteUseEffect from './ComponenteUseEffect/ComponenteUseEffect.jsx'
import Items from './Items/Items.jsx'    

function App() {
  const [theme, setTheme] = useState('light');
  const [itemsCount, setItemsCount] = useState(0); // Inicializa el estado del contador en 0

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} itemsCount={itemsCount} /> 
      <ComponenteUseEffect/>
      <Counter setItemsCount={setItemsCount} />
      <Items/>
    </div>
  )
}

export default App
 
