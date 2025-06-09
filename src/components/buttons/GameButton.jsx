import React from 'react';

const GameButton = ({ 
  text = "Enviar", 
  buttonClassName = "bg-white", 
  icon = null,
<<<<<<< HEAD
  onClick // Ensure this prop is accepted
=======
  onClick 
>>>>>>> 4763ae3939448551830b859e67e1709d6836fb55
}) => {
  return (
    <div className="flex">
      <button
<<<<<<< HEAD
        onClick={onClick} // Ensure the onClick prop is used here
=======
      onClick={onClick}
>>>>>>> 4763ae3939448551830b859e67e1709d6836fb55
        className={`flex items-center justify-center gap-2 font-montserrat text-[14px] sm:text-xl font-bold border-2 border-black rounded-md px-2 py-1 shadow-[5px_5px_0px_black] cursor-pointer transition-all duration-300 ease-in-out hover:shadow-none hover:translate-x-1 hover:translate-y-1 ${buttonClassName}`}
      >
        {text}
        {icon && (
          <span className="w-4 h-4 sm:w-6 sm:h-6">
            {icon}
          </span>
        )}
      </button>
    </div>
  );
};

export default GameButton;
