import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { useTheme } from '../../contexts/ThemeContext';
import LoadingIcon from '../../assets/LoadingIcon.png';
import Spinner from '../Utils/Spinner';

const Loading = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className={`app ${theme}`}>
            <NavBar theme={theme} setTheme={setTheme} />

            {/* main body */}
            <div className="Main-body " style={{}}>
                <div className={` h-screen m-0 p-0 flex flex-col items-center justify-center`}>
                    <img src={LoadingIcon} alt="Thinkpad" className="w-64 md:w-96 mt-0" />
                    <Spinner/>
                </div>
                <Footer theme={theme} setTheme={setTheme} />
            </div>
        </div>
    );
};

export default Loading; 

