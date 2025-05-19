import React, { useState } from "react";
import { Phone } from "lucide-react";
import Pescado from "../assets/Pescado.png"; // Asegúrate de que la ruta sea correcta

function Contacto() {
  const [rol, setRol] = useState(null);

  const baseButtonClasses = `
    relative
    font-bold
    border-2
    rounded-md text-lg
    shadow-[0_4px_0_0_#000]
    transition-all duration-150 ease-in-out
    w-full h-16
     text-black border-black
    2xl:text-3xl xl:text-xl lg:text-base
  `;

  const hoverAndClickEffects = `
    hover:scale-95
    hover:translate-y-1
    hover:shadow-[0px_2px_0px_0px_black]
    active:translate-y-2
    active:shadow-[0px_1px_0px_0px_black]
  `;

  return (
    <div className="flex flex-col  items-center p-6 h-[40rem] justify-center font-nunito">
      {/* Título */}
      <div className="text-center -mt-5 w-[30rem] p-6 mb-6">
      <img src={Pescado} alt="Pescado" className="mx-auto w-12 h-auto mb-4" />
        <h3 className="text-xl font-bold uppercase">
          Llena el formulario interactivo con tu información
        </h3>
      </div>

      {/* Barra de progreso */}
      <div className="flex space-x-4 items-center mb-4">
        <div className="w-12 h-1 bg-[#A4FF00] rounded-full" />
        <div className="w-12 h-1 bg-gray-300 rounded-full" />
        <div className="w-12 h-1 bg-gray-200 rounded-full" />
      </div>

      {/* Instrucción */}
      <p className="text-xs mb-4 text-gray-600 tracking-widest">
        POR FAVOR SELECCIONA UNA DE LAS OPCIONES
      </p>

      {/* Botones */}
      <div className="w-[50rem] max-w-[90%] flex flex-col space-y-4 items-center mb-6">
        {["Estudiante", "Maestro", "Padre"].map((option) => {
          const isSelected = rol === option;
          return (
            <button
              key={option}
              onClick={() => setRol(option)}
              className={`${baseButtonClasses} ${!isSelected ? hoverAndClickEffects : ""}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {/* Opción de llamada */}
      <div className="flex items-center space-x-2 text-lg font-semibold uppercase text-black cursor-pointer hover:text-[#A4FF00] hover:underline">
        <span>Solo quiero llamar</span>
        <Phone size={20} />
      </div>
    </div>
  );
}

export default Contacto;
