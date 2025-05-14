import React, { useState } from 'react';
import ArrowIcon from '../assets/ArrowIcon.png';
import Fisgona from '../assets/Fisgona.png';
import LikeIcon from '../assets/Like.png';  // Importa la imagen
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

  const siguiente = () => {
    setIndex((prev) => (prev + 1) % testimonios.length);
  };

  return (
    <div className='bg-[#E8FFBE] xl:mt-10 xl:mb-10 h-screen xl:h-[100vh] 2xl:h-[75vh] lg:h-[75vh] flex flex-col items-center justify-center p-5 relative overflow-hidden'>

      {/* Imagen Fisgona en la esquina superior derecha */}
      <img
        src={Fisgona}
        alt="Fisgona"
        className="absolute top-8 right-0 w-24 md:w-28 lg:w-32 xl:w-[600px]"
      />

      {/* Título */}
      <div className='w-full max-w-5xl xl:ml-10 lg:mt-20 lg:text-6xl font-bold text-6xl md:text-4xl pl-4 md:pl-5'>
        <h2 className='text-center'>
          <span className='text-[#732BF9]'>Voces</span> de quienes ya comenzaron
        </h2>
        <div className="flex items-center gap-4 relative mt-2 justify-start">
          <h2 className='no-underline z-10 xl:ml-12 text-left'>
            su <span className='text-[#732BF9]'>camino.</span>
          </h2>
          <div className="relative w-12 h-12">
            <div className="bg-[#A4FF00] border border-black w-full h-full rounded-md flex items-center justify-center z-10 relative">
              <img src={ArrowIcon} alt="Flecha" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Carrusel de testimonios */}
      <div className="mt-20 w-full max-w-4xl h-[500px] text-center px-6 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ x: 80, opacity: 0, scale: 0.9 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -80, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, bounce: 0.4, type: "spring" }}
            className="text-black text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-relaxed max-w-4xl mx-auto"
          >
            <p className="mb-6"> {testimonios[index].texto} </p>
            <div className="flex justify-center items-center gap-3 flex-wrap">
              {/* Cuadro izquierdo */}
              <div className="border-2 border-[#A4FF00] bg-[#A4FF00] w-[50px] h-[50px]"></div>

              <button
                onClick={siguiente}
                className="bg-[#A4FF00] hover:scale-105 px-4 py-2 text-base border border-black transition-transform"
              >
                Añadir Testimonio
              </button>

              {/* Cuadro derecho */}
              <div className="border-2 border-[#A4FF00] bg-[#A4FF00] w-[50px] h-[50px]"></div>

              <span className="bg-[#732BF9] text-white px-3 py-2 rounded text-sm">
                {index + 1} / {testimonios.length}
              </span>
            </div>
            <p className="mt-6 font-bold text-lg md:text-xl lg:text-2xl">{testimonios[index].autor}</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicadores de posición */}
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
