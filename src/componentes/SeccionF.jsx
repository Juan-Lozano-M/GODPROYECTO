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
  className=" font-nunito font-bold h-auto min-h-[100vh] flex flex-col sm:flex-row sm:justify-center sm:items-end items-center justify-center px-4 py-8"
>
  {/* Imagen Gallina */}
  <div
    className="w-full sm:w-[45%] xl:w-[30%] flex justify-center items-end mb-6 sm:mb-0"
    style={{
      opacity,
      transform: `scale(${scaleGallo})`,
      transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
    }}
  >
    <img
      src={Gallo}
      alt="Gallina"
      className="w-[220px] sm:w-[300px] md:w-[380px] lg:w-[400px] xl:w-[500px] 2xl:w-[700px] h-auto"
    />
  </div>

  {/* Contenedor del texto, botón e iconos */}
  <div
    className="w-full sm:w-[45%] xl:w-[30%] flex flex-col items-center text-center gap-3"
    style={{
      opacity,
      transform: `scale(${scaleText})`,
      transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
    }}
  >
    <p className="text-3xl sm:text-4xl md:text-5xl">Únete a</p>
    <p className="bg-[#A4FF00] px-4 py-2 rounded-md text-3xl sm:text-4xl md:text-5xl">Game of Dreams</p>
    <p className="mt-4 text-base sm:text-lg md:text-xl">Miles de estudiantes ya están</p>
    <p className="text-base sm:text-lg md:text-xl">transformando su futuro.</p>

    {/* Botón */}
    <Link
      to="/contacto"
      className="mt-6 bg-[#A4FF00] text-black px-6 py-3 sm:px-10 sm:py-4 border-2 border-black rounded-md text-lg sm:text-xl font-bold
        shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
        hover:bg-[#A4FF00] hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
        active:translate-y-2 active:shadow-[0px_1px_0px_0px_black]"
      style={{ opacity, transform: `scale(${scaleBtn})`, transition: 'transform 0.4s ease-out, opacity 0.4s ease-out' }}
    >
      ¡CONTÁCTANOS!
    </Link>

    {/* Redes Sociales */}
    <p className="text-sm sm:text-base mt-4 text-black">Redes:</p>

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
        className="w-[50px] sm:w-[60px] md:w-[70px] h-auto cursor-pointer transition-transform duration-150 ease-in-out
          hover:scale-95 hover:translate-y-1 active:translate-y-2"
      />
      <img
        src={Insta}
        alt="Instagram"
        className="w-[50px] sm:w-[60px] md:w-[70px] h-auto cursor-pointer transition-transform duration-150 ease-in-out
          hover:scale-95 hover:translate-y-1 active:translate-y-2"
      />
    </div>
  </div>
</div>
  );
}

export default SeccionF;
