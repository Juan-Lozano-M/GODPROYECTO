import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import godLogo from '../assets/png_God 1.png';

const menuItems = [
  { name: "Noticias", path: "/noticias" },
  { name: "Contacto", path: "/contacto" },
  { name: "Testimonios", path: "/testimonios", isScroll: true, scrollId: "testimonios" },
  { name: "Nosotros", path: "/nosotros", isScroll: true, scrollId: "nosotros" },
  { name: "Proyectos", path: "/proyectosview" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Prevenir scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleNavClick = (item) => {
    setMenuOpen(false);
    
    if (item.isScroll) {
      if (location.pathname === '/' || location.pathname === '') {
        scrollToSection(item.scrollId);
      } else {
        navigate('/');
        setTimeout(() => {
          scrollToSection(item.scrollId);
        }, 100);
      }
    }
  };

  return (
    <>
      <nav className="flex justify-between items-center px-6 md:px-16 py-6 relative bg-white z-40">
        {/* Logo (escritorio) */}
        <Link
          to="/"
          className="relative ml-4 group w-[40px] h-[40px] hidden md:block cursor-pointer"
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
        >
          <div className={`absolute inset-0 bg-[#9CE840] rounded-full flex items-center justify-center transform transition-all duration-700 ease-in-out z-20 ${
            logoHovered ? '-translate-x-6 -rotate-[50deg]' : ''
          }`}>
            <img
              src={godLogo}
              alt="GOD Logo"
              className={`w-6 h-6 transform transition-transform duration-700 ease-in-out ${
                logoHovered ? '-rotate-[60deg]' : ''
              }`}
            />
          </div>
          <div className={`absolute inset-0 bg-black rounded-full z-10 transition-opacity duration-700 ${
            logoHovered ? 'opacity-100' : 'opacity-0'
          }`} />
          <div className="absolute inset-y-0 left-0 flex items-center pl-2 font-extrabold text-md whitespace-nowrap z-10 transition-[z-index] duration-0" style={{zIndex: logoHovered ? 30 : 10}}>
            <span className={`text-black pointer-events-none cartoon-slide ${
              logoHovered ? 'show-text' : ''
            }`}>
              game of dreams
            </span>
          </div>
        </Link>

        {/* Logo móvil */}
        <Link to="/" className="flex items-center md:hidden cursor-pointer">
          <div className="w-10 h-10 bg-[#9CE840] rounded-full flex items-center justify-center">
            <img
              src={godLogo}
              alt="GOD Logo"
              className="w-5 h-5"
            />
          </div>
          <span className="ml-3 font-bold text-[#2E1E68] text-lg">GOD</span>
        </Link>

        {/* Menú de escritorio */}
        <ul className="hidden md:flex space-x-6 text-[#2E1E68] font-medium mr-10">
          {menuItems.map((item) => (
            <li key={item.name} className={`relative cursor-pointer group transition duration-300`}>
              {item.isScroll ? (
                <button
                  onClick={() => handleNavClick(item)}
                  className={`hover-effect nav-button ${
                    location.pathname === item.path ? "text-[#9CE840]" : ""
                  }`}
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  to={item.path}
                  className={`hover-effect nav-link ${
                    location.pathname === item.path ? "text-[#9CE840]" : ""
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Botón hamburguesa sticky solo en móvil */}
      <div className="md:hidden fixed top-6 right-6 z-[60]">
        <button
          onClick={toggleMenu}
          className="w-12 h-12 bg-[#9CE840] border-1 border-black flex flex-col items-center justify-center rounded transition-all duration-300 shadow-lg"
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

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={toggleMenu}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300"
        />
      )}

      {/* Menú móvil rediseñado */}
      <div
        className={`fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 z-50 md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header del menú móvil */}
        <div className="flex items-center justify-between p-8 ">
          
         
        </div>

        {/* Lista de navegación móvil */}
        <nav className="px-6 py-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={item.name}>
                {item.isScroll ? (
                  <button
                    onClick={() => handleNavClick(item)}
                    className={`mobile-nav-item ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="mobile-nav-text">{item.name}</span>
                    <svg className="mobile-nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                    className={`mobile-nav-item ${
                      location.pathname === item.path ? "active" : ""
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="mobile-nav-text">{item.name}</span>
                    <svg className="mobile-nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer del menú móvil */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-center text-sm text-gray-500">
            © 2025 Game of Dreams
          </div>
        </div>
      </div>

      {/* Estilos CSS mejorados */}
      <style>{`
        .cartoon-slide {
          opacity: 0;
          transform: translateX(-20px);
          pointer-events: none;
          transition: opacity 0.2s ease;
        }

        .cartoon-slide.show-text {
          animation: slideInBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          animation-delay: 0.35s;
          pointer-events: auto;
        }

        @keyframes slideInBounce {
          0% { opacity: 0; transform: translateX(-20px); }
          60% { opacity: 1; transform: translateX(45px); }
          80% { transform: translateX(35px); }
          100% { opacity: 1; transform: translateX(40px); }
        }

        .hover-effect {
          position: relative;
          display: inline-block;
          padding-bottom: 4px;
          transition: all 0.3s ease;
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
          transform: translateY(-2px);
        }

        .group:hover .hover-effect::after {
          width: 100%;
        }

        .nav-button, .nav-link {
          transition: all 0.3s ease;
        }

        .nav-button:hover, .nav-link:hover {
          transform: scale(1.05);
        }

        /* Nuevos estilos para menú móvil */
        .mobile-nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 16px 20px;
          text-align: left;
          color: #2E1E68;
          font-weight: 500;
          font-size: 16px;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: transparent;
          border: none;
          cursor: pointer;
          text-decoration: none;
          opacity: 0;
          transform: translateX(20px);
          animation: slideInFromRight 0.4s ease forwards;
        }

        .mobile-nav-item:hover {
          background-color: rgba(156, 232, 64, 0.08);
          transform: translateX(0) scale(1.02);
          color: #9CE840;
        }

        .mobile-nav-item.active {
          background-color: rgba(156, 232, 64, 0.15);
          color: #9CE840;
          font-weight: 600;
        }

        .mobile-nav-item.active .mobile-nav-arrow {
          color: #9CE840;
        }

        .mobile-nav-text {
          flex-grow: 1;
        }

        .mobile-nav-arrow {
          width: 18px;
          height: 18px;
          color: #6B7280;
          transition: all 0.3s ease;
          transform: translateX(0);
        }

        .mobile-nav-item:hover .mobile-nav-arrow {
          transform: translateX(4px);
          color: #9CE840;
        }

        @keyframes slideInFromRight {
          0% { 
            opacity: 0; 
            transform: translateX(20px); 
          }
          100% { 
            opacity: 1; 
            transform: translateX(0); 
          }
        }

        /* Mejorar accesibilidad táctil */
        @media (max-width: 768px) {
          .mobile-nav-item {
            min-height: 48px;
          }
        }

        /* Animación suave para el overlay */
        .overlay-enter {
          opacity: 0;
        }
        
        .overlay-enter-active {
          opacity: 0.5;
          transition: opacity 300ms;
        }
        
        .overlay-exit {
          opacity: 0.5;
        }
        
        .overlay-exit-active {
          opacity: 0;
          transition: opacity 300ms;
        }
      `}</style>
    </>
  );
}

export default Navbar;