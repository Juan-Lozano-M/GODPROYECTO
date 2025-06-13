import React from 'react';
import ArrowIcon from '../assets/ArrowIcon.png';

function Contacto() {
  return (
    <div className="flex flex-col items-center font-nunito p-3 h-[50vh] justify-end">
      <h1 className="text-[6rem] text-black font-bold flex items-center gap-4">
        Contacto
        <div className="bg-white border border-black w-14 h-14 rounded-md flex items-center justify-center z-10 relative">
          <img src={ArrowIcon} alt="Flecha" className="w-5 h-5" />
        </div>
      </h1>
    </div>
  );
}

export default Contacto;
