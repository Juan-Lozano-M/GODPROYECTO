import { onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import godLogo from '../../assets/logos/logoGOD.png';
import { auth } from '../../firebaseConfig';

const menuItems = [
  { name: "Inicio", path: "/" },
  { name: "Noticias", path: "/noticiasv" },
  { name: "Contacto", path: "/contacto" },
  { name: "Testimonios", path: "/testimonios", isScroll: true, scrollId: "testimonios" },
  { name: "Nosotros", path: "/nosotros", isScroll: true, scrollId: "nosotros" },
  { name: "Proyectos", path: "/proyectosview" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');
  const [userPhoto, setUserPhoto] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Función de debugging
  const debugLocalStorage = useCallback((context) => {
    console.log(`=== DEBUG LOCALSTORAGE (${context}) ===`);
    console.log('userPhoto:', localStorage.getItem('userPhoto'));
    console.log('profileImage:', localStorage.getItem('profileImage'));
    console.log('userName:', localStorage.getItem('userName'));
    console.log('Current userPhoto state:', userPhoto);
    console.log('=====================================');
  }, [userPhoto]);

  // Cargar imagen inmediatamente al montar el componente
  useEffect(() => {
    debugLocalStorage('COMPONENT MOUNT');
    const storedImage = localStorage.getItem("userPhoto") || localStorage.getItem("profileImage");
    console.log('=== COMPONENT MOUNT ===');
    console.log('Stored image found:', storedImage);
    if (storedImage) {
      console.log('Setting userPhoto from localStorage:', storedImage);
      setUserPhoto(storedImage);
    } else {
      console.log('No stored image found in localStorage');
    }
    setHasLoadedFromStorage(true);
  }, [debugLocalStorage]);

  // Manejar autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('=== AUTH STATE CHANGED ===');
      console.log('Current user:', currentUser);
      
      if (currentUser) {
        console.log('User photoURL:', currentUser.photoURL);
        console.log('LocalStorage userPhoto:', localStorage.getItem("userPhoto"));
        console.log('LocalStorage profileImage:', localStorage.getItem("profileImage"));
        
        setUser(currentUser);
        setUserName(currentUser.displayName || localStorage.getItem("userName") || "Usuario");
        
        // Priorizar imagen personalizada en localStorage sobre Google photoURL
        const storedImage = localStorage.getItem("userPhoto") || localStorage.getItem("profileImage");
        let profileImage = "";
        
        // Si hay imagen almacenada (personalizada), usarla
        if (storedImage) {
          profileImage = storedImage;
          console.log('Using stored image (priority):', profileImage);
        } 
        // Si no hay imagen personalizada, usar Google photoURL
        else if (currentUser.photoURL) {
          profileImage = currentUser.photoURL;
          console.log('Using Google photoURL:', profileImage);
        }
        
        console.log('Final profile image selected:', profileImage);
        
        // Solo actualizar si tenemos una imagen y cumple ciertas condiciones
        if (profileImage) {
          setUserPhoto(prevPhoto => {
            console.log('Previous photo:', prevPhoto);
            console.log('New photo:', profileImage);
            console.log('Has loaded from storage:', hasLoadedFromStorage);
            
            // Si ya cargamos desde storage y tenemos una imagen, mantenerla
            // Solo actualizar si no tenemos imagen previa o si la nueva es diferente
            if (!prevPhoto || profileImage !== prevPhoto) {
              console.log('Updating userPhoto from', prevPhoto, 'to', profileImage);
              return profileImage;
            }
            console.log('Keeping existing photo');
            return prevPhoto;
          });
        } else if (!storedImage && hasLoadedFromStorage) {
          // Solo limpiar si no hay imagen almacenada y ya verificamos localStorage
          console.log('No image available, clearing userPhoto');
          setUserPhoto('');
        }
      } else {
        console.log('No user authenticated');
        setUser(null);
        setUserName('');
        setUserPhoto('');
      }
    });

    // Escuchar eventos de actualización de imagen de perfil
    const handleProfileImageUpdate = (event) => {
      console.log('Profile image updated event received:', event.detail.imageUrl);
      debugLocalStorage('PROFILE IMAGE UPDATE EVENT');
      setUserPhoto(event.detail.imageUrl);
    };

    window.addEventListener('profileImageUpdated', handleProfileImageUpdate);

    return () => {
      unsubscribe();
      window.removeEventListener('profileImageUpdated', handleProfileImageUpdate);
    };
  }, [debugLocalStorage, hasLoadedFromStorage]);

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

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Limpiar todos los datos de autenticación y sesión relevantes
      localStorage.removeItem('userPhoto');
      localStorage.removeItem('profileImage');
      localStorage.removeItem('userName');
      localStorage.removeItem('authToken');
      localStorage.removeItem('userRole');
      navigate('/');
      window.location.reload(); // Refresca la página después de cerrar sesión
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  const handleImageError = () => {
    console.log('Image failed to load, falling back to initials');
    setUserPhoto(''); // Esto forzará que se muestre la inicial
  };

  // Función para refrescar la foto de perfil
  const refreshUserData = async () => {
    if (auth.currentUser) {
      console.log('=== REFRESHING USER DATA ===');
      await auth.currentUser.reload();
      const updatedUser = auth.currentUser;
      console.log('Refreshed user data:', updatedUser);
      
      // Priorizar diferentes fuentes de imagen después del refresh
      const storedImage = localStorage.getItem("userPhoto") || localStorage.getItem("profileImage");
      let profileImage = updatedUser.photoURL || storedImage || "";
      
      console.log('Refreshed profile image:', profileImage);
      console.log('Stored image:', storedImage);
      
      if (profileImage) {
        setUserPhoto(profileImage);
      }
    }
  };

  // Refrescar datos del usuario al montar el componente
  useEffect(() => {
    if (user) {
      refreshUserData();
    }
  }, [user]);

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

        {/* Contenedor para menú y foto de perfil - Movido más a la derecha */}
        <div className="hidden md:flex items-center space-x-8 mr-8">
          {/* Menú de escritorio */}
          <ul className="flex space-x-8 text-[#2E1E68] font-medium">
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

          {/* Dropdown del usuario (escritorio) - Movido más a la derecha */}
          {user && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 focus:outline-none hover:opacity-80 transition-opacity"
              >
                {/* Foto de perfil o inicial */}
                {userPhoto ? (
                  <img
                    src={userPhoto}
                    alt="Profile"
                    className="w-10 h-10 rounded-lg object-cover  ]"
                    onError={handleImageError}
                    onLoad={() => console.log('Image loaded successfully:', userPhoto)}
                  />
                ) : (
                  <div className="w-10 h-10 bg-[#9CE840] rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-[#87C232]">
                    {getInitials(userName)}
                  </div>
                )}
                
                {/* Flecha */}
                <svg
                  className={`w-4 h-4 text-[#2E1E68] transition-transform duration-200 ${
                    isDropdownOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
                    <p className="text-xs text-gray-500">Ver perfil</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
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
          className="fixed inset-0 z-40 transition-opacity duration-300"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        />
        
      )}

      {/* Menú móvil rediseñado */}
      <div
        className={`fixed top-0 right-0 w-full max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 z-50 md:hidden ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header del menú móvil */}
        <div className="flex items-center justify-start p-8 ">
          {/* Foto de perfil o inicial en menú móvil */}
          {user && (
            userPhoto ? (
              <img
                src={userPhoto}
                alt="Profile"
                className="w-12 h-12 rounded-lg object-cover mr-4"
                onError={handleImageError}
              />
            ) : (
              <div className="w-12 h-12 bg-[#9CE840] rounded-full flex items-center justify-center text-white font-bold text-xl border-2 border-[#87C232] mr-4">
                {getInitials(userName)}
              </div>
            )
          )}
          <span className="font-bold text-[#2E1E68] text-lg">{userName || 'Usuario'}</span>
        </div>

        {/* Lista de navegación móvil */}
        <nav className="px-6 py-4">
          <ul className="space-y-2">
            {/* Botón Ver perfil solo en menú hamburguesa */}
            {user && (
              <li>
                <button
                  onClick={() => { setMenuOpen(false); navigate('/dashboard'); }}
                  className="mobile-nav-item"
                  style={{ animationDelay: `0ms` }}
                >
                  <span className="mobile-nav-text">Ver perfil</span>
                  <svg className="mobile-nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </li>
            )}
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
            {/* Botones de login y registro al final */}
            {!user && (
              <>
                <li>
                  <Link
                    to="/login"
                    onClick={() => setMenuOpen(false)}
                    className="mobile-nav-item bg-white border border-black text-black hover:bg-gray-100"
                    style={{ animationDelay: `${menuItems.length * 50}ms` }}
                  >
                    <span className="mobile-nav-text">Iniciar sesión</span>
                    <svg className="mobile-nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    onClick={() => setMenuOpen(false)}
                    className="mobile-nav-item bg-[#9CE840] text-[#2E1E68] hover:bg-[#87C232]"
                    style={{ animationDelay: `${(menuItems.length + 1) * 50}ms` }}
                  >
                    <span className="mobile-nav-text">Registrarse</span>
                    <svg className="mobile-nav-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        {/* Footer del menú móvil */}
        <div className="absolute bottom-6 left-6 right-6 flex flex-col items-center gap-2">
          {user && (
            <button
              onClick={handleLogout}
              className="w-full py-2 text-red-600 hover:text-red-700 bg-transparent rounded-lg font-semibold transition-colors duration-200 shadow-none border border-transparent"
            >
              Cerrar sesión
            </button>
          )}
          <div className="text-center text-sm text-gray-500 mt-1">
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