import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AuthScrollNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Define la altura del Hero en píxeles.
  // AJUSTA ESTE VALOR según la altura real de tu sección Hero en la página de inicio.
  const HERO_SECTION_HEIGHT = 800; // Por ejemplo, 800px.

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Mostrar el componente solo si el scroll pasa la sección hero
      if (currentScrollY > HERO_SECTION_HEIGHT) {
        // Lógica para mostrar/ocultar al hacer scroll hacia arriba/abajo
        if (currentScrollY < lastScrollY || currentScrollY === 0) {
          // Scroll hacia arriba o al inicio de la página después del hero
          setIsVisible(true);
        } else {
          // Scroll hacia abajo
          setIsVisible(false);
        }
      } else {
        // Si estamos en la sección hero o antes, ocultar el componente
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-1/2 right-0 transform -translate-y-1/2 z-50  p-4   flex flex-col space-y-4 transition-transform duration-300 ease-out
        ${isVisible ? 'translate-x-0' : 'translate-x-full'}`}
      style={{ backgroundColor: 'transparent' }} // Asegura que no tenga fondo
    >
      <Link
        to="/login" // Ajusta esta ruta a tu componente de inicio de sesión
        className="px-6 py-2 bg-white border border-black text-black rounded-md hover:bg-gray-100 transition-colors duration-200 text-center"
      >
        Iniciar Sesión
      </Link>
      <Link
        to="/register" // Ajusta esta ruta a tu componente de registro
        className="px-6 py-2  bg-[#9CE840] text-white rounded-md hover:bg-gray-800 transition-colors duration-200 text-center"
      >
        Registrarse
      </Link>
    </div>
  );
}

export default AuthScrollNavbar;