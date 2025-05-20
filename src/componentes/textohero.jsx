import React from 'react';

function TextoHero() {
  return (
    <div className="flex flex-col items-center justify-center text-center max-w-3xl mx-auto min-h-screen px-6 py-[2rem] pt-[10vh] sm:pt-[8vh] sm-height:pt-[14vh]">
      <h1 className="text-[13vw] sm:text-[8vw] md:text-[8vw] lg:text-[6rem] xl:text-[6.5rem] font-extrabold text-black leading-tight font-nunito sm-height:text-[5rem]">
        Tu Futuro 
        <span className="block text-[#732bf9]">Tu Decisión</span>
      </h1>

      <p className="hidden sm:block text-[4vw] sm:text-xl md:text-xl xl:text-lg mt-2 md:mt-2 text-black font-medium sm-height:text-sm sm-height:mt-2">
        Descubre tu camino con apoyo vocacional para tomar decisiones <br />
        claras y seguras hacia tu futuro profesional.
      </p>

      <button className="mt-6 xl:mt-6 relative bg-[#732bf9] text-white font-bold py-3 px-10 border-2 border-black rounded-md text-lg
                          shadow-[0_4px_0_0_#000] transition-all duration-150 ease-in-out
                          hover:bg-[#732bf9] hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
                          active:translate-y-2 active:shadow-[0px_1px_0px_0px_black] sm-height:py-2 sm-height:px-6">
        ¡DESCUBRE!
      </button>

      <p className=" hidden sm:block text-[3vw] mt-3 sm:mt-0 sm:text-sm mt-2 xl:mt-4 text-black sm-height:text-xs">¡Sin compromiso, cancela cuando quieras!</p>
    </div>
  );
}

export default TextoHero;
