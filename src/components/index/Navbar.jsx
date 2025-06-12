import React from 'react';
import godLogo from '../../assets/logos/logoGOD.png';

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 md:px-16 py-6 relative z-10">
      {/* Logo animado */}
      <div className="relative ml-20 group w-[40px] h-[40px]">
        {/* Círculo verde con logo (gira hacia la derecha) */}
        <div className="absolute inset-0 bg-[#9CE840] rounded-full flex items-center justify-center transform transition-all duration-700 ease-in-out group-hover:-translate-x-6 group-hover:-rotate-[50deg] z-20">
          <img
            src={godLogo}
            alt="GOD Logo"
            className="w-6 h-6 transform transition-transform duration-700 ease-in-out group-hover:-rotate-[60deg]"
          />
        </div>

        {/* Círculo negro detrás */}
        <div className="absolute inset-0 bg-black rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Contenedor del texto con z-index controlado */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 font-extrabold text-md whitespace-nowrap z-10 group-hover:z-30 transition-[z-index] duration-0">
          <span className="text-black opacity-0 cartoon-slide pointer-events-none group-hover:pointer-events-auto">
            game of dreams
          </span>
        </div>
      </div>

      {/* Menú */}
      <ul className="flex space-x-6 text-[#2E1E68] mr-[6rem] font-medium">
        <li className="hover:underline cursor-pointer">Noticias</li>
        <li className="hover:underline cursor-pointer">Contacto</li>
        <li className="hover:underline cursor-pointer">Testimonios</li>
        <li className="hover:underline cursor-pointer">FAQ</li>
        <li className="hover:underline cursor-pointer">Proyectos</li>
      </ul>

      {/* Animación cartoon (CSS) */}
      <style>{`
        .cartoon-slide {
          opacity: 0;
          transform: translateX(-20px);
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        /* Animación de entrada con rebote */
        .group:hover .cartoon-slide {
          animation: slideInBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.35s;
          pointer-events: auto;
        }

        /* Animación de salida con desplazamiento y desvanecimiento (más rápida) */
        .group:not(:hover) .cartoon-slide {
          animation: slideOutHide 0.2s ease forwards;
          pointer-events: none;
        }

        @keyframes slideInBounce {
          0% {
            opacity: 0;
            transform: translateX(-20px);
          }
          60% {
            opacity: 1;
            transform: translateX(45px);
          }
          80% {
            transform: translateX(35px);
          }
          100% {
            opacity: 1;
            transform: translateX(40px);
          }
        }

        @keyframes slideOutHide {
          0% {
            opacity: 1;
            transform: translateX(40px);
          }
          100% {
            opacity: 0;
            transform: translateX(-20px);
          }
        }
      `}</style>
    </nav>
  );
}

export default Navbar;
