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
    <div className='bg-[#E8FFBE] xl:mt-2 xl:mb-2 h-screen xl:h-[90vh] 2xl:h-[75vh] lg:h-[75vh] flex flex-col items-center justify-center p-5 relative overflow-hidden'>

      {/* Imagen Fisgona */}
      <img
        src={Fisgona}
        alt="Personaje fisgón observando"
        className="absolute top-[9rem] right-0 w-24 md:w-28 lg:w-32 xl:w-[600px]"
      />

      {/* Título */}
      <div className='w-full max-w-5xl xl:ml-10 lg:mt-20 text-center'>
        <h2 className='font-bold text-[2.4rem] md:text-[2.8rem] sm-height:text-[2.2rem] lg:text-[3.2rem] '>
          <span className='text-[#732BF9]'>Voces</span> de quienes ya comenzaron
        </h2>
        <div className="flex items-center text-[2.4rem] md:text-[2.8rem] lg:text-[3.2rem] gap-4 relative mt-2 justify-center">
          <h2 className='no-underline z-10 text-left'>
            su <span className='text-[#732BF9]'>camino.</span>
          </h2>

          {/* Flecha decorativa */}
          <div className="relative w-12 h-12">
            <div className="bg-[#A4FF00] border border-black w-full h-full rounded-md flex items-center justify-center z-10 relative">
              <img src={ArrowIcon} alt="Flecha decorativa" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Carrusel con botones fijos */}
      <div className="mt-12 w-full max-w-5xl flex items-center justify-center relative">

        {/* Botón izquierdo (estático) */}
        <button
          onClick={handlePrev}
          className="absolute left-0 top-1/2 transform -translate-y-1/2
                   bg-[#A4FF00] border border-black w-[50px] h-[50px] rounded-md 
                   shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                   hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
                   active:translate-y-2 active:shadow-[0px_1px_0px_0px_black]"
        >
          <span className="text-black text-xl font-bold">‹</span>
        </button>

        {/* Testimonio centrado en contenedor fijo */}
        <div className="w-full max-w-4xl h-[300px] px-10 flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ x: 80, opacity: 0, scale: 0.9 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -80, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, bounce: 0.4, type: "spring" }}
              className="absolute text-center max-w-3xl"
            >
              <p className="text-black text-[1.4rem] md:text-[1.8rem] lg:text-[2rem] font-semibold leading-relaxed mb-6">
                {testimonios[index].texto}
              </p>

              <div className="flex justify-center items-center gap-3 flex-wrap">
                <button
                  onClick={añadirTestimonio}
                  className="bg-[#A4FF00] border border-black px-4 py-2 text-base rounded-md 
                             shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                             hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
                             active:translate-y-2 active:shadow-[0px_1px_0px_0px_black] sm-height:py-2 sm-height:px-6"
                >
                  Añadir Testimonio
                </button>

                <button
                  className="bg-[#732BF9] border border-black rounded-md p-2 
                             shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                             hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
                             active:translate-y-2 active:shadow-[0px_1px_0px_0px_black]"
                >
                  {Like ? (
                    <img src={Like} alt="Botón de Like" className="w-5 h-5" />
                  ) : (
                    <span role="img" aria-label="like">👍</span>
                  )}
                </button>
              </div>

              <p className="mt-6 font-bold text-lg md:text-xl lg:text-2xl">{testimonios[index].autor}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botón derecho (estático) */}
        <button
          onClick={handleNext}
          className="absolute right-0 top-1/2 transform -translate-y-1/2
                   bg-[#A4FF00] border border-black w-[50px] h-[50px] rounded-md 
                   shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                   hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
                   active:translate-y-2 active:shadow-[0px_1px_0px_0px_black]"
        >
          <span className="text-black text-xl font-bold">›</span>
        </button>
      </div>

      {/* Indicadores */}
      <div className="mt-6 flex gap-2">
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
