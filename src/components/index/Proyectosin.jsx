import { Heart, MessageCircle, Repeat2, User } from 'lucide-react';

const NewsCard = ({ news, index }) => {
  // Validación para evitar errores si news es undefined
  if (!news) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-black overflow-hidden mb-4 mx-2 flex-shrink-0 w-72 md:w-80 md:mx-auto">
      {/* Imagen */}
      <div className="relative h-50 overflow-hidden">
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
      <div className="p-5">
        {/* Autor y tiempo */}
        <div className="flex items-center mb-3">
          <div className="w-6 h-10 bg-gray-300 rounded-full flex items-center justify-center mr-3">
            <User size={16} className="text-gray-600" />
          </div>
          <div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-900 text-sm mr-2">{news.author || 'Autor desconocido'}</span>
              <span className="text-blue-500 text-xs font-medium mr-2">• {news.category || 'General'}</span>
              <span className="text-gray-500 text-xs">• {news.time || 'Hace un momento'}</span>
            </div>
          </div>
        </div>
        
        {/* Título */}
        <h3 className="font-bold text-gray-900 text-base mb-2 leading-tight">
          {news.title || 'Título no disponible'}
        </h3>
        
        {/* Descripción */}
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          {news.description || 'Descripción no disponible'}
        </p>
        
        {/* Interacciones */}
        <div className="flex items-center justify-between text-gray-500">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
              <MessageCircle size={16} />
              <span className="text-sm">{news.comments}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-green-500 transition-colors">
              <Repeat2 size={16} />
              <span className="text-sm">{news.shares}</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
              <Heart size={16} />
              <span className="text-sm">{news.likes}</span>
            </button>
          </div>
        </div>
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
  const newsData = [
    {
      id: 1,
      author: "Luis Herrera",
      category: "OceanTech",
      time: "8h",
      title: "Robots autónomos limpian océanos",
      description: "Flota de robots submarinos remueve 100 toneladas de plástico mensualmente, utilizando IA para identificar y recolectar desechos.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=250&fit=crop",
      comments: 16,
      shares: 5,
      likes: 39
    },
    {
      id: 2,
      author: "María González",
      category: "SpaceTech",
      time: "12h",
      title: "Nueva estación espacial completada",
      description: "La estación orbital más avanzada del mundo inicia operaciones científicas con tecnología de última generación.",
      image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=250&fit=crop",
      comments: 24,
      shares: 8,
      likes: 67
    },
    {
      id: 3,
      author: "Carlos Mendoza",
      category: "AI Research",
      time: "6h",
      title: "IA detecta enfermedades tempranas",
      description: "Algoritmo de inteligencia artificial identifica cáncer con 99% de precisión en radiografías, revolucionando diagnósticos médicos.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      comments: 45,
      shares: 12,
      likes: 128
    },
    {
      id: 4,
      author: "Ana Rodríguez",
      category: "Green Energy",
      time: "4h",
      title: "Planta solar genera energía nocturna",
      description: "Innovadora tecnología permite almacenar calor solar durante el día para generar electricidad las 24 horas.",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
      comments: 31,
      shares: 15,
      likes: 89
    },
    {
      id: 5,
      author: "Roberto Silva",
      category: "Transport",
      time: "2h",
      title: "Taxis voladores inician pruebas",
      description: "Vehículos de transporte aéreo urbano comienzan fase de testing en tres ciudades principales del país.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
      comments: 28,
      shares: 19,
      likes: 156
    },
    {
      id: 6,
      author: "Elena Vásquez",
      category: "BioTech",
      time: "1h",
      title: "Cultivos resistentes a sequía",
      description: "Científicos desarrollan plantas modificadas genéticamente que sobreviven sin agua durante meses, prometiendo seguridad alimentaria.",
      image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=250&fit=crop",
      comments: 19,
      shares: 7,
      likes: 73
    }
  ];

  // Dividir noticias en 3 columnas para desktop
  const column1 = [newsData[0], newsData[3]];
  const column2 = [newsData[1], newsData[4]];
  const column3 = [newsData[2], newsData[5]];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white px-4 py-6">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center">
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
        `}
      </style>
    </div>
  );
};

export default Proyectosin;