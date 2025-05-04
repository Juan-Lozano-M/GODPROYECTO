import React from 'react';
import Personaje2 from "./personaje2";
import TextoHero from "./textohero";
import Navbar from "./navbar";
import Divider from "../assets/steps-divider-round.svg";

function Hero() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#A4FF00]  items-center justify-center relative overflow-hidden">
  <Navbar />

 

  <div className="flex flex-row md:flex-row items-center justify-center w-full px-4 relative">
    
    {/* Texto a la izquierda en móvil */}
    <div className="w-1/2 flex justify-center md:justify-end z-30 order-1 md:order-1">
      <TextoHero />
    </div>

    {/* Personaje a la derecha en móvil y con tamaño editable */}
    <div className="w-1/2 flex justify-center md:justify-start z-10 order-2 md:order-2">
      <div className="w-[800px] sm:w-[500px] md:w-[580px]">
        <Personaje2 />
      </div>
    </div>
  </div>
</div>
  );
}

export default Hero;
