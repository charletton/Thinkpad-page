import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import { useTheme } from "../contexts/ThemeContext";

const Checkout = ({ pedido }) => {
    const { theme, setTheme } = useTheme();

    if (pedido) {
        console.log(pedido)
    }

    return (
        <>
            <NavBar />
            <div className="Main-body " style={{
                backgroundImage: `url('https://preview.redd.it/56t6afyea0941.png?auto=webp&s=2f9d8e77d24390baab1424fa6df8386eae4041bd')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
            }}>
                {pedido ? (
                    <div className={` h-screen m-0 p-0 flex flex-col items-center justify-center`}>
                        <div className={` h-screen m-0 p-0 flex flex-col items-center justify-center`}>
                            <h1 className="text-6xl text-center">¡Gracias por tu compra!</h1>
                            <Link to="/">
                                <button className="text-white bg-red-700 py-3 px-6 rounded-lg">
                                    Volver al inicio
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className={` h-screen m-0 p-0 flex flex-col items-center justify-center`}>
                        <p>No hay pedido</p>
                        {/* Aquí podrías mostrar otro contenido */}
                        <Link to="/">
                            <button className="text-white bg-red-700 py-3 px-6 rounded-lg">
                                Volver al inicio
                            </button>
                        </Link>
                    </div>
                )}
                <Footer theme={theme} setTheme={setTheme} />
            </div>
        </>
    );
}

export default Checkout;
