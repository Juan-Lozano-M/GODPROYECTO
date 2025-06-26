import { User } from 'lucide-react';
import { useEffect, useState } from 'react';
import axios from '../../config/axiosConfig';

const NewsCard = ({ news, index }) => {
  // Validación para evitar errores si news es undefined
  if (!news) {
    return null;
  }

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    
    try {
      const date = new Date(dateString);
      
      // Verificar si la fecha es válida
      if (isNaN(date.getTime())) {
        return 'Fecha no disponible';
      }
      
      // Formatear la fecha en español
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      };
      
      return date.toLocaleDateString('es-ES', options);
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return 'Fecha no disponible';
    }
  };

  // Limitar la descripción a 180 caracteres
  const maxDescLength = 180;
  const desc = news.description && news.description.length > maxDescLength
    ? news.description.slice(0, maxDescLength) + '...'
    : news.description || 'Descripción no disponible';

  // Obtener la imagen de perfil del autor
  const authorImage = news.author_image || news.autor?.profile_image;
  const authorName = news.author || news.autor?.nombre || 'Autor desconocido';

  // Obtener la fecha de publicación
  const publishDate = news.published_at || news.created_at || news.date || news.fecha;

  return (
    <div className="bg-white rounded-xl border border-black overflow-hidden mb-4 mx-2 flex-shrink-0 w-72 md:w-80 md:mx-auto" style={{ minHeight: '420px', maxHeight: '420px', display: 'flex', flexDirection: 'column' }}>
      {/* Imagen */}
      <div className="relative h-50 overflow-hidden" style={{ minHeight: '180px', maxHeight: '180px' }}>
        <img 
          src={news.image || '/placeholder-image.jpg'} 
          alt={news.title || 'Noticia'}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
        <div className="absolute inset-0"></div>
      </div>
      
      {/* Contenido */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        {/* Autor, categoría y tiempo */}
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3 overflow-hidden relative">
            {authorImage ? (
              <img 
                src={authorImage} 
                alt={authorName}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Si la imagen falla, ocultar y mostrar el icono por defecto
                  e.target.style.display = 'none';
                }}
              />
            ) : null}
            <User 
              size={16} 
              className={`text-gray-600 ${authorImage ? 'absolute inset-0 m-auto' : ''}`}
              style={{ display: authorImage ? 'none' : 'block' }}
            />
          </div>
          <div>
            <div className="flex items-center flex-wrap">
              <span className="font-semibold text-gray-900 text-sm mr-2">{news.author || 'Autor desconocido'}</span>
              <span className="text-blue-500 text-xs font-medium mr-2">• {news.category || 'General'}</span>
            </div>
            {/* Fecha concreta siempre debajo de la categoría, formato dd/mm/yyyy */}
            <div>
              <span className="text-gray-500 text-xs block mt-1">
                {(() => {
                  // news.fecha_creacion puede venir en formato ISO o como string
                  const fechaRaw = news.fecha_creacion || news.date;
                  if (!fechaRaw) return 'Sin fecha';
                  try {
                    const fecha = new Date(fechaRaw);
                    if (isNaN(fecha.getTime())) return 'Sin fecha';
                    const dia = String(fecha.getDate()).padStart(2, '0');
                    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
                    const anio = fecha.getFullYear();
                    return `${dia}/${mes}/${anio}`;
                  } catch {
                    return 'Sin fecha';
                  }
                })()}
              </span>
            </div>
          </div>
        </div>        {/* Título */}
        <h3 className="font-bold text-gray-900 text-base mb-2 leading-tight text-left w-full">
          {news.title || 'Título no disponible'}
        </h3>
        {/* Descripción justo debajo del título, alineada a la izquierda y sin importar el largo */}
        <p className="text-gray-600 text-sm leading-relaxed text-left w-full mb-2">
          {desc}
        </p>
      </div>
    </div>
  );
};

const NewsColumn = ({ news, speed = 30 }) => (
  <div className="relative overflow-hidden h-screen">
    {/* Gradiente superior - solo en desktop */}
    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-gray-50 to-transparent z-10 pointer-events-none hidden md:block"></div>
    
    {/* Gradiente inferior - solo en desktop */}
    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-10 pointer-events-none hidden md:block"></div>
    
    <div 
      className="animate-scroll-up"
      style={{
        animationDuration: `${speed}s`
      }}
    >
      {/* Primera iteración */}
      {news.map((item, index) => (
        <NewsCard key={`first-${index}`} news={item} index={index} />
      ))}
      {/* Segunda iteración para loop infinito */}
      {news.map((item, index) => (
        <NewsCard key={`second-${index}`} news={item} index={index} />
      ))}
      {/* Tercera iteración para asegurar continuidad */}
      {news.map((item, index) => (
        <NewsCard key={`third-${index}`} news={item} index={index} />
      ))}
    </div>
  </div>
);

const Proyectosin = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get('/api/news/get-news');
        if (res.data && res.data.status === 'success') {
          setNewsData(res.data.news);
        }
      } catch (err) {
        console.error('Error al cargar noticias:', err);
      }
    };
    fetchNews();
  }, []);

  // Dividir noticias en 3 columnas para desktop
  const column1 = newsData.filter((_, i) => i % 3 === 0);
  const column2 = newsData.filter((_, i) => i % 3 === 1);
  const column3 = newsData.filter((_, i) => i % 3 === 2);

  return (
    <div className="bg-gray-50 min-h-screen">      {/* Header */}
      <div className="bg-white px-4 py-6">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-adlam text-gray-900 text-center">
          Nuestras noticias
        </h1>
        <p className="text-gray-600 md:text-lg text-center mt-2">
          Nuestras noticias mas relevantes
        </p>
      </div>

      {/* Desktop: 3 columnas con scroll vertical */}
      <div className="hidden md:block">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="grid grid-cols-3 gap-8 h-screen">
            <NewsColumn news={column1} speed={28} />
            <NewsColumn news={column2} speed={35} />
            <NewsColumn news={column3} speed={32} />
          </div>
        </div>
      </div>

      {/* Mobile: Carrusel horizontal */}
      <div className="md:hidden">
        <div className="py-6">
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-horizontal">
              {/* Primera iteración */}
              {newsData.map((item, index) => (
                <NewsCard key={`mobile-first-${index}`} news={item} index={index} />
              ))}
              {/* Segunda iteración para loop infinito */}
              {newsData.map((item, index) => (
                <NewsCard key={`mobile-second-${index}`} news={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS personalizado para las animaciones */}
      <style>
        {`
          @keyframes scroll-up {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-66.666%);
            }
          }

          @keyframes scroll-horizontal {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-scroll-up {
            animation: scroll-up linear infinite;
          }
          
          .animate-scroll-horizontal {
            animation: scroll-horizontal 40s linear infinite;
          }

          .truncate-3-lines {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }

          .truncate-5-lines {
            display: -webkit-box;
            -webkit-line-clamp: 5;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        `}
      </style>
    </div>
  );
};

export default Proyectosin;