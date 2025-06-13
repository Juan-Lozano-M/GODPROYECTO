import { onAuthStateChanged } from 'firebase/auth';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import godLogo from '../../assets/logos/logoGOD.png';
import { auth } from '../../firebaseConfig';

function Navbar() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');  const [userPhoto, setUserPhoto] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Estado para trackear si ya cargamos desde localStorage
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  // Función de debugging
  const debugLocalStorage = useCallback((context) => {
    console.log(`=== DEBUG LOCALSTORAGE (${context}) ===`);
    console.log('userPhoto:', localStorage.getItem('userPhoto'));
    console.log('profileImage:', localStorage.getItem('profileImage'));
    console.log('userName:', localStorage.getItem('userName'));
    console.log('Current userPhoto state:', userPhoto);
    console.log('=====================================');
  }, [userPhoto]);

  // Cargar imagen inmediatamente al montar el componente (para evitar que desaparezca en refresh)
  useEffect(() => {
    debugLocalStorage('COMPONENT MOUNT');
    const storedImage = localStorage.getItem("userPhoto") || localStorage.getItem("profileImage");
    console.log('=== COMPONENT MOUNT ===');
    console.log('Stored image found:', storedImage);
    if (storedImage) {
      console.log('Setting userPhoto from localStorage:', storedImage);
      setUserPhoto(storedImage);    } else {
      console.log('No stored image found in localStorage');
    }
    setHasLoadedFromStorage(true);
  }, [debugLocalStorage]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log('=== AUTH STATE CHANGED ===');
      console.log('Current user:', currentUser);
        if (currentUser) {
        console.log('User photoURL:', currentUser.photoURL);
        console.log('LocalStorage userPhoto:', localStorage.getItem("userPhoto"));
        console.log('LocalStorage profileImage:', localStorage.getItem("profileImage"));
        
        setUser(currentUser);
        setUserName(currentUser.displayName || localStorage.getItem("userName") || "Usuario");        // Priorizar imagen personalizada en localStorage sobre Google photoURL
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
    });    // Escuchar eventos de actualización de imagen de perfil
    const handleProfileImageUpdate = (event) => {
      console.log('Profile image updated event received:', event.detail.imageUrl);
      debugLocalStorage('PROFILE IMAGE UPDATE EVENT');
      setUserPhoto(event.detail.imageUrl);
    };

    window.addEventListener('profileImageUpdated', handleProfileImageUpdate);    return () => {
      unsubscribe();
      window.removeEventListener('profileImageUpdated', handleProfileImageUpdate);
    };
  }, [debugLocalStorage, hasLoadedFromStorage]);

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
  const handleLogout = async () => {
    try {
      await auth.signOut();
      // Solo limpiar datos de autenticación, no toda la información del usuario
      localStorage.removeItem('userPhoto');
      localStorage.removeItem('profileImage');
      localStorage.removeItem('userName');
      navigate('/');
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
  };  // Función para refrescar la foto de perfil
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
      </div>      {/* Menú */}
      <ul className="flex space-x-6 text-[#2E1E68] mr-[6rem] font-medium">
        <li className="hover:underline cursor-pointer">Noticias</li>
        <li className="hover:underline cursor-pointer">Contacto</li>
        <li className="hover:underline cursor-pointer">Testimonios</li>
        <li className="hover:underline cursor-pointer">FAQ</li>
        <li className="hover:underline cursor-pointer">Proyectos</li>
      </ul>

      {/* Dropdown del usuario */}
      {user && (
        <div className="relative mr-6" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 focus:outline-none hover:opacity-80 transition-opacity"
          >            {/* Foto de perfil o inicial */}
            {userPhoto ? (
              <img
                src={userPhoto}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#9CE840]"
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
