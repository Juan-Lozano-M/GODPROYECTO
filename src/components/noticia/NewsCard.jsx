import React from "react"; // Importación de React
import { useNavigate } from "react-router-dom"; // Importación de useNavigate
import uno from "../../assets/Animation.json"; // Importación de una animación o imagen por defecto

// Componente funcional NewsCard que recibe propiedades (props) para mostrar una tarjeta de noticia
function NewsCard({ category, image, author, date, title, description, slug }) {
  const navigate = useNavigate(); // Hook para la navegación

  const handleNavigation = () => {
    if (slug) {
      navigate(`/noticiasv/${slug}`); // Navega a la ruta correspondiente
      console.log("Navigating to:", `/noticiasv/${slug}`); // Mensaje de depuración
    } else {
      console.error("El slug no es válido.");
    }
  };

  return (
    <div className="relative mb-16 group transition-all duration-300 group-hover:text-black">
      {/* Etiqueta de la categoría de la noticia */}
      <div className="absolute -top-6 left-0 z-20">
        <div className="bg-gray-500 px-6 py-2">
          <span className="text-white font-medium">{category}</span>
        </div>
      </div>

      {/* Contenedor principal de la tarjeta con efecto hover */}
      <div className="flex flex-col md:flex-row relative transition-all duration-300 group-hover:bg-gray-200 p-4">
        
        {/* Sección izquierda: Fondo punteado con efecto hover */}
        <div
          className="relative md:w-2/5 overflow-hidden transition-all duration-300 transform group-hover:translate-x-4"
          style={{
            background: "#f0f0f0", // Color de fondo base
            backgroundImage: "radial-gradient(#ccc 1px, transparent 0)", // Patrón punteado
            backgroundSize: "10px 10px", // Tamaño del patrón
          }}
        >
          {/* Capa de color que aparece al hacer hover */}
          <div
            className="absolute inset-0 transition-all duration-300 bg-transparent group-hover:bg-[#87C232] text-2xl "
          ></div>

          {/* Imagen de la noticia con enlace */}
          <div
            onClick={handleNavigation} // Usa la función handleNavigation
            className="cursor-pointer"
          >
            <div className="p-4 pt-10 relative">
              <img
                src={image || uno} // Si no hay imagen, se usa la animación por defecto
                alt={title} // Texto alternativo de la imagen
                className="w-full h-auto transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Sección derecha: Información de la noticia */}
        <div className="md:w-3/5 p-4 md:p-8 md:pt-10 transition-all duration-300 group-hover:translate-x-4">
          {/* Autor y fecha de publicación */}
          <div className="flex items-center text-sm mb-4">
            <span className="font-bold text-[#9CE840]">{author}</span> {/* Nombre del autor */}
            <span className="mx-2 text-gray-500">/</span> {/* Separador */}
            <span className="text-gray-500">{date}</span> {/* Fecha de la noticia */}
          </div>

          {/* Título de la noticia con efecto hover */}
          <div
            onClick={handleNavigation} // Usa la función handleNavigation
            className="cursor-pointer"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gray-500 mb-4 leading-tight group-hover:text-black uppercase">
              {title}
            </h3>
          </div>

          {/* Descripción breve de la noticia */}
          <p className="text-gray-400">{description}</p>
        </div>

        {/* Flecha de navegación que aparece al hacer hover */}
        <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <div className="bg-[#9CE840] rounded-full p-4"></div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard; // Exportación del componente para su uso en otras partes de la aplicación
