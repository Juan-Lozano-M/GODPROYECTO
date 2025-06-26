import { useEffect, useState } from "react";
import axios from "../../config/axiosConfig";
import NewsCard from "./NewsCard";

const NewsList = () => {
  // Estados para manejar las noticias y la paginación
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6; // Cantidad de noticias por página

  // Efecto para cargar las noticias desde el backend
  useEffect(() => {
    axios.get("/api/news/get-news")
      .then((response) => {
        console.log("Datos recibidos del backend:", response.data);
        if (response.data.status === "success") {
          setNews(response.data.news);
        } else {
          console.error("Error al cargar noticias:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error al conectar con el backend:", error);
      });
  }, []);

  // Cálculos para la paginación (usar todas las noticias recibidas)
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length / newsPerPage);

  // Manejador para cambiar de página y realizar scroll suave
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      setTimeout(() => {
        window.scrollTo({
          top: 500,
          behavior: 'smooth'
        });
      }, 50);
    }
  };

  // Renderizado condicional si no hay noticias
  if (!news || news.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold text-[#87C232]">¡No hay noticias disponibles!</h2>
          <p className="text-gray-600 mt-4">Aún no se encuentran noticias aquí.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      {/* Mapeo de las noticias actuales */}
      {currentNews.map((item, index) => (
        <NewsCard 
          key={item.id_noticia || index} // Usar id_noticia como key es mejor que el index
          categoria={item.categoria}
          imagen_url={item.imagen_url}
          autor={item.autor}
          fecha_creacion={item.fecha_creacion}
          titulo={item.titulo}
          descripcion={item.descripcion}
          id_noticia={item.id_noticia}
          slug={item.slug} // NUEVO: pasar el slug del backend
        />
      ))}

      {/* Navegación de paginación */}
      <nav aria-label="Page navigation" className="mt-8 flex justify-center">
        <ul className="flex items-center -space-x-px h-10 text-base">
          {/* Botón anterior */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            >
              <span className="sr-only">Anterior</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
            </button>
          </li>

          {/* Números de página */}
          {[...Array(totalPages)].map((_, index) => (
            <li key={index}>
              <button
                onClick={() => handlePageChange(index + 1)}
                className={`flex items-center justify-center px-4 h-10 leading-tight ${
                  currentPage === index + 1
                    ? "z-10 text-[#87C232] border border-[#87C232] bg-[#87C232]/10"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {index + 1}
              </button>
            </li>
          ))}

          {/* Botón siguiente */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            >
              <span className="sr-only">Siguiente</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NewsList;