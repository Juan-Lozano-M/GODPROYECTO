import React from 'react';

// Mapeo de colores por estado
const statusColors = {
  Publicada: 'bg-[#9CE840]',
  Archivada: 'bg-[#FFBE00]',
  Eliminada: 'bg-[#EA4335]',
};

const NoticeCard = ({ image, title, author, date, summary, status }) => {
  return (
    <div className="flex items-center w-full h-20 sm:h-40 bg-black/7 rounded-r-lg rounded-l-3xl">
      {/* Imagen de la noticia */}
      <img src={image} alt="Noticia" className="h-full sm:w-50 rounded-lg" />
      
      {/* Contenido general */}
      <div className="flex justify-between items-center w-full h-full">
        {/* Información de la noticia - Limitar ancho máximo */}
        <div className="flex flex-col lg:ml-10 max-w-[70%]">
          <h1 className="text-[15px] sm:text-[20px] lg:text-2xl xl:text-[24px] 2xl:text-[27px] font-adlam">
            {title}
          </h1>
          <p className="text-[11px] sm:text-[15px] xl:text-[16px] lg:text-lg 2xl:text-[16px] font-adlam text-[#3E3E3E]">
            Redactado por: {author} - {date}
          </p>
          <p className="line-clamp-1 lg:text-lg 2xl:text-lg font-adlam mt-5">{summary}</p>
        </div>
        
        {/* Estado y botón "Ver noticia" - Ancho fijo */}
        <div className="flex flex-col items-center justify-center ml-auto mr-6 space-y-7 flex-shrink-0">
          {/* Botón de estado */}
          {status && (
            <span
              className={`w-fit px-3 py-2 text-xs sm:text-[17px] lg:text-sm xl:text-[17px]  font-adlam rounded-full ${statusColors[status]}`}
            >
              {status}
            </span>
          )}
          
          {/* Botón "Ver noticia" con ancho fijo */}
          <div className="bg-black lg:px-2 lg:py-2 rounded-lg w-16 lg:w-24 text-center flex-shrink-0">
            <h1 className="text-white font-adlam lg:text-[15px] whitespace-nowrap">
              <span className="block lg:block xl:hidden sm:mx-2">Ver</span>
              <span className="hidden lg:hidden xl:block">Ver noticia</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;