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
      <div className="flex justify-between items-center w-full h-full px-4">
        {/* Información de la noticia */}
        <div className="flex flex-col ml-6">
          <h1 className="text-[15px] sm:text-[20px] xl:text-[18px] 2xl:text-[26px] font-adlam">
            {title}
          </h1>
          <p className="text-[11px] sm:text-[15px] xl:text-[12px] 2xl:text-[18px] font-adlam mr-2 text-[#3E3E3E]">
            Redactado por: {author} - {date}
          </p>
          <p className="text-lg font-adlam mt-2">{summary}</p>
        </div>

        {/* Estado y botón "Ver noticia" */}
        <div className="flex flex-col items-center justify-center mr-3 space-y-6">

          {/* Botón de estado */}
          {status && (
            <span
              className={`w-fit px-3 py-2 text-xs sm:text-[17px] font-adlam rounded-full ${statusColors[status]}`}
            >
              {status}
            </span>
          )}

          {/* Botón "Ver noticia" */}
          <div className="bg-black px-6 py-3 rounded-lg w-auto">
            <h1
              className="text-white font-adlam text-[16px]"
            >
              <span className="block lg:hidden xl:flex 2xl:hidden sm:mx-2">Ver</span>
              <span className="hidden lg:block xl:hidden 2xl:block">Ver noticia</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeCard;
