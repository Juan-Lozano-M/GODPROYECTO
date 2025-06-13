import React, { useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import godLogo from '../assets/png_God 1.png';


const menuItems = [
  { name: "Noticias", path: "/noticias" },
  { name: "Contacto", path: "/contacto" },
  { name: "Testimonios", path: "/testimonios" },
  { name: "Nosotros", path: "/nosotros" },
  { name: "Proyectos", path: "/proyectosview" }, // <-- Así debe coincidir con tu <Route>
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Cierra el menú al navegar (solo móvil)
  const handleNavClick = () => setMenuOpen(false);

  return (
    <nav className="flex justify-between items-center px-6 md:px-16 py-6 relative bg-white z-40">
      {/* Logo (escritorio) */}
      <div className="relative ml-4 group w-[40px] h-[40px] hidden md:block">
        <div className="absolute inset-0 bg-[#9CE840] rounded-full flex items-center justify-center transform transition-all duration-700 ease-in-out group-hover:-translate-x-6 group-hover:-rotate-[50deg] z-20">
          <img
            src={godLogo}
            alt="GOD Logo"
            className="w-6 h-6 transform transition-transform duration-700 ease-in-out group-hover:-rotate-[60deg]"
          />
        </div>
        <div className="absolute inset-0 bg-black rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 font-extrabold text-md whitespace-nowrap z-10 group-hover:z-30 transition-[z-index] duration-0">
          <span className="text-black opacity-0 cartoon-slide pointer-events-none group-hover:pointer-events-auto">
            game of dreams
          </span>
        </div>
      </div>

      {/* Menú de escritorio */}
      <ul className="hidden md:flex space-x-6 text-[#2E1E68] font-medium mr-10">
        {menuItems.map((item) => (
          <li key={item.name} className={`relative cursor-pointer group transition duration-300`}>
            <Link
              to={item.path}
              className={`hover-effect ${
                location.pathname === item.path ? "text-[#9CE840]" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Botón hamburguesa móvil a la derecha */}
      <div className="md:hidden z-[60]">
        <button
          onClick={toggleMenu}
          className="w-10 h-10 bg-[#9CE840] border-1 border-black flex flex-col items-center justify-center rounded transition-all duration-300"
        >
          <span
            className={`block w-6 h-[2px] bg-white mb-1 transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[5px]' : ''
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`block w-6 h-[2px] bg-white mt-1 transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[5px]' : ''
            }`}
          ></span>
        </button>
      </div>

      {/* Menú móvil desde la izquierda */}
      <div
        className={`fixed top-0 left-0 w-2/3 h-full bg-white shadow-lg border-r border-black transition-transform duration-500 z-50 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="flex flex-col items-start p-8 text-[#2E1E68] space-y-6 font-semibold text-lg">
          {menuItems.map((item) => (
            <li key={item.name} onClick={handleNavClick} className="cursor-pointer">
              <Link
                to={item.path}
                className={`${
                  location.pathname === item.path ? "text-[#9CE840]" : ""
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Fondo oscuro detrás del menú */}
      {menuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300"
        />
      )}

      {/* Animaciones y estilos */}
      <style>{`
        .cartoon-slide {
          opacity: 0;
          transform: translateX(-20px);
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .group:hover .cartoon-slide {
          animation: slideInBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.35s;
          pointer-events: auto;
        }

        .group:not(:hover) .cartoon-slide {
          animation: slideOutHide 0.2s ease forwards;
          pointer-events: none;
        }

        @keyframes slideInBounce {
          0% { opacity: 0; transform: translateX(-20px); }
          60% { opacity: 1; transform: translateX(45px); }
          80% { transform: translateX(35px); }
          100% { opacity: 1; transform: translateX(40px); }
        }

        @keyframes slideOutHide {
          0% { opacity: 1; transform: translateX(40px); }
          100% { opacity: 0; transform: translateX(-20px); }
        }

        .hover-effect {
          position: relative;
          display: inline-block;
          padding-bottom: 4px;
          transition: color 0.3s ease;
        }

        .hover-effect::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 0%;
          background-color: #9CE840;
          transition: width 0.3s ease;
        }

        .group:hover .hover-effect {
          color: #9CE840;
        }

        .group:hover .hover-effect::after {
          width: 100%;
        }
      `}</style>
    </nav>
  );
}

export default Navbar;