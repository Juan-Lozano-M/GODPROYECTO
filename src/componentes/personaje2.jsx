import React from 'react';
import personajeimg2 from '../assets/PERSONAJE NUEVO1 (2).png';

const Personaje2 = () => {
  return (
    <img
      src={personajeimg2}
      alt="Personaje Principal"
      className="w-[60vw] sm:w-[30vw] xl:w-[550px] min-w-[150px] max-w-[800px] h-auto object-contain"
    />
  );
};

export default Personaje2;
