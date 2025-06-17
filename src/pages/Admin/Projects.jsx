import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { projectService } from "../../services/projectService";

import AdminProfile from "../../components/admin/AdminProfile";
import DataStat from "../../components/admin/DataStat";
import FilterButton from "../../components/admin/FilterButton";
import FiltroModal from "../../components/admin/FiltroModal";
import ProjectCard from "../../components/admin/ProjectCard";
import Toast from "../../components/alertas/Toast";
import CartoonButton from "../../components/buttons/CartoonButton";
import Sidebar from "../../components/Sidebar";

import filtroTestimonial from "../../assets/icons/filtroTestimonial.png";
import flechaTestimonialAbajo from "../../assets/icons/flechaTestimonialAbajo.png";
import flechaTestimonialArriba from "../../assets/icons/flechaTestimonialArriba.png";
import iconNotResult from "../../assets/icons/iconNotResult.png";

function Projects() {    const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);  // Cambia los filtros: solo 'En Progreso' y 'Completado'
  const filters = ["En Progreso", "Completado"];
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [isFiltroModalOpen, setIsFiltroModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    setLoading(true);
    projectService
      .getAllProjects()
      .then((response) => {
        if (response.status === "success") {          // Transformar los datos del backend al formato esperado por el componente
          const transformedProjects = response.projects.map(project => ({
            id: project.id,
            title: project.title,
            description: project.description,
            category: project.category,
            status: project.status === 'activo' ? 'En Progreso' : 
                    project.status === 'completado' ? 'Completado' : 'Planeado',
            image: project.image,
            year: project.year,
            participants: project.participants,
            areas: project.areas || [],
            methodology1: project.methodology1,
            methodology2: project.methodology2,
            author: project.author
          }));
          setProyectos(transformedProjects);
        } else {
          setProyectos([]);
        }
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
        setProyectos([]);
      })
      .finally(() => setLoading(false));
  }, []);
  // Cambia los contadores y lógica de estado
  const countByStatus = (status) => proyectos.filter((p) => p.status === status).length;
  const totalEnProgreso = countByStatus("En Progreso");
  const totalCompletados = countByStatus("Completado");
  const prevCounts = useRef({
    "En Progreso": totalEnProgreso,
    Completado: totalCompletados,
  });

  const [cambios, setCambios] = useState({
    "En Progreso": 0,
    Completado: 0,
  });  useEffect(() => {
    setCambios({
      "En Progreso": totalEnProgreso - prevCounts.current["En Progreso"],
      Completado: totalCompletados - prevCounts.current.Completado,
    });
    prevCounts.current = {
      "En Progreso": totalEnProgreso,
      Completado: totalCompletados,
    };
  }, [proyectos, totalEnProgreso, totalCompletados]);
  // Reinicia los indicadores a 0 después de 5 segundos
  useEffect(() => {
    if (
      cambios["En Progreso"] !== 0 ||
      cambios.Completado !== 0
    ) {
      const timeout = setTimeout(() => {
        setCambios({ "En Progreso": 0, Completado: 0 });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [cambios]);

  const getIcon = (cambio) =>
    cambio >= 0 ? flechaTestimonialArriba : flechaTestimonialAbajo;
  // Filtrado según activeFilter; "Todos" muestra todo
  const proyectosFiltrados =
    activeFilter === "Todos"
      ? proyectos
      : proyectos.filter((p) =>
          activeFilter === "En Progreso"
            ? p.status === "En Progreso"
            : p.status === "Completado"        );
  
  // Cambiar estado del proyecto seleccionado
  const handleStatusChange = async (nuevoEstado) => {
    if (!selectedProjectId) return;
    setLoading(true);
    try {
      console.log("Estado enviado:", nuevoEstado);
      // Mapear estados del frontend al backend
      const backendStatus = nuevoEstado === 'En Progreso' ? 'activo' : 
                           nuevoEstado === 'Completado' ? 'completado' : nuevoEstado;
      
      await projectService.updateProject(selectedProjectId, {
        status: backendStatus,
      });
      
      setProyectos((prev) =>
        prev.map((p) =>
          p.id === selectedProjectId ? { ...p, status: nuevoEstado } : p
        )
      );
      setSelectedProjectId(null);
    } catch (error) {
      console.error('Error al actualizar el estado del proyecto:', error);
      alert('Error al actualizar el estado del proyecto.');
    } finally {
      setLoading(false);
    }
  };  const handleInProgress = () => handleStatusChange('En Progreso');
  const handleComplete = () => handleStatusChange('Completado');
  // Función para mostrar modal de confirmación
  const handleDeleteProject = () => {
    if (!selectedProjectId) return;
    setShowDeleteModal(true);
  };

  // Función para confirmar eliminación
  const confirmDeleteProject = async () => {
    if (!selectedProjectId) return;

    setLoading(true);
    setShowDeleteModal(false);
    
    try {
      await projectService.deleteProject(selectedProjectId);
      
      // Actualizar la lista de proyectos eliminando el proyecto
      setProyectos((prev) => prev.filter((p) => p.id !== selectedProjectId));
      setSelectedProjectId(null);
      
      // Mostrar toast de éxito
      setShowToast(true);
    } catch (error) {
      console.error('Error al eliminar el proyecto:', error);
      alert('Error al eliminar el proyecto. Por favor, intente nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden px-6 md:p-0 md:pt-10 md:ml-48 lg:ml-55 md:mr-10 lg:mr-15 pt-10">
      {/* Header con estadísticas */}
      <div className="flex-none mb-2">

      <div className="flex items-center justify-between mt-6 2xl:mt-0">
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-adlam">PROYECTOS</h1>
        <AdminProfile />
      </div>        <div className="flex flex-wrap mt-4 sm:mt-6 gap-5 sm:gap-10 lg:gap-20 xl:mt-4 xl:gap-12 2xl:gap-20 h-auto">
          <DataStat
            value={totalEnProgreso}
            indicator={cambios["En Progreso"]}
            label="En progreso"
            iconSrc={getIcon(cambios["En Progreso"])}
            bgColor="#9CE840"
          />
          <DataStat
            value={totalCompletados}
            indicator={cambios.Completado}
            label="Completados"
            iconSrc={getIcon(cambios.Completado)}
            bgColor="#4285F4"
          />
        </div>{/* Botón de creación */}
        <div className="mt-10 xl:mt-8 2xl:mt-10 w-full lg:w-200 xl:w-160 2xl:w-200">
          <Link to="/projects/create">
            <CartoonButton text="Añadir proyecto" />
          </Link>
        </div>
        {/* Filtros */}
        <div className="flex items-center justify-between mt-5 md:mt-10 xl:mt-8 2xl:mt-10 py-2 w-full">
          <div className="flex items-center gap-4 sm:gap-7 xl:gap-8 2xl:gap-10">
            <p className="text-lg sm:text-3xl xl:text-3xl 2xl:text-4xl font-adlam">
              Últimos proyectos
            </p>
            <div className="h-7 w-0.5 sm:h-10 xl:h-9 2xl:h-10 bg-gray-300"></div>
            <div className="flex items-center gap-4">
              {/* Filtros grandes: mostramos Todos + filtros */}
              <div className="hidden lg:flex gap-4">
                <FilterButton
                  label="Todos"
                  isActive={activeFilter === "Todos"}
                  onClick={() => setActiveFilter("Todos")}
                />
                {filters.map((filter) => (
                  <FilterButton
                    key={filter}
                    label={filter}
                    isActive={activeFilter === filter}
                    onClick={() => setActiveFilter(filter)}
                  />
                ))}
              </div>
              {/* Filtros móviles: botón que abre modal con solo los filtros (sin "Todos") + botón "Todos" fuera */}
              <div className="flex lg:hidden gap-4">
                <FilterButton
                  label="Filtro"
                  isActive={false}
                  onClick={() => setIsFiltroModalOpen(true)}
                  iconSrc={filtroTestimonial}
                />
                <FilterButton
                  label="Todos"
                  isActive={activeFilter === "Todos"}
                  onClick={() => setActiveFilter("Todos")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Acciones sobre el proyecto seleccionado */}
      {selectedProjectId && (
        <div className="flex flex-wrap gap-2 sm:gap-4 mt-4 mb-2">
          <button
            className="bg-[#9CE840] text-black px-3 sm:px-4 py-2 rounded font-bold hover:bg-lime-500 transition text-sm sm:text-base"
            onClick={handleInProgress}
            disabled={loading}
          >
            En progreso
          </button>
          <button
            className="bg-[#4285F4] text-white px-3 sm:px-4 py-2 rounded font-bold hover:bg-blue-600 transition text-sm sm:text-base"
            onClick={handleComplete}
            disabled={loading}
          >
            Completar
          </button>
          <button
            className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded font-bold hover:bg-red-600 transition text-sm sm:text-base"
            onClick={handleDeleteProject}
            disabled={loading}
          >
            Eliminar
          </button>
        </div>
      )}
      {/* Lista de proyectos */}
      <div className="flex-grow flex gap-8 sm:mt-5 xl:mt-4 2xl:mt-5 overflow-hidden">
        <div className="w-full 2xl:w-[90%] overflow-y-auto pr-4 pb-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          <div className="flex flex-col gap-6 xl:gap-4 2xl:gap-6">
            {loading ? (
              <div className="text-center py-20 text-gray-400">Cargando proyectos...</div>
            ) : proyectosFiltrados.length > 0 ? (              proyectosFiltrados.map((proyecto) => (
                <ProjectCard
                  key={proyecto.id}
                  image={proyecto.image}
                  title={proyecto.title}
                  category={proyecto.category}
                  year={proyecto.year}
                  participants={proyecto.participants}
                  description={proyecto.description}
                  status={proyecto.status}
                  isSelected={selectedProjectId === proyecto.id}
                  onSelect={() => setSelectedProjectId(proyecto.id)}
                  slug={proyecto.slug}
                  projectId={proyecto.id}
                />
              ))
            ) : (
              <div className="flex flex-col items-center mt-20 text-center text-gray-400 gap-6">
                <img
                  src={iconNotResult}
                  className="w-32 sm:w-48 md:w-52"
                  alt="Sin resultados"
                />
                <h2 className="font-bold font-adlam text-2xl sm:text-4xl">
                  Oops,
                </h2>
                <p className="w-70 sm:w-90 text-gray-400 font-light text-lg sm:text-xl font-quicksand">
                  Parece que no hay proyectos que coincidan con este filtro. Prueba con otra opción.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>      {/* Modal de filtros para móviles */}
      {isFiltroModalOpen && (
        <FiltroModal
          filters={filters}
          activeFilter={activeFilter}
          onFilterChange={(filter) => {
            setActiveFilter(filter);
            setIsFiltroModalOpen(false);
          }}
          onClose={() => setIsFiltroModalOpen(false)}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              {/* Icono de advertencia */}
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              
              {/* Título */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Eliminar Proyecto
              </h3>
              
              {/* Mensaje */}
              <p className="text-gray-600 mb-8">
                ¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer y se perderán todos los datos relacionados.
              </p>
              
              {/* Botones */}
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDeleteProject}
                  disabled={loading}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Eliminando...' : 'Eliminar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast de confirmación */}
      <Toast 
        title="¡Éxito!"
        message="Proyecto eliminado exitosamente"
        show={showToast}
        setShow={setShowToast}
      />

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
}

export default Projects;