import NavBar from "../components/NavBar/NavBar";
import ProductosView from "../components/ProductosView/ProductosView";
import { useTheme } from "../contexts/ThemeContext";
import Footer from "../components/Footer/Footer";

const Productos = () => {
  const { theme, setTheme } = useTheme(); 

  return (
    <div className={`app ${theme}`}>
      <NavBar theme={theme} setTheme={setTheme} />
      <div className="relative">
        <img src='https://i.pinimg.com/originals/82/a2/61/82a26119fbdad694553647323ddefdca.jpg' className="w-full h-60 object-cover object-top" alt="Imagen de productos" />
        <h1 
        className={`text-6xl mt-10 
          font-bold text-center
          absolute top-1/2 left-1/2
          transform -translate-x-1/2
         -translate-y-1/2 
         pb-20
         ${theme == 'dark' ? 'text-custom-white' : 'text-custom-black'}`
          }>
          Productos!
          </h1>
      </div>


      {/* main body */}
      <div className={`Main-body p-4 w-full h-full ${theme == 'dark' ? 'bg-dark' : 'bg-white'}`}>
        <ProductosView />
        <Footer />
      </div>

    </div>

  );
}

export default Productos;
