import React from 'react';
import Personaje from "./personaje";
import circulo_fondo from '../assets/circulo_perosnaje.svg';
import GigantesButtons from "./GigantesButtons";
import { motion } from "framer-motion";




function Hero() {
  return (
    <div className="flex flex-col md:flex-row min-h-screen p-4 bg-[#fffff]">
      {/* Contenedor de la izquierda */}
      <div className="flex-1  p-6 m-1 rounded-md flex flex-col  items-center justify-center">
        

        {/* contenedor para personaje y circulo  */}

        <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center">

        {/* Texto que esta arriba del socio */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="absolute top-2 left-2 bg-transparent text-[#A4B883] font-bold text-sm sm:text-base md:text-lg flex items-center gap-1 rotate-1"
        >
          
          <p className="rotate-[-15deg]">*¡QUE COMIENCE <br /> EL JUEGO!*</p> 

          
          
        </motion.div>

        


          {/* Personaje */}
          <Personaje />
        </div>
      </div>
     

      {/* Contenedor derechita */}
      <div className="flex-1 px-2 m-1 rounded-md flex flex-col items-start justify-center">

        <GigantesButtons />

        

      </div>
    </div>
  );
}

export default Hero;
