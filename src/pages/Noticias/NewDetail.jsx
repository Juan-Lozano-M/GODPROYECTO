import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ShareButton from "../../components/buttons/ShareButton";
import SuscribeCard from "../../components/cards/SuscribeCard"; // Add this import
import CartoonCard from "../../components/cards/CartoonCard";
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
          className="absolute inset-0 w-full h-full object-cover blur-[3px] filter brightness-75 scale-105"
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
            <CartoonCard title={news.subtitle}>
              <div className="prose max-w-none">
                <div className="text-lg leading-relaxed text-gray-700 space-y-6 border-l-4 border-black pl-4">
                  {news.content && news.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="hover:text-black transition-colors">{paragraph}</p>
                  ))}
                  {!news.content && (
                    <p>No content available.</p>
                  )}
                </div>
                
                {news.highlights && (
                  <div className="my-8 p-6 border-3 border-black">
                    <h3 className="text-xl font-black text-black uppercase mb-4">Puntos Destacados</h3>
                    <ul className="list-disc list-inside space-y-2">
                      {news.highlights.map((highlight, index) => (
                        <li key={index} className="text-gray-700 hover:text-black transition-colors">{highlight}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {news.conclusion && (
                  <div className="mt-8 border-t-3 border-black pt-6">
                    <h3 className="text-2xl font-black text-black uppercase mb-4">Conclusión</h3>
                    <p className="text-lg text-gray-700 hover:text-black transition-colors">{news.conclusion}</p>
                  </div>
                )}
              </div>
            </CartoonCard>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6 mb-5">  {/* Changed from space-y-8 to space-y-6 */}
              {/* Share Section */}
              <CartoonCard title="Compartir">
                <div className="flex space-x-4">
                  <ShareButton/>
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
                              src={article.image.startsWith('/') ? article.image : `/${article.image}`}
                              alt={article.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold group-hover:text-white transition-colors">
                              {article.title}
                            </h4>
                            <p className="text-sm mt-1 group-hover:text-gray-300">
                              {article.date}
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

