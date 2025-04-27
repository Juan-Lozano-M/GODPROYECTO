import React from 'react';

const GameButton = ({ 
  text = "Enviar", 
  buttonClassName = "bg-white", 
  icon = null 
}) => {
  return (
    <div className="flex">
      <button
        className={`flex items-center justify-center gap-2 font-montserrat text-xl font-bold border-2 border-black rounded-md px-2 py-1 shadow-[5px_5px_0px_black] cursor-pointer transition-all duration-300 ease-in-out hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${buttonClassName}`}
      >
        {text}
        {icon && (
          <span className="w-6 h-6">
            {icon}
          </span>
        )}
      </button>
    </div>
  );
};

export default GameButton;
