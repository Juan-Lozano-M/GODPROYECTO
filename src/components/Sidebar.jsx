import logoGod from '../assets/logos/logoGOD.png';
import Checkbox from './Checkbox';

import { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';

// Componentes de iconos SVG en lugar de importar imágenes
const HomeIcon = ({ isActive }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="45" height="45">
  <path 
    stroke={isActive ? "#87C232" : "white"} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" 
  />
</svg>

);

const TestimonialsIcon = ({ isActive }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50">
    <path 
      fill={isActive ? "#87C232" : "white"} // Color de relleno cuando está activo
      stroke="black"                      // Borde blanco siempre para mantener el contraste
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" 
    />
  </svg>
);

const NoticesIcon = ({ isActive }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="50" height="50">
    <path 
      stroke={isActive ? "#87C232" : "white"} 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" 
    />
  </svg>
);

const StaticsIcon = ({ isActive }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="45" height="45">
  <path 
    fill={isActive ? "#87C232" : "white"} 
    strokeWidth="1" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" 
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
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={closeMenu}
          />
        )}
        
        <div className={`fixed ${showMenu ? "left-0" : "-left-full"} md:left-7 top-0 md:w-30 h-screen flex transition-all duration-300 ease-in-out z-50`}>
          <nav className='md:my-10 rounded-r-3xl md:rounded-3xl w-60 md:w-40 flex flex-col justify-between bg-black items-center py-6'>
            
            {/* Logo arriba */}
            <div className='p-4 flex items-center gap-2'>
              <img src={logoGod} className="h-13" alt="Logo de GOD" />
              <h1 className='text-white font-extrabold text-2xl md:hidden'> GOD </h1>
            </div>
    
            {/* Íconos en el centro */}
            <div className='flex flex-col items-center gap-12 flex-grow justify-center md:gap-15 w-full'>
              <Link to="/home" className="group relative flex items-center w-full pl-6 md:pl-0 md:justify-center">
                <HomeIcon isActive={isActive('/home')} />
                <span className={`ml-3 text-white text-lg md:hidden ${isActive('/home') ? 'text-[#87C232]' : ''}`}>
                  Inicio
                </span>
                <span className="absolute font-adlam left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden md:block">
                  Inicio
                </span>
              </Link>
    
              <Link to="/testimonials" className="group relative flex items-center w-full pl-6 md:pl-0 md:justify-center">
                <TestimonialsIcon isActive={isActive('/testimonials')} />
                <span className={`ml-3 text-white text-lg md:hidden ${isActive('/testimonials') ? 'text-[#87C232]' : ''}`}>
                  Testimonios
                </span>
                <span className="absolute font-adlam left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden md:block">
                  Testimonios
                </span>
              </Link>
    
              <Link to="/notices" className="group relative flex items-center w-full pl-6 md:pl-0 md:justify-center">
                <NoticesIcon isActive={isActive('/notices')} />
                <span className={`ml-3 text-white text-lg md:hidden ${isActive('/notices') ? 'text-[#87C232]' : ''}`}>
                  Noticias
                </span>
                <span className="absolute font-adlam left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden md:block">
                  Noticias
                </span>
              </Link>
    
              <Link to="/statics" className="group relative flex items-center w-full pl-6 md:pl-0 md:justify-center">
                <StaticsIcon isActive={isActive('/statics')} />
                <span className={`ml-3 text-white text-lg md:hidden ${isActive('/statics') ? 'text-[#87C232]' : ''}`}>
                  Estadísticas
                </span>
                <span className="absolute font-adlam left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden md:block">
                  Estadísticas
                </span>
              </Link>
            </div>
    
            {/* Botón de salida abajo */}
            <Link to="/">
            <div className="group relative flex items-center w-full pl-6 md:pl-0 md:justify-center mb-5 ">
              <ExitIcon />
              <span className={`ml-3 text-white text-lg md:hidden`}>
                Salir
              </span>
              <span className="absolute font-adlam left-full ml-12 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden md:block">
                Salir
              </span>
            </div>
            </Link>
          </nav>
    
          {/* Botón de menú hamburguesa */}
          <div> 
            <button
              onClick={toggleMenu}
              className='fixed right-4 bottom-4 bg-[#87C232] rounded-full p-1 md:hidden z-50'
            >
              <Checkbox checked={showMenu} onChange={toggleMenu} />
            </button>
          </div>
        </div>
      </>
    );
  }
export default Sidebar;