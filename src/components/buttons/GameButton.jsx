import React from 'react';

const GameButton = ({ 
  text = "Enviar", 
  buttonClassName = "", 
  svgClassName = "" 
}) => {
  return (
    <div className="flex">
      <button
        className={`flex items-center gap-2 font-montserrat text-sm font-bold border-2 border-black rounded-md px-2 py-1 bg-white shadow-[5px_5px_0px_black] cursor-pointer transition-all duration-300 ease-in-out hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${buttonClassName}`}
      >
        {text}
        <svg
          className={`w-6 h-6 transition-all duration-300 ease-in-out ${svgClassName}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default GameButton;
