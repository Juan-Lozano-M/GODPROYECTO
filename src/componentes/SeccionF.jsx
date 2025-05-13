import React, { useState, useEffect } from 'react';
import Gallo from '../assets/gallina.png';
import Face from '../assets/Facebook.png';
import Insta from '../assets/Instagram.png';

function SeccionF() {
  const [scrollY, setScrollY] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [scaleGallo, setScaleGallo] = useState(0.5);
  const [scaleText, setScaleText] = useState(0.5);
  const [scaleBtn, setScaleBtn] = useState(0.5);
  const [scaleIcons, setScaleIcons] = useState(0.5);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const sectionTop = document.getElementById('seccionF').offsetTop;
      const sectionHeight = document.getElementById('seccionF').offsetHeight;
      const windowHeight = window.innerHeight;

      // Verificar si la sección está visible en la ventana
      if (scrollPos + windowHeight > sectionTop && scrollPos < sectionTop + sectionHeight) {
        const scaleFactor = Math.min(1, (scrollPos + windowHeight - sectionTop) / sectionHeight);

        setOpacity(scaleFactor);
        setScaleGallo(Math.min(1, scaleFactor + 0.5));
        setScaleText(Math.min(1, scaleFactor + 0.5));
        setScaleBtn(Math.min(1, scaleFactor + 0.5));
        setScaleIcons(Math.min(1, scaleFactor + 0.5));
      } else {
        setOpacity(0);
        setScaleGallo(0.5);
        setScaleText(0.5);
        setScaleBtn(0.5);
        setScaleIcons(0.5);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="seccionF"
      className="bg-[#E8FFBE]    font-nunito font-bold h-[80vh] overflow-hidden flex justify-center items-end"
    >
      {/* Imagen Gallina */}
      <div
        className="h-[90%] w-[30%] flex items-end justify-center"
        style={{
          opacity: opacity,
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
          opacity: opacity,
          transform: `scale(${scaleText})`,
          transition: 'transform 0.4s ease-out, opacity 0.4s ease-out',
        }}
      >
        <p className="text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl">Unete A</p>
        <p className="bg-[#A4FF00] p-4 lg:text-3xl xl:text-4xl 2xl:text-5xl rounded-md text-5xl">game of dreams</p>
        <p className="mt-4 text-lg 2xl:text-2xl xl:text-xl lg:text-base">Miles de estudiantes ya están</p>
        <p className="text-lg  2xl:text-2xl xl:text-xl lg:text-base">transformando su futuro.</p>

        {/* Botón */}
        <button
          className="xl:mt-8 relative xl:text-xl 2xl:text-3xl mt-8 bg-[#A4FF00] text-black 2xl:px-10 2xl:py-4 lg:px-6 lg:py-2 lg:text-base font-bold py-3 px-10 border-2 border-black rounded-md text-lg
                     shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                     hover:bg-[#A4FF00] hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
                     active:translate-y-2 active:shadow-[0px_1px_0px_0px_black]"
          style={{
            opacity: opacity, // Mantener el estilo de opacity aquí
          }}
        >
          ¡CONTACTANOS!
        </button>

        {/* Redes Sociales */}
        <p className="text-base mt-4 text-black">Redes:</p>

        <div
          className="flex gap-4 items-center justify-center"
          style={{
            opacity: opacity,
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
