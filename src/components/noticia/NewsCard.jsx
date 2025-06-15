import { useNavigate } from "react-router-dom";
import uno from "../../assets/Animation.json";

// Componente funcional NewsCard que recibe propiedades (props) para mostrar una tarjeta de noticia
function NewsCard({ 
  categoria,     // Cambiado de 'category' a 'categoria'
  imagen_url,    // Cambiado de 'image' a 'imagen_url'
  autor,         // Mantiene 'autor' pero ahora es un objeto
  fecha_creacion, // Cambiado de 'date' a 'fecha_creacion'
  titulo,        // Cambiado de 'title' a 'titulo'
  descripcion,   // Cambiado de 'description' a 'descripcion'
  id_noticia,    // Mantener por compatibilidad
  slug           // NUEVO: slug generado por el backend
}) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    // Priorizar el uso del slug, usar id_noticia como fallback
    const routeParam = slug || id_noticia;
    
    if (routeParam) {
      // Si tenemos slug, usar la ruta con slug, sino usar la ruta con ID
      const route = slug ? `/noticiasv/${slug}` : `/noticiasv/${id_noticia}`;
      navigate(route);
      console.log("Navigating to:", route);
    } else {
      console.error("No hay slug ni ID de noticia válido para la navegación.");
    }
  };

  // Formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Obtener el nombre del autor
  const getAuthorName = () => {
    if (typeof autor === 'object' && autor?.nombre) {
      return autor.nombre;
    }
    return autor || 'Autor desconocido';
  };

  return (
    <div className="relative mb-16 group transition-all duration-300 group-hover:text-black">
      {/* Etiqueta de la categoría de la noticia */}
      <div className="absolute -top-0 z-20 transition-all duration-300 group-hover:translate-x-8">
        <div className="bg-gray-500 px-6 py-2">
          <span className="text-white font-medium">{categoria}</span>
        </div>
      </div>

      {/* Contenedor principal de la tarjeta con efecto hover */}
      <div className="flex flex-col md:flex-row relative transition-all duration-300 group-hover:bg-gray-200 p-4">
          {/* Sección izquierda */}
        <div className="relative md:w-2/5 overflow-visible">
          {/* Fondo punteado que se mueve - altura fija */}
          <div className="absolute -left-2 top-5 transition-all duration-300 transform group-hover:translate-x-8 w-[95%] h-[200px] bg-[#f0f0f0] bg-dotted">
            <div className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100 bg-[#87C232]"></div>
          </div>

          {/* Contenedor de la imagen */}
          <div className="relative z-10">
            <div className="p-4 pt-10">
              <img
                src={imagen_url || uno}
                alt={titulo}
                className="w-full h-[200px] object-cover cursor-pointer"
                onClick={handleNavigation}
              />
            </div>
          </div>
        </div>

        {/* Sección derecha: Información de la noticia */}
        <div className="md:w-3/5 p-4 md:p-8 md:pt-10 transition-all duration-300 group-hover:translate-x-4">
          {/* Autor y fecha de publicación */}
          <div className="flex items-center text-sm mb-4">
            <span className="font-bold text-[#9CE840] font-quick">{getAuthorName()}</span>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-500">{formatDate(fecha_creacion)}</span>
          </div>

          {/* Título de la noticia con efecto hover */}
          <div
            onClick={handleNavigation}
            className="cursor-pointer"
          >
            <h3 className="text-3xl md:text-4xl font-adlam font-bold text-gray-500 mb-4 leading-tight group-hover:text-black uppercase">
              {titulo}
            </h3>
          </div>

          {/* Descripción breve de la noticia */}
          <p className="text-gray-400 font-quick">{descripcion}</p>
        </div>

        {/* Flecha de navegación que aparece al hacer hover */}
        <div className="absolute bottom-4 right-4 opacity-0 transform translate-x-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
          <div className="bg-[#9CE840] rounded-full p-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCard;