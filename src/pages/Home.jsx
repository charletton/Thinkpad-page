import /*React,*/ { useState } from 'react'
import NavBar from '../components/NavBar/NavBar.jsx'
import Footer from '../components/Footer/Footer.jsx'
import { useTheme } from '../contexts/ThemeContext.jsx'
import Carousel from '../components/Carousel/Carousel.jsx'

const Home = () => {
  const { theme, setTheme } = useTheme(); // Usar el contexto de tema en lugar de manejar el estado aquí

  return ( 
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} /> 

      {/* main body */}
      <div className={`w-full h-full m-0 p-0 ${theme == 'dark' ? 'bg-dark' : 'bg-white'}`} style={{ position: 'relative' }}>
        <img src='https://i.pinimg.com/originals/82/a2/61/82a26119fbdad694553647323ddefdca.jpg' id='index-img' className="w-full" />
        <div className="absolute inset-0 flex items-center justify-center" style={{ top: '50%', transform: 'translateY(-50%)' }}>
          <div className="text-center">
            <h1 className={`text-8xl md:text-8xl md:text-6xl font-bold text-white my-8 ${theme == 'dark' ? 'text-custom-white' : 'text-custom-black'}`} id='index-h1'>
              La mejor distribuidora de las <br/> míticas ThinkPad
            </h1>
          </div>
        </div>
      </div>
      <Carousel theme={theme}/>  

      <Footer theme={theme} setTheme={setTheme}/> 
    </div>


  );
}

export default Home ;
