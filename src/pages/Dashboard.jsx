// Importaciones necesarias para el componente
import { useEffect, useState } from "react"; // Hooks de React para manejar estado y efectos secundarios
import { useNavigate } from "react-router-dom"; // Hook para redirigir a otras rutas

// Definición del componente funcional Dashboard
const Dashboard = () => {
  // Estado para almacenar el nombre del usuario
  const [userName, setUserName] = useState("");
  // Hook para manejar la navegación entre rutas
  const navigate = useNavigate();

  // useEffect se ejecuta al montar el componente
  useEffect(() => {
    // Obtiene el nombre del usuario almacenado en localStorage
    const storedName = localStorage.getItem("userName");
    if (storedName) {
      setUserName(storedName); // Actualiza el estado con el nombre del usuario
    }
  }, []); // [] asegura que solo se ejecute una vez al montar el componente

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    localStorage.removeItem("userName"); // Elimina el nombre del usuario de localStorage
    navigate("/"); // Redirige al usuario a la página principal
  };

  // Retorno del JSX que define la interfaz del componente
  return (
    <div className="min-h-screen bg-white"> {/* Contenedor principal con fondo blanco y altura mínima de pantalla */}
      
      {/* Navbar */}
      <nav className="bg-white shadow-lg"> {/* Barra de navegación con sombra */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Contenedor centrado con márgenes */}
          <div className="flex justify-between h-16"> {/* Flexbox para distribuir elementos */}
            
            {/* Título del Dashboard */}
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-[#87C232]">GOD Dashboard</h1>
            </div>

            {/* Sección de usuario y botón de cerrar sesión */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                {/* Inicial del nombre del usuario */}
                <div className="w-10 h-10 bg-[#87C232] text-white rounded-full flex items-center justify-center text-xl font-semibold">
                  {userName.charAt(0).toUpperCase()} {/* Primera letra del nombre en mayúscula */}
                </div>
                {/* Nombre completo del usuario */}
                <span className="ml-3 font-medium text-gray-700">{userName}</span>
              </div>
              {/* Botón para cerrar sesión */}
              <button
                onClick={handleLogout}
                className="bg-white text-[#87C232] border-2 border-[#87C232] px-4 py-2 rounded-full hover:bg-[#87C232] hover:text-white transition-colors duration-300"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> {/* Contenedor principal del contenido */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Grid para organizar el contenido */}
          
          {/* Tarjeta de bienvenida */}
          <div className="bg-black rounded-lg shadow-lg p-6 col-span-full relative overflow-hidden">
            <div className="flex justify-between items-start">
              <div className="z-10">
                {/* Mensaje de bienvenida */}
                <h2 className="text-3xl font-semibold text-[#9CE840] mb-5">
                  Bienvenido {userName}
                </h2>
                {/* Descripción del usuario */}
                <p className="text-gray-300 text-sm max-w-md">
                  Estudiante de último año con pasión por el medio ambiente y ganas de cambiar el mundo. ¡Futuro defensor del planeta!
                </p>
                {/* Botones de acción */}
                <div className="flex gap-4 mt-4">
                  <button className=" text-white px-4 py-2 rounded-md">
                    Editar Perfil
                  </button>
                  <button className="bg-[#9CE840] text-black px-4 py-2 rounded-md">
                    ¡Descubre tu camino!
                  </button>
                </div>
              </div>
              {/* Imagen de perfil */}
              <div className="absolute right-0 top-0 h-full w-1/3">
                <img
                  src="/ruta-a-tu-imagen.png"
                  alt="Profile"
                  className="h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Aquí se puede agregar más contenido del dashboard */}
        </div>
      </div>
    </div>
  );
};

// Exporta el componente para que pueda ser usado en otras partes de la aplicación
export default Dashboard;
