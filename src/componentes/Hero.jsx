import React from 'react';
import Personaje2 from "./personaje2";
import TextoHero from "./textohero";
import Navbar from "./navbar";



function Hero() {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#A4FF00] overflow-hidden relative items-center justify-center">

      <Navbar />

      {/* Personaje a la izquierda */}
      <div className="w-auto flex items-end justify-start z-10 overflow-visible">
        <div className="translate-x-[-500px] translate-y-[50px]">
          <Personaje2 />
        </div>
      </div>

      {/* Texto centrado encima */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
        <TextoHero />
      </div>

    </div>
  );
}

export default Hero;
