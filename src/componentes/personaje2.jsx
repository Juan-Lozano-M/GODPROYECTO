import React from 'react';
import personajeimg2 from '../assets/PERSONAJE NUEVO1.png';

const Personaje2 = () => {
  return (
    <img
      src={personajeimg2}
      alt="Personaje Principal"
      className="w-[30vw] min-w-[150px] max-w-[700px] h-auto object-contain"
    />
  );
};

export default Personaje2;
