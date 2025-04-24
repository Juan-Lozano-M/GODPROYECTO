import React from 'react';

const DeleteButton = ({ className }) => {
  return (
    <div className="relative">
      <button className={`group w-[50px] h-[50px] rounded-full bg-neutral-900 border-none font-semibold flex items-center justify-center shadow-[0px_0px_20px_rgba(0,0,0,0.164)] cursor-pointer transition-all duration-300 overflow-hidden relative hover:w-[140px] hover:rounded-[50px] hover:bg-red-500 ${className}`}>
        <svg viewBox="0 0 448 512" className="w-3 transition-all duration-300 group-hover:w-[50px] transform group-hover:translate-y-[60%]">
          <path
            fill="white"
            d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"
          />
        </svg>
        <span className="absolute top-[-20px] text-white text-[2px] transition-all duration-300 group-hover:text-[13px] group-hover:translate-y-[30px] group-hover:opacity-100 opacity-0">
          Delete
        </span>
      </button>
    </div>
  );
};

export default DeleteButton;
