import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import iconAnguloAbajo from "../../assets/icons/iconAnguloAbajo.png";

const AdminProfile = () => {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState('Admin');
  const [userPhoto, setUserPhoto] = useState('');
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
  const navigate = useNavigate();

  // Función de debugging (igual que en Navbar)
  const debugLocalStorage = useCallback((context) => {
    console.log(`=== DEBUG ADMIN LOCALSTORAGE (${context}) ===`);
    console.log('userPhoto:', localStorage.getItem('userPhoto'));
    console.log('profileImage:', localStorage.getItem('profileImage'));
    console.log('userName:', localStorage.getItem('userName'));
    console.log('Current userPhoto state:', userPhoto);
    console.log('=====================================');
  }, [userPhoto]);

  useEffect(() => {
    // Cargar el nombre del usuario desde localStorage
    const name = localStorage.getItem('userName') || 
                 localStorage.getItem('name') || 
                 'Administrador';
    setUserName(name);

    // Cargar imagen inmediatamente al montar el componente (misma lógica que Navbar)
    debugLocalStorage('ADMIN COMPONENT MOUNT');
    const storedImage = localStorage.getItem("userPhoto") || localStorage.getItem("profileImage");
    console.log('=== ADMIN COMPONENT MOUNT ===');
    console.log('Stored image found:', storedImage);
    if (storedImage) {
      console.log('Setting admin userPhoto from localStorage:', storedImage);
      setUserPhoto(storedImage);
    } else {
      console.log('No stored image found in localStorage for admin');
    }
    setHasLoadedFromStorage(true);
  }, [debugLocalStorage]);

  // Escuchar eventos de actualización de imagen de perfil (igual que en Navbar)
  useEffect(() => {
    const handleProfileImageUpdate = (event) => {
      console.log('Admin: Profile image updated event received:', event.detail.imageUrl);
      debugLocalStorage('ADMIN PROFILE IMAGE UPDATE EVENT');
      setUserPhoto(event.detail.imageUrl);
    };

    window.addEventListener('profileImageUpdated', handleProfileImageUpdate);

    return () => {
      window.removeEventListener('profileImageUpdated', handleProfileImageUpdate);
    };
  }, [debugLocalStorage]);

  const handleToggle = () => setOpen(!open);

  const handleProfileClick = () => {
    setOpen(false); // Cerrar el dropdown
    navigate('/dashboard'); // Navegar al perfil del administrador
  };

  const handleLogout = () => {
    try {
      // Limpiar datos de autenticación del localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userId');
      localStorage.removeItem('userRole');
      
      // También limpiar datos de imagen de perfil
      localStorage.removeItem('userPhoto');
      localStorage.removeItem('profileImage');
      localStorage.removeItem('userName');
      
      // Limpiar datos de autenticación del sessionStorage (por si los usas)
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userId');
      sessionStorage.removeItem('userRole');
      
      // Cerrar el dropdown
      setOpen(false);
      
      // Redirigir al login
      navigate('/login');
      
      // Opcional: mostrar mensaje de confirmación
      console.log('Sesión cerrada exitosamente');
      
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : 'A';
  };

  const handleImageError = () => {
    console.log('Admin: Image failed to load, falling back to initials');
    setUserPhoto(''); // Esto forzará que se muestre la inicial
  };

  return (
    <div className="relative w-auto">
      <div className="flex items-center cursor-pointer" onClick={handleToggle}>
        {/* Avatar con imagen de perfil o inicial del nombre del usuario */}
        {userPhoto ? (
          <img
            src={userPhoto}
            alt="Admin Profile"
            className="h-10 w-10 sm:h-15 sm:w-15 rounded-lg object-cover border-2"
            onError={handleImageError}
            onLoad={() => console.log('Admin image loaded successfully:', userPhoto)}
          />
        ) : (
          <div className="h-10 w-10 sm:h-15 sm:w-15 rounded-lg bg-black flex items-center justify-center">
            <span className="text-white font-adlam text-sm sm:text-base">
              {getInitials(userName)}
            </span>
          </div>
        )}
        
        <img
          src={iconAnguloAbajo}
          className="h-2 sm:h-3 ml-2 transition-transform duration-200"
          style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
          alt="Icono de menú"
        />
      </div>

      {open && (
        <div className="absolute top-12 right-0 bg-white shadow-lg p-2 rounded-lg w-48 z-20 border border-gray-200">
          <div className="px-3 py-2 border-b border-gray-100">
            <p className="text-sm font-adlam text-gray-900 truncate">{userName}</p>
            <p className="text-xs text-gray-500 font-adlam">Administrador</p>
          </div>
          <p 
            className="text-sm hover:bg-blue-50 px-3 py-2 cursor-pointer rounded transition-colors duration-200 flex items-center font-adlam"
            onClick={handleProfileClick}
          >
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Mi perfil
          </p>
          <p 
            className="text-sm hover:bg-red-50 px-3 py-2 cursor-pointer rounded transition-colors duration-200 text-red-600 flex items-center font-adlam"
            onClick={handleLogout}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar sesión
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;