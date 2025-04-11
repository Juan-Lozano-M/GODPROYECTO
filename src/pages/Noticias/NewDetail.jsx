import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShareButton from "../../components/buttons/ShareButton";
import SuscribeCard from "../../components/cards/SuscribeCard"; // Add this import

export default function NewDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [relatedNews, setRelatedNews] = useState([]);

  useEffect(() => {
    // Scroll al inicio cuando se carga una nueva noticia
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    fetch('/news.json')
      .then(response => response.json())
      .then(data => {
        const newsItem = data.find(item => item.slug === slug);
        if (newsItem) {
          newsItem.image = newsItem.image.startsWith('/') 
            ? newsItem.image 
            : `/${newsItem.image}`;
          setNews(newsItem);
          
          // Obtener artículos relacionados
          const related = data
            .filter(item => item.category === newsItem.category && item.slug !== newsItem.slug)
            .slice(0, 3);
          setRelatedNews(related);
        } else {
          setShowModal(true);
          setTimeout(() => {
            navigate('/noticiasv');
          }, 2000);
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
      {/* Hero Banner */}
      <div className="relative w-full h-[600px] overflow-hidden">
        <img 
          src={news.image} 
          alt={news.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
    
        <div className="absolute inset-0 z-20 flex items-end pb-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="max-w-4xl">
              <div className="inline-block px-4 py-2 mb-6 bg-[#87C232] text-white text-sm font-medium rounded">
                {news.category}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {news.title}
              </h1>
              <div className="flex items-center space-x-4 text-white/90">
                <div className="flex items-center space-x-2">
                  <span className="font-medium">{news.author}</span>
                </div>
                <span>•</span>
                <span>{news.date}</span>
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
            <div className="bg-white rounded-xl shadow-xl p-8">
              <div className="prose max-w-none">
                <h2 className="text-3xl font-bold mb-6">{news.subtitle}</h2>
                <div className="text-lg leading-relaxed text-gray-700 space-y-6">
                  {news.content && news.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                  {!news.content && (
                    <p>No content available.</p>
                  )}
                </div>
                
                {news.highlights && (
                  <div className="my-8 p-6 bg-gray-50 rounded-lg border-l-4 border-[#87C232]">
                    <h3 className="text-xl font-semibold mb-4">Puntos Destacados</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {news.highlights.map((highlight, index) => (
                        <li key={index} className="text-gray-700">{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {news.conclusion && (
                  <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Conclusión</h3>
                    <p className="text-lg text-gray-700">{news.conclusion}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6 mb-5">  {/* Changed from space-y-8 to space-y-6 */}
              {/* Share Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Compartir</h3>
                <div className="flex space-x-4">
                  <ShareButton/>
                </div>
              </div>

              {/* Related Articles section update */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Artículos Relacionados</h3>
                <div className="space-y-4">
                  {relatedNews.length > 0 ? (
                    relatedNews.map((article) => (
                      <div key={article.slug} className="group cursor-pointer" onClick={() => navigate(`/noticiasv/${article.slug}`)}>
                        <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="w-20 h-20 flex-shrink-0">
                            <img
                              src={article.image.startsWith('/') ? article.image : `/${article.image}`}
                              alt={article.title}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-[#87C232] transition-colors">
                              {article.title}
                            </h4>
                            <p className="text-sm text-gray-500 mt-1">{article.date}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-2">No hay artículos relacionados</p>
                  )}
                </div>
              </div>

              {/* Newsletter */}
              <div>
                <SuscribeCard 
                  title="GOD News"
                  subtitle="Recibe las últimas noticias directamente en tu correo."
                  buttonText="Suscribirse"
                  inputPlaceholder="Tu correo electrónico"
                  bannerText1="SUSCRÍBETE"
                  bannerText2="ÚNETE"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

