import React, { useState, useEffect, useRef } from 'react';
import Gallo from '../assets/gallina.png';
import Face from '../assets/Facebook.png';
import Insta from '../assets/Instagram.png';
import { Link } from 'react-router-dom';

function SeccionF() {
  const [opacity, setOpacity] = useState(0);
  const [scaleGallo, setScaleGallo] = useState(0.5);
  const [scaleText, setScaleText] = useState(0.5);
  const [scaleBtn, setScaleBtn] = useState(0.5);
  const [scaleIcons, setScaleIcons] = useState(0.5);

  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleAmount = Math.min(1, (windowHeight - rect.top) / rect.height);

        setOpacity(visibleAmount);
        setScaleGallo(Math.min(1, visibleAmount + 0.5));
        setScaleText(Math.min(1, visibleAmount + 0.5));
        setScaleBtn(Math.min(1, visibleAmount + 0.5));
        setScaleIcons(Math.min(1, visibleAmount + 0.5));
      } else {
        setOpacity(0);
        setScaleGallo(0.5);
        setScaleText(0.5);
        setScaleBtn(0.5);
        setScaleIcons(0.5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // para el caso donde ya está en viewport al cargar
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      id="seccionF"
      className="bg-[#E8FFBE] xl:mt-10 xl:mb-10 sm-height:mt-[9rem] font-nunito font-bold h-[80vh] overflow-hidden flex justify-center items-end"
    >
      {/* Imagen Gallina */}
      <div
        className="h-[90%] w-[30%] flex items-end justify-center"
        style={{
          opacity,
          transform: `scale(${scaleGallo})`,
          transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
        }}
      >
        <img src={Gallo} alt="Gallina" className="w-[380px] lg:w-[300px] xl:w-[500px] 2xl:w-[700px] h-auto" />
      </div>

      {/* Contenedor del texto, botón e iconos */}
      <div
        className="h-[90%] w-[30%] justify-center items-center flex flex-col 2xl:gap-3 lg:gap-1 gap-3"
        style={{
          opacity,
          transform: `scale(${scaleText})`,
          transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
        }}
      >
        <p className="text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl">Unete A</p>
        <p className="bg-[#A4FF00] p-4 lg:text-3xl xl:text-4xl 2xl:text-5xl rounded-md text-5xl">game of dreams</p>
        <p className="mt-4 text-lg 2xl:text-2xl xl:text-xl lg:text-base">Miles de estudiantes ya están</p>
        <p className="text-lg 2xl:text-2xl xl:text-xl lg:text-base">transformando su futuro.</p>

        {/* Botón */}
        <Link
            to="/contacto"
            className="xl:mt-8 relative xl:text-xl 2xl:text-3xl mt-8 bg-[#A4FF00] text-black 2xl:px-10 2xl:py-4 lg:px-6 lg:py-2 lg:text-base font-bold py-3 px-10 border-2 border-black rounded-md text-lg
                      shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                      hover:bg-[#A4FF00] hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
                      active:translate-y-2 active:shadow-[0px_1px_0px_0px_black]"
            style={{ opacity }}
          >
            ¡CONTACTANOS!
        </Link>

        {/* Redes Sociales */}
        <p className="text-base mt-4 text-black">Redes:</p>

        <div
          className="flex gap-4 items-center justify-center"
          style={{
            opacity,
            transform: `scale(${scaleIcons})`,
            transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
          }}
        >
          <img
            src={Face}
            alt="Facebook"
            className="w-[70px] lg:w-[55px] 2xl:w-[70px] h-auto cursor-pointer inline-block transition-transform duration-150 ease-in-out
                       hover:scale-95 hover:translate-y-1 active:translate-y-2"
          />
          <img
            src={Insta}
            alt="Instagram"
            className="w-[70px] lg:w-[55px] 2xl:w-[70px] h-auto cursor-pointer inline-block transition-transform duration-150 ease-in-out
                       hover:scale-95 hover:translate-y-1 active:translate-y-2"
          />
        </div>
      </div>
    </div>
  );
}

export default SeccionF;
