import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavBar from "../NavBar/NavBar";
import { useTheme } from "../../contexts/ThemeContext";

const Checkout = ({ userId, nombre, apellido, email }) => {
    const { theme, setTheme } = useTheme();

    return (
        <>
            <NavBar />
            <div className="Main-body " style={{
                backgroundImage: `url('https://preview.redd.it/56t6afyea0941.png?auto=webp&s=2f9d8e77d24390baab1424fa6df8386eae4041bd')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
            }}>
                <div className={` h-screen m-0 p-0 flex flex-col items-center justify-center text-custom-white`}>
                    <div className={` h-screen m-0 p-0 flex flex-col items-center justify-center`}>
                        <h1 className="text-5xl text-center">¡Gracias por tu compra, {nombre} {apellido}!</h1>
                        <p className="text-3xl mt-5 text-center">Id de la compra: {userId}</p>
                        <p className="text-3xl mt-4 mb-5 text-center">Detalles del pedido en {email}</p>
                        <Link to="/">
                            <button className="text-white bg-red-700 py-3 px-6 rounded-lg">
                                Volver al inicio
                            </button>
                        </Link>
                    </div>
                </div>
                <Footer theme={theme} setTheme={setTheme} />
            </div>
        </>
    );
}

export default Checkout;
