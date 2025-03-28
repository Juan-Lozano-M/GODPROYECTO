import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import newsData from '../../data/news.json';

function NoticiaDetail() {
  const { slug } = useParams();
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    const noticiaEncontrada = newsData.find(item => item.slug === slug);
    setNoticia(noticiaEncontrada);
  }, [slug]);

  if (!noticia) return <div>Loading...</div>;

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <span className="bg-gray-200 px-4 py-1 text-sm">{noticia.category}</span>
        <h1 className="text-5xl font-bold mt-8 mb-6">{noticia.title}</h1>
        <div className="flex items-center text-gray-600 mb-8">
          <span>{noticia.author}</span>
          <span className="mx-2">•</span>
          <span>{noticia.date}</span>
        </div>
        <img 
          src={noticia.image} 
          alt={noticia.title}
          className="w-full h-[500px] object-cover mb-8"
        />
        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed">{noticia.description}</p>
          {/* Add more content sections as needed */}
        </div>
      </div>
    </main>
  );
}

export default NoticiaDetail;