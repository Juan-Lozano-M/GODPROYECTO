import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

const NewsList = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  useEffect(() => {
    fetch("/news.json")
      .then((response) => response.json())
      .then((data) => setNews(data))
      .catch((error) => console.error("Error cargando noticias:", error));
  }, []);

  // Noticias a mostrar en la página actual
  const indexOfLastNews = currentPage * newsPerPage;
  const indexOfFirstNews = indexOfLastNews - newsPerPage;
  const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);
  const totalPages = Math.ceil(news.length / newsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
      {currentNews.map((item, index) => (
        <NewsCard key={index} {...item} />
      ))}

      {/* Pagination */}
      <nav aria-label="Page navigation" className="mt-8 flex justify-center">
        <ul className="flex items-center -space-x-px h-10 text-base">
          {/* Previous button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            >
              <span className="sr-only">Previous</span>
              <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
              </svg>
            </button>
          </li>

          {/* Page numbers */}
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

          {/* Next button */}
          <li>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
            >
              <span className="sr-only">Next</span>
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
