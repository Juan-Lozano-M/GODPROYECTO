import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ShareButton from "../../components/buttons/ShareButton";
import CartoonCard from "../../components/cards/CartoonCard";
import Navbar from "../../components/index/Navbar";
import axiosInstance from "../../config/axiosConfig";


export default function NewDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [relatedNews, setRelatedNews] = useState([]);
  
  // Ref para controlar si ya se incrementó la vista
  const viewIncrementedRef = useRef(false);

  const hasIncrementedView = useRef(false);

  useEffect(() => {
    // Resetear el ref cuando cambia el slug
    viewIncrementedRef.current = false;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });

    axiosInstance.get(`/api/news/${slug}`)
      .then(response => {
        if (response.data.status === "success") {
          const newsItem = response.data.news;
          setNews(newsItem);

          // Incrementar vista solo si no se ha hecho antes
          if (!viewIncrementedRef.current) {
            viewIncrementedRef.current = true;
            axiosInstance.post(`/api/news/${newsItem.id_noticia}/view`)
              .catch(err => console.warn("No se pudo incrementar vistas:", err));
          }

          // Obtener relacionadas
          return axiosInstance.get(`/api/news/search?category=${newsItem.categoria}&per_page=4`);
        } else {
          throw new Error(response.data.message || 'Noticia no encontrada');
        }
      })
      .then(response => {
        if (response && response.data.status === "success") {
          const related = response.data.news
            .filter(item => item.slug !== slug)
            .slice(0, 3);
          setRelatedNews(related);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading news:', error);
        setLoading(false);
        setShowModal(true);
        setTimeout(() => {
          navigate('/noticiasv');
        }, 2000);
      });
  }, [slug, navigate]);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Función para obtener el nombre del autor
  const getAuthorName = (autor) => {
    if (typeof autor === 'object' && autor?.nombre) {
      return autor.nombre;
    }
    return autor || 'Autor desconocido';
  };

  // Función para formatear el contenido en párrafos
  const formatContent = (content) => {
    if (!content) return [];
    
    // Dividir por saltos de línea y filtrar párrafos vacíos
    return content
      .split('\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white p-8">
  
        <div className="container mx-auto">
          {/* Esqueleto de hero section */}
          <div className="h-[600px] bg-gray-200 rounded-lg mb-10 relative">
            <div className="absolute bottom-20 left-4 md:left-6 space-y-4 w-full max-w-4xl">
              <div className="h-8 bg-gray-300 rounded w-32"></div>
              <div className="h-12 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-48"></div>
            </div>
          </div>

          {/* Esqueleto del contenido */}
          <div className="space-y-2.5 animate-pulse max-w-lg">
            <div className="flex items-center w-full">
              <div className="h-2.5 bg-gray-200 rounded-full w-32"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-24"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[480px]">
              <div className="h-2.5 bg-gray-200 rounded-full w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full max-w-[400px]">
              <div className="h-2.5 bg-gray-300 rounded-full w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-80"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[480px]">
              <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-24"></div>
            </div>
            <div className="flex items-center w-full max-w-[440px]">
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-32"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-24"></div>
              <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-full"></div>
            </div>
            <div className="flex items-center w-full max-w-[360px]">
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
              <div className="h-2.5 ms-2 bg-gray-200 rounded-full w-80"></div>
              <div className="h-2.5 ms-2 bg-gray-300 rounded-full w-full"></div>
            </div>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <>
        {showModal && (
          <div className="fixed inset-0 bg-[#9CE840] bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl">
              <h2 className="text-xl font-bold text-red-600 mb-2">¡Noticia no encontrada!</h2>
              <p className="text-gray-600">Redirigiendo a la página principal de noticias...</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <Navbar />
      {/* Hero Banner */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <img 
          src={news.imagen_url || '/default-news-image.jpg'} 
          alt={news.titulo}
          className="absolute inset-0 w-full h-full object-cover blur-[3px] filter brightness-75 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
    
        <div className="absolute inset-0 z-20 flex items-end pb-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-2 mb-6 bg-[#87C232] text-white text-sm font-medium rounded capitalize">
                {news.categoria}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {news.titulo}
              </h1>
              <div className="flex items-center space-x-4 text-white/90">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{getAuthorName(news.autor)}</span>
                </div>
                <span>•</span>
                <span>{formatDate(news.fecha_creacion)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="container px-4 md:px-6 mx-auto -mt-10 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Articulo */}
          <div className="lg:col-span-8">
            <CartoonCard title={news.descripcion || "Descripción de la noticia"}>
              <div className="prose max-w-none">
                <div className="text-lg leading-relaxed text-gray-700 space-y-6 border-l-4 border-black pl-4">
                  {news.contenido ? (
                    formatContent(news.contenido).map((paragraph, index) => (
                      <p key={index} className="hover:text-black transition-colors">
                        {paragraph}
                      </p>
                    ))
                  ) : (
                    <p>No hay contenido disponible.</p>
                  )}
                </div>
              </div>
            </CartoonCard>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6 mb-5">
              {/* Share Section */}
              <CartoonCard title="Compartir">
                <div className="flex space-x-4">
                  <ShareButton newsId={news.id_noticia} />
                </div>
              </CartoonCard>

              {/* Related Articles section */}
              <CartoonCard title="Artículos Relacionados">
                <div className="space-y-4">
                  {relatedNews.length > 0 ? (
                    relatedNews.map((article) => (
                      <div 
                        key={article.slug} 
                        className="group cursor-pointer border-3 border-black rounded-xl p-3 transition-transform duration-300 hover:scale-105 hover:bg-black hover:text-white"
                        onClick={() => navigate(`/noticiasv/${article.slug}`)}
                      >
                        <div className="flex items-start space-x-4">
                          <div className="w-20 h-20 flex-shrink-0 border-2 border-black overflow-hidden rounded-lg">
                            <img
                              src={article.imagen_url || '/default-news-image.jpg'}
                              alt={article.titulo}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold group-hover:text-white transition-colors">
                              {article.titulo}
                            </h4>
                            <p className="text-sm mt-1 group-hover:text-gray-300">
                              {formatDate(article.fecha_creacion)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-2 border-2 border-black rounded-xl p-3">
                      No hay artículos relacionados
                    </p>
                  )}
                </div>
              </CartoonCard>

              {/* Newsletter */}

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}