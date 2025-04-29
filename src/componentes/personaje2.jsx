import React from 'react';
import personajeimg2 from '../assets/PERSONAJE NUEVO.png';

const Personaje2 = () => {
  return (
    <div className="flex  items-center justify-start h-full overflow-visible">
      <img
        src={personajeimg2}
        alt="Personaje Principal"
        className="h-[900px] w-auto object-contain"
      />
    </div>
  );
};

export default Personaje2;
