import { AlertCircle, Calendar, ExternalLink, Loader2, Target, Users, X } from 'lucide-react';
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";
import { useEffect, useRef, useState } from 'react';
import Footer from '../components/index/Footer';
import Navbar from "../components/index/Navbar";
import { projectService } from '../services/projectService';
import { registrarVisita } from '../services/registerVisit';

const ProyectosView = () => {
  const [filter, setFilter] = useState('all');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollbarRef = useRef(null);

  useEffect(() => {
    registrarVisita('projects');
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
        const response = await projectService.getAllProjects();
      if (response.status === 'success') {
        // Transformar los datos del backend al formato que espera el frontend
        const transformedProjects = response.projects.map(project => {
          // Verificar y limpiar la URL de la imagen
          let imageUrl = project.image;
          
          // Si no hay imagen o está vacía, usar imagen por defecto
          if (!imageUrl || imageUrl.trim() === '') {
            imageUrl = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop';
          }
          
          // Si la imagen no parece ser una URL válida, usar imagen por defecto
          if (!imageUrl.startsWith('http')) {
            imageUrl = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop';
          }
          
          console.log('Project image URL:', imageUrl); // Debug
          
          return {
            id: project.id,
            title: project.title,
            description: project.description,
            category: project.category,
            status: project.status === 'activo' ? 'En Progreso' : 
                    project.status === 'completado' ? 'Completado' : 'Planeado',
            date: project.year?.toString() || '2024',
            participants: project.participants || 0,
            image: imageUrl,
            tags: project.areas || [],
            methodology1: project.methodology1 || '',
            methodology2: project.methodology2 || '',
            author: project.author          };
        });
        
        setProjects(transformedProjects);
      } else {
        setError('Error al cargar los proyectos');
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Error de conexión al servidor');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const categories = ['all', 'completed', 'in-progress'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : filter === 'completed'
    ? projects.filter(project => project.status === 'Completado')
    : projects.filter(project => project.status === 'En Progreso');

  const StatusBadge = ({ status }) => (
    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
      status === 'Completado' 
        ? 'bg-green-50 text-green-700 border border-green-200' 
        : status === 'En Progreso'
        ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
        : 'bg-blue-50 text-blue-700 border border-blue-200'
    }`}>
      {status}
    </span>
  );

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <Loader2 className="w-12 h-12 text-[#9CE840] animate-spin mb-4" />
      <p className="text-gray-600 text-lg">Cargando proyectos...</p>
    </div>
  );

  // Error component
  const ErrorMessage = () => (
    <div className="flex flex-col items-center justify-center py-20">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <p className="text-red-600 text-lg mb-4">{error}</p>
      <button 
        onClick={fetchProjects}
        className="bg-[#9CE840] text-white px-6 py-2 rounded-lg hover:bg-green-400 transition-colors duration-200"
      >
        Reintentar
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Nuestros Proyectos
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubre los programas de asesoramiento vocacional que hemos desarrollado para 
              guiar a jóvenes hacia un futuro profesional exitoso y satisfactorio
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-24 h-1 bg-[#9CE840] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="md:sticky top-0 z-40 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 text-sm font-medium rounded-lg border border-black transition-all duration-300 ${
                  filter === category
                    ? 'border-[#9CE840] bg-transparent text-gray-900'
                    : 'border-black bg-transparent text-gray-900 hover:border-[#9CE840]'
                }`}
              >
                {category === 'all' ? 'Todos los Proyectos' : 
                 category === 'completed' ? 'Proyectos Completados' : 
                 'Proyectos en Proceso'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <>
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative bg-transparent rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-black"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                  style={{
                    transform: hoveredProject === project.id ? 'translateY(-8px)' : 'translateY(0)',
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden">                    <img
                      src={project.image || 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop'}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        console.log('Error loading image:', e.target.src);
                        e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop';
                      }}
                      onLoad={(e) => {
                        console.log('Image loaded successfully:', e.target.src);
                      }}
                    />
                    {/* Overlay removido temporalmente para debug */}
                    {/* <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300"></div> */}
                    <div className="absolute top-4 right-4">
                      <StatusBadge status={project.status} />
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                      <button 
                        onClick={() => openModal(project)}
                        className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-medium hover:bg-[#9CE840] hover:text-white transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <ExternalLink className="w-4 h-4" />
                        Ver Proyecto
                      </button>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-[#9CE840] bg-green-50 px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {project.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {project.participants}
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#9CE840] transition-colors duration-300">
                      {project.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(project.tags || []).slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs font-medium bg-gray-100 text-gray-700 px-3 py-1 rounded-full hover:bg-green-100 hover:text-[#9CE840] transition-colors duration-200"
                        >
                          {tag}
                        </span>
                      ))}
                      {(project.tags || []).length > 3 && (
                        <span className="text-xs font-medium text-gray-500 px-3 py-1">
                          +{project.tags.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No projects message */}
            {filteredProjects.length === 0 && !loading && !error && (
              <div className="text-center py-20">
                <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No hay proyectos en esta categoría
                </h3>
                <p className="text-gray-500">
                  Selecciona otra categoría para ver más proyectos
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Stats Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-[#9CE840] transition-colors duration-300">
                {projects.reduce((total, project) => total + (project.participants || 0), 0)}+
              </div>
              <div className="text-gray-600 font-medium">Jóvenes Orientados</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-[#9CE840] transition-colors duration-300">
                85%
              </div>
              <div className="text-gray-600 font-medium">Éxito en Admisiones</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-[#9CE840] transition-colors duration-300">
                8+
              </div>
              <div className="text-gray-600 font-medium">Años de Experiencia</div>
            </div>
            <div className="group">
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2 group-hover:text-[#9CE840] transition-colors duration-300">
                {projects.length}+
              </div>
              <div className="text-gray-600 font-medium">Proyectos Realizados</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal con OverlayScrollbars */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-0 transition-all duration-300 animate-backdropFadeIn"
            onClick={closeModal}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(8px)'
            }}
          ></div>
          
          {/* Modal Content con OverlayScrollbars */}
          <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 max-w-4xl w-full max-h-[90vh] transform transition-all duration-500 animate-modalSlideIn overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 hover:scale-110 hover:shadow-xl transition-all duration-300 border border-gray-200 group"
            >
              <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-200" />
            </button>

            {/* OverlayScrollbars Container */}
            <OverlayScrollbarsComponent 
              ref={scrollbarRef}
              className="w-full h-full"
              options={{
                scrollbars: {
                  theme: 'os-theme-dark',
                  visibility: 'auto',
                  autoHide: 'move',
                  autoHideDelay: 1000,
                  clickScrolling: true
                },
                overflow: {
                  x: 'hidden',
                  y: 'scroll'
                }
              }}
              style={{ maxHeight: '90vh' }}
            >
              <div className="w-full">
                {/* Modal Header with Image */}
                <div className="relative h-80 overflow-hidden rounded-t-3xl">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-20">
                    <div className="mb-4 animate-slideUp" style={{ animationDelay: '0.3s' }}>
                      <StatusBadge status={selectedProject.status} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 animate-slideUp" style={{ animationDelay: '0.4s' }}>
                      {selectedProject.title}
                    </h2>
                    <p className="text-lg text-white opacity-90 animate-slideUp" style={{ animationDelay: '0.5s' }}>
                      {selectedProject.category}
                    </p>
                  </div>
                </div>

                {/* Modal Body */}
                <div className="p-8">
                  {/* Project Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-2 gap-6 mb-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Calendar className="w-5 h-5 text-[#9CE840]" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{selectedProject.date}</div>
                      <div className="text-sm text-gray-600">Año</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="w-5 h-5 text-[#9CE840]" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900">{selectedProject.participants}</div>
                      <div className="text-sm text-gray-600">Participantes</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Descripción del Proyecto</h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Metodología */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Metodología</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Metodología Principal</h4>
                        <p className="text-gray-600 text-sm">
                          {selectedProject.methodology1 || "Enfoque personalizado adaptado a las necesidades específicas de cada participante."}
                        </p>
                      </div>
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold text-gray-900 mb-2">Metodología Complementaria</h4>
                        <p className="text-gray-600 text-sm">
                          {selectedProject.methodology2 || "Actividades prácticas y casos reales para mejor comprensión."}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  {selectedProject.tags && selectedProject.tags.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Áreas de Enfoque</h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-green-100 hover:text-[#9CE840] transition-colors duration-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </OverlayScrollbarsComponent>
          </div>
        </div>
      )}

      {/* Footer Component */}
      <Footer />

      {/* Custom Styles for Animations */}
      <style>
        {`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes backdropFadeIn {
          from { 
            opacity: 0;
            backdrop-filter: blur(0px);
          }
          to { 
            opacity: 1;
            backdrop-filter: blur(8px);
          }
        }
        
        @keyframes modalSlideIn {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-backdropFadeIn {
          animation: backdropFadeIn 0.4s ease-out forwards;
        }
        
        .animate-modalSlideIn {
          animation: modalSlideIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-slideUp {
          animation: slideUp 0.6s ease-out forwards;
          opacity: 0;
          animation-fill-mode: both;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        `}
      </style>
    </div>
  );
};

export default ProyectosView;