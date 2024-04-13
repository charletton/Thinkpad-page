import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import NavBar from "../components/NavBar/NavBar";
import { useTheme } from "../contexts/ThemeContext";

const notFound = () => {
    const { theme, setTheme } = useTheme();
    return (

        <>
            <NavBar />
            <div className="Main-body " style={{
                backgroundImage: `url('https://cdn.vox-cdn.com/thumbor/MyC9mMEZBadNBpsVT6Y7NWEwnZ0=/0x0:2040x1360/1400x1050/filters:focal(1052x427:1053x428)/cdn.vox-cdn.com/uploads/chorus_asset/file/20036070/akrales_200611_4051_0011.0.jpg')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
            }}>
                <div className={` h-screen m-0 p-0 flex flex-col items-center justify-center`}>
                    <Link to="/">
                        <button className="text-white bg-red-700 py-3 px-6 rounded-lg">
                            Volver al inicio
                        </button>
                    </Link>
                </div>
                <Footer theme={theme} setTheme={setTheme} />
            </div>
        </>
    );
}

export default notFound;