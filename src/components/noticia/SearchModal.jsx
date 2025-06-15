import React, { useState, useEffect } from 'react';
import { X, Search, Filter } from 'lucide-react';
import axios from 'axios';
import NewsCard from './NewsCard';

const SearchModal = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [hasSearched, setHasSearched] = useState(false);

  // Categorías disponibles (puedes ajustar según tus necesidades)
  const categories = [
    'Educación',
    'Tecnología',
    'Ciencia',
    'Deportes',
    'Cultura',
    'Salud',
    'Entretenimiento',
    'Negocios'
  ];

  // Limpiar estado cuando se abre/cierra el modal
  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedCategory('');
      setSearchResults([]);
      setCurrentPage(1);
      setPagination({});
      setHasSearched(false);
    }
  }, [isOpen]);

  // Función para realizar la búsqueda
  const handleSearch = async (page = 1) => {
    if (!searchQuery.trim() && !selectedCategory) {
      alert('Por favor ingresa un término de búsqueda o selecciona una categoría');
      return;
    }

    setIsLoading(true);
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      
      if (searchQuery.trim()) {
        params.append('q', searchQuery.trim());
      }
      
      if (selectedCategory) {
        params.append('category', selectedCategory);
      }
      
      params.append('page', page.toString());
      params.append('per_page', '6');

      const response = await axios.get(`http://localhost:5000/api/news/search?${params}`);
      
      if (response.data.status === 'success') {
        setSearchResults(response.data.news);
        setPagination(response.data.pagination);
        setCurrentPage(page);
      } else {
        console.error('Error en la búsqueda:', response.data.message);
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar cambio de página
  const handlePageChange = (newPage) => {
    handleSearch(newPage);
  };

  // Limpiar filtros
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSearchResults([]);
    setHasSearched(false);
    setCurrentPage(1);
    setPagination({});
  };

  // Manejar tecla Enter en el input de búsqueda
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header del modal */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Search className="w-6 h-6" />
            Buscar Noticias
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Formulario de búsqueda */}
        <div className="p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Input de búsqueda */}
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar por título, descripción o contenido..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#87C232] focus:border-transparent outline-none"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Selector de categoría */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#87C232] focus:border-transparent outline-none appearance-none bg-white"
              >
                <option value="">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3">
            <button
              onClick={() => handleSearch(1)}
              disabled={isLoading}
              className="px-6 py-2 bg-[#87C232] text-white rounded-lg hover:bg-[#76B028] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Buscando...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Buscar
                </>
              )}
            </button>
            
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Limpiar
            </button>
          </div>
        </div>

        {/* Resultados */}
        <div className="flex-1 overflow-y-auto p-6">
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#87C232]"></div>
            </div>
          ) : hasSearched ? (
            <>
              {searchResults.length > 0 ? (
                <>
                  {/* Información de resultados */}
                  <div className="mb-6 text-gray-600">
                    {pagination.total > 0 && (
                      <p>
                        Mostrando {searchResults.length} de {pagination.total} resultados
                        {searchQuery && ` para "${searchQuery}"`}
                        {selectedCategory && ` en la categoría "${selectedCategory}"`}
                      </p>
                    )}
                  </div>

                  {/* Lista de noticias */}
                  <div className="space-y-6">
                    {searchResults.map((item, index) => (
                      <NewsCard 
                        key={item.id_noticia || index}
                        categoria={item.categoria}
                        imagen_url={item.imagen_url}
                        autor={item.autor}
                        fecha_creacion={item.fecha_creacion}
                        titulo={item.titulo}
                        descripcion={item.descripcion}
                        id_noticia={item.id_noticia}
                        slug={item.slug}
                      />
                    ))}
                  </div>

                  {/* Paginación */}
                  {pagination.pages > 1 && (
                    <nav className="mt-8 flex justify-center">
                      <ul className="flex items-center -space-x-px h-10 text-base">
                        {/* Botón anterior */}
                        <li>
                          <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={!pagination.has_prev}
                            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                          >
                            <span className="sr-only">Anterior</span>
                            <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                            </svg>
                          </button>
                        </li>

                        {/* Números de página */}
                        {[...Array(pagination.pages)].map((_, index) => (
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
                            disabled={!pagination.has_next}
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
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="w-16 h-16 mx-auto" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No se encontraron resultados
                  </h3>
                  <p className="text-gray-500">
                    Intenta con otros términos de búsqueda o selecciona una categoría diferente
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                Busca noticias de tu interés
              </h3>
              <p className="text-gray-500">
                Ingresa un término de búsqueda o selecciona una categoría para comenzar
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;