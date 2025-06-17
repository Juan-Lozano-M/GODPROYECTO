import logoGod from '../assets/logos/logoGOD.png';
import Checkbox from './Checkbox';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Componentes de iconos SVG en lugar de importar imágenes
const HomeIcon = ({ isActive, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={`w-[50px] h-[50px] [@media(max-height:760px)]:w-11 [@media(max-height:760px)]:h-11 ${className}`}>
    <path 
        fill={isActive ? "#87C232" : "white"} 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" 
    />
    <path
        fill={isActive ? "#87C232" : "white"} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" 
    />
  </svg>
);

const TestimonialsIcon = ({ isActive, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={`w-[50px] h-[50px] [@media(max-height:760px)]:w-11 [@media(max-height:760px)]:h-11 ${className}`}>
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

const NoticesIcon = ({ isActive, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={`w-[50px] h-[50px] [@media(max-height:760px)]:w-10 [@media(max-height:760px)]:h-10 ${className}`}>
    <path
      fill={isActive ? "#87C232" : "white"} 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill-rule="evenodd"
      d="M4.125 3C3.089 3 2.25 3.84 2.25 4.875V18a3 3 0 0 0 3 3h15a3 3 0 0 1-3-3V4.875C17.25 3.839 16.41 3 15.375 3H4.125ZM12 9.75a.75.75 0 0 0 0 1.5h1.5a.75.75 0 0 0 0-1.5H12Zm-.75-2.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75ZM6 12.75a.75.75 0 0 0 0 1.5h7.5a.75.75 0 0 0 0-1.5H6Zm-.75 3.75a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1-.75-.75ZM6 6.75a.75.75 0 0 0-.75.75v3c0 .414.336.75.75.75h3a.75.75 0 0 0 .75-.75v-3A.75.75 0 0 0 9 6.75H6Z" clip-rule="evenodd" 
    />
    <path
      fill={isActive ? "#87C232" : "white"} 
      strokeWidth="1" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      fill-rule="evenodd"
      d="M18.75 6.75h1.875c.621 0 1.125.504 1.125 1.125V18a1.5 1.5 0 0 1-3 0V6.75Z" 
      />
  </svg>

);

const StaticsIcon = ({ isActive, className = "" }) => (
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className={`w-[50px] h-[50px] [@media(max-height:760px)]:w-10 [@media(max-height:760px)]:h-10 ${className}`}>
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

const PortfolioIcon = ({ isActive, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className={`w-[50px] h-[50px] [@media(max-height:760px)]:w-10 [@media(max-height:760px)]:h-10 ${className}`}> 
    <path fill={isActive ? "#87C232" : "white"} fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
    <path fill={isActive ? "#87C232" : "white"} d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
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
        {/* Overlay oscuro cuando el menú está abierto en móviles */}
        {showMenu && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={closeMenu}
          />
        )}
        
        <div className={`fixed ${showMenu ? "left-0" : "-left-full"} md:left-7 top-0 md:w-30 h-screen flex transition-all duration-300 ease-in-out z-50`}>
          <nav className="md:my-10 rounded-r-2xl md:rounded-3xl w-60 md:w-30 flex flex-col bg-black items-center py-6">
            
            {/* Logo arriba */}
            <div className="p-4 flex items-center gap-6 shrink-0">
              <Link to = "/">
               <img src={logoGod} className="h-10 md:h-13" alt="Logo de GOD" />
              </Link>
              <h1 className="text-white font-extrabold text-lg font-adlam md:hidden">GOD</h1>
            </div>
    
            {/* Íconos en el centro */}
            <div className="flex flex-col items-center flex-grow justify-center min-h-0 w-full gap-9 md:gap-15 [@media(max-height:760px)]:gap-10 [@media(max-height:600px)]:gap-6">
              <Link to="/home" className="group relative flex items-center w-full pl-6 md:pl-0 md:justify-center">
                <HomeIcon className="[@media(max-height:750px)]:w-6 [@media(max-height:750px)]:h-6" isActive={isActive('/home')} />
                <span className={`font-adlam ml-4 text-white text-lg md:hidden ${isActive('/home') ? 'text-[#87C232]' : ''}`}>
                  Inicio
                </span>
                <span className="absolute font-adlam left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden md:block">
                  Inicio
                </span>
              </Link>
    
              <Link to="/testimonials" className="group relative flex items-center w-full pl-6 md:pl-0 md:justify-center">
                <TestimonialsIcon isActive={isActive('/testimonials')} />
                <span className={`font-adlam ml-4 text-white text-lg md:hidden ${isActive('/testimonials') ? 'text-[#87C232]' : ''}`}>
                  Testimonios
                </span>
                <span className="absolute font-adlam left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden md:block">
                  Testimonios
                </span>
              </Link>
    
              <Link to="/notices" className="group relative flex items-center w-full pl-6 md:pl-0 md:justify-center">
                <NoticesIcon isActive={isActive('/notices')} />
                <span className={`font-adlam ml-4 text-white text-lg md:hidden ${isActive('/notices') ? 'text-[#87C232]' : ''}`}>
                  Noticias
                </span>
                <span className="absolute font-adlam left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden md:block">
                  Noticias
                </span>
              </Link>
    
              <Link to="/statics" className="group relative flex items-center w-full pl-6 md:pl-0 md:justify-center">
                <StaticsIcon isActive={isActive('/statics')} />
                <span className={`font-adlam ml-4 text-white text-lg md:hidden ${isActive('/statics') ? 'text-[#87C232]' : ''}`}>
                  Estadísticas
                </span>
                <span className="absolute font-adlam left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden md:block">
                  Estadísticas
                </span>
              </Link>

              <Link to="/projects" className="group relative flex items-center w-full pl-6 md:pl-0 md:justify-center">
                <PortfolioIcon isActive={isActive('/projects')} />
                <span className={`font-adlam ml-4 text-white text-lg md:hidden ${isActive('/projects') ? 'text-[#87C232]' : ''}`}>
                  Proyectos
                </span>
                <span className="absolute font-adlam left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden md:block">
                  Proyectos
                </span>
              </Link>
            </div>
    
            {/* Botón de salida abajo */}
            <Link to="/" className="group relative flex items-center w-full py-4 pl-6 md:pl-0 md:justify-center">
                <ExitIcon />
                <span className={`font-adlam ml-4 text-white text-lg md:hidden `}>
                  Salir
                </span>
                <span className="absolute font-adlam left-full ml-2 px-4 py-2 bg-[#87C232] text-white text-lg rounded-md invisible opacity-0 transition-all group-hover:visible group-hover:opacity-100 hidden md:block">
                  Salir
                </span>
              </Link>
          </nav>
    
          {/* Botón de menú hamburguesa */}
          <div> 
            <button
              onClick={toggleMenu}
              className="fixed right-4 bottom-4 bg-[#87C232] rounded-full p-1 md:hidden z-50"
            >
              <Checkbox checked={showMenu} onChange={toggleMenu} />
            </button>
          </div>
        </div>
      </>
    );
}
export default Sidebar;