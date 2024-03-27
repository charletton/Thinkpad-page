import NavBar from "../components/NavBar/NavBar";
import { useState } from "react";
import ProductosView from "../components/ProductosView/ProductosView";
import { useTheme } from "../contexts/ThemeContext";
import Footer from "../components/Footer/Footer";

const Productos = () => {
    const { theme, setTheme } = useTheme(); // Usar el contexto de tema en lugar de manejar el estado aquí

    return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme}/> 
      <img src='https://i.pinimg.com/originals/82/a2/61/82a26119fbdad694553647323ddefdca.jpg' className="w-full h-60 object-cover object-top  */" />
      <h1 className="text-4xl mt-10 font-bold text-center mt-8 mb-12 text-red-600">Productos!</h1>
      <hr />

      {/* main body */}
      <div className={`Main-body p-4 w-full h-full ${theme == 'dark' ? 'bg-dark' : 'bg-white'}`}>
        <ProductosView/>
        <Footer/>
      </div>

    </div>

     );
}

export default Productos;
