
const GameButton = ({ 
  text = "Enviar", 
  buttonClassName = "bg-white", 
  icon = null,
  onClick // Ensure this prop is accepted
}) => {
  return (
    <div className="flex">
      <button
        onClick={onClick} // Ensure the onClick prop is used here
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
