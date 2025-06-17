import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function AdminButton({ isChatbotOpen }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        // Obtener el token de Firebase que se guarda como 'authToken' en el login
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        // Hacer la petición al endpoint correcto que tienes en tu backend
        const response = await axios.get('http://127.0.0.1:5000/api/user/profile', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        // Verificar si la respuesta es exitosa y si el usuario es Admin
        if (response.data && response.data.status === 'success' && response.data.user) {
          // Tu backend no retorna el rol en get_user_profile, pero podemos usar localStorage
          const userRole = localStorage.getItem('userRole');
          setIsAdmin(userRole === 'Admin');
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        
        // Fallback: usar el rol almacenado en localStorage
        const userRole = localStorage.getItem('userRole');
        setIsAdmin(userRole === 'Admin');
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, []);

  // Ocultar si el chatbot está abierto
  if (isChatbotOpen) return null;
  // Mostrar nada mientras se verifica el rol
  if (loading) return null;
  // No mostrar el botón si no es admin
  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-25 right-6 z-50 md:bottom-20 md:right-4">
      <Link
        to="/home"
        className="group relative inline-flex items-center justify-center w-16 h-16 md:w-14 md:h-14 bg-[#9CE840] hover:bg-[#87C232] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-110"
        title="Administrador"
      >
        {/* Icono de administrador */}
        <svg 
          className="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-110" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
        </svg>

        {/* Tooltip que aparece en hover */}
        <span className="absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
          Administrador
          {/* Flecha del tooltip */}
          <span className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></span>
        </span>
      </Link>
    </div>
  );
}