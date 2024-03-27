import React, { useEffect, useRef } from 'react';
import th1 from '../../assets/logos/thinkpad.png';
import ibm1 from '../../assets/logos/ibm.png';
import ibm2 from '../../assets/logos/ibm-blue.png';
import lenovo from '../../assets/logos/lenovo.png';
import { ThemeProvider, useTheme } from '../../contexts/ThemeContext';
import './Carousel.css';

const Carousel = () => {
  const { theme, setTheme } = useTheme(); // Obtén el tema y la función setTheme del contexto
  const logosRef = useRef(null);

  useEffect(() => {
    const logosSlide = logosRef.current;
    const logosCount = 4; // número de imágenes

    const slideAnimation = () => {
      if (logosSlide) {
        const logoWidth = logosSlide.offsetWidth / (logosCount * 2); 
        const totalWidth = logosCount * logoWidth * 2;

        logosSlide.style.transition = 'transform 60s linear'; 
        logosSlide.style.transform = `translateX(-${totalWidth}px)`; 

        setTimeout(() => {
          logosSlide.style.transition = 'none';
          logosSlide.style.transform = 'translateX(0)';
        }, 60000); 
      }
    };

    const intervalId = setInterval(slideAnimation, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`logos ${theme === 'dark' ? 'dark !important' : 'bg-white !important'}`}>
    <div className={`logos-slide d-flex`} ref={logosRef}>
        <img src={th1} alt="ThinkPad" />
        <img src={ibm1} alt="IBM" />
        <img src={lenovo} alt="Lenovo" />
        <img src={ibm2} alt="IBM Blue" />
        <img src={th1} alt="ThinkPad" />
        <img src={ibm1} alt="IBM" />
        <img src={lenovo} alt="Lenovo" />
        <img src={ibm2} alt="IBM Blue" />
        <img src={th1} alt="ThinkPad" />
        <img src={ibm1} alt="IBM" />
        <img src={lenovo} alt="Lenovo" />
        <img src={ibm2} alt="IBM Blue" />
        <img src={th1} alt="ThinkPad" />
        <img src={ibm1} alt="IBM" />
        <img src={lenovo} alt="Lenovo" />
        <img src={ibm2} alt="IBM Blue" />
      </div>
    </div>
  );
};

export default Carousel;
