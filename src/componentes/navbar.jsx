import React from 'react';

const Navbar = () => {
  return (
    <div className="w-full flex justify-center pt-8 fixed top-0 left-0 z-50">
      <nav className="flex items-center justify-between w-[50%] max-w-6xl border-2 border-black rounded-md px-8 py-3 bg-white shadow-md overflow-visible">
        
        {/* Logo */}
        <div className="flex flex-col text-black items-start">
          <span className="font-black text-xs">GOD</span>
        </div>

        {/* Links */}
        <div className="flex space-x-6 text-xs font-semibold text-black">
          <a href="#" className="text-inherit hover:underline">Sobre nosotros</a>
          <a href="#" className="text-inherit hover:underline">Testimonios</a>
          <a href="#" className="text-inherit hover:underline">Juegos</a>
        </div>

        {/* Botón Launch */}
        <button
          className="border-2 border-black bg-[#A4FF00] text-black font-bold text-sm px-6 py-2 rounded-md
                     shadow-[0px_6px_0px_0px_black] transition-all duration-150 ease-in-out
                     hover:bg-gray-100 hover:scale-95 hover:translate-y-1 hover:shadow-[0px_2px_0px_0px_black]
                     active:translate-y-2 active:shadow-[0px_1px_0px_0px_black] "
        >
          Launch
        </button>
        
      </nav>
    </div>
  );
};

export default Navbar;
