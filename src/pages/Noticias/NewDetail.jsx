import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function NewDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch('/news.json')
      .then(response => response.json())
      .then(data => {
        const newsItem = data.find(item => item.slug === slug);
        if (newsItem) {
          newsItem.image = newsItem.image.startsWith('/') 
            ? newsItem.image 
            : `/${newsItem.image}`;
          setNews(newsItem);
        } else {
          setShowModal(true);
          setTimeout(() => {
            navigate('/noticiasv');
          }, 2000); // Redirije en 2 segundos 
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
          {/* Hero Section Skeleton */}
          <div className="h-[600px] bg-gray-200 rounded-lg mb-10 relative">
            <div className="absolute bottom-20 left-4 md:left-6 space-y-4 w-full max-w-4xl">
              <div className="h-8 bg-gray-300 rounded w-32"></div>
              <div className="h-12 bg-gray-300 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 rounded w-48"></div>
            </div>
          </div>

          {/* Content Skeleton */}
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

      {/* Main Content */}
      <div className="container px-4 md:px-6 mx-auto -mt-10 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article */}
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
            <div className="sticky top-8 space-y-8">
              {/* Share Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Compartir</h3>
                <div className="flex space-x-4">
                  <button className="w-10 h-10 rounded-full bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center font-semibold">
                    F
                  </button>
                  <button className="w-10 h-10 rounded-full bg-blue-400 text-white hover:bg-blue-500 flex items-center justify-center font-semibold">
                    T
                  </button>
                </div>
              </div>

              {/* Related Articles */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4">Artículos Relacionados</h3>
                <div className="space-y-4">
                  {/* Add your related articles here */}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-gradient-to-br from-[#87C232] to-green-600 rounded-xl shadow-lg p-6 text-white">
                <h3 className="text-xl font-bold mb-3">Suscríbete al Newsletter</h3>
                <p className="mb-4 text-white/90">Recibe las últimas noticias directamente en tu correo.</p>
                <input
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 mb-3"
                />
                <button className="w-full bg-white text-green-600 font-medium py-2 px-4 rounded-lg hover:bg-white/90 transition-colors">
                  Suscribirse
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

