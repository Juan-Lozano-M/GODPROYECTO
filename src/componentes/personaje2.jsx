import React from 'react';
import personajeimg2 from '../assets/PERSONAJE NUEVO1.png';

const Personaje2 = () => {
  return (
    <img
      src={personajeimg2}
      alt="Personaje Principal"
      className="w-[300px] md:w-[550px] lg:w-[200px] 2xl:w-[700px] xl:w-[550px] h-auto object-contain"
    />
  );
};

export default Personaje2;
