import React, { useState } from 'react';
import ArrowIcon from '../assets/ArrowIcon.png';
import Fisgona from '../assets/Fisgona.png';
import Like from '../assets/Like.png';
import { motion, AnimatePresence } from 'framer-motion';

const testimonios = [
  {
    texto: "“Ser doctor es difícil, agotador y muchas veces mal remunerado. Si no sientes la pasión necesaria, te recomendaría ni siquiera intentarlo.”",
    autor: "Michel Jaramillo",
  },
  {
    texto: "“Descubrí que mi vocación no estaba en la medicina, sino en la enseñanza. Ahora soy feliz enseñando ciencia.”",
    autor: "Laura Gómez",
  },
  {
    texto: "“No temas equivocarte. Cada error me llevó a descubrir lo que realmente quería hacer con mi vida.”",
    autor: "Carlos Rivera",
  },
];

function Tes() {
  const [index, setIndex] = useState(0);

  const añadirTestimonio = () => {
    // Funcionalidad futura
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + testimonios.length) % testimonios.length);
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % testimonios.length);
  };

  return (
    <div className=' h-auto min-h-screen flex flex-col items-center justify-center p-4 sm:p-8 relative overflow-hidden'>

      {/* Imagen Fisgona */}
      <img
        src={Fisgona}
        alt="Personaje fisgón observando"
        className="absolute right-0 top-[17%] w-[18rem] sm:w-28 md:w-32 lg:w-44 xl:w-[600px] max-w-full select-none pointer-events-none 
                  sm:right-4 sm:top-20 xs:right-2 xs:top-16"
        style={{ maxHeight: '80vh' }}
      />


      {/* Título */}
      <div className='w-full max-w-5xl xl:ml-10 lg:mt-20 text-center px-2 sm:px-0'>
        <h2 className='font-bold text-[1.8rem] sm:text-[2.4rem] md:text-[2.8rem] lg:text-[3.2rem] leading-tight'>
          <span className='text-[#732BF9]'>Voces</span> de quienes ya comenzaron
        </h2>
        <div className="flex items-center text-[1.8rem] sm:text-[2.4rem] md:text-[2.8rem] lg:text-[3.2rem] gap-3  justify-center flex-wrap">
          <h2 className='no-underline ml-5 sm:ml-0 z-10 text-left'>
            su <span className='text-[#732BF9]'>camino.</span>
          </h2>

          {/* Flecha decorativa */}
          <div className="relative w-8 h-8 sm:w-12 sm:h-12">
            <div className="bg-[#A4FF00] border border-black w-full h-full rounded-md flex items-center justify-center z-10 relative">
              <img src={ArrowIcon} alt="Flecha decorativa" className="w-3 h-3 sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Carrusel */}
      <div className="mt-10 w-full max-w-5xl flex items-center justify-center relative px-4 sm:px-0">

        {/* Botón izquierdo (solo en pantallas sm y superiores) */}
        <button
          onClick={handlePrev}
          className="hidden items-center justify-center sm:flex absolute left-0 top-1/2 transform -translate-y-1/2
                   bg-[#A4FF00] border border-black w-8 h-8 sm:w-[50px] sm:h-[50px] rounded-md 
                   shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                   hover:scale-95 hover:translate-y-0.2 hover:shadow-[0px_2px_0px_0px_black]
                   active:translate-y-0.3 active:shadow-[0px_1px_0px_0px_black]
                   z-20"
          aria-label="Anterior"
        >
          <span className="text-black text-xl font-bold select-none">‹</span>
        </button>

        {/* Testimonio */}
        <div className="w-full max-w-4xl min-h-[250px] sm:min-h-[300px] px-6 sm:px-10 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: 80, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -80, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, bounce: 0.4, type: "spring" }}
              className="absolute text-center max-w-full sm:max-w-3xl px-2 sm:px-0"
              style={{ wordBreak: 'break-word' }}
            >
              <p className="text-black text-[1.2rem] sm:text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-semibold leading-relaxed mb-6">
                {testimonios[index].texto}
              </p>

              {/* Botones + navegación en móviles */}
              <div className="flex justify-center items-center gap-3 flex-wrap sm:gap-5">

                {/* Botón izquierdo en móviles */}
                <button
                  onClick={handlePrev}
                  className="flex sm:hidden bg-[#A4FF00] items-center justify-center border border-black w-8 h-8 rounded-md 
                             shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                             hover:scale-95 hover:translate-y-0.5 hover:shadow-[0px_2px_0px_0px_black]
                             active:translate-y-1 active:shadow-[0px_1px_0px_0px_black]"
                  aria-label="Anterior"
                >
                  <span className="text-black text-xl font-bold select-none">‹</span>
                </button>

                <button
                  onClick={añadirTestimonio}
                  className="bg-[#A4FF00] border border-black px-4 py-2 text-sm sm:text-base rounded-md 
                             shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                             hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
                             active:translate-y-2 active:shadow-[0px_1px_0px_0px_black]"
                >
                  Añadir Testimonio
                </button>

                <button
                  className="bg-[#732BF9] border border-black rounded-md p-2 
                             shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                             hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
                             active:translate-y-2 active:shadow-[0px_1px_0px_0px_black]"
                  aria-label="Me gusta"
                >
                  <img src={Like} alt="Botón de Like" className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Botón derecho en móviles */}
                <button
                  onClick={handleNext}
                  className="flex sm:hidden bg-[#A4FF00] items-center justify-center border border-black w-8 h-8 rounded-md 
                             shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                             hover:scale-95 hover:translate-y-0.5 hover:shadow-[0px_2px_0px_0px_black]
                             active:translate-y-1 active:shadow-[0px_1px_0px_0px_black]"
                  aria-label="Siguiente"
                >
                  <span className="text-black text-xl font-bold select-none">›</span>
                </button>

              </div>

              <p className="mt-6 font-bold text-base sm:text-lg md:text-xl lg:text-2xl">
                {testimonios[index].autor}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botón derecho (solo en sm y superiores) */}
        <button
          onClick={handleNext}
          className="hidden sm:flex absolute items-center justify-center right-0 top-1/2 transform -translate-y-1/2
                   bg-[#A4FF00] border border-black w-8 h-8 sm:w-[50px] sm:h-[50px] rounded-md 
                   shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                   hover:scale-95 hover:translate-y-0.2 hover:shadow-[0px_2px_0px_0px_black]
                   active:translate-y-0.3 active:shadow-[0px_1px_0px_0px_black]
                   z-20"
          aria-label="Siguiente"
        >
          <span className="text-black text-xl font-bold select-none">›</span>
        </button>
      </div>

      {/* Indicadores */}
      <div className="mt-6 flex gap-2 justify-center">
        {testimonios.map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i === index ? 'bg-[#A4FF00]' : 'bg-[#732BF9]'
            } transition-all`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Tes;
