import React from 'react';

function TextoHero() {
  return (
    <div className="flex flex-col text-black  text-center md:text-left font-nunito md:mt-[7rem] translate-x-4 md:translate-x-[5rem]">

      <h1 className="text-4xl md:text-9xl font-bold leading-tight">
        Tu futuro
        <span className="block text-[#732bf9] md:text-8xl font-bold ">Tu decisión</span>
      </h1>

      <div className="flex flex-col pl-6 text-lg  font-normal items-center md:items-start">
        <p>
        Descubre tu vocación jugando, conoce nuestras
        </p>
        <p>historias y experiencias. Y aclara todas tus dudas</p>
        <p>
        Conversando con nuestro chatbot.
        </p>
        

        <button className="mt-6 px-6 py-3 bg-[#732bf9] text-black font-bold rounded-lg border-2 border-black shadow-[0_4px_0_0_black] hover:brightness-110 active:translate-y-1 transition">
          ¡Juega ahora!
        </button>
      </div>
    </div>
  );
}

export default TextoHero;
