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
    <div className="relative mb-16 group transition-all duration-300 group-hover:text-black ">
      {/* Etiqueta de la categoría de la noticia */}
      <div className="absolute -top-0  z-20 transition-all duration-300 group-hover:translate-x-8">
        <div className="bg-gray-500 px-6 py-2">
          <span className="text-white font-medium">{category}</span>
        </div>
      </div>

      {/* Contenedor principal de la tarjeta con efecto hover */}
      <div className="flex flex-col md:flex-row relative transition-all duration-300 group-hover:bg-gray-200   p-4">
        
        {/* Sección izquierda: Fondo punteado con efecto hover */}
        {/* Sección izquierda */}
        <div className="relative md:w-2/5 overflow-visible">
          {/* Fondo punteado que se mueve */}
          <div
            className="absolute -left-2 inset-y-0 top-5 transition-all duration-300 transform group-hover:translate-x-8 w-[95%] h-[76%] bg-[#f0f0f0] bg-dotted"
          >
            <div
              className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100 bg-[#87C232]"
            ></div>
          </div>

          {/* Contenedor de la imagen */}
          <div className="relative z-10">
            <div className="p-4 pt-10">
              <img
                src={image || uno}
                alt={title}
                className="w-full h-[200px]"
                onClick={handleNavigation}
              />
            </div>
          </div>
        </div>

        {/* Sección derecha: Información de la noticia */}
        <div className="md:w-3/5 p-4 md:p-8 md:pt-10 transition-all duration-300 group-hover:translate-x-4">
          {/* Autor y fecha de publicación */}
          <div className="flex items-center text-sm mb-4">
            <span className="font-bold text-[#9CE840] font-quick">{author}</span> {/* Nombre del autor */}
            <span className="mx-2 text-gray-500">/</span> {/* Separador */}
            <span className="text-gray-500">{date}</span> {/* Fecha de la noticia */}
          </div>

          {/* Título de la noticia con efecto hover */}
          <div
            onClick={handleNavigation} // Usa la función handleNavigation
            className="cursor-pointer"
          >
            <h3 className="text-3xl md:text-4xl  font-bold text-gray-500 mb-4 leading-tight group-hover:text-black uppercase">
              {title}
            </h3>
          </div>

          {/* Descripción breve de la noticia */}
          <p className="text-gray-400 font-quick">{description}</p>
        </div>

        {/* Flecha de navegación que aparece al hacer hover */}
        <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <div className="bg-[#9CE840] rounded-full p-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard; // Exportación del componente para su uso en otras partes de la aplicación
