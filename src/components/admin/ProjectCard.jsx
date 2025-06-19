
// Mapeo de colores por estado
const statusColors = {
  'En Progreso': 'bg-[#9CE840]',
  'Completado': 'bg-[#4285F4]',
  'Planeado': 'bg-[#FFBE00]',
  'Cancelado': 'bg-[#EA4335]',
};

const ProjectCard = ({ image, title, year, participants, description, category, status, isSelected, onSelect }) => {
    const handleViewProject = (e) => {
    e.stopPropagation(); // Evitar que se active onSelect cuando se hace clic en "Ver proyecto"
    
    // Redirigir a la página de proyectos públicos donde se pueden ver todos los proyectos
    // En el futuro se puede implementar una página específica para cada proyecto
    window.open('/proyectosview', '_blank');
  };
  return (
    <div
      className={`flex items-center w-full h-[120px] sm:h-[140px] lg:h-[160px] xl:h-[150px] 2xl:h-[170px] bg-white rounded-2xl shadow-md hover:shadow-lg cursor-pointer border-2 transition-all ${isSelected ? 'border-[#87C232] shadow-lg' : 'border-gray-200'}`}
      onClick={onSelect}
    >
      {/* Imagen del proyecto */}
      <img 
        src={image || "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop"} 
        alt="Proyecto imagen" 
        className="h-[120px] w-[120px] sm:w-[140px] sm:h-[140px] lg:w-[160px] lg:h-[160px] xl:w-[150px] xl:h-[150px] 2xl:w-[170px] 2xl:h-[170px] rounded-l-2xl object-cover flex-shrink-0"
        onError={(e) => {
          e.target.src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop";
        }}
      />
        {/* Contenido general */}
      <div className="flex justify-between items-center w-full h-full px-3 py-2">
        {/* Información del proyecto */}
        <div className="flex flex-col justify-center max-w-[65%] space-y-1">
          {/* Título del proyecto */}
          <h1 className="text-sm sm:text-base lg:text-lg xl:text-base 2xl:text-lg font-bold text-gray-900 line-clamp-1 leading-tight">
            {title || 'Proyecto sin título'}
          </h1>
          
          {/* Categoría y información adicional en línea */}
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            {category && (
              <span className="font-medium text-[#9CE840] bg-green-50 px-2 py-0.5 rounded-full text-xs">
                {category}
              </span>
            )}
            <span className="font-semibold">Año:</span>
            <span>{year || 'N/A'}</span>
            <span className="font-semibold">Part.:</span>
            <span>{participants || 0}</span>
          </div>
          
          {/* Descripción */}
          <p className="line-clamp-2 text-xs sm:text-sm text-gray-700 leading-tight">
            {description || 'Sin descripción disponible'}
          </p>
        </div>
          {/* Estado y botón "Ver proyecto" */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Botón de estado */}
          {status && (
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full text-white ${statusColors[status] || 'bg-gray-500'}`}
            >
              {status}
            </span>
          )}
          
          {/* Botón "Ver proyecto" */}
          <button
            className="bg-black text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium whitespace-nowrap"
            onClick={handleViewProject}
          >
            Ver proyecto
          </button>
        </div>
      </div>
      
      {/* CSS personalizado para line-clamp */}
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProjectCard;