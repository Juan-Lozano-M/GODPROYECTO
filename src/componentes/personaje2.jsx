import React from 'react';
import personajeimg2 from '../assets/PERSONAJE NUEVO1.png';

const Personaje2 = () => {
  return (
    <div className="flex  items-center justify-start h-full overflow-visible">
      <img
        src={personajeimg2}
        alt="Personaje Principal"
        className="w-full h-auto object-contain md:mt-[7rem]  object-contain"
      />
    </div>
  );
};

export default Personaje2;
