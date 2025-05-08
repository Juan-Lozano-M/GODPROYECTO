import React from 'react';
import Personaje2 from "./personaje2";
import TextoHero from "./textohero";
import Navbar from "./navbar";

function Hero() {
  return (
    <div className="relative min-h-screen bg-[#A4FF00] overflow-hidden">
      <Navbar />

      {/* Contenido central */}
      <div className="flex items-center justify-center h-[calc(100vh-80px)] px-6 md:px-16 relative z-10">
        <TextoHero />
      </div>

      {/* Personaje al fondo abajo a la derecha */}
      <div className="absolute bottom-0 -right-10 z-0">
        <Personaje2 />
      </div>
    </div>
  );
}

export default Hero;
