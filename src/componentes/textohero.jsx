import React from 'react';

function TextoHero() {
  return (
    <div className="flex flex-col justify-start text-black space-y-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight">
        Tu futuro<br />
        <span className="text-purple-600 ml-20">Tu decisión</span>
      </h1>
      
      {/* Contenedor adicional para los párrafos */}
      <div className="flex flex-col ml-20 font-semibold text-lg">
        <p>
          Conoce más sobre 
          <button className="bg-purple-600 text-white mr-2 px-2 py-1 rounded-md text-sm ml-2 
                             hover:bg-purple-800 hover:scale-105 transition duration-300 ease-in-out">
            Nosotros
          </button>
          descubre tu vocación 
        </p>

        <p>
          Con nuestros 
          <button className="bg-purple-600 text-white mr-2 px-2 py-1 rounded-md text-sm ml-2
                             hover:bg-purple-800 hover:scale-105 transition duration-300 ease-in-out">
            Juegos
          </button>
          aprende de aquellos que ya lo 
        </p>

        <p>
          Han vivido en la seccion 
          <button className="bg-purple-600 text-white mr-2 px-2 py-1 rounded-md text-sm ml-2
                             hover:bg-purple-800 hover:scale-105 transition duration-300 ease-in-out">
            Testimonios
          </button>
          o habla con nuestro 
        </p>

        <p>chatbot a cerca de tus dudas</p>
      </div>
    </div>
  );
}

export default TextoHero;
