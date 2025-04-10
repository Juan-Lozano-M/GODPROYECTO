import logoGod from '../assets/logos/logoGOD.png';
import Checkbox from './Checkbox';

import { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';

// Componentes de iconos SVG en lugar de importar imágenes
const HomeIcon = ({ isActive }) => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" 
      stroke={isActive ? "#87C232" : "white"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M9 22V12h6v10" 
      stroke={isActive ? "#87C232" : "white"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const TestimonialsIcon = ({ isActive }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="50" height="50">
    <path
      stroke={isActive ? "#87C232" : "white"}
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
  </svg>
);

const NoticesIcon = ({ isActive }) => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M22 12h-6l-2 3h-4l-2-3H2" 
      stroke={isActive ? "#87C232" : "white"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" 
      stroke={isActive ? "#87C232" : "white"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    /> 
  </svg>
);

const StaticsIcon = ({ isActive }) => (
  <svg width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M18 20V10" 
      stroke={isActive ? "#87C232" : "white"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M12 20V4" 
      stroke={isActive ? "#87C232" : "white"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M6 20v-6" 
      stroke={isActive ? "#87C232" : "white"} 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const ExitIcon = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path 
      d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M16 17l5-5-5-5" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M21 12H9" 
      stroke="white" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

const Sidebar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const location = useLocation();
    
    const toggleMenu = () => {
      setShowMenu((prev) => !prev);
    };

    const closeMenu = () => {
      setShowMenu(false);
    };

    // Efecto para controlar el scroll del body cuando el menú está abierto
    useEffect(() => {
      if (showMenu) {
        // Bloquear el scroll
        document.body.style.overflow = 'hidden';
      } else {
        // Restaurar el scroll
        document.body.style.overflow = 'auto';
      }
      
      // Limpieza del efecto al desmontar el componente
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [showMenu]);
    
    // Verificar si la ruta actual coincide con la ruta proporcionada
    const isActive = (path) => location.pathname === path;

    return (
      <>
        {/* Overlay que agrega un efecto desvanecido cuando el menú está abierto */}
        {showMenu && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 sm:hidden"
            onClick={closeMenu}
          />
        )}
        
        <div className={`fixed ${showMenu ? "left-0" : "-left-full"} sm:left-7 top-0 sm:w-30 h-screen flex transition-all duration-300 ease-in-out z-50`}>
            <nav className='sm:my-10 rounded-r-3xl sm:rounded-3xl w-60 sm:w-40 flex flex-col justify-between bg-black items-center py-6'>
               
                {/* Logo arriba */}
                <div className='p-4 flex items-center gap-2'>
                    <img src={logoGod} className="h-13" alt="Logo de GOD" />
                    <h1 style={{ fontFamily: "'Mint Sans', sans-serif" }} className='text-white font-extrabold text-2xl sm:hidden'> GOD </h1>
                </div>

                {/* Íconos en el centro */}
                <div className='flex flex-col items-center gap-12 flex-grow justify-center sm:gap-15 w-full'>
                    <Link to="/home" className="group relative flex items-center w-full pl-6 sm:pl-0 sm:justify-center">
                        <HomeIcon isActive={isActive('/home')} />
                        <span style={{ fontFamily: "'Mint Sans', sans-serif" }} className={`ml-3 text-white text-lg sm:hidden ${isActive('/home') ? 'text-[#87C232]' : ''}`}>
                            Inicio
                        </span>
                        <span style={{ fontFamily: "'Mint Sans', sans-serif" }} className="absolute left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden sm:block">
                            Inicio
                        </span>
                    </Link>

                    <Link to="/testimonials" className="group relative flex items-center w-full pl-6 sm:pl-0 sm:justify-center">
                        <TestimonialsIcon isActive={isActive('/testimonials')} />
                        <span style={{ fontFamily: "'Mint Sans', sans-serif" }} className={`ml-3 text-white text-lg sm:hidden ${isActive('/testimonials') ? 'text-[#87C232]' : ''}`}>
                            Testimonios
                        </span>
                        <span style={{ fontFamily: "'Mint Sans', sans-serif" }} className="absolute left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden sm:block">
                            Testimonios
                        </span>
                    </Link>

                    <Link to="/notices" className="group relative flex items-center w-full pl-6 sm:pl-0 sm:justify-center">
                        <NoticesIcon isActive={isActive('/notices')} />
                        <span style={{ fontFamily: "'Mint Sans', sans-serif" }} className={`ml-3 text-white text-lg sm:hidden ${isActive('/notices') ? 'text-[#87C232]' : ''}`}>
                            Noticias
                        </span>
                        <span style={{ fontFamily: "'Mint Sans', sans-serif" }} className="absolute left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden sm:block">
                            Noticias
                        </span>
                    </Link>

                    <Link to="/statics" className="group relative flex items-center w-full pl-6 sm:pl-0 sm:justify-center">
                        <StaticsIcon isActive={isActive('/statics')} />
                        <span style={{ fontFamily: "'Mint Sans', sans-serif" }} className={`ml-3 text-white text-lg sm:hidden ${isActive('/statics') ? 'text-[#87C232]' : ''}`}>
                            Estadísticas
                        </span>
                        <span style={{ fontFamily: "'Mint Sans', sans-serif" }} className="absolute left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden sm:block">
                            Estadísticas
                        </span>
                    </Link>
                </div>

                {/* Botón de salida abajo */}
                <div className="group relative flex items-center w-full pl-6 sm:pl-0 sm:justify-center p-4">
                    <ExitIcon />
                    <span style={{ fontFamily: "'Mint Sans', sans-serif" }} className={`ml-3 text-white text-lg sm:hidden`}>
                        Salir
                    </span>
                    <span style={{ fontFamily: "'Mint Sans', sans-serif" }} className="absolute left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden sm:block">
                        Salir
                    </span>
                </div>
            </nav>

            {/* Botón de menú hamburguesa */}
            <div> 
              <button
                  onClick={toggleMenu}
                  className='fixed right-4 bottom-4 bg-[#87C232] rounded-full p-1 sm:hidden z-50'
              >
                  <Checkbox checked={showMenu} onChange={toggleMenu} />
              </button>
            </div>
        </div>
      </>
    );
};

export default Sidebar;