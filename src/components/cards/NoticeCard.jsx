// Mapeo de colores por estado
const statusColors = {
  Publicada: 'bg-[#9CE840]',
  Archivada: 'bg-[#FFBE00]',
  Eliminada: 'bg-[#EA4335]',
};

const NoticeCard = ({ image, title, author, date, summary, status, isSelected, onSelect, slug, newsId }) => {
  
  const handleViewNews = (e) => {
    e.stopPropagation(); // Evitar que se active onSelect cuando se hace clic en "Ver noticia"
    
    // Crear la URL usando el slug o ID como fallback
    const newsUrl = slug ? `/noticiasv/${slug}` : `/noticiasv/${newsId}`;
    
    // Abrir en una nueva pestaña
    window.open(newsUrl, '_blank');
  };

  return (    <div
      className={`flex items-center w-full h-20 sm:h-30 lg:h-40 xl:h-36 2xl:h-40 bg-black/7 rounded-r-lg rounded-l-2><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<xl cursor-pointer border-2 transition-all ${isSelected ? 'border-[#87C232] shadow-lg' : 'border-transparent'}`}
      onClick={onSelect}    >
      {/* Imagen de la noticia */}
      <img src={image} alt="Noticia imagen" className="h-20 w-20 sm:w-30 sm:h-30 lg:w-50 lg:h-full xl:w-44 xl:h-full 2xl:w-50 2xl:h-full rounded-l-2xl" />
      
      {/* Contenido general */}
      <div className="flex justify-between items-center w-full h-full">
        {/* Información de la noticia - Limitar ancho máximo */}        <div className="flex flex-col ml-4 sm:ml-5 lg:ml-10 xl:ml-8 2xl:ml-10 max-w-[70%]">
          <h1 className="text-[13px] sm:text-xl lg:text-2xl xl:text-xl 2xl:text-[27px] font-adlam">
            {title}
          </h1>
          <p className="text-[7px] sm:text-[12px] xl:text-[16px] lg:text-lg  2xl:text-[16px] font-adlam text-[#3E3E3E]">
            Redactado por: {author} - {date}
          </p>
          <p className="line-clamp-1 text-[8px] sm:text-sm lg:text-lg xl:text-base 2xl:text-lg font-adlam mt-2 sm:mt-3 lg:mt-5 xl:mt-3 2xl:mt-5">{summary}</p>
        </div>
        
        {/* Estado y botón "Ver noticia" - Ancho fijo */}        <div className="flex flex-col items-center justify-center ml-auto mr-3 sm:mr-6 space-y-3 lg:space-y-7 xl:space-y-5 2xl:space-y-7 flex-shrink-0">
          {/* Botón de estado */}
          {status && (
            <span
              className={`w-fit px-1 py-1 sm:px-2 sm:py-1 text-[8px] sm:text-[13px] lg:text-sm xl:text-[15px] 2xl:text-[17px] font-adlam rounded-full ${statusColors[status]}`}
            >
              {status}
            </span>          )}
          
          {/* Botón "Ver noticia" con ancho fijo */}
          <div
            className="w-10 sm:w-16 bg-black sm:py-1 lg:px-2 lg:py-2 xl:px-2 xl:py-1 2xl:px-2 2xl:py-2 rounded-lg lg:w-24 xl:w-22 2xl:w-24 text-center flex-shrink-0 cursor-pointer hover:bg-gray-800 transition-colors"
            onClick={handleViewNews}
          >
            <h1 className="text-white font-adlam text-[10px] sm:text-[13px] lg:text-[15px] xl:text-[14px] 2xl:text-[15px] whitespace-nowrap">
              <span className="block lg:block xl:hidden 2xl:hidden sm:mx-2">Ver</span>
              <span className="hidden lg:hidden xl:block 2xl:block">Ver noticia</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;