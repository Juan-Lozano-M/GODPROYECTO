import React from 'react';

function TextoHero() {
  return (
    <div className="flex flex-col items-center xl:mt-[10rem] md:mt-20 justify-center text-center max-w-3xl mx-auto min-h-screen px-4 h-full">
      <h1 className="text-5xl md:text-9xl lg:text-[6rem] xl:text-[7rem] font-extrabold text-black leading-tight font-nunito">
        Tu Futuro 
        <span className='block text-[#732bf9]'>Tu Decisión</span>
      </h1>

      <p className="text-lg md:text-xl xl:text-lg xl:mt-6 md:mt-4 text-black font-medium">
        Descubre tu camino con apoyo vocacional para tomar decisiones <br />
        claras y seguras hacia tu futuro profesional.
      </p>

      <button className="xl:mt-8 relative mt-8 bg-[#732bf9] text-white font-bold py-3 px-10 border-2 border-black rounded-md text-lg
                          shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                          hover:bg-[#732bf9] hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
                          active:translate-y-2 active:shadow-[0px_1px_0px_0px_black]">
        ¡DESCUBRE!
      </button>

      <p className="text-sm mt-4 xl:mt-8 text-black">¡Sin compromiso, cancela cuando quieras!</p>
    </div>
  );
}

export default TextoHero;
